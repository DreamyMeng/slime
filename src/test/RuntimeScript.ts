const { regClass } = Laya;
import { RuntimeScriptBase } from "./RuntimeScript.generated";

@regClass()
export class RuntimeScript extends RuntimeScriptBase {
    onClick: () => void; // 新增点击事件回调
    private isPressed: boolean = false; // 新增按压状态标记

    onAwake(): void {
        // 添加事件监听
        this.on(Laya.Event.MOUSE_DOWN, this, this.onPress);
        this.on(Laya.Event.MOUSE_UP, this, this.onRelease);
        this.on(Laya.Event.MOUSE_OUT, this, this.onRelease);

        this.Label.text = "RuntimeScript";
        this.onClick = () => {
            console.log("RuntimeScript");
        }
    }

    onDestroy(): void {
        // 移除事件监听
        this.off(Laya.Event.MOUSE_DOWN, this, this.onPress);
        this.off(Laya.Event.MOUSE_UP, this, this.onRelease);
        this.off(Laya.Event.MOUSE_OUT, this, this.onRelease);
    }

    private onPress(): void {
        this.isPressed = true;
        // 缩放动画
        Laya.Tween.to(this, { scaleX: 0.9, scaleY: 0.9 }, 100, Laya.Ease.quadIn);
    }

    private onRelease(): void {
        if (this.isPressed) {
            this.isPressed = false;
            // 碰撞检测判断是否有效点击
            if (this.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY)) {
                Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadOut, Laya.Handler.create(this, () => {
                    if (this.onClick) this.onClick();
                }));
                return;
            }
        }

        // 恢复动画
        Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 100);
    }
}