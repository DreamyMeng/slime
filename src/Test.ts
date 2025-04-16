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

    @property(Laya.Animator2D)
    public animator: Laya.Animator2D;

    onAwake(): void {
        this.animator.play();

        (this.btn as MyButton).onClick = () => {
            console.log("按钮被点击了");
            this.animator.play("player", 0, 0);
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