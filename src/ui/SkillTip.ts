const { regClass } = Laya;
import { xinximoban } from "../core/config";
import { Save } from "../core/save";
import { skill } from "../table/schema";
import { Main } from "./Main";
import { MessageBox } from "./MessageBox";
import { PopUp } from "./PopUp";

@regClass()
export class SkillTip extends Laya.Script {
    declare owner: PopUp;

    onAwake(): void {
        this.owner.ok.onClick = () => {
            let playerData = Save.data.player;
            let level = (playerData.forget + 1) * 5;
            if (playerData.level < level) {
                MessageBox.tip(xinximoban.buzu);
                return;
            }
            playerData.level -= level;
            playerData.forget += 1;
            playerData.skills.splice(playerData.skills.indexOf(this.data.id), 1);
            Main.instance.update_player();
            Main.instance.update_skill();
            this.owner.close();
            Save.saveGame();
        }
        this.owner.no.onClick = () => {
            this.owner.close();
        }
    }

    private data: skill;

    show(data: skill, isOk: boolean): void {
        if (!isOk) {
            this.owner.ok.visible = false;
            this.owner.no.x = 285;
        } else {
            this.owner.ok.visible = true;
            this.owner.no.x = 420;
        }

        this.owner.parent.setChildIndex(this.owner, this.owner.parent.numChildren - 1);
        this.data = data;
        let level = (Save.data.player.forget + 1) * 5;
        this.owner.ok.tip.text = `需要等级:${level}`;
        this.owner.Label.text = `<font color='#ffe900' size=40>${data.name}</font>\n\n${data.description}`
        this.owner.open();
    }

}