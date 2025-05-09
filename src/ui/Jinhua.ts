import * as cfg from "../table/schema";
import { color_config, Config, xinximoban } from "../core/config";
import { Save } from "../core/save";
import { getValueStr, toPerStr } from "../core/utils";
import { Main } from "./Main";
import { MessageBox } from "./MessageBox";
import { MyButton } from "./MyButton";
import { PopUp } from "./PopUp";
import { isAndroid, playAd } from "../platform";
import { getRoleLevelAttributes, RoleLevel } from "../core/level";

const { regClass } = Laya;

@regClass()
export class Jinhua extends Laya.Script {
    declare owner: PopUp;
    static instance: Jinhua;
    dingxiang: Laya.Sprite;
    ad: MyButton;
    static ad_rate: number = 0.05; // 广告奖励
    tab: Laya.Tab;

    onAwake(): void {
        Jinhua.instance = this;
        this.tab = this.owner.getChildByName('Tab') as Laya.Tab;
        this.tab.labels = `${'凡'.toStr()},${'灵'.toStr()},${'仙'.toStr()},${'神'.toStr()}`;

        this.tab.selectHandler = Laya.Handler.create(this, (index: number) => {
            if (index === this.curIndex) return;
            if (!this.isAd) {
                MessageBox.show('激活血脉'.toStr(), null, null, false);
                this.tab.selectedIndex = index;
            } else {
                this.curIndex = index;
                this.show_jinhua(index);
            }
        }, null, false);

        this.dingxiang = this.owner.getChildByName('dingxiang') as Laya.Sprite;
        this.dingxiang.visible = false; // 初始时隐藏

        this.owner.no.onClick = () => {
            this.owner.close();
            this.isAd = false;
        }
        this.owner.ok.onClick = () => {
            this.dingxiang.visible = !this.dingxiang.visible;
        }

        this.ad = this.owner.getChildByName('ad') as MyButton;
        if (isAndroid()) this.ad.tip.text = `看广告 +5%`.toStr();
        this.ad.onClick = () => {
            console.log('广告时刻');
            if (isAndroid()) {
                if (!playAd(2)) return;
                this.ad.active = false;
            }
            else {
                this.ad_success();
            }
        }
    }

    ad_load(): void {
        this.ad.active = true;
    }

    ad_success(): void {
        this.isAd = true;
        this.tab.visible = true;
        this.show(false);
    }

    isAd: boolean = false;

    show(isOpen: boolean = true): void {
        if (isOpen) this.owner.open();

        if (!isAndroid()) {
            this.ad.active = !this.isAd && Save.data.player.mimicry > 0;
            this.ad.tip.text = `+5% 次数:`.toStr() + (!this.isAd ? `${Save.data.player.mimicry}` : 0);
        }
        else this.ad.active = !this.isAd;
        this.owner.ok.active = Save.data.game.rebirth > 1;
        this.roles = this.list_jinhua();
        this.curIndex = 0;
        this.tab.visible = this.isAd;

        var quality_type = this.getMaxKey(Save.data.player.quality);
        if (quality_type === 'none') {
            this.curIndex = 0;
        } else if (quality_type === 'ling') {
            this.curIndex = 1;
        }
        else if (quality_type === 'xian') {
            this.curIndex = 2;
        }
        else if (quality_type === 'shen') {
            this.curIndex = 3;
        }

        this.show_jinhua(this.curIndex);
        this.tab.selectedIndex = this.curIndex;

        let list_dingxiang = this.dingxiang.getChildByName('list_dingxiang') as Laya.List;
        list_dingxiang.scrollBar.autoHide = true;
        list_dingxiang.renderHandler?.clear();
        list_dingxiang.array = this.roles[4];
        list_dingxiang.renderHandler = Laya.Handler.create(this, (item: MyButton, index: number) => {
            let data = this.roles[4][index];
            (item.getChildByName('Title') as Laya.Label).text = Main.getRoleName(Config.table.Tbrole.get(data[0]));
            item.tip.text = `<font color='#ffffff' size=24>${"成功率:".toStr()}${toPerStr(data[1])}</font>`;
            item.onClick = () => {
                this.onClick(data[0], data[1]);
            }
        }, null, false);
    }

    roles: Array<[string, number][]> = [];
    curIndex: number = 0;

    show_jinhua(index: number): void {
        let list_role = this.owner.getChildByName('list_role') as Laya.List;
        list_role.renderHandler?.clear();
        list_role.array = this.roles[index];
        list_role.array.length = Math.min(this.roles[index].length, 6);
        list_role.renderHandler = Laya.Handler.create(this, (item: MyButton, i: number) => {
            let data = this.roles[index][i];
            item.title.text = Main.getRoleName(Config.table.Tbrole.get(data[0])) +
                `\n<font color='#ffffff' size=24>${"成功率:".toStr()}${toPerStr(data[1])}</font>`;
            item.onClick = () => {
                this.onClick(data[0], data[1]);
            }
        }, null, false);
    }

    onClick(id: string, rate: number): void {
        let playerData = Save.data.player;
        if (!isAndroid() && this.isAd) {
            this.isAd = false;
            playerData.mimicry = 0;
        } else this.isAd = false;

        if (Math.random() < rate) {
            let old = Jinhua.getPower();
            Jinhua.mimicry(id);
            let power = Jinhua.getPower() - old;
            let str = '';
            if (power < 0) str = `<font color=red>-${getValueStr(Math.abs(power))}</font>`;
            else str = `<font color=green>+${getValueStr(power)}</font>`;
            MessageBox.show("战力：".toStr() + `${str}`, null, null, false);
            Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
            this.owner.close();
        } else {
            const siwang = 0.15;
            if (Math.random() < siwang) {
                Main.instance.player_dead();
                MessageBox.tip(xinximoban.jinhua.shibai1.toStr().replace('^', color_config.xinximoban.shanghai), false);
                this.owner.close();
            } else {
                playerData.level = Math.max(1, playerData.level - 10);
                MessageBox.tip(xinximoban.jinhua.shibai2.toStr().replace('^', color_config.xinximoban.shanghai), false);
                this.show(false);
                if (playerData.level <= 10) {
                    this.owner.close();
                }
            }
        }

        Main.instance.update_player();
        Main.instance.update_skill();
        Save.saveGame();
    }

    static getPower(): number {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
        let levelData: RoleLevel = getRoleLevelAttributes(playerData.level);
        let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(Save.data.game.rebirth);
        let addition = Main.getAddition();
        let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
        let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
        let health = Main.getHealth(roleData, levelData, rebirthData, addition);
        return Main.getPower(attack, defence, health);
    }

    static mimicry(id: string) {
        var roleData = Config.table.Tbrole.get(id);
        if (!roleData) {
            MessageBox.show('角色不存在:' + id, null, null, false);
            return;
        }
        const relation = 1.2;
        const noRelation = 0.8;
        let playerData = Save.data.player;
        var cr = roleData.relations as unknown as { [key: string]: number };
        var sr = playerData.relation;
        var keys = Object.keys(sr);
        keys.forEach((key) => {
            if (cr[key]) sr[key] = Math.floor(sr[key] * relation);
            else sr[key] = Math.floor(sr[key] * noRelation);
        });
        playerData.id = id;
        playerData.forget = 0;
        playerData.revive = 3;
        playerData.mimicry = 1;

        if (!Save.data.game.roles[id]) {
            Main.unlockRole(id);
        }

        let show = MessageBox.show(xinximoban.jinhua.chenggong.toStr().replace('*', Main.getRoleName(roleData)).replace('^', color_config.xinximoban.huixue), () => {
            playerData.skills = [];
            if (Save.data.game.rebirth >= 3) playerData.skills.push("jiexi");
            Main.instance.update_skill();
        }, () => {
            let selfSkills = Config.table.Tbrole.get(id).skills;
            playerData.skills = playerData.skills.filter(skill => selfSkills.indexOf(skill) === -1);
            Main.instance.update_skill();
        });
        show.ok.title.text = '遗忘技能'.toStr();
        show.no.title.text = '保留技能'.toStr();
    }

    list_jinhua(): Array<[string, number][]> {
        let playerData = Save.data.player;
        var rare = Config.table.Tbrole.get(playerData.id).rare;
        var list = Config.table.Tbrole.getDataList();

        var sr = playerData.relation;
        var keys = Object.keys(sr);
        var all = 0;
        keys.forEach((key) => {
            all += sr[key];
        });

        var map1: Map<string, number> = new Map<string, number>();
        var map2: Map<string, number> = new Map<string, number>();
        var map3: Map<string, number> = new Map<string, number>();
        var map4: Map<string, number> = new Map<string, number>();
        var map5: Map<string, number> = new Map<string, number>();

        list.forEach((roleData) => {
            if (Main.isBoss(roleData) && !Save.data.game.rewards['boss']) return;
            if (roleData.rare <= rare) return;
            var num = 1;
            var cr = roleData.relations as unknown as { [key: string]: number };
            keys.forEach((key) => {
                if (cr[key] && cr[key] > 0) {
                    var v = sr[key] / (cr[key] * roleData.race);
                    if (v > 1.2) v = 1.2;
                    if (v < 0.3) v = 0.3;
                    num *= v;
                }
            });
            keys.forEach((key) => {
                if (cr[key] && cr[key] > 0 && all > 0) {
                    var v = (sr[key] / all) / cr[key];
                    if (v > 1) v = 1;
                    num *= v;
                }
            });

            if (this.isAd) num += Jinhua.ad_rate;
            if (roleData.qualityType === 'none') map1.set(roleData.id, Math.min(num, 1));
            else if (roleData.qualityType === 'ling') map2.set(roleData.id, Math.min(num, 1));
            else if (roleData.qualityType === 'xian') map3.set(roleData.id, Math.min(num, 1));
            else if (roleData.qualityType === 'shen') map4.set(roleData.id, Math.min(num, 1));
            if (Save.data.game.roles[roleData.id]) map5.set(roleData.id, Math.min(num + 0.05, 1));
        });

        let array = [];
        array.push(Array.from(map1).sort((a, b) => b[1] - a[1]));
        array.push(Array.from(map2).sort((a, b) => b[1] - a[1]));
        array.push(Array.from(map3).sort((a, b) => b[1] - a[1]));
        array.push(Array.from(map4).sort((a, b) => b[1] - a[1]));
        array.push(Array.from(map5).sort((a, b) => b[1] - a[1]));
        return array;
    }

    getMaxKey(data: { [key: string]: number }): string | null {
        // 获取所有键值对，并找到值最大的键
        if (getValueStr(data.ling) === getValueStr(data.xian) && getValueStr(data.ling) === getValueStr(data.shen)) return "none";

        let maxKey: string = "none";
        let maxValue: number = 0;

        for (const key in data) {
            if (key === "none") continue;
            if (data[key] > maxValue) {
                maxValue = data[key];
                maxKey = key;
            }
        }

        return maxKey;
    }
}