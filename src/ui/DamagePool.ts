import { getValueStr } from "../core/utils";
import { Main } from "./Main";
import { RoleView } from "./RoleView";

export class DamagePool {
    private static damageLabelPool: Laya.Label[] = [];

    private static getDamageLabel(): Laya.Label {
        let label = this.damageLabelPool.pop();
        if (!label) {
            label = new Laya.Label();
            label.bold = true;
            label.fontSize = 32;
            label.anchorX = 0.5;
            label.width = 300;
            label.align = "center";
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

    private static show(label: Laya.Label) {
        const duration = 1000; // 动画持续时间
        const y = label.y; // 初始位置
        label.alpha = 0; // 初始透明
        // label.fontSize = 32;
        // 渐显
        Laya.Tween.to(label, { alpha: 1 }, 200);
        // 向上移动 + 缩小
        Laya.Tween.to(label, { y: y - 50, scale: 1.5 }, duration / 2, null, Laya.Handler.create(this, () => {
            // 继续移动 + 缩小
            Laya.Tween.to(label, { y: y - 100, scale: 0.5, alpha: 0 }, duration / 2, null, Laya.Handler.create(this, () => {
                DamagePool.recycleDamageLabel(label); // 动画结束后移除
            }));
        }));
    }

    static showDamage(value: number, role: RoleView) {
        const label = this.getDamageLabel();
        label.text = `-${getValueStr(-value)}`;
        label.color = "#ee123d";
        label.pos(role.original_x, role.original_y - 80);
        this.show(label);
    }

    static showHeal(value: number, role: RoleView) {
        const label = this.getDamageLabel();
        label.text = `+${getValueStr(value)}`;
        label.color = "#12ee64";
        label.pos(role.original_x, role.original_y);
        const x = label.x; // 初始位置
        label.x = x + (Math.random() * 100 - 50); // 轻微位置随机
        this.show(label);
    }

    static showDodge(role: RoleView) {
        const label = this.getDamageLabel();
        label.text = "闪避".toStr();
        label.color = "#12eee0";
        label.pos(role.original_x, role.original_y);
        // label.fontSize = 24;
        const bounceHeight = 30;
        const duration = 600; // 动画持续时间
        const x = label.x; // 初始位置
        const y = label.y; // 初始位置
        label.x = x + (Math.random() * 100 - 50); // 轻微位置随机
        label.y = y;
        label.alpha = 0; // 初始透明

        // 初级闪烁
        Laya.Tween.to(label, { alpha: 1 }, 200, null, null, 0);
        Laya.Tween.to(label, { alpha: 0.8 }, 100, null, null, 200);
        Laya.Tween.to(label, { alpha: 1 }, 100, null, null, 300);

        // 第一次弹跳
        Laya.Tween.to(label, {
            y: y - bounceHeight,
            scale: 1.2
        }, duration / 4, null, Laya.Handler.create(this, () => {
            // 第二次弹跳
            Laya.Tween.to(label, {
                y: y - bounceHeight / 2,
                scale: 1.0
            }, duration / 4, null, Laya.Handler.create(this, () => {
                // 第三次弹跳
                Laya.Tween.to(label, {
                    y: y - 10,
                    scale: 0.8,
                    alpha: 0
                }, duration / 2, null, Laya.Handler.create(this, () => {
                    DamagePool.recycleDamageLabel(label); // 动画结束后移除
                }));
            }));
        }
        ), 400);
    }

    static showBlock(role: RoleView) {
        const label = this.getDamageLabel();
        label.text = "格挡".toStr();
        label.color = "#eee712";
        label.pos(role.original_x, role.original_y);
        // label.fontSize = 28;
        const duration = 1000; // 动画持续时间
        const x = label.x; // 初始位置
        const y = label.y; // 初始位置
        label.x = x + (Math.random() * 100 - 50); // 轻微位置随机
        label.y = y;
        label.alpha = 0; // 初始透明

        // 初始渐显
        Laya.Tween.to(label, { alpha: 1 }, 300);

        // 缓慢上浮
        Laya.Tween.to(label, {
            y: y - 80,
            scale: 1.2
        }, duration / 2, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(label, {
                y: y - 100,
                scale: 1.0,
                alpha: 0
            }, duration / 2, null, Laya.Handler.create(this, () => {
                DamagePool.recycleDamageLabel(label); // 动画结束后移除
            }));
        }));
    }
}