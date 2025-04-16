const { regClass } = Laya;
import { Save } from "../core/save";
import { GameLog } from "../core/utils";
import { skill } from "../table/schema";
import { Main } from "./Main";
import { SkillTipBase } from "./SkillTip.generated";

@regClass()
export class SkillTip extends SkillTipBase {
    onAwake(): void {
        this.ok.onClick = () => {
            let playerData = Save.data.player;
            let level = (playerData.forget + 1) * 5;
            if (playerData.level < level) {
                GameLog.log(`<font color='#FF0000'>等级不足</font>`);
                return;
            }
            playerData.level -= level;
            playerData.forget += 1;
            playerData.skills.splice(playerData.skills.indexOf(this.data.id), 1);
            Main.instance.update_player();
            Main.instance.update_skill();
            this.close();
        }
        this.no.onClick = () => {
            this.close();
        }
    }

    private data: skill;

    show(data: skill, isForget: boolean): void {
        if (!isForget) {
            this.ok.visible = false;
            this.no.x = 285;
        } else {
            this.ok.visible = true;
            this.no.x = 440;
        }

        this.parent.setChildIndex(this, this.parent.numChildren - 1);
        this.data = data;
        let level = (Save.data.player.forget + 1) * 5;
        this.ok.tip.text = `需要等级:${level}`;
        this.Label.text = `<font color='#ffe900' size=40>${data.name}</font>\n\n${data.description}`
        this.open();
    }

    open(): void {
        // 初始化弹出动画
        this.visible = true;
        this.scale(0, 0);
        this.alpha = 0;

        // 弹性弹出动画
        Laya.Tween.to(this,
            { scaleX: 1, scaleY: 1, alpha: 1 },
            300,
            Laya.Ease.backOut
        );
    }

    close(): void {
        // 关闭动画
        Laya.Tween.to(this,
            { scaleX: 0, scaleY: 0, alpha: 0 },
            300,
            Laya.Ease.backOut,
            Laya.Handler.create(this, () => {
                this.visible = false;
            })
        );
    }
}