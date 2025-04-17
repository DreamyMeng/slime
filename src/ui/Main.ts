const { regClass } = Laya;
import { Battle } from "../core/battle";
import { color_config, Config, shuxing_config } from "../core/config";
import { Save } from "../core/save";
import * as utils from "../core/utils";
import * as cfg from "../table/schema";
import { Cuilian } from "./Cuilian";
import { MainBase } from "./Main.generated";
import { MessageBox } from "./MessageBox";
import { RoleView } from "./RoleView";
import { SkillView } from "./SkillView";

@regClass()
export class Main extends MainBase {
    static instance: Main;

    onAwake(): void {
        Main.instance = this;

        this.battle = new Battle();
        this.list_guyou.scrollBar.autoHide = true;
        this.list_xuexi.scrollBar.autoHide = true;

        this.show_map();
        this.update_player();
        this.update_skill();

        this.btn_jineng.onClick = () => {
            this.img_jineng.visible = true;
            this.img_shuxing.visible = false;
        }

        this.btn_shuxing.onClick = () => {
            this.img_jineng.visible = false;
            this.img_shuxing.visible = true;
        }

        this.btn_sousuo.onClick = () => {
            this.update_map();
        }

        this.btn_boss.onClick = () => {
            Save.data.player.scenes[Save.data.player.curScene].pass = true;
            Main.instance.update_map();
        }

        this.btn_shenru.onClick = () => {
            Save.data.player.curScene++;
            Main.instance.update_map();
        }

        this.btn_fanhui.onClick = () => {
            Save.data.player.curScene--;
            Main.instance.update_map();
        }

        this.btn_taopao.onClick = () => {
            this.battle.escape = true;
        }
        this.btn_cuilian.onClick = () => {
            if (Save.data.player.level > Cuilian.level) {
                this.Cuilian.getComponent(Cuilian).show();
            } else {
                MessageBox.tip(`<font color='#FF0000'>等级不足</font>`);
            }
        }

        this.btn_zhuansheng.onClick = () => {
            let rebirth = Save.data.game.rebirth;

            if (rebirth > 999) {
                MessageBox.tip(`<font color='#FF0000'>已达到最大转生数</font>`);
                return;
            }
            let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(rebirth);
            if (Save.data.player.level < rebirthData.need) {
                MessageBox.tip(`<font color='#FF0000'>等级不足</font>`);
                return;
            }
            let per = 10;
            if (rebirth > 99) per = 1;
            if (rebirth > 199) per = 0.1;

            MessageBox.show(`是否进行转生，等级、种族重置为初始状态，全属性永久额外增加${per}%`, () => {
                Save.data.game.rebirth++;
                if (Save.data.game.rebirth == 1) MessageBox.show("解锁：自动战斗", null, null, false);
                if (Save.data.game.rebirth == 2) MessageBox.show("解锁：定向拟态", null, null, false);
                if (Save.data.game.rebirth == 3) {
                    var skill = Config.table.Tbskill.get("jiexi");
                    MessageBox.show(`习得：${skill.name}`, null, null, false);
                }
                Save.data.player = Save.reset();
                MessageBox.tip(`转生成功，属性成长提升。`);
                // CollectionScene.addCount(CollectionType.reincarnation);
                this.show_map();
                this.update_player();
                this.update_skill();
            });
        }
    }

    battle: Battle;

    show_map(): void {
        this.Map.visible = true;
        this.Battle.visible = false;
        this.update_map();
    }

    show_battle(): void {
        this.Map.visible = false;
        this.Battle.visible = true;
        this.battle.start();
    }

    update_player(): void {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.name);
        let levelData: cfg.role_level = Config.table.Tbrole_level.get(playerData.level);
        let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(Save.data.game.rebirth);
        let addition = Main.getAddition();
        let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
        let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
        let health = Main.getHealth(roleData, levelData, rebirthData, addition);
        let power = Main.getPower(attack, defence, health);
        let curExp = playerData.exp;
        let maxExp = roleData.expNeed * levelData.need;
        let roleName = Main.getRoleName(roleData);

        this.label_1.text = `种族:${roleName}`
            + `\n战力:${utils.getValueStr(power)}`
            + `\n等级:${playerData.level}(${utils.toPerStr(curExp / maxExp)})`
            + `\n转生:${Save.data.game.rebirth - 1}`
            + `\n<font color='#6FD368'>灵气:${utils.getValueStr(playerData.quality['ling'] ?? 0)}</font>`
            + `\n<font color='#D7AC5E'>仙气:${utils.getValueStr(playerData.quality['xian'] ?? 0)}</font>`
            + `\n<font color='#C26060'>神韵:${utils.getValueStr(playerData.quality['shen'] ?? 0)}</font>`;
        this.label_2.text = `攻击:<font color='#DCDCDC'>${utils.getValueStr(attack)}</font>`
            + `\t防御:<font color='#DCDCDC'>${utils.getValueStr(defence)}</font>`
            + `\n血量:<font color='#DCDCDC'>${utils.getValueStr(health)}</font>`;

        this.list_shuxing.dataSource = Object.keys(playerData.relation).map(key => {
            const typedKey = key as keyof typeof shuxing_config;
            return `${shuxing_config[typedKey]}:<font color='#AFAFAF'>${utils.getValueStr(playerData.relation[key])}</font>`;
        });

        this.player0.getComponent(RoleView).show(playerData.name, playerData.level, power);
        this.battle.player.init(attack, defence, health, roleData.skills.concat(playerData.skills));
        this.Player.getComponent(RoleView).show(playerData.name, playerData.level);

        this.btn_cuilian.tip.text = "消耗等级:" + Cuilian.level;
        this.btn_zhuansheng.tip.text = "需要等级:" + rebirthData.need;
    }

    update_skill(): void {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.name);

        this.list_guyou.renderHandler?.clear();
        this.list_xuexi.renderHandler?.clear();

        this.list_guyou.array = roleData.skills;
        this.list_guyou.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(SkillView).init(roleData.skills[index]);
        }, null, false);

        let list = playerData.skills.concat(new Array<string>(Main.getSkillMax() - playerData.skills.length).fill(''));
        this.list_xuexi.array = list;
        this.list_xuexi.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(SkillView).init(list[index], true);
        }, null, false);
    }

    update_map(): void {
        let mapLevel = Save.data.player.curScene;
        this.label_titile.text = `第${utils.numberToChinese(mapLevel)}层`;
        let sceneData: cfg.map_level = Config.table.Tbmap_level.get(mapLevel);

        let curSceneData = Save.data.player.scenes[mapLevel];
        if (curSceneData.count >= 3) {
            this.btn_sousuo.tip.text = '';
            this.btn_shenru.active = true;

            this.btn_boss.visible = !curSceneData.pass;
            this.btn_shenru.visible = curSceneData.pass;
        } else {
            this.btn_sousuo.tip.text = `击败怪物${curSceneData.count}/3`;
            this.btn_shenru.active = false;
            this.btn_boss.visible = false;
        }

        if (mapLevel == 1) {
            this.btn_fanhui.active = false;
        } else {
            this.btn_fanhui.active = true;
            if (mapLevel >= 105) this.btn_shenru.active = false;
        }

        var list = Main.getMonsterListByScene(sceneData);
        this.monster0.getComponent(RoleView).init(sceneData, list[0], Main.getLevel(sceneData));
        this.monster1.getComponent(RoleView).init(sceneData, list[1], Main.getLevel(sceneData));
        this.monster2.getComponent(RoleView).init(sceneData, list[2], Main.getLevel(sceneData));
    }

    static getRoleName(role: cfg.role) {
        let color: string = color_config.pinzhi[role.qualityType as keyof typeof color_config.pinzhi];
        let rank: string = color_config.name[role.rare as keyof typeof color_config.name];
        return `<font color=${color}>${this.getQualityStr(role.qualityType)}</font><font color=${color_config.name.dian}>·</font><font color=${rank}>${role.name}</font>`
    }

    static getQualityStr(key: string): string {
        if (key === 'ling') return '灵';
        if (key === 'xian') return '仙';
        if (key == 'shen') return '神';
        return '凡';
    }

    static getSkillMax(): number {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.name);

        let num = 1;
        let list = roleData.skills.concat(playerData.skills);
        list.forEach((skillId) => {
            let skillData = Config.table.Tbskill.get(skillId);
            if (skillData.type === cfg.SkillType.learn) {
                num += skillData.values.get('1');
            }
        });

        // num += ChengjiuMgr.getJiangli_skillnum();
        return num;
    }

    // 当前最大99+90，少一个成就。
    static getLevelMax(): number {
        return 99
        // + CollectionScene.getCount(RewardType.level) * 10;
    }

    static addExp(num: number) {
        // 获取当前经验和等级
        let playerData = Save.data.player;
        let curExp = Math.floor(playerData.exp + num);
        let levelData = Config.table.Tbrole_level.get(playerData.level);
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.name);

        while (true) {
            // 获取当前等级的最大经验值
            const maxExp = levelData.need * roleData.expNeed;

            if (curExp >= maxExp) {
                curExp -= maxExp; // 多余的经验值
                this.addLevel();
            } else {
                break; // 经验值不足以升级，退出循环
            }
        }

        // 更新经验值和等级
        playerData.exp = curExp;
    }

    static addLevel() {
        let playerData = Save.data.player;
        if (playerData.level >= this.getLevelMax()) {
            MessageBox.tip("已达到最高等级！");
            return;
        }
        playerData.level++;
        MessageBox.tip("等级+1");
    }

    static addValue(role: cfg.role) {
        let playerData = Save.data.player;
        const shift = 0.1;
        var qualityValue = Math.floor(role.quality * shift);
        playerData.quality[role.qualityType] = (playerData.quality[role.qualityType] ?? 0) + qualityValue;
        // if (qualityValue > 0) MessageBox.tip(`<font color=${color_config.QUALITY[role.qualityType]}>◈ ${Config.getQualityStr(role.qualityType)}:+${qualityValue} </font>`);
        var sr = playerData.relation;
        var cr = role.relations as unknown as { [key: string]: number };
        var keys = Object.keys(sr);
        var r = role.race * role.remain * shift;
        var des = "";
        shuxing_config
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            var v = Math.floor((cr[key] ?? 0) * r);
            sr[key] += v;

            if (v > 0) {
                const typedKey = key as keyof typeof shuxing_config;
                des += `${shuxing_config[typedKey]}:+${v}，\t\t`;
            }
        }
        if (des.length > 0) des = des.substring(0, des.lastIndexOf('，\t\t'));
        MessageBox.tip(des);
    }

    static unlockRole(id: string) {
        let roleData: cfg.role = Config.table.Tbrole.get(id);
        MessageBox.tip(`解锁图鉴：${this.getRoleName(roleData)}`);
        Save.data.game.roles[id] = true;
    }

    static learn(targetData: cfg.role) {
        if (Math.random() > 0.2) return;
        let max = this.getSkillMax();
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.name);
        let owner = roleData.skills.concat(playerData.skills);

        if (playerData.skills.length >= max) {
            MessageBox.tip("技能已满！");
            return;
        }

        const ownedIds = new Set(owner);
        const available = targetData.skills.filter(s => !ownedIds.has(s));

        const shuffled = [...available].sort(() => 0.5 - Math.random());
        const newSkills = shuffled.slice(0, Math.min(1, shuffled.length));

        if (newSkills.length > 0) {
            const skillId = newSkills[0];
            const skillData = Config.table.Tbskill.get(skillId);
            if (skillData) {
                playerData.skills.push(skillId);
                MessageBox.tip(`习得：${skillData.name}`);
                Main.instance.update_skill();
            }
        }
    }

    static role_shift: number = 1.05; // 角色数值修正量
    static power_shift: number = 10; // 战斗力数值修正量（为了好看）

    static getAddition(): { [key: string]: number } {
        let addition: { [key: string]: number } = { attack: 0, defence: 0, health: 0 };

        let roles = Config.table.Tbrole.getDataList();
        roles.forEach((role) => {
            if (!Save.data.game.roles[role.id]) return;
            addition.attack += role.attackAdd;
            addition.defence += role.defenceAdd;
            addition.health += role.healthAdd;
        });

        return addition;
    }

    /**
     * 实际攻击力=（当前角色当前等级攻击力*（1+转生附加））+图鉴附加
     */
    static getAttack(roleData: cfg.role, levelData: cfg.role_level, rebirthData: cfg.rebirth, addition: { [key: string]: number }): number {
        let value: number;
        value = (levelData.attack * roleData.attackRate * (1 + rebirthData.attack));
        value += (addition.attack);
        return utils.toInt(value * this.role_shift);
    }

    /**
     * 实际防御力=（当前角色当前等级防御力*（1+转生附加））+图鉴附加
     */
    static getDefence(roleData: cfg.role, levelData: cfg.role_level, rebirthData: cfg.rebirth, addition: { [key: string]: number }): number {
        let value: number;
        value = (levelData.defence * roleData.defenceRate * (1 + rebirthData.defence));
        value += (addition.defence);
        return utils.toInt(value * this.role_shift);
    }

    /**
     * 实际血量=（当前角色当前等级血量*（1+转生附加））+图鉴附加
     */
    static getHealth(roleData: cfg.role, levelData: cfg.role_level, rebirthData: cfg.rebirth, addition: { [key: string]: number }): number {
        let value: number;
        value = (levelData.health * roleData.healthRate * (1 + rebirthData.health));
        value += (addition.health);
        return utils.toInt(value * this.role_shift);
    }

    static getPower(attack: number, defence: number, health: number) {
        return utils.toInt((attack + defence) * this.power_shift + health);
    }

    static getBoss(sceneData: cfg.map_level) {
        if (sceneData.id > 100) return `h${sceneData.id + 40}`;
        return this.getMonsterByScene(sceneData);
    }

    static getMonsterByScene(sceneData: cfg.map_level) {
        var monsters = sceneData.monsters as unknown as { [key: string]: number };

        var sum: number = 0;
        for (var i in monsters) {
            sum += monsters[i] ?? 0;
        }

        // console.log('monsters probability sum', sum);
        let random: number = Math.floor(Math.random() * sum);
        let rate: number = 0;
        for (let i in monsters) {
            rate += monsters[i] ?? 0;
            if (random < rate) {
                return i;
            }
        }
        return null;
    }

    private static getMonsterListByScene(sceneData: cfg.map_level): string[] {
        const maxCount = 3;
        const maxAttempts = 1000; // 最大循环次数，防止死循环

        var monsters = sceneData.monsters as unknown as { [key: string]: number };

        const monsterEntries = Object.keys(monsters).map(key => ({ key, value: monsters[key] }));
        if (monsterEntries.length === 0) return []; // 如果没有怪物，直接返回空数组

        // 使用 Fisher-Yates 洗牌算法打乱数组
        for (let i = monsterEntries.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [monsterEntries[i], monsterEntries[randomIndex]] = [monsterEntries[randomIndex], monsterEntries[i]];
        }

        const sum = monsterEntries.reduce((acc, item) => acc + (item.value ?? 0), 0); // 计算总概率和
        if (sum <= 0) return []; // 如果总概率为 0，直接返回空数组

        const selected: Set<string> = new Set();
        let attempts = 0; // 循环计数器

        while (selected.size < maxCount && attempts < maxAttempts) {
            attempts++;
            let random = Math.random() * sum; // 生成随机数
            let cumulativeRate = 0;

            for (const { key, value } of monsterEntries) {
                cumulativeRate += (value ?? 0);
                if (random < cumulativeRate) {
                    selected.add(key); // 添加到 Set 中
                    break;
                }
            }
        }

        if (attempts >= maxAttempts) {
            console.warn("Exceeded max attempts to select monsters. Ensure probabilities are set correctly.");
        }

        return Array.from(selected); // 转换为数组返回
    }

    static getLevel(scene: cfg.map_level): number {
        return Math.round(Math.random() * (scene.levelMax - scene.levelMin)) + scene.levelMin;
    }
}