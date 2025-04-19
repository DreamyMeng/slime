const { regClass } = Laya;
import { Save } from "../core/save";
import { LoginBase } from "./Login.generated";

@regClass()
export class Login extends LoginBase {

    onAwake(): void {
        this.Button.onClick = () => {
            Laya.Scene.open("Scene.ls");
        }

        this.update_sound();
        this.Sound.onClick = () => {
            Save.data.setting.mute = !Save.data.setting.mute;
            Laya.SoundManager.muted = Save.data.setting.mute;
            this.update_sound();
        }
    }

    update_sound(): void {
        if (Save.data.setting.mute) {
            this.Sound.image.skin = "resources/image/off.png";
        } else {
            this.Sound.image.skin = "resources/image/on.png";
        }
    }
}