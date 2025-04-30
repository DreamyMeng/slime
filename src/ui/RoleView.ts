import { BuffMgr } from "../core/buff";
import { Config } from "../core/config";
import { BaseRole } from "../core/role";
import * as utils from "../core/utils";
import { map_level, role } from "../table/schema";
import { HPBar } from "./HPBar";
import { Main } from "./Main";
import { MyButton } from "./MyButton";

const { regClass } = Laya;

@regClass()
export class RoleView extends Laya.Script {
    declare owner: MyButton;
    data: role;
    level: number;
    hpBar: HPBar;
    original_x: number;
    original_y: number;

    onAwake(): void {
        // 初始化代码...
        this.animator = this.owner.getComponent(Laya.Animator2D);
        this.original_x = this.owner.x;
        this.original_y = this.owner.y;
        this.hpBar = this.owner.getComponent(HPBar);
        this.owner.onClick = () => {
            // console.log('点击了角色', this.data.name);
            // Save.data.player.scenes[Save.data.player.curScene].count++;
            // Main.instance.update_map();

            Main.instance.Enemy.getComponent(RoleView).show(this.data.id, this.level);
            Main.instance.show_battle(this.data.id, this.level, false);

        }; // 绑定点击事件 
    }

    init(rate: number, id: string, level: number): void {
        let roleData = Config.table.Tbrole.get(id);
        this.data = roleData;
        this.level = level;
        this.owner.title.text = Main.getRoleName(roleData);
        (this.owner.image.getChildByName('Level') as Laya.Label).text = `Lv.${level}`;
        let levelData = Config.table.Tbrole_level.get(level);
        let attack = utils.toInt(levelData.attack * roleData.attackRate * rate);
        let defence = utils.toInt(levelData.defence * roleData.defenceRate * rate);
        let health = utils.toInt(levelData.health * roleData.healthRate * rate);
        let power = Main.getPower(attack, defence, health);
        (this.owner.image.getChildByName('Tip') as Laya.Label).text = "战力:".toStr() + `${utils.getValueStr(power)}`;
    }

    show(id: string, level: number, power?: number): void {
        let roleData = Config.table.Tbrole.get(id);
        this.data = roleData;
        this.level = level;
        this.owner.title.text = Main.getRoleName(roleData);
        (this.owner.image.getChildByName('Level') as Laya.Label).text = `Lv.${level}`;
        if (power) (this.owner.image.getChildByName('Tip') as Laya.Label).text = "战力:".toStr() + `${utils.getValueStr(power)}`;
    }

    show_skin(isBoss: boolean): void {
        if (isBoss) {
            this.owner.image.skin = `resources/image/boss.png`;
            this.owner.image.color = '#9A1919';
        } else {
            this.owner.image.skin = `resources/image/enemy.png`;
            this.owner.image.color = '#666b6f'
        }
        // this.hpBar.bg.visible = !isBoss;
    }

    animator: Laya.Animator2D;
    role: BaseRole;
    event_damage(): void {
        Laya.SoundManager.playSound(Config.sounds.get("att"));
        this.role.attackAction();
    }
    event_end(): void {
        BuffMgr.clearTemp(); // 清除临时buff
        Main.instance.battle.round(this.role.target);
    }
    play_anim(name: string): void {
        this.owner.parent.setChildIndex(this.owner, this.owner.parent.numChildren - 1);
        this.animator.play(name, 0, 0);
    }
}