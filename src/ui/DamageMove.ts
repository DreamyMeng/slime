import { toInt } from "../core/utils";

const { regClass } = Laya;

@regClass()
export class DamageMove extends Laya.Script {
    declare owner: Laya.Sprite;
    animator: Laya.Animator2D;
    text: Laya.Text;
    isX: boolean = false;
    isY: boolean = false;
    x: number = 0;
    y: number = 0;

    onAwake(): void {
        this.text = this.owner.getChildByName('label') as Laya.Text;
        this.animator = this.owner.getComponent(Laya.Animator2D);
    }

    init(x: number, y: number, str: string): void {
        this.text.x = 0;
        this.owner.pos(x, y);
        this.text.text = str;
        this.text.fontSize = toInt(Math.random() * 15) + 25;
        this.animator.play("damage", 0, 0);
    }

    event_x(): void {
        this.isX = true;
        const dir = Math.random() < 0.5 ? -1 : 1;
        this.x = dir * (Math.random() * 10 + 10);
    }

    event_y(): void {
        this.isY = true;
        this.y = Math.random() * 40 - 10;
    }

    event_end(): void {
        this.isX = false;
        this.isY = false;
    }

    onUpdate(): void {
        if (this.isX) {
            this.text.x += this.x;
        }
        if (this.isY) {
            this.owner.y += this.y;
        }
    }
}