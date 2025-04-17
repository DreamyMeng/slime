const { regClass } = Laya;
import { Config } from "../core/config";
import { skill } from "../table/schema";
import { Main } from "./Main";
import { MyButton } from "./MyButton";
import { SkillTip } from "./SkillTip";

@regClass()
export class SkillView extends Laya.Script {
    declare owner: MyButton;

    onStart(): void {
        let btn = this.owner;
        btn.color = '#FF4900';
        btn.onClick = () => {
            if (!this.data) return;
            Main.instance.SkillTip.getComponent(SkillTip).show(this.data, this.isForget);
        }
    }

    private data: skill;
    private isForget: boolean;

    init(id: string, isForget: boolean = false): void {
        this.isForget = isForget;
        this.data = Config.table.Tbskill.get(id);
        if (id && !this.data) {
            console.error(`技能${id}不存在!`);
            return;
        }
        this.owner.title.text = this.data?.name ?? '';
    }
}