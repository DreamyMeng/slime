const { regClass } = Laya;
import { Config } from "../core/config";
import { Language } from "../core/i18n";
import { Save } from "../core/save";
import { EndlessScene } from "../mod/endless/EndlessScene";
import { loadGame, newData } from "../mod/endless/save";
import { MessageBox } from "./MessageBox";
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

        const list = ['CHS', 'EN', 'CHT', 'JP', 'KR', 'VN'];
        this.ComboBox.dataSource = ['简体中文', 'English', '繁體中文', '日本語', '한국어', 'Tiếng Việt'];
        this.ComboBox.selectedIndex = list.indexOf(Language.key);
        this.ComboBox.visibleNum = list.length;
        this.ComboBox.selectHandler = Laya.Handler.create(this, (_: number) => {
            let key = list[this.ComboBox.selectedIndex];
            Language.setLanguage(key);
            Laya.Scene.open("Login.ls");
        }, null, false);

        this.Button.onClick = () => {
            Laya.Scene.open("Scene.ls");
        }

        this.update_sound();
        this.Sound.onClick = () => {
            Save.data.setting.mute = !Save.data.setting.mute;
            this.update_sound();
        }

        let func = (d: any) => {
            EndlessScene.data = d;
            Laya.Scene.open("Scene2.ls");
        }

        (this.owner.getChildByName('Button2') as MyButton).onClick = () => {
            let data = loadGame('endless');
            if (data) {
                let box = MessageBox.show("发现存档，是否继续游戏进度？", () => {
                    func(newData());
                }, () => {
                    func(data);
                });
                box.ok.title.text = "重新开始".toStr();
                box.no.title.text = "继续".toStr();
            } else {
                func(newData());
            }
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