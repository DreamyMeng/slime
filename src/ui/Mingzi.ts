import { Save } from "../core/save";
import { role } from "../table/schema";
import { Main } from "./Main";
import { MyButton } from "./MyButton";
import { Tujian } from "./Tujian";

const { regClass } = Laya;

@regClass()
export class Mingzi extends Laya.Script {
    declare owner: MyButton;
    private data: role;

    onAwake(): void {
        this.owner.color = '#545454';
        this.owner.onClick = () => {
            Tujian.instance.show_role(this.data);
        };
    }

    show(data: role): void {
        this.data = data;
        this.owner.title.text = Save.data.game.roles[this.data.id] ? Main.getRoleName(this.data) : `${Main.getQualityStr(this.data.qualityType)}·${this.data.name}`;
    }
}