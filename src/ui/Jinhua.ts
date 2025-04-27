import * as cfg from "../table/schema";
import { color_config, Config, xinximoban } from "../core/config";
import { Save } from "../core/save";
import { getMaxKey, getValueStr, toPerStr } from "../core/utils";
import { Main } from "./Main";
import { MessageBox } from "./MessageBox";
import { MyButton } from "./MyButton";
import { PopUp } from "./PopUp";
import { isAndroid, playAd } from "../platform";

const { regClass } = Laya;

@regClass()
export class Jinhua extends Laya.Script {
    declare owner: PopUp;
    static instance: Jinhua;
    dingxiang: Laya.Sprite;
    ad: MyButton;
    static ad_rate: number = 0.05; // 广告奖励

    onAwake(): void {
        Jinhua.instance = this;

        this.dingxiang = this.owner.getChildByName('dingxiang') as Laya.Sprite;
        this.dingxiang.visible = false; // 初始时隐藏

        this.owner.no.onClick = () => {
            this.owner.close();
            this.isAd = false;
        }
        this.owner.ok.onClick = () => {
            this.dingxiang.visible = true;
        }

        this.ad = this.owner.getChildByName('ad') as MyButton;
        if (isAndroid()) this.ad.tip.text = `看广告 +5%`.toStr();
        this.ad.onClick = () => {
            console.log('广告时刻');
            if (isAndroid()) {
                this.ad.active = false;
                playAd(2);
            }
            else {
                this.isAd = true;
                this.show(false);
            }
        }
    }

    static ad_load(): void {
        this.instance.ad.active = true;
    }

    static ad_success(): void {
        this.instance.isAd = true;
        this.instance.show(false);
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

        let roles = this.list_jinhua();

        let list_role = this.owner.getChildByName('list_role') as Laya.List;
        list_role.renderHandler?.clear();
        list_role.array = roles[0];
        list_role.array.length = Math.min(roles[0].length, 6);
        list_role.renderHandler = Laya.Handler.create(this, (item: MyButton, index: number) => {
            let data = roles[0][index];
            item.title.text = Main.getRoleName(Config.table.Tbrole.get(data[0])) +
                `\n<font color='#ffffff' size=24>${"成功率:".toStr()}${toPerStr(data[1])}</font>`;
            item.onClick = () => {
                this.onClick(data[0], data[1]);
            }
        }, null, false);

        let list_dingxiang = this.dingxiang.getChildByName('list_dingxiang') as Laya.List;
        list_dingxiang.scrollBar.autoHide = true;
        list_dingxiang.renderHandler?.clear();
        list_dingxiang.array = roles[1];
        list_dingxiang.renderHandler = Laya.Handler.create(this, (item: MyButton, index: number) => {
            let data = roles[1][index];
            (item.getChildByName('Title') as Laya.Label).text = Main.getRoleName(Config.table.Tbrole.get(data[0]));
            item.tip.text = `<font color='#ffffff' size=24>${"成功率:".toStr()}${toPerStr(data[1])}</font>`;
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
            this.owner.close();
            let old = Jinhua.getPower();
            Jinhua.mimicry(id);
            let power = Jinhua.getPower() - old;
            let str = '';
            if (power < 0) str = `<font color=red>-${getValueStr(Math.abs(power))}</font>`;
            else str = `<font color=green>+${getValueStr(power)}</font>`;
            MessageBox.show("战力：".toStr() + `${str}`, null, null, false);
            Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
        } else {
            const siwang = 0.15;
            if (Math.random() < siwang) {
                Main.player_dead();
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
        let levelData: cfg.role_level = Config.table.Tbrole_level.get(playerData.level);
        let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(Save.data.game.rebirth);
        let addition = Main.getAddition();
        let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
        let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
        let health = Main.getHealth(roleData, levelData, rebirthData, addition);
        return Main.getPower(attack, defence, health);
    }

    static mimicry(id: string) {
        const relation = 1.2;
        const noRelation = 0.8;
        let playerData = Save.data.player;
        var roleData = Config.table.Tbrole.get(id);
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

        MessageBox.tip(xinximoban.jinhua.chenggong.toStr().replace('*', Main.getRoleName(roleData)).replace('^', color_config.xinximoban.huixue), false);
    }

    list_jinhua(): Array<[string, number][]> {
        let playerData = Save.data.player;
        var rare = Config.table.Tbrole.get(playerData.id).rare;
        var quality_type = getMaxKey(playerData.quality);
        var list = Config.table.Tbrole.getDataList();

        var sr = playerData.relation;
        var keys = Object.keys(sr);
        var all = 0;
        keys.forEach((key) => {
            all += sr[key];
        });

        var map: Map<string, number> = new Map<string, number>();
        var map2: Map<string, number> = new Map<string, number>();
        list.forEach((roleData) => {
            if (Main.isBoss(roleData) && Save.data.game.rewards['boss'] !== 2) return;
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
            if (roleData.qualityType === 'none' || roleData.qualityType === quality_type) map.set(roleData.id, Math.min(num, 1));
            if (Save.data.game.roles[roleData.id]) map2.set(roleData.id, Math.min(num + 0.05, 1));
        });

        let array = [];
        array.push(Array.from(map).sort((a, b) => b[1] - a[1]));
        array.push(Array.from(map2).sort((a, b) => b[1] - a[1]));

        return array;
    }
}