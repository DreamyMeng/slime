export class CustomButton extends Laya.Sprite {
    private normalColor: string = "#FFFFFF"; // 正常状态颜色
    private pressedColor: string = "#CCCCCC"; // 按下状态颜色
    private isPressed: boolean = false;
    private label: Laya.Label;
    private normalScale: number = 1;
    private pressedScale: number = 0.9;

    constructor(width: number, height: number, text: string = "") {
        super();
        this.width = width;
        this.height = height;
        this.drawButton();

        // 创建按钮标题
        this.label = new Laya.Label();
        this.label.text = text;
        this.label.fontSize = 20;
        this.label.color = "#000000";
        this.label.align = "center";
        this.label.valign = "middle";
        this.label.width = width;
        this.label.height = height;
        this.addChild(this.label);

        // 添加事件监听
        this.on(Laya.Event.MOUSE_DOWN, this, this.onPress);
        this.on(Laya.Event.MOUSE_UP, this, this.onRelease);
        this.on(Laya.Event.MOUSE_OUT, this, this.onRelease);
    }

    private drawButton(): void {
        const color = this.isPressed ? this.pressedColor : this.normalColor;
        this.graphics.clear();
        this.graphics.drawRect(0, 0, this.width, this.height, color);
    }

    private onPress(): void {
        this.isPressed = true;
        this.drawButton();
        // 添加缩放动画
        Laya.Tween.to(this, { scaleX: this.pressedScale, scaleY: this.pressedScale }, 100, Laya.Ease.quadIn);
    }

    private onRelease(): void {
        if (this.isPressed) {
            this.isPressed = false;
            this.drawButton();
            // 恢复缩放动画
            Laya.Tween.to(this, { scaleX: this.normalScale, scaleY: this.normalScale }, 100, Laya.Ease.quadOut);
        }
    }

    // 设置按钮标题
    public setText(text: string): void {
        this.label.text = text;
    }
}