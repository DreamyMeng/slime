import { Main } from "./Main";
import { RoleView } from "./RoleView";

export class DamagePool {
    private static damageLabelPool: Laya.Label[] = [];

    private static getDamageLabel(): Laya.Label {
        let label = this.damageLabelPool.pop();
        if (!label) {
            label = new Laya.Label();
            label.bold = true;
            label.fontSize = 24;
            label.anchorX = 0.5;
            label.anchorY = 0.5;
        }
        label.visible = true;
        label.alpha = 1;
        label.scale(1, 1);
        Main.instance.Damages.addChild(label);
        return label;
    }

    static recycleDamageLabel(label: Laya.Label) {
        label.removeSelf();
        label.visible = false;
        this.damageLabelPool.push(label);
    }

    private static show(label: Laya.Label, role: RoleView, customOffset = true) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 10;
        const offsetX = customOffset ? Math.cos(angle) * distance : 0;
        const offsetY = customOffset ? Math.sin(angle) * distance : 0;

        label.pos(role.original_x + offsetX, role.original_y + offsetY);

        // 向上飘 + 缩放 + 淡出动画
        Laya.Tween.to(
            label,
            {
                scaleX: 1.5,
                scaleY: 1.5,
                y: label.y - 50
            },
            100,
            Laya.Ease.backOut,
            Laya.Handler.create(this, () => {
                Laya.Tween.to(
                    label,
                    {
                        scaleX: 1,
                        scaleY: 1,
                        alpha: 0
                    },
                    400,
                    Laya.Ease.backIn,
                    Laya.Handler.create(this, () => this.recycleDamageLabel(label))
                );
            })
        );
    }

    static showDamage(value: number, role: RoleView) {
        const label = this.getDamageLabel();
        label.text = value.toString();
        label.color = "#ff0000";
        this.show(label, role);
    }

    static showHeal(value: number, role: RoleView) {
        const label = this.getDamageLabel();
        label.text = "+" + value;
        label.color = "#00ff00";
        this.show(label, role);
    }

    static showStatus(type: Status, role: RoleView) {
        const label = this.getDamageLabel();

        switch (type) {
            case Status.Block:
                label.text = "格挡";
                label.color = "#0000ff";
                break;
            case Status.Crit:
                label.text = "暴击";
                label.color = "#ff9900";
                break;
            case Status.Miss:
                label.text = "闪避";
                label.color = "#00ccff";
                break;
            case Status.Hit:
                label.text = "必中";
                label.color = "#ffff00";
                break;
        }

        label.pos(role.original_x, role.original_y);

        // 放大缩小动画
        Laya.Tween.to(
            label,
            { scaleX: 1.5, scaleY: 1.5 },
            200,
            Laya.Ease.backOut,
            Laya.Handler.create(this, () => {
                Laya.Tween.to(label, { scaleX: 1, scaleY: 1 }, 800, Laya.Ease.backIn);
            })
        );

        // 上升并淡出动画
        Laya.Tween.to(
            label,
            { y: role.original_y - 20, alpha: 0 },
            1200,
            Laya.Ease.sineIn,
            Laya.Handler.create(this, () => this.recycleDamageLabel(label))
        );
    }
}

export enum Status {
    Crit, Miss, Block, Hit
}
