const { regClass, property } = Laya;

@regClass()
export class HPBar extends Laya.Script {
    declare owner: Laya.Sprite;
    @property({ type: Laya.Sprite })
    public bg: Laya.Sprite;
    @property({ type: Laya.Sprite })
    public bar: Laya.Sprite;
    private drawRect: Laya.DrawRectCmd;
    // 初始血条宽度（自动获取）
    private originalWidth: number;

    onAwake(): void {
        if (!this.bg) {
            this.bg = this.owner.addChild(new Laya.Sprite());
            this.bar = this.bg.addChild(new Laya.Sprite());

            this.bg.size(160, 16); // 血条宽度和高度
            this.bg.pos(35, 88); // 血条位置
            this.bar.size(158, 14); // 血条宽度和高度
            this.bar.pos(1, 1); // 血条位置
            this.bg.graphics.drawRect(0, 0, 1, 1, "rgba(255, 255, 255, 0)", "rgb(255, 255, 255)").percent = true;
            this.drawRect = this.bar.graphics.drawRect(0, 0, 1, 1, "rgb(255, 0, 0)");
            this.drawRect.percent = true;
        }

        this.originalWidth = this.bar.width;
        this.setValue(0, false); // 初始满血
    }

    /**
     * 设置血量百分比
     * @param percent 0-1之间的数值
     * @param smooth 是否使用平滑动画
     */
    setValue(percent: number, smooth: boolean = true): void {
        const targetWidth = this.originalWidth * Math.min(Math.max(percent, 0), 1);

        if (smooth) {
            Laya.Tween.to(this.bar, { width: targetWidth }, 200);
        } else {
            this.bar.width = targetWidth;
        }
    }

    /**
     * 设置血条颜色
     * @param color 十六进制颜色值（例如：#FF0000）
     */
    setColor(color: string): void {
        if (this.drawRect) this.drawRect.fillColor = color;
    }
}