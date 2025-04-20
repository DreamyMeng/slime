const { regClass } = Laya;
import { Config } from "../core/config";
import { MyButtonBase } from "./MyButton.generated";

@regClass()
export class MyButton extends MyButtonBase {
    image: Laya.Image;
    title: Laya.Label;
    tip: Laya.Label;
    onClick: () => void; // 新增点击事件回调
    private isPressed: boolean = false; // 新增按压状态标记

    onAwake(): void {
        this.image = this.getChildByName("Image") as Laya.Image;
        this.title = this.image.getChildByName("Title") as Laya.Label;
        this.tip = this.getChildByName("Tip") as Laya.Label;

        // 添加事件监听
        this.image.on(Laya.Event.MOUSE_DOWN, this, this.onPress);
        this.image.on(Laya.Event.MOUSE_UP, this, this.onRelease);
        this.image.on(Laya.Event.MOUSE_OUT, this, this.onRelease);

        this.originalColor = this.image.color; // 记录原始颜色
    }

    onDestroy(): void {
        // 移除事件监听
        this.image.off(Laya.Event.MOUSE_DOWN, this, this.onPress);
        this.image.off(Laya.Event.MOUSE_UP, this, this.onRelease);
        this.image.off(Laya.Event.MOUSE_OUT, this, this.onRelease);
    }

    onEnable(): void {
        this.image.disabled = false; // 启用按钮
    }

    onDisable(): void {
        this.image.disabled = true; // 禁用按钮
    }

    color: string = '#FF2929';
    private originalColor: string; // 记录原始颜色

    private onPress(): void {
        this.isPressed = true;
        this.image.color = this.color; // 按下时改变颜色
        // 缩放动画
        Laya.Tween.to(this.image, { scaleX: 0.9, scaleY: 0.9 }, 100, Laya.Ease.quadIn);
        Laya.SoundManager.playSound(Config.sounds.get("ui_anniu"));
    }

    private onRelease(): void {
        this.image.color = this.originalColor; // 恢复原始颜色

        if (this.isPressed) {
            this.isPressed = false;
            // 碰撞检测判断是否有效点击
            if (this.image.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY)) {
                Laya.SoundManager.playSound(Config.sounds.get("ui_anniu2"));
                Laya.Tween.to(this.image, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadOut, Laya.Handler.create(this, () => {
                    if (this.onClick) this.onClick();
                }));
                return;
            }
        }

        // 恢复动画
        Laya.Tween.to(this.image, { scaleX: 1, scaleY: 1 }, 100);
    }
}