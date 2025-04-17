const { regClass } = Laya;
import { PopUpBase } from "./PopUp.generated";

@regClass()
export class PopUp extends PopUpBase {
    open(): void {
        // 初始化弹出动画
        this.visible = true;
        this.scale(0, 0);
        this.alpha = 0;

        // 弹性弹出动画
        Laya.Tween.to(this,
            { scaleX: 1, scaleY: 1, alpha: 1 },
            300,
            Laya.Ease.backOut
        );
    }

    close(func?: Function): void {
        // 关闭动画
        Laya.Tween.to(this,
            { scaleX: 0, scaleY: 0, alpha: 0 },
            300,
            Laya.Ease.backOut,
            Laya.Handler.create(this, () => {
                if (func) func();
                else this.visible = false;
            })
        );
    }
}