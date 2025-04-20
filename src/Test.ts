import { getValueStr } from "./core/utils";
import { DamageMove } from "./ui/DamageMove";
import { HPBar } from "./ui/HPBar";
import { MyButton } from "./ui/MyButton";
const { regClass, property } = Laya;

@regClass()
export class Test extends Laya.Script {
    //declare owner : Laya.Sprite3D;
    //declare owner : Laya.Sprite;

    @property(Laya.Sprite)
    public btn: Laya.Sprite;

    // @property(Laya.List)
    // public list: Laya.List;

    @property(Laya.Text)
    public label: Laya.Text;

    @property(Laya.Clip)
    public clip: Laya.Clip;

    onAwake(): void {
        // this.animator.play();

        (this.btn as MyButton).onClick = () => {
            console.log("按钮被点击了");
            // this.clip.play(0, this.clip.total);
            // this.animator.owner.getComponent(DamageMove).init(205, 730, getValueStr(Math.random() * 9999999999));


            this.showDamageText(getValueStr(Math.random() * 9999999999), 360, 640);
            this.showDodgeText("闪避", 360, 640);
            this.showBlockText("格挡", 360, 640);


            // this.label.y = 650;
            // Laya.Tween.to(
            //     this.label,
            //     {
            //         scaleX: 1.5,
            //         scaleY: 1.5,
            //         y: this.label.y - 100
            //     },
            //     400,
            //     Laya.Ease.elasticInOut,
            //     // Laya.Handler.create(this, () => {
            //     //     Laya.Tween.to(
            //     //         label,
            //     //         {
            //     //             scaleX: 1,
            //     //             scaleY: 1,
            //     //             alpha: 0
            //     //         },
            //     //         300,
            //     //         Laya.Ease.backIn,
            //     //         Laya.Handler.create(this, () => {
            //     //             Laya.Tween.to(
            //     //                 label,
            //     //                 {
            //     //                     scaleX: 1,
            //     //                     scaleY: 1,
            //     //                     alpha: 0
            //     //                 },
            //     //                 300,
            //     //                 Laya.Ease.backIn,
            //     //                 Laya.Handler.create(this, () => {
            //     //                     this.recycleDamageLabel(label)
            //     //                 })
            //     //             );
            //     //         })
            //     //     );
            //     // })
            // );
        };

        // this.list.vScrollBarSkin = "ui/ScrollBar.png"; // 设置垂直滚动条皮肤

        // this.btn.onClick = () => {
        //     console.log("按钮被点击了");
        //     this.list.dataSource.push("Item " + (this.list.dataSource.length + 1));
        //     this.list.refresh();
        //     this.list.scrollTo(this.list.dataSource.length - 1); // 滚动到最后一个元素的位置
        // };
        // this.list.dataSource = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12", "Item 13", "Item 14", "Item 15", "Item 16", "Item 17", "Item 18", "Item 19", "Item 20"];
        // this.list.scrollBar.autoHide = true;
    }

    showDamageText(value: string, x: number, y: number, color: string = "#ffffff", duration: number = 1000) {
        // 创建Label
        const label = new Laya.Label();
        label.text = value.toString();
        label.color = color;
        // label.sizeTip = true; // 根据文字自动调整大小
        label.x = x;
        label.y = y;
        label.alpha = 0; // 初始透明
        Laya.stage.addChild(label); // 添加到舞台

        // 动画配置
        const animate = () => {
            // 渐显
            Laya.Tween.to(label, { alpha: 1 }, 200);
            // 向上移动 + 缩小
            Laya.Tween.to(label, { y: y - 50, scale: 1.5 }, duration / 2, null, Laya.Handler.create(label, () => {
                // 继续移动 + 缩小
                Laya.Tween.to(label, { y: y - 100, scale: 0.5, alpha: 0 }, duration / 2, null, Laya.Handler.create(label, () => {
                    Laya.stage.removeChild(label); // 动画结束后移除
                }));
            }));
        };

        // 立即执行动画
        animate();
    }

    showDodgeText(text: string, x: number, y: number, options: {
        color?: string,
        duration?: number,
        bounceHeight?: number,
        fontSize?: number
    } = {}) {
        const defaultColor = "#39FF1B";
        const defaultDuration = 600;
        const defaultBounceHeight = 30;
        const defaultFontSize = 24;

        const color = options.color || defaultColor;
        const duration = options.duration || defaultDuration;
        const bounceHeight = options.bounceHeight || defaultBounceHeight;
        const fontSize = options.fontSize || defaultFontSize;

        // 创建Label
        const label = new Laya.Label();
        label.text = text;
        label.color = color;
        label.fontSize = fontSize;
        label.x = x + (Math.random() * 100 - 50); // 轻微位置随机
        label.y = y;
        label.alpha = 0; // 初始透明
        Laya.stage.addChild(label);

        // 动画配置
        const animate = () => {
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
                        Laya.stage.removeChild(label);
                    }));
                }));
            }
            ), 400);
        };

        animate();
    }

    showBlockText(text: string, x: number, y: number, options: {
        color?: string,
        duration?: number,
        glowColor?: string,
        glowAlpha?: number
    } = {}) {
        const defaultColor = "#FFD700";    // 金属金
        const defaultDuration = 1000;

        const color = options.color || defaultColor;
        const duration = options.duration || defaultDuration;

        // 创建Label
        const label = new Laya.Label();
        label.text = text;
        label.color = color;
        label.fontSize = 28;
        label.x = x + (Math.random() * 100 - 50); // 轻微位置随机
        label.y = y;
        label.alpha = 0;


        Laya.stage.addChild(label);

        // 动画配置
        const animate = () => {
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
                    Laya.stage.removeChild(label);
                }));
            }));
        };

        animate();
    }

    // @property(HPBar)
    // public hpBar: HPBar;

    // @property({ type: Number })
    // public maxHP: number = 100;

    // private currentHP: number;

    // onStart(): void {
    //     this.currentHP = this.maxHP;

    //     // 示例：按钮点击扣血
    //     this.btn.onClick = () => {
    //         this.currentHP = Math.max(0, this.currentHP - 10);
    //         const percent = this.currentHP / this.maxHP;

    //         // 更新血条
    //         this.hpBar.setValue(percent);

    //         // 血量低于30%时变红
    //         if (percent <= 0.3) {
    //             this.hpBar.setColor("#FF0000");
    //         }
    //     };
    // }
}