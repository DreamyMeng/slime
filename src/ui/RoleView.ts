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

    init(sceneData: map_level, id: string, level: number): void {
        let roleData = Config.table.Tbrole.get(id);
        this.data = roleData;
        this.level = level;
        this.owner.title.text = Main.getRoleName(roleData);
        (this.owner.image.getChildByName('Level') as Laya.Label).text = `Lv.${level}`;
        let levelData = Config.table.Tbrole_level.get(level);
        let attack = utils.toInt(levelData.attack * roleData.attackRate * sceneData.attackRate);
        let defence = utils.toInt(levelData.defence * roleData.defenceRate * sceneData.defenceRate);
        let health = utils.toInt(levelData.health * roleData.healthRate * sceneData.healthRate);
        let power = Main.getPower(attack, defence, health);
        (this.owner.image.getChildByName('Tip') as Laya.Label).text = `战力:${utils.getValueStr(power)}`;
    }

    show(id: string, level: number, power?: number): void {
        let roleData = Config.table.Tbrole.get(id);
        this.data = roleData;
        this.level = level;
        this.owner.title.text = Main.getRoleName(roleData);
        (this.owner.image.getChildByName('Level') as Laya.Label).text = `Lv.${level}`;
        if (power) (this.owner.image.getChildByName('Tip') as Laya.Label).text = `战力:${utils.getValueStr(power)}`;
    }

    animator: Laya.Animator2D;
    // role_action: (target: BaseRole) => boolean;

    // event_damage(): void {
    //     // console.log(":event_damage");
    //     if (this.role_action) this.role_action();
    //     Laya.SoundManager.playSound(Config.sounds.get("att"));
    // }

    play_anim(name: string): void {
        this.animator.play(name, 0, 0);
    }
}