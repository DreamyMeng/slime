import { Config, killCount } from "../core/config";
import { Save } from "../core/save";
import { achieve } from "../table/schema";
import { Main } from "./Main";
import { MessageBox } from "./MessageBox";
import { MyButton } from "./MyButton";
import { Tujian } from "./Tujian";

const { regClass } = Laya;

@regClass()
export class Chengjiu extends Laya.Script {
    declare owner: MyButton;
    private data: achieve;

    onAwake(): void {
        // 领奖
        this.owner.onClick = () => {
            Chengjiu.reward(this.data);
            Main.instance.Tujian.getComponent(Tujian).show(false);
        }
    }

    show(id: number): void {
        let data = Config.table.Tbachieve.get(id);
        this.data = data;
        let frame = this.owner.getChildByName('Frame');
        let label = frame.getChildByName('Title') as Laya.Label;
        let tip = frame.getChildByName('Tip') as Laya.Label;
        let cur = Chengjiu.getCount(data);
        let max = data.count;
        let str;
        if (cur < max) {
            str = `(${cur}/${max})`;
            tip.color = '#6AB548';
        } else {
            str = '完成';
            tip.color = '#c58237';
        }
        label.text = data.description;
        tip.text = str;
        this.owner.tip.text = data.rewardStr;
        let state = Save.data.game.achieves[id];
        if (state === 1) {
            this.owner.title.text = "领取奖励";
            this.owner.active = true;
        } else {
            if (state === 2) this.owner.title.text = "已领取";
            else this.owner.title.text = "未完成";
            this.owner.active = false;
        }
    }

    static reward(data: achieve): void {
        Save.data.game.achieves[data.id] = 2;

        if (data.rewardType === 'random') {
            var lockList = Config.table.Tbrole.getDataList().filter((role) => {
                return !Save.data.game.roles[role.id];
            });
            if (lockList.length > 0) {
                var role = lockList[Math.floor(Math.random() * lockList.length)];
                Main.unlockRole(role.id);
            } else {
                MessageBox.tip("所有图鉴已解锁");
            }
        }
        else {
            MessageBox.tip(data.rewardStr);
            Save.data.game.rewards[data.rewardType]++;
        }
    }

    static getCount(item: achieve): number {
        if (item.type === 'map') { return Save.data.player.maxScene; }
        if (item.type === 'rebirth') { return Save.data.game.rebirth; }
        if (item.type === 'kill') { return Save.data.game.kills[item.target]; }
        return 0;
    }

    static addCount(type: string, target?: string) {
        let achieves = Config.table.Tbachieve.getDataList();
        let achievesData = Save.data.game.achieves;

        if (target) {
            // 图鉴解锁
            Save.data.game.kills[target]++;
            var role = Config.table.Tbrole.get(target);
            if (role.rare < 4 && !Save.data.game.roles[target]) {
                if (Save.data.game.kills[target] >= killCount[role.rare - 1]) {
                    Main.unlockRole(target);
                }
            }
        }

        achieves.forEach((item) => {
            if (achievesData[item.id] > 0) return;
            if (item.type === type) {
                if ((type === 'map' && item.count <= Save.data.player.maxScene)
                    || (type === 'rebirth' && item.count <= Save.data.game.rebirth
                        || (target && type === 'kill' && item.target === target && item.count <= Save.data.game.kills[target]))) {
                    achievesData[item.id] = 1;
                    MessageBox.show(`达成：${item.description}`, null, null, false);
                }
            }
        });
    }
}