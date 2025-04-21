const { regClass, property } = Laya;

@regClass()
export class NewScript extends Laya.Script {
    declare owner: Laya.Sprite;

    onClick: () => void; // 新增点击事件回调
    private isPressed: boolean = false; // 新增按压状态标记

    onAwake(): void {
        // 添加事件监听
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onPress);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.onRelease);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.onRelease);

        // (this.owner.getChildByName('Label') as Laya.Label).text = "RuntimeScript 2";
        // this.onClick = () => {
        //     console.log("RuntimeScript 2");
        // }
    }

    onDestroy(): void {
        // 移除事件监听
        this.owner.off(Laya.Event.MOUSE_DOWN, this, this.onPress);
        this.owner.off(Laya.Event.MOUSE_UP, this, this.onRelease);
        this.owner.off(Laya.Event.MOUSE_OUT, this, this.onRelease);
    }

    private onPress(): void {
        this.isPressed = true;
        // 缩放动画
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 100, Laya.Ease.quadIn);
    }

    private onRelease(): void {
        if (this.isPressed) {
            this.isPressed = false;
            // 碰撞检测判断是否有效点击
            if (this.owner.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY)) {
                Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadOut, Laya.Handler.create(this, () => {
                    if (this.onClick) this.onClick();
                }));
                return;
            }
        }

        // 恢复动画
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 100);
    }
}