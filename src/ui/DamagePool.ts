import { Main } from "./Main";
import { RoleView } from "./RoleView";

export class DamagePool {
    private static damageLabelPool: Laya.Label[] = [];
    private static damageDisplayOffset: number = 0; // 用于记录偏移量

    private static getDamageLabel(): Laya.Label {
        if (this.damageLabelPool.length > 0) {
            return this.damageLabelPool.pop();
        } else {
            const label = new Laya.Label();
            label.bold = true;
            label.fontSize = 24;

            Main.instance.Damages.addChild(label);

            return label; // 创建新的标签
        }
    }

    static recycleDamageLabel(label: Laya.Label) {
        this.damageLabelPool.push(label);
    }

    private static show(damageLabel: Laya.Label, role: RoleView) {
        damageLabel.alpha = 1;
        const character = role.owner;

        // 计算 X 坐标
        if (character.scaleX < 0) {
            damageLabel.x = role.original_x + character.x + (-character.width - damageLabel.width) / 2; // X轴中心
        } else {
            damageLabel.x = character.x + (character.width - damageLabel.width) / 2; // X轴中心
        }

        // 计算 Y 坐标，加入偏移量
        damageLabel.y = character.y + this.damageDisplayOffset;
        // 每次触发，偏移量增加（错开显示）
        this.damageDisplayOffset += Math.random() * 20 - 10;

        var that = this;
        // 创建动画序列
        Laya.Tween.to(
            damageLabel,
            { scaleX: 1.5, scaleY: 1.5 }, // 放大
            200,
            Laya.Ease.backOut,
            Laya.Handler.create(this, function () {
                Laya.Tween.to(
                    damageLabel,
                    { scaleX: 1, scaleY: 1, y: character.y - 100 + that.damageDisplayOffset, alpha: 0 }, // 缩小并向上移动，同时淡出
                    800,
                    Laya.Ease.backIn,
                    Laya.Handler.create(that, function () {
                        // 回收标签
                        DamagePool.recycleDamageLabel(damageLabel);

                        // 归零偏移量
                        that.damageDisplayOffset = 0;
                    })
                );
            })
        );
    }

    static showDamage(damage: number, role: RoleView) {
        const damageLabel = this.getDamageLabel();
        damageLabel.text = "-" + damage;
        damageLabel.color = "#ff0000";
        this.show(damageLabel, role);
    }

    static showHeal(damage: number, role: RoleView) {
        const damageLabel = this.getDamageLabel();
        damageLabel.text = "+" + damage;
        damageLabel.color = "#00ff00";
        this.show(damageLabel, role);
    }

    static showStatus(type: Status, role: RoleView) {
        var damageLabel = this.getDamageLabel();
        damageLabel.alpha = 1;

        if (type === Status.Block) {
            damageLabel.text = "格挡";
            damageLabel.color = "#0000ff";
        }
        else if (type === Status.Crit) {
            damageLabel.text = "暴击";
            damageLabel.color = "#ff0000";
        }
        else if (type === Status.Miss) {
            damageLabel.text = "闪避";
            damageLabel.color = "#00ff00";
        }
        else if (type === Status.Hit) {
            damageLabel.text = "必中";
            damageLabel.color = "#ffff00";
        }

        var character = role.owner;
        if (character.scaleX < 0)
            damageLabel.x = role.original_x + character.x + (-character.width - damageLabel.width) / 2; // X轴中心
        else
            damageLabel.x = character.x + (character.width - damageLabel.width) / 2; // X轴中心
        damageLabel.y = character.y + (character.height - damageLabel.height) / 2; // Y轴中心

        // 创建动画序列
        var that = this;
        Laya.Tween.to(damageLabel,
            { scaleX: 1.5, scaleY: 1.5 }, // 放大
            200,
            Laya.Ease.backOut,
            Laya.Handler.create(that, function () {
                Laya.Tween.to(damageLabel,
                    { scaleX: 1, scaleY: 1 },
                    800,
                    Laya.Ease.backIn
                );
            })
        );

        Laya.Tween.to(damageLabel,
            { y: character.y - 20 }, // 缩小并向上移动，同时淡出
            1200,
            Laya.Ease.sineIn,
            Laya.Handler.create(that, function () {
                damageLabel.alpha = 0;
                DamagePool.recycleDamageLabel(damageLabel);
            })
        );
    }

}

export enum Status {
    Crit, Miss, Block, Hit
}