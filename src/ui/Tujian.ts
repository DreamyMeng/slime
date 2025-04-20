import { Config, killCount, shift_config, shuxing_config } from "../core/config";
import { Save } from "../core/save";
import * as utils from "../core/utils";
import { role } from "../table/schema";
import { Chengjiu } from "./Chengjiu";
import { Main } from "./Main";
import { Mingzi } from "./Mingzi";
import { PopUp } from "./PopUp";
import { SkillView } from "./SkillView";

const { regClass } = Laya;

@regClass()
export class Tujian extends Laya.Script {
    declare owner: PopUp;
    static instance: Tujian;

    onAwake(): void {
        Tujian.instance = this;
        this.owner.no.onClick = () => {
            Main.instance.update_skill();
            Main.instance.update_player();
            this.owner.close();
            Save.saveGame();
        }

        this.owner.ok.onClick = () => {
            let achieves = Config.table.Tbachieve.getDataList();
            achieves.forEach(data => {
                if (Save.data.game.achieves[data.id] === 1) {
                    Chengjiu.reward(data);
                }
            });

            Main.instance.Tujian.getComponent(Tujian).show(false);
        }
    }

    show(isOpen: boolean = true): void {
        if (isOpen) this.owner.open();

        let str: string = "";
        let count: number = 0;
        let achieves = Config.table.Tbachieve.getDataList();
        achieves.forEach(data => {
            if (Save.data.game.achieves[data.id] > 0) {
                count++;
            }
        });
        str += '成就完成率:' + utils.toPerStr(count / achieves.length);
        count = 0;
        let roles = Config.table.Tbrole.getDataList();
        roles.forEach(data => {
            if (Save.data.game.roles[data.id]) count++;
        });
        str += '\n图鉴完成率:' + utils.toPerStr(count / roles.length);
        this.owner.Label.text = str;

        let list_chengjiu = this.owner.getChildByName('list_chengjiu') as Laya.List;
        list_chengjiu.scrollBar.autoHide = true;

        list_chengjiu.renderHandler?.clear();
        list_chengjiu.array = achieves;
        list_chengjiu.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(Chengjiu).show(index + 1);
        }, null, false);

        let list_tujian = this.owner.getChildByName('list_tujian') as Laya.List;
        list_tujian.scrollBar.autoHide = true;
        list_tujian.renderHandler?.clear();
        list_tujian.array = roles;
        list_tujian.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(Mingzi).show(roles[index]);
        }, null, false);

        this.show_role(Config.table.Tbrole.get('h1'));
    }

    show_role(roleData: role): void {
        (this.owner.getChildByName('Name') as Laya.Text).text = Main.getRoleName(roleData);
        let lock = !Save.data.game.roles[roleData.id];
        let str = '';
        if (roleData.rare < 4 && lock) {
            str = `击杀解锁\n(${Save.data.game.kills[roleData.id]}/${killCount[roleData.rare - 1]})`;
        }
        if (Main.isBoss(roleData) && Save.data.game.rewards['boss'] === 0) {
            str = '无法拟态\n需成就解锁';
        }
        (this.owner.getChildByName('Lock') as Laya.Text).text = str;
        (this.owner.getChildByName('Chengzhang') as Laya.Text).text = `攻击成长:<font color='#78D658'>${roleData.attackRate}</font>\n防御成长:<font color='#78D658'>${roleData.defenceRate}</font>\n血量成长:<font color='#78D658'>${roleData.healthRate}</font>`;
        (this.owner.getChildByName('Jiacheng') as Laya.Text).text = `攻击:<font color='#ffffff'>${utils.getValueStr(roleData.attackAdd)}</font>\n防御:<font color='#ffffff'>${utils.getValueStr(roleData.defenceAdd)}</font>\n血量:<font color='#ffffff'>${utils.getValueStr(roleData.healthAdd)}</font>`;

        let list_shuxing = this.owner.getChildByName('list_shuxing') as Laya.List;
        var cr = roleData.relations as unknown as { [key: string]: number };
        var r = roleData.race * roleData.remain * shift_config.zhongzu_shift;
        let relations = [];
        for (let key in roleData.relations) {
            var v = utils.toInt((cr[key] ?? 0) * r);
            const typedKey = key as keyof typeof shuxing_config;
            if (v > 0) relations.push(`${shuxing_config[typedKey]}:<font color='#ffffff'>${lock ? '???' : utils.getValueStr(v)}</font>`);
        }
        list_shuxing.dataSource = relations;

        let list_skill = this.owner.getChildByName('list_skill') as Laya.List;
        list_skill.scrollBar.autoHide = true;
        list_skill.renderHandler?.clear();
        list_skill.dataSource = roleData.skills;
        list_skill.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(SkillView).show(roleData.skills[index]);
        }, null, false);
    }
}