import { Config, tishi } from "./core/config";
import { Language } from "./core/i18n";
import { Save, SaveData } from "./core/save";
import { GameLog } from "./core/utils";
import { isAndroid, loaded } from "./platform";

export async function main() {
    // Laya.LocalStorage.removeItem('language');
    let label = Laya.stage.addChild(new Laya.Label());

    Language.init();
    await Config.load_config();
    label.dataSource = { text: tishi[Math.floor(Math.random() * tishi.length)].toStr(), x: 60, width: Laya.stage.width - 120, height: Laya.stage.height, wordWrap: true, align: "center", valign: "middle", fontSize: 30, color: "#ffffff" };
    await Config.load_sound();
    await Config.load_prefab();

    GameLog.log("----------开局一只史莱姆----------");
    Save.init();
}

export function start(data: SaveData) {
    Laya.stage.destroyChildren();
    Save.data = data;
    Laya.Scene.open("Scene.ls", false, null, Laya.Handler.create(null, () => {
        if (isAndroid()) loaded();
    }));
}