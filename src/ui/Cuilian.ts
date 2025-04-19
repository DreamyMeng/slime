import { Config, shuxing_config } from "../core/config";
import { PopUp } from "./PopUp";
import * as cfg from "../table/schema";
import * as utils from "../core/utils";
import { Save } from "../core/save";
import { Main } from "./Main";
import { MessageBox } from "./MessageBox";

const { regClass } = Laya;

@regClass()
export class Cuilian extends Laya.Script {
    declare owner: PopUp;
    static level: number = 10;
    refined: { [key: string]: number };

    show(): void {
        let playerData = Save.data.player;
        this.refined = this.refining();
        (this.owner.getChildByName('list_shuxing') as Laya.List).dataSource = Object.keys(playerData.relation).map(key => {
            const typedKey = key as keyof typeof shuxing_config;
            let value = this.refined[key] - playerData.relation[key];
            let str = "";
            if (value > 0) str = `<font color=green>+${utils.getValueStr(value)}</font>`;
            else if (value < 0) str = `<font size=18 color=red>-${utils.getValueStr(Math.abs(value))}</font>`;

            return `${shuxing_config[typedKey]}:<font color='#AFAFAF'>${utils.getValueStr(playerData.relation[key])}</font> ${str}`;
        });

        this.owner.open();
    }

    onAwake(): void {
        this.owner.Label.text = "是否消耗" + Cuilian.level + "级进行淬炼，淬炼后生物属性向当前物种靠拢。";
        this.owner.ok.onClick = () => {
            let playerData = Save.data.player;
            playerData.level -= Cuilian.level;
            playerData.relation = this.refined;
            Main.instance.update_player();
            this.owner.close();
            MessageBox.tip(`精炼成功，属性向拟态生物靠拢。`);
            Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
            Save.saveGame();
        }
        this.owner.no.onClick = () => {
            this.owner.close();
        }
    }

    refining(): { [key: string]: number } {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
        var sr = playerData.relation;
        var cr = roleData.relations as unknown as { [key: string]: number };
        var keys = Object.keys(sr);
        var all = 0;
        keys.forEach((key) => {
            all += sr[key];
        });

        var relation: { [key: string]: number } = {};
        keys.forEach((key) => {
            var v1: number = 0, v2: number = 0, v3: number = 0;
            var s = sr[key];
            var c = cr[key] ?? 0;
            if ((s / all) - (c * 3) > 0) {
                v1 = -0.1;
            }
            if ((s / all) - (c * 0.9) < 0) {
                v1 = 0.1;
            }
            if (s - (c * roleData.race * 2) < 0) {
                v2 = 0.1;
            }
            if (c == 0) {
                v3 = -0.1;
            }
            relation[key] = utils.toInt((v1 + v2 + v3) * s) + s;
        });

        return relation;
    }
}