const { regClass, property } = Laya;
import { Config } from "../core/config";
import { Language } from "../core/i18n";
import { Save } from "../core/save";
import { EndlessScene } from "../mod/endless/EndlessScene";
import { loadGame, newData } from "../mod/endless/save";
import { isAndroid, login } from "../platform";
import { MessageBox } from "./MessageBox";
import { MyButton } from "./MyButton";
import { PopUp } from "./PopUp";

@regClass()
export class Login extends Laya.Script {
    declare owner: Laya.Sprite;
    @property({ type: Laya.Sprite })
    Scene1: MyButton;
    @property({ type: Laya.Sprite })
    Scene2: MyButton;
    @property({ type: Laya.Sprite })
    Delete: MyButton;
    @property({ type: Laya.Sprite })
    settings: MyButton;
    @property({ type: Laya.ComboBox })
    ComboBox: Laya.ComboBox;

    static instance: Login;
    Login: Laya.VBox;
    TapTap: MyButton;
    static isLogin: boolean;

    onDestroy(): void {
        Login.instance = null;
    }

    showLogin(flag: boolean): void {
        if (flag) {
            this.Login.visible = true;
            this.TapTap.visible = false;
        } else {
            this.Login.visible = false;
            this.TapTap.visible = true;
        }
    }

    onAwake(): void {
        Login.instance = this;
        this.Login = this.owner.getChildByName('Login') as Laya.VBox;
        this.TapTap = this.owner.getChildByName('TapTap') as MyButton;
        this.TapTap.onClick = () => {
            login();
        }

        if (!isAndroid()) this.showLogin(true);
        else this.showLogin(Login.isLogin);

        const list = ['CHS', 'EN', 'CHT', 'JP', 'KR', 'VN'];
        this.ComboBox.dataSource = ['简体中文', 'English', '繁體中文', '日本語', '한국어', 'Tiếng Việt'];
        this.ComboBox.selectedIndex = list.indexOf(Language.key);
        this.ComboBox.visibleNum = list.length;
        // this.ComboBox.selectHandler = Laya.Handler.create(this, (_: number) => {
        // }, null, false);

        this.Delete.onClick = () => {
            MessageBox.show("是否删除存档？", () => {
                Save.data = Save.newGame();
                Save.data.player.forget = 0;
                Save.data.player.revive = 3;
                Save.data.player.mimicry = 1;
                Save.saveGame();
            });
        }

        this.Scene1.onClick = () => {
            Laya.Scene.open("Scene.ls");
        }

        this.settings.onClick = () => {
            this.settingsPanel.open();
        }

        this.no.onClick = () => {
            this.settingsPanel.close();
        }

        this.ok.onClick = () => {
            let key = list[this.ComboBox.selectedIndex];
            Language.setLanguage(key);

            Save.data.setting.music = this.musicBar.value / 100;
            Save.data.setting.sound = this.soundBar.value / 100;
            Laya.SoundManager.setMusicVolume(Save.data.setting.music);
            Laya.SoundManager.setSoundVolume(Save.data.setting.sound);
            Laya.SoundManager.soundMuted = Save.data.setting.sound === 0;
            Laya.SoundManager.musicMuted = Save.data.setting.music === 0;

            let font_style = this.sys_tog.selected ? 'system' : 'default';
            Laya.Config.defaultFont = font_style === 'system' ? null : 'AlimamaDaoLiTi';
            Laya.LocalStorage.setItem('font', font_style);

            Save.saveGame();
            Laya.Scene.open("Login.ls");
        }

        this.sys_tog.clickHandler = Laya.Handler.create(this, () => {
            this.sys_tog.selected = true;
            this.sel_tog.selected = false;
        }, null, false);

        this.sel_tog.clickHandler = Laya.Handler.create(this, () => {
            this.sys_tog.selected = false;
            this.sel_tog.selected = true;
        }, null, false);

        if (Laya.Config.defaultFont === null) this.sel_tog.selected = true;
        else this.sys_tog.selected = true;

        Laya.SoundManager.setMusicVolume(Save.data.setting.music);
        Laya.SoundManager.setSoundVolume(Save.data.setting.sound);
        Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
        Laya.SoundManager.soundMuted = Save.data.setting.sound === 0;
        Laya.SoundManager.musicMuted = Save.data.setting.music === 0;

        this.musicBar.value = Save.data.setting.music * 100;
        this.soundBar.value = Save.data.setting.sound * 100;
        let font = Laya.LocalStorage.getItem('font');
        if (font) this.sys_tog.selected = font === 'system';
        else this.sys_tog.selected = false;
        this.sel_tog.selected = !this.sys_tog.selected;
        // this.update_sound();
        // this.Sound.onClick = () => {
        //     Save.data.setting.mute = !Save.data.setting.mute;
        //     this.update_sound();
        //     Save.saveGame();
        // }

        let func = (d: any) => {
            EndlessScene.data = d;
            Laya.Scene.open("Scene2.ls");
        }

        this.Scene2.onClick = () => {
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

    // update_sound(): void {
    //     Laya.SoundManager.muted = Save.data.setting.mute;
    //     if (Save.data.setting.mute) {
    //         this.Sound.image.skin = "resources/image/off.png";
    //         Laya.SoundManager.stopMusic();
    //     } else {
    //         this.Sound.image.skin = "resources/image/on.png";
    //         Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
    //     }
    // }

    @property({ type: Laya.Sprite })
    settingsPanel: PopUp;
    @property({ type: Laya.Sprite })
    ok: MyButton;
    @property({ type: Laya.Sprite })
    no: MyButton;
    @property({ type: Laya.HSlider })
    musicBar: Laya.HSlider;
    @property({ type: Laya.HSlider })
    soundBar: Laya.HSlider;
    @property({ type: Laya.Radio })
    sys_tog: Laya.Radio;
    @property({ type: Laya.Radio })
    sel_tog: Laya.Radio;

}