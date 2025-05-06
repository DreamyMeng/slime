const { regClass } = Laya;
import { Battle } from "../core/battle";
import { color_config, Config, jinhua_need, shift_config, shuxing_config, skill_rate, xinximoban } from "../core/config";
import { getRoleLevelAttributes, RoleLevel } from "../core/level";
import { Save, SaveData_Player } from "../core/save";
import * as utils from "../core/utils";
import { OfflineManager } from "../offline";
import { isAndroid, playAd } from "../platform";
import * as cfg from "../table/schema";
import { Chengjiu } from "./Chengjiu";
import { Cuilian } from "./Cuilian";
import { Jinhua } from "./Jinhua";
import { MainBase } from "./Main.generated";
import { MessageBox } from "./MessageBox";
import { PopUp } from "./PopUp";
import { RoleView } from "./RoleView";
import { SkillView } from "./SkillView";
import { Tujian } from "./Tujian";

@regClass()
export class Main extends MainBase {
    static instance: Main;

    show(): void {
        (this.getChildByName('Top') as Laya.Image).visible = true;
        (this.getChildByName('Middle') as Laya.Image).visible = true;
        (this.getChildByName('Bottom') as Laya.Image).visible = true;
    }

    onAwake(): void {
        Main.instance = this;

        this.battle = new Battle();
        this.list_guyou.scrollBar.autoHide = true;
        this.list_xuexi.scrollBar.autoHide = true;

        this.show_map();
        this.update_player();
        this.update_skill();

        this.btn_login.onClick = () => {
            Laya.Scene.open("Login.ls");
        }

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
            let scene = Save.data.player.scenes[Save.data.player.curScene]
            this.Enemy.getComponent(RoleView).show(scene.boss, scene.level);
            this.show_battle(scene.boss, scene.level, true);
        }

        this.btn_shenru.onClick = () => {
            if (Save.data.player.curScene > Save.data.player.maxScene) return;
            Save.data.player.curScene++;
            utils.GameLog.log(xinximoban.shenru.toStr().replace('*', utils.numberToChinese(Save.data.player.curScene)), false);
            this.update_map();
            Save.saveGame();
        }
        utils.GameLog.log(xinximoban.shenru.toStr().replace('*', utils.numberToChinese(Save.data.player.curScene)), false);
        this.btn_fanhui.onClick = () => {
            Save.data.player.curScene = Math.max(Save.data.player.curScene - 1, 1);
            utils.GameLog.log(xinximoban.shenru.toStr().replace('*', utils.numberToChinese(Save.data.player.curScene)), false);
            this.update_map();
            Save.saveGame();
        }

        this.btn_taopao.onClick = () => {
            let flag = Save.data.setting.auto;
            this.battle.escape = true;
            Save.data.setting.auto = false;
            this.update_auto();
            if (flag) Save.saveGame();
        }

        this.btn_tujian.onClick = () => {
            this.Tujian.getComponent(Tujian).show();
        }

        this.btn_jinhua.onClick = () => {
            let playerData = Save.data.player;
            let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
            let level = jinhua_need[Math.min(jinhua_need.length - 1, roleData.rare)];

            if (Save.data.player.level > level) {
                this.Jinhua.getComponent(Jinhua).show();
            } else {
                MessageBox.tip(xinximoban.buzu);
            }
        }

        this.btn_cuilian.onClick = () => {
            if (Save.data.player.level > Cuilian.level) {
                this.Cuilian.getComponent(Cuilian).show();
            } else {
                MessageBox.tip(xinximoban.buzu);
            }
        }

        this.btn_zhuansheng.onClick = () => {
            let rebirth = Save.data.game.rebirth;

            if (rebirth > 999) {
                MessageBox.tip(`<font color='#FF0000'>已达到最大转生数</font>`);
                return;
            }
            let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(rebirth === 0 ? 1 : rebirth);
            if (Save.data.player.level <= rebirthData.need) {
                MessageBox.tip(xinximoban.buzu);
                return;
            }
            let per = 10;
            if (rebirth > 99) per = 1;
            if (rebirth > 199) per = 0.1;

            MessageBox.show("是否进行转生，等级、种族重置为初始状态，全属性永久额外增加".toStr() + `${per}%`, () => {
                Save.data.game.rebirth++;
                if (Save.data.game.rebirth == 1) MessageBox.show("解锁：自动战斗".toStr(), null, null, false);
                if (Save.data.game.rebirth == 2) MessageBox.show("解锁：定向拟态".toStr(), null, null, false);
                if (Save.data.game.rebirth == 3) {
                    var skill = Config.table.Tbskill.get("jiexi");
                    MessageBox.show("习得：".toStr() + `${skill.name.toStr()}`, null, null, false);
                }
                Save.data.player = Save.reset();
                MessageBox.tip(xinximoban.zhuansheng.toStr().replace('^', color_config.xinximoban.huixue), false);
                Chengjiu.addCount('rebirth');
                Laya.SoundManager.playSound(Config.sounds.get("upgrade"));

                this.show_map();
                this.update_player();
                this.update_skill();
                Save.saveGame();
            });
        }

        this.List.array = utils.GameLog.get();
        utils.GameLog.instance.callback = () => {
            this.List.refresh();
            this.List.scrollTo(this.List.array.length - 1);
        };
        this.List.scrollBar.autoHide = true;

        this.btn_zidong.onClick = () => {
            Save.data.setting.auto = !Save.data.setting.auto;
            if (Save.data.setting.auto) this.auto_fight();
            else this.battle.escape = true;
            this.update_auto();
        }
        this.update_auto();

        // this.btn_guaji.onClick = () => {
        //     MessageBox.show("离线挂机将退出游戏，下次上线获得经验奖励。(奖励最高上限为1小时)".toStr(), () => {
        //         let time = Date.now();
        //         Laya.LocalStorage.setItem("offline", time.toString());
        //     });
        // }

        OfflineManager.saveLeaveTime();
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                this.hasCalculatedOffline = false;
                OfflineManager.saveLeaveTime();
            } else if (document.visibilityState === "visible") {
                if (this.hasCalculatedOffline) return;
                this.hasCalculatedOffline = true;
                const offlineTime = OfflineManager.checkOfflineTime();
                let time = Math.min(60 * 60, offlineTime);
                let levelData = getRoleLevelAttributes(Save.data.player.level);
                let exp = Math.floor(time / 10 * levelData.exp);
                Main.addExp(exp);
                MessageBox.show(`你离线了 * 秒（最多一小时），获得了 ^ 经验！`.toStr().replace("*", time.toString()).replace("^", exp.toString()), null, null, false);
                this.update_player();
                Save.saveGame();
            }
        });
    }
    hasCalculatedOffline: boolean;
    update_auto(): void {
        this.btn_zidong.title.text = (Save.data.setting.auto ? "停止" : "自动战斗").toStr();
    }

    auto_fight(): void {
        let sceneData: cfg.map_level = Config.table.Tbmap_level.get(Save.data.player.curScene);
        let id = Main.getMonsterByScene(sceneData);
        let level = Main.getLevel(sceneData);
        this.Enemy.getComponent(RoleView).show(id, level);
        this.show_battle(id, level, false);
    }

    battle: Battle;

    show_map(): void {
        this.Map.visible = true;
        this.Battle.visible = false;
        this.update_map();
    }

    show_battle(id: string, level: number, isBoss: boolean): void {
        this.Map.visible = false;
        this.Battle.visible = true;
        this.battle.init(id, level, isBoss); // 初始化battle对象，传入角色ID和level，以及是否为boss
        this.battle.start(); // 开始战斗
    }

    update_player(): void {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
        let levelData: RoleLevel = getRoleLevelAttributes(playerData.level);
        let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(Save.data.game.rebirth);
        let addition = Main.getAddition();
        let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
        let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
        let health = Main.getHealth(roleData, levelData, rebirthData, addition);
        let power = Main.getPower(attack, defence, health);
        let curExp = playerData.exp;
        let maxExp = roleData.expNeed * levelData.need;
        let roleName = Main.getRoleName(roleData);

        this.label_1.text = "种族:".toStr() + `${roleName}`
            + `\n${"战力:".toStr()}${utils.getValueStr(power)}`
            + `\n${"等级:".toStr()}${playerData.level}(${utils.toPerStr(curExp / maxExp)})`
            + `\n${"转生:".toStr()}${Save.data.game.rebirth}`
            + `\n<font color='#6FD368'>${"灵气:".toStr()}${utils.getValueStr(playerData.quality['ling'] ?? 0)}</font>`
            + `\n<font color='#D7AC5E'>${"仙气:".toStr()}${utils.getValueStr(playerData.quality['xian'] ?? 0)}</font>`
            + `\n<font color='#C26060'>${"神韵:".toStr()}${utils.getValueStr(playerData.quality['shen'] ?? 0)}</font>`;
        this.label_2.text = `${"攻击:".toStr()}<font color='#DCDCDC'>${utils.getValueStr(attack)}</font>`
            + `\t${"防御:".toStr()}<font color='#DCDCDC'>${utils.getValueStr(defence)}</font>`
            + `\n${"血量:".toStr()}<font color='#DCDCDC'>${utils.getValueStr(health)}</font>`;

        this.list_shuxing.dataSource = Object.keys(playerData.relation).map(key => {
            const typedKey = key as keyof typeof shuxing_config;
            return `${shuxing_config[typedKey].toStr()}:<font color='#AFAFAF'>${utils.getValueStr(playerData.relation[key])}</font>`;
        });

        this.player0.getComponent(RoleView).show(playerData.id, playerData.level, power);
        this.Player.getComponent(RoleView).show(playerData.id, playerData.level);

        this.btn_zidong.active = Save.data.game.rebirth > 0;
        this.btn_cuilian.tip.text = "需要等级>".toStr() + Cuilian.level;
        this.btn_zhuansheng.tip.text = "需要等级>".toStr() + rebirthData.need;
        this.btn_jinhua.tip.text = "需要等级>".toStr() + jinhua_need[Math.min(jinhua_need.length - 1, roleData.rare)];
        utils.GameLog.log(xinximoban.zhandouli.toStr().replace('*', utils.getValueStr(power)), false);
    }

    update_skill(): void {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);

        this.list_guyou.renderHandler?.clear();
        this.list_xuexi.renderHandler?.clear();

        this.list_guyou.array = roleData.skills;
        this.list_guyou.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(SkillView).show(roleData.skills[index]);
        }, null, false);

        let list = playerData.skills.concat(new Array<string>(this.getSkillMax() - playerData.skills.length).fill(''));
        this.list_xuexi.array = list;
        this.list_xuexi.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(SkillView).show(list[index], true);
        }, null, false);
    }

    update_map(): void {
        let mapLevel = Save.data.player.curScene;
        let max = Config.table.Tbmap_level.getDataList().length;
        if (mapLevel > max) return;

        this.label_titile.text = "第*层".toStr().replace('*', utils.numberToChinese(mapLevel));
        let sceneData: cfg.map_level = Config.table.Tbmap_level.get(mapLevel);

        let flag = true;
        let curSceneData = Save.data.player.scenes[mapLevel];
        if (curSceneData.count >= 3) {
            this.btn_sousuo.tip.text = '';
            this.btn_shenru.active = true;

            this.btn_boss.visible = !curSceneData.pass;
            flag = curSceneData.pass > 0;
        }
        else {
            this.btn_sousuo.tip.text = "击败怪物:".toStr() + `${curSceneData.count}/3`;
            this.btn_shenru.active = false;
            this.btn_boss.visible = false;
        }
        this.btn_shenru.visible = flag;

        if (mapLevel == 1) {
            this.btn_fanhui.active = false;
        } else {
            this.btn_fanhui.active = true;
            if (mapLevel >= 105) this.btn_shenru.active = false;
        }

        var list = Main.getMonsterListByScene(sceneData);
        this.monster0.getComponent(RoleView).init(sceneData.attackRate, list[0], Main.getLevel(sceneData));
        this.monster1.getComponent(RoleView).init(sceneData.attackRate, list[1], Main.getLevel(sceneData));
        this.monster2.getComponent(RoleView).init(sceneData.attackRate, list[2], Main.getLevel(sceneData));

        let str = xinximoban.qianjin.toStr();
        list.forEach((id, index) => {
            str = str.replace(`{${index}}`, Main.getRoleName(Config.table.Tbrole.get(id)));
        });
        utils.GameLog.log(str, false);
    }

    deal_battle_result(): void {
        if (this.battle.escape) {
            console.log('player escapes the battle!');
            utils.GameLog.log(xinximoban.zhandou.taopao);
        } else if (this.battle.draw) {
            // 处理平局逻辑
            console.log('the battle is a draw!');
            MessageBox.tip("大战100回合，精疲力尽了！");
            // Save.data.setting.auto = false;
            // this.update_auto();
            if (Save.data.setting.auto) {
                this.auto_fight();
                return;
            }
        }
        else {
            // 处理胜利失败逻辑
            if (this.battle.player.isAlive()) {
                // console.log(`${this.player.camp} wins the battle!`);
                utils.GameLog.log(xinximoban.zhandou.siwang1.toStr().replace('*', Main.getRoleName(this.battle.enemy.view.data)), false);
                this.battle.victory();
                if (Save.data.setting.auto) {
                    this.auto_fight();
                    return;
                }
                Laya.SoundManager.playSound(Config.sounds.get("win"));
                Save.saveGame();
            } else {
                // console.log(`${this.enemy.camp} wins the battle!`);
                utils.GameLog.log(xinximoban.zhandou.siwang2.toStr().replace('*', Main.getRoleName(this.battle.enemy.view.data)), false);
                this.player_dead();
            }
        }

        utils.GameLog.log(xinximoban.zhandou.jieshu);
        Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
        this.show_map();
    }

    curPlayerData: SaveData_Player;

    player_dead(): void {
        console.log('广告时刻');
        // 使用深拷贝而不是引用赋值
        this.curPlayerData = JSON.parse(JSON.stringify(Save.data.player));
        Save.data.player = Save.reset();
        Laya.SoundManager.playSound(Config.sounds.get("die"));
        Save.data.setting.auto = false;
        this.update_auto();
        Save.saveGame();
        let tip = MessageBox.show(`<font color='^'>你死了</font>等级将降为1级`.toStr().replace('^', color_config.xinximoban.shanghai), () => {
            this.fuhuo_tip.ok.active = false;
            if (isAndroid()) playAd(1);
            else {
                this.curPlayerData.revive--;
                this.fuhuo_success();
            }
        }, () => {
            this.fuhuo_fail();
        }, true, false);
        this.fuhuo_tip = tip;
        tip.ok.title.text = '复活'.toStr();

        if (isAndroid()) {
            tip.ok.tip.text = "看广告".toStr();
        } else {
            if (this.curPlayerData.revive <= 0) {
                tip.ok.active = false;
            } else {
                tip.ok.active = true;
                tip.ok.tip.text = "剩余次数:".toStr() + `${this.curPlayerData.revive}`;
            }
        }
    }
    fuhuo_tip: PopUp;
    fuhuo_success(): void {
        Save.data.player = this.curPlayerData;
        this.update_map();
        MessageBox.tip(`<font color='^'>你复活了</font>`.toStr().replace('^', color_config.xinximoban.huixue), false);
        Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
        Save.saveGame();
        if (this.fuhuo_tip) {
            this.fuhuo_tip.close(() => {
                this.fuhuo_tip.destroy();
                this.fuhuo_tip = null;
            });
        }
    }

    fuhuo_load(): void {
        if (this.fuhuo_tip) {
            this.fuhuo_tip.ok.active = true;
        }
    }

    fuhuo_fail(): void {
        MessageBox.tip(`<font color='^'>你死了</font>,等级降为1级`.toStr().replace('^', color_config.xinximoban.shanghai), false);
        // Save.data.player = Save.reset();
        this.show_map();
        this.update_player();
        this.update_skill();
        Save.saveGame();
        if (this.fuhuo_tip) {
            this.fuhuo_tip.close(() => {
                this.fuhuo_tip.destroy();
                this.fuhuo_tip = null;
            });
        }
    }

    static getRoleName(role: cfg.role) {
        let color: string = color_config.pinzhi[role.qualityType as keyof typeof color_config.pinzhi];
        let rank: string = color_config.name[role.rare as keyof typeof color_config.name];
        return `<font color=${color}>${this.getQualityStr(role.qualityType).toStr()}</font><font color=${color_config.name.dian}>·</font><font color=${rank}>${role.name.toStr()}</font>`
    }

    static getQualityStr(key: string): string {
        if (key === 'ling') return '灵';
        if (key === 'xian') return '仙';
        if (key == 'shen') return '神';
        return '凡';
    }

    getSkillMax(): number {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);

        let num = 1;
        let list = roleData.skills.concat(playerData.skills);
        list.forEach((skillId) => {
            let skillData = Config.table.Tbskill.get(skillId);
            if (skillData.type === cfg.SkillType.learn) {
                num += skillData.values.get('1');
            }
        });

        num += Save.data.game.rewards['skill'];
        return num;
    }

    // 当前最大99+90，少一个成就。
    static getLevelMax(): number {
        return 99 + Save.data.game.rewards['level'] * 10;
    }

    static addExp(num: number) {
        // 获取当前经验和等级
        let playerData = Save.data.player;
        let curExp = utils.toInt(playerData.exp + num);

        while (true) {
            let levelData = getRoleLevelAttributes(playerData.level);
            let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
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
        Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
        playerData.level++;
        MessageBox.tip("等级+1");
        utils.GameLog.log(xinximoban.shengji.toStr().replace('*', playerData.level.toString()), false);
    }

    static addValue(role: cfg.role) {
        let playerData = Save.data.player;
        var qualityValue = utils.toInt(role.quality * shift_config.zhongzu_shift);
        playerData.quality[role.qualityType] = (playerData.quality[role.qualityType] ?? 0) + qualityValue;
        // if (qualityValue > 0) MessageBox.tip(`<font color=${color_config.QUALITY[role.qualityType]}>◈ ${Config.getQualityStr(role.qualityType)}:+${qualityValue} </font>`);
        var sr = playerData.relation;
        var cr = role.relations as unknown as { [key: string]: number };
        var keys = Object.keys(sr);
        var r = role.race * role.remain * shift_config.zhongzu_shift;
        var des = "";

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            var v = utils.toInt((cr[key] ?? 0) * r);
            sr[key] += v;

            if (v > 0) {
                const typedKey = key as keyof typeof shuxing_config;
                des += `${shuxing_config[typedKey].toStr()}:+${v}，\t\t`;
            }
        }
        if (des.length > 0) des = des.substring(0, des.lastIndexOf('，\t\t'));
        MessageBox.tip(des, false);
    }

    static unlockRole(id: string) {
        let roleData: cfg.role = Config.table.Tbrole.get(id);
        MessageBox.tip("解锁图鉴：".toStr() + `${this.getRoleName(roleData)}`, false);
        Save.data.game.roles[id] = 1;
    }

    learn(targetData: cfg.role) {
        if (Math.random() > skill_rate) return;
        let max = this.getSkillMax();
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
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
                MessageBox.tip(xinximoban.tunshi.toStr().replace('*', Main.getRoleName(targetData)).replace('&', skillData.name.toStr()).replace('^', color_config.xinximoban.skill), false);
                this.update_skill();
            }
        }
    }

    static getAddition(locks: { [key: string]: number } = Save.data.game.roles): { [key: string]: number } {
        let addition: { [key: string]: number } = { attack: 0, defence: 0, health: 0 };

        let roles = Config.table.Tbrole.getDataList();
        roles.forEach((role) => {
            if (!locks[role.id]) return;
            addition.attack += role.attackAdd;
            addition.defence += role.defenceAdd;
            addition.health += role.healthAdd;
        });

        return addition;
    }

    /**
     * 实际攻击力=（当前角色当前等级攻击力*（1+转生附加））+图鉴附加
     */
    static getAttack(roleData: cfg.role, levelData: RoleLevel, rebirthData: cfg.rebirth, addition: { [key: string]: number }): number {
        let value: number;
        value = (levelData.attack * roleData.attackRate * (1 + rebirthData.attack));
        value += (addition.attack);
        return utils.toInt(value * shift_config.role_shift);
    }

    /**
     * 实际防御力=（当前角色当前等级防御力*（1+转生附加））+图鉴附加
     */
    static getDefence(roleData: cfg.role, levelData: RoleLevel, rebirthData: cfg.rebirth, addition: { [key: string]: number }): number {
        let value: number;
        value = (levelData.defence * roleData.defenceRate * (1 + rebirthData.defence));
        value += (addition.defence);
        return utils.toInt(value * shift_config.role_shift);
    }

    /**
     * 实际血量=（当前角色当前等级血量*（1+转生附加））+图鉴附加
     */
    static getHealth(roleData: cfg.role, levelData: RoleLevel, rebirthData: cfg.rebirth, addition: { [key: string]: number }): number {
        let value: number;
        value = (levelData.health * roleData.healthRate * (1 + rebirthData.health));
        value += (addition.health);
        return utils.toInt(value * shift_config.role_shift);
    }

    static getPower(attack: number, defence: number, health: number) {
        return utils.toInt((attack + defence) * shift_config.power_shift + health);
    }

    static isBoss(roleData: cfg.role): boolean {
        return roleData.id.indexOf('b') === 0;
    }

    static getBoss(sceneData: cfg.map_level) {
        if (sceneData.id > 100) return `b${sceneData.id - 100}`;
        return this.getMonsterByScene(sceneData);
    }

    static getMonsterByScene(sceneData: cfg.map_level) {
        var monsters = sceneData.monsters as unknown as { [key: string]: number };

        var sum: number = 0;
        for (var i in monsters) {
            sum += monsters[i] ?? 0;
        }

        // console.log('monsters probability sum', sum);
        let random: number = utils.toInt(Math.random() * sum);
        let rate: number = 0;
        for (let i in monsters) {
            rate += monsters[i] ?? 0;
            if (random < rate) {
                return i;
            }
        }
        return null;
    }

    static getMonsterListByScene(sceneData: cfg.map_level): string[] {
        const maxCount = 3;
        const maxAttempts = 1000; // 最大循环次数，防止死循环

        var monsters = sceneData.monsters as unknown as { [key: string]: number };

        const monsterEntries = Object.keys(monsters).map(key => ({ key, value: monsters[key] }));
        if (monsterEntries.length === 0) return []; // 如果没有怪物，直接返回空数组

        // 使用 Fisher-Yates 洗牌算法打乱数组
        for (let i = monsterEntries.length - 1; i > 0; i--) {
            const randomIndex = utils.toInt(Math.random() * (i + 1));
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