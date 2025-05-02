import { Config } from "./core/config";
import { Save } from "./core/save";
import { start } from "./Main";
import { Jinhua } from "./ui/Jinhua";
import { Login } from "./ui/Login";
import { Main } from "./ui/Main";
import { MessageBox } from "./ui/MessageBox";

declare global {
    interface Window {
        Android: any;
        changeData: (data: any) => void;
        onAdRewarded: (state: number) => void;
        onAdNotReady: (state: number) => void;
        onAdLoaded: (state: number) => void;
        onTapTapLogin: (flag: boolean) => void;
    }
}

export function loadOldData() {
    window.Android.loadOldData();
    // window.changeData(null) // test
}

export function loaded() {
    window.Android.loaded();
}

export function isAndroid() {
    return typeof window.Android !== 'undefined';
    // return true; // test
}

export function playAd(state: number) {
    window.Android.playAd(state);
    // window.onAdRewarded(state) // test
}

export function login() {
    window.Android.login();
}

window["onTapTapLogin"] = function (flag: boolean) {
    console.log('onTapTapLogin', flag);
    Login.isLogin = flag;
    if (Login.instance) {
        Login.instance.showLogin(flag);
    }
}

window["onAdLoaded"] = function (state: number) {
    if (state == 1) {
        Main.fuhuo_load();
    }
    else if (state == 2) {
        Jinhua.ad_load();
    }
}

window["onAdRewarded"] = function (state: number) {
    // MessageBox.show("恭喜获得奖励!");
    if (state == 1) {
        Main.fuhuo_success();
    }
    else if (state == 2) {
        Jinhua.ad_success();
    }
}

window["onAdNotReady"] = function (state: number) {
    MessageBox.show("广告未准备好!");
}

window["changeData"] = function (old: any) {
    let data = Save.newGame();

    if (old) {
        let game = data.game;
        let player = data.player;

        player.id = old.name.indexOf('b') === 0 ? old.name : 'h' + old.name;
        player.level = old.level;
        player.exp = old.jingyan;

        player.quality.ling = old.ling;
        player.quality.xian = old.xian;
        player.quality.shen = old.shen;

        player.relation.chi = old.chi;
        player.relation.hui = old.hui;
        player.relation.lin = old.lin;
        player.relation.mao = old.mao;
        player.relation.jia = old.jia;
        player.relation.luo = old.luo;
        player.relation.yu = old.yu;
        player.relation.zhao = old.zhao;
        player.relation.ti = old.ti;
        player.relation.jiao = old.jiao;
        player.relation.zhi = old.zhi;

        player.forget = old.yiwang;
        game.rebirth = old.lun - 1;
        player.curScene = Number(old.curScene.name.split('_')[1]);
        player.maxScene = Number(old.curScene.maxScene.split('_')[1]);
        for (const key in old.scenes) {
            const scene = old.scenes[key];
            let scene2 = data.player.scenes[key.split('_')[1]];
            if (scene2) {
                scene2.count = scene.count;
                scene2.pass = scene.islock === 1 ? 0 : 1;
                if (scene2.boss.indexOf('b') !== 0) scene2.boss = 'h' + scene.boss;
                scene2.level = scene.level;
            }
        }
        for (const key in old.heroes) {
            if (key.indexOf('b') === 0) game.roles[key] = old.heroes[key];
            else game.roles['h' + key] = old.heroes[key];
        }
        for (const key in old.jisha) {
            if (key.indexOf('b') === 0) game.kills[key] = old.jisha[key];
            else game.kills['h' + key] = old.jisha[key];
        }

        (old.skills as string[]).forEach((skill) => {
            if (Config.table.Tbskill.get(skill)) player.skills.push(skill);
        });

        data.setting.mute = old.jingyin === 1;
    }

    start(data);
}