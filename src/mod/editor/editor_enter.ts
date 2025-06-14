import { Config } from "../../core/config";
import { Language } from "../../core/i18n";

export async function main() {
    Language.init();
    await Config.load_config();
    await Config.load_sound();
    await Config.load_prefab();

    Laya.Scene.open("Editor.ls");
}