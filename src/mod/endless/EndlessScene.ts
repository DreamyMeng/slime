const { regClass } = Laya;
import { Main } from "../../ui/Main";
import * as utils from "../../core/utils";
import * as cfg from "../../table/schema";
import { color_config, Config, xinximoban } from "../../core/config";
import { RoleView } from "../../ui/RoleView";
import { SkillView } from "../../ui/SkillView";
import { deleteSave, SaveData_Endless, saveGame } from "./save";
import { Battle } from "../../core/battle";
import { Tujian } from "../../ui/Tujian";
import { PopUp } from "../../ui/PopUp";
import { drawGacha, spawnMonsters } from "./gacha";
import { MyButton } from "../../ui/MyButton";
import { MessageBox } from "../../ui/MessageBox";
import { getRoleLevelAttributes, RoleLevel } from "../../core/level";
import { isAndroid, playAd } from "../../platform";

@regClass()
export class EndlessScene extends Main {
    static data: SaveData_Endless;

    override onAwake(): void {
        Main.instance = this;

        this.battle = new Battle();
        this.list_guyou.scrollBar.autoHide = true;
        this.list_xuexi.scrollBar.autoHide = true;

        this.show_map();
        this.update_player();
        this.update_skill();

        this.btn_tujian.onClick = () => {
            this.Tujian.getComponent(Tujian).show();
        }

        this.btn_zhuansheng.onClick = () => {
            Laya.Scene.open("Login.ls");
        }

        this.List.array = utils.GameLog.get();
        utils.GameLog.instance.callback = () => {
            this.List.refresh();
            this.List.scrollTo(this.List.array.length - 1);
        };
        this.List.scrollBar.autoHide = true;

        this.Reward = this.getChildByName('Reward') as PopUp;

        this.Reward.ok.onClick = () => {
            EndlessScene.data.refresh--;
            this.show_rewards();
        }

        this.Reward.no.onClick = () => {
            this.Des.visible = !this.Des.visible;
            this.Reward.no.title.text = this.Des.visible ? '关闭'.toStr() : '详情'.toStr();
        }
        this.Des = this.Reward.getChildByName('Des') as Laya.Sprite;

        let vbox = this.Des.getChildByName('VBox') as Laya.VBox;
        for (let i = 1; i < 4; i++) {
            let label = vbox.getChildByName(`Label${i}`) as Laya.Label;
            this.labels.push(label);
        }

        (this.Reward.getChildByName('back') as MyButton).onClick = () => {
            this.Reward.close();
            this.battle_end();
        }
    }

    labels: Laya.Label[] = [];

    show_first(): void {
        this.Reward.open();
        this.Reward.ok.visible = false;
        this.Reward.no.visible = false;

        var list = spawnMonsters(1);
        list.forEach((data, key) => {
            let btn = this.Reward.getChildByName(`${key}`) as MyButton;

            let roleData = Config.table.Tbrole.get(data);
            let roleName = Main.getRoleName(roleData);
            btn.title.text = roleName.replace('·', '\n·\n');
            btn.onClick = () => {
                this.Reward.close();
                EndlessScene.data.id = roleData.id;
                EndlessScene.data.roles[roleData.id] = 1;
                MessageBox.tip("获得".toStr() + `:${roleName}`, false);
                this.update_player();
                this.update_skill();
                this.battle_end();
            }

        });
    }

    Reward: PopUp;
    Des: Laya.Sprite;
    show_rewards(): void {
        this.Reward.open();
        this.Reward.ok.visible = true;
        this.Reward.no.visible = true;
        this.Reward.ok.tip.text = EndlessScene.data.refresh > 0 ? "剩余次数:".toStr() + `${EndlessScene.data.refresh}` : "";
        this.Reward.ok.active = EndlessScene.data.refresh > 0;
        this.Reward.no.title.text = this.Des.visible ? '关闭'.toStr() : '详情'.toStr();

        drawGacha(EndlessScene.data).forEach((data, key) => {
            let btn = this.Reward.getChildByName(`${key}`) as MyButton;
            this.labels[key].text = "";
            if (data.type === 'skill') {
                let skillData = data.value;
                btn.title.text = "技能".toStr() + "\n\n" + skillData.name.toStr();
                btn.onClick = () => {
                    this.Reward.close();
                    EndlessScene.data.skills.push(skillData.id);
                    MessageBox.tip("习得：".toStr() + `${skillData.name.toStr()}`, false);
                    this.update_skill();
                    this.battle_end();
                }
                this.labels[key].text = `<font color='#ffe900' size=40>${skillData.name.toStr()}</font>：${skillData.description.toStr()}`
            }
            else if (data.type === 'role') {
                let roleName = Main.getRoleName(data.value);
                btn.title.text = roleName.replace('·', '\n·\n');
                btn.onClick = () => {
                    this.Reward.close();
                    EndlessScene.data.id = data.value.id;
                    EndlessScene.data.roles[data.value.id] = 1;
                    MessageBox.tip("获得".toStr() + `:${roleName}`, false);
                    this.update_player();
                    this.update_skill();
                    this.battle_end();
                }
            }
            else if (data.type === 'level') {
                btn.title.text = "等级".toStr() + ` +${data.value}`;
                btn.onClick = () => {
                    this.Reward.close();
                    EndlessScene.data.level += data.value;
                    MessageBox.tip(btn.title.text, false);
                    this.update_player();
                    this.battle_end();
                }
            }
            else if (data.type === 'refresh') {
                btn.title.text = "刷新".toStr() + ` +${data.value}`;
                btn.onClick = () => {
                    this.Reward.close();
                    EndlessScene.data.refresh += data.value;
                    MessageBox.tip(btn.title.text, false);
                    this.battle_end();
                }
            }
        });
    }

    override update_player(): void {
        let playerData = EndlessScene.data;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
        let levelData: RoleLevel = getRoleLevelAttributes(playerData.level);
        let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(0);
        let addition = Main.getAddition(playerData.roles);
        let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
        let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
        let health = Main.getHealth(roleData, levelData, rebirthData, addition);
        let power = Main.getPower(attack, defence, health);
        let roleName = Main.getRoleName(roleData);

        this.label_1.text = "种族:".toStr() + `${roleName}`
            + `\n${"战力:".toStr()}${utils.getValueStr(power)}`
            + `\n${"等级:".toStr()}${playerData.level}`
            + `\n${"攻击:".toStr()}<font color='#DCDCDC'>${utils.getValueStr(attack)}</font>`
            + `\n${"防御:".toStr()}<font color='#DCDCDC'>${utils.getValueStr(defence)}</font>`
            + `\n${"血量:".toStr()}<font color='#DCDCDC'>${utils.getValueStr(health)}</font>`;

        this.player0.getComponent(RoleView).show(playerData.id, playerData.level, power);
        this.Player.getComponent(RoleView).show(playerData.id, playerData.level);

        utils.GameLog.log(xinximoban.zhandouli.toStr().replace('*', utils.getValueStr(power)), false);
    }

    override update_skill(): void {
        let playerData = EndlessScene.data;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);

        this.list_guyou.renderHandler?.clear();
        this.list_xuexi.renderHandler?.clear();

        this.list_guyou.array = roleData.skills;
        this.list_guyou.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(SkillView).show(roleData.skills[index]);
        }, null, false);

        let list = playerData.skills;
        this.list_xuexi.array = list;
        this.list_xuexi.renderHandler = Laya.Handler.create(this, (item: Laya.Sprite, index: number) => {
            item.getComponent(SkillView).show(list[index]);
        }, null, false);
    }

    getLevelScale(level: number): number {
        // 更慢的阶梯强化：前期极慢，后期逐步加快
        // 例如：scale = 1 + Math.pow(level - 1, 1.2) * 0.015
        return 1 + Math.pow(Math.max(0, level - 1), 1.2) * 0.03;
    }

    override update_map(): void {
        let mapLevel = ++EndlessScene.data.curScene;
        const scale = this.getLevelScale(mapLevel);
        this.label_titile.text = "第*层".toStr().replace('*', utils.numberToChinese(mapLevel));

        utils.GameLog.log(xinximoban.shenru.toStr().replace('*', utils.numberToChinese(mapLevel)), false);

        var list = spawnMonsters(mapLevel);
        this.monster0.getComponent(RoleView).init(scale, list[0], mapLevel);
        this.monster1.getComponent(RoleView).init(scale, list[1], mapLevel);
        this.monster2.getComponent(RoleView).init(scale, list[2], mapLevel);

        let str = xinximoban.qianjin.toStr();
        list.forEach((id, index) => {
            str = str.replace(`{${index}}`, Main.getRoleName(Config.table.Tbrole.get(id)));
        });
        utils.GameLog.log(str, false);

        if (EndlessScene.data.isNew) {
            EndlessScene.data.isNew = false;
            EndlessScene.data.curScene = 0;
            this.show_first();
        }
    }

    override show_battle(id: string, level: number, isBoss: boolean): void {
        this.Map.visible = false;
        this.Battle.visible = true;
        this.init_battle(id, level, true);
        this.battle.start(); // 开始战斗
    }

    private init_battle(id: string, level: number, isBoss: boolean): void {
        let playerData = EndlessScene.data;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
        let levelData: RoleLevel = getRoleLevelAttributes(playerData.level);
        let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(0);
        let addition = Main.getAddition(playerData.roles);
        let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
        let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
        let health = Main.getHealth(roleData, levelData, rebirthData, addition);

        this.battle.player.init(attack, defence, health, roleData.skills.concat(playerData.skills));

        const scale = this.getLevelScale(playerData.curScene);
        roleData = Config.table.Tbrole.get(id);
        levelData = getRoleLevelAttributes(level);
        attack = utils.toInt(levelData.attack * roleData.attackRate * scale);
        defence = utils.toInt(levelData.defence * roleData.defenceRate * scale);
        health = utils.toInt(levelData.health * roleData.healthRate * scale);

        this.Enemy.getComponent(RoleView).show_skin(isBoss);
        this.battle.bossHp.bg.visible = isBoss;
        this.battle.enemy.init(attack, defence, health, roleData.skills, isBoss);
    }

    curEndlessData: SaveData_Endless;

    override deal_battle_result(): void {
        // 处理胜利失败逻辑
        if (this.battle.draw) {
            // 处理平局逻辑
            console.log('the battle is a draw!');
            MessageBox.tip("大战100回合，精疲力尽了！");
            EndlessScene.data.curScene--;
            this.battle_end();
        } else {
            if (this.battle.player.isAlive()) {
                // if (EndlessScene.data.refresh < 3) EndlessScene.data.refresh++;
                Laya.SoundManager.playSound(Config.sounds.get("win"));
                this.show_rewards();
            } else {
                this.curEndlessData = JSON.parse(JSON.stringify(EndlessScene.data));
                let tip = MessageBox.show(`你失败了！`.toStr(), () => {
                    this.fuhuo_tip.ok.active = false;
                    if (this.curEndlessData.revive <= 0) {
                        if (isAndroid()) playAd(1);
                        return;
                    }
                    // else {
                    this.curEndlessData.revive--;
                    this.fuhuo_success();
                    // }
                }, () => {
                    this.fuhuo_fail();
                }, true, false);
                this.fuhuo_tip = tip;
                tip.ok.title.text = '复活'.toStr();
                if (this.curEndlessData.revive <= 0) {
                    if (isAndroid()) tip.ok.title.text = '观看广告'.toStr();
                    else tip.ok.active = false;
                } else {
                    tip.ok.active = true;
                    tip.ok.tip.text = "剩余次数:".toStr() + `${this.curEndlessData.revive}`;
                }

                deleteSave('endless');
                Laya.SoundManager.playSound(Config.sounds.get("die"));
            }
        }

        Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
    }

    override fuhuo_success(): void {
        EndlessScene.data = this.curEndlessData;
        MessageBox.tip(`<font color='^'>你复活了</font>`.toStr().replace('^', color_config.xinximoban.huixue), false);
        Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
        EndlessScene.data.curScene--;
        this.battle_end();
        if (this.fuhuo_tip) {
            this.fuhuo_tip.close(() => {
                this.fuhuo_tip.destroy();
                this.fuhuo_tip = null;
            });
        }
    }

    override fuhuo_fail(): void {
        if (this.fuhuo_tip) {
            this.fuhuo_tip.close(() => {
                this.fuhuo_tip.destroy();
                this.fuhuo_tip = null;
            });
        }
        Laya.Scene.open("Login.ls");
    }

    battle_end(): void {
        utils.GameLog.log(xinximoban.zhandou.jieshu);
        this.show_map();
        saveGame('endless', EndlessScene.data);
    }
}