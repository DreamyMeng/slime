const { regClass } = Laya;
import { Config } from "../core/config";
import { Language } from "../core/i18n";
import { Save } from "../core/save";
import { Main } from "./Main";
import { MyButton } from "./MyButton";

@regClass()
export class Login extends Laya.Script {
    declare owner: Laya.Sprite;
    Button: MyButton;
    Sound: MyButton;
    ComboBox: Laya.ComboBox;

    onAwake(): void {
        this.Button = this.owner.getChildByName('Button') as MyButton;
        this.Sound = this.owner.getChildByName('Sound') as MyButton;
        this.ComboBox = this.owner.getChildByName('ComboBox') as Laya.ComboBox;

        const list = ['CHS', 'EN', 'CHT', 'JP', 'KR', 'TH', 'VN'];
        this.ComboBox.dataSource = ['简体中文', 'English', '繁體中文', '日本語', '한국어', 'ภาษาไทย', 'Tiếng Việt'];
        this.ComboBox.selectedIndex = list.indexOf(Language.key);
        this.ComboBox.visibleNum = list.length;
        this.ComboBox.selectHandler = Laya.Handler.create(this, (_: number) => {
            let key = list[this.ComboBox.selectedIndex];
            Language.setLanguage(key);
            Laya.Scene.open("Scene.ls");
        }, null, false);

        this.Button.onClick = () => {
            Main.instance.show();
            this.owner.destroy();
        }

        this.update_sound();
        this.Sound.onClick = () => {
            Save.data.setting.mute = !Save.data.setting.mute;
            this.update_sound();
        }
    }

    update_sound(): void {
        Laya.SoundManager.muted = Save.data.setting.mute;
        if (Save.data.setting.mute) {
            this.Sound.image.skin = "resources/image/off.png";
            Laya.SoundManager.stopMusic();
        } else {
            this.Sound.image.skin = "resources/image/on.png";
            Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
        }
    }
}