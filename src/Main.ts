import { Config, tishi } from "./core/config";
import { Language } from "./core/i18n";
import { Save, SaveData } from "./core/save";
import { delay, GameLog } from "./core/utils";
import { loaded } from "./platform";

export async function main() {
    // Laya.LocalStorage.removeItem('language');
    await Config.load_config();
    Language.init();

    let label = Laya.stage.addChild(new Laya.Label());
    label.dataSource = { x: 60, width: Laya.stage.width - 120, height: Laya.stage.height, wordWrap: true, align: "center", valign: "middle", fontSize: 30, color: "#ffffff" };
    label.text = tishi[Math.floor(Math.random() * tishi.length)].toStr();

    await Config.load_sound();
    await Config.load_prefab();

    loaded();
    GameLog.log("----------开局一只史莱姆----------");
    Save.init();

    // await Laya.Scene.open("Scene.ls");
    await delay(1000);
    label?.destroy();

}

export function start(data: SaveData) {
    Save.data = data;
    Laya.Scene.open("Scene.ls");
}