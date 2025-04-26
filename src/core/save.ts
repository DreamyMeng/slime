import { start } from "../Main";
import { isAndroid } from "../platform";
import { Main } from "../ui/Main";
import { Config } from "./config";
import { GameLog } from "./utils";

export interface SaveData_Scene {
    count: number;
    pass: number;
    boss: string;
    level: number;
}

// SaveData.ts
export interface SaveData {
    // 每轮游戏产生的数据
    player: {
        id: string;
        quality: { [key: string]: number };
        relation: { [key: string]: number };
        exp: number;
        level: number;
        forget: number;
        revive: number;
        mimicry: number;
        skills: string[];
        curScene: number;
        maxScene: number;
        scenes: { [key: string]: SaveData_Scene };
    };
    // 永久数据
    game: {
        isNew: boolean;
        rebirth: number;
        roles: { [key: string]: number };
        kills: { [key: string]: number };
        achieves: { [key: number]: number };
        rewards: { [key: string]: number };
    }
    // 设置
    setting: {
        auto: boolean;
        mute: boolean;
        music: number;
        sound: number;
    };
}

// Save.ts
export class Save {
    public static data: SaveData;
    public static readonly SAVE_KEY = "game_save";

    static reset(id: string = 'h1'): SaveData["player"] {
        let data = {
            id: id,
            quality: {
                none: 0
            },
            relation: {
                chi: 0,
                hui: 0,
                lin: 0,
                mao: 0,
                jia: 0,
                luo: 0,
                yu: 0,
                zhao: 0,
                ti: 0,
                jiao: 0,
                zhi: 0
            },
            exp: 0,
            level: 1,
            forget: 0,
            revive: 3,
            mimicry: 1,
            skills: [] as string[],
            curScene: 1,
            maxScene: 0,
            scenes: {} as { [key: string]: SaveData_Scene },
        }

        Config.table.Tbmap_level.getDataList().forEach((scene) => {
            data.scenes[scene.id] = {
                count: 0,
                pass: 0,
                boss: Main.getBoss(scene),
                level: Main.getLevel(scene)
            };
        });

        if (this.data?.game.rebirth >= 3) data.skills.push("jiexi");

        return data;
    }

    static newGame(): SaveData {
        const id = 'h1';// 测试使用
        let data = {
            player: Save.reset(id),
            game: {
                isNew: true,
                rebirth: 0,
                roles: {} as { [key: string]: number },
                kills: {} as { [key: string]: number },
                achieves: {} as { [key: string]: number },
                rewards: {
                    'level': 0,
                    'skill': 0,
                    'boss': 0
                }
            },
            setting: {
                auto: false,
                mute: false,
                music: 0.5,
                sound: 0.5
            }
        };

        Config.table.Tbrole.getDataList().forEach((role) => {
            data.game.roles[role.id] = 0;
            data.game.kills[role.id] = 0;
        });
        data.game.roles[data.player.id] = 1;
        Config.table.Tbachieve.getDataList().forEach((achieve) => {
            data.game.achieves[achieve.id] = 0;
        });

        return data;
    }

    static init(): void {
        // this.deleteSave();
        let data = this.loadGame();
        if (!data) {
            if (isAndroid()) {
                window.Android.loadOldData();
                return;
            }
            else data = this.newGame();
        }
        start(data);
    }

    // 保存游戏
    static saveGame(): void {
        try {
            const jsonData = JSON.stringify(this.data);
            Laya.LocalStorage.setItem(Save.SAVE_KEY, jsonData);
            GameLog.log("存档保存成功!");
        } catch (error) {
            console.error("Failed to save game:", error);
        }
    }

    // 读取游戏
    static loadGame(): SaveData {
        try {
            const jsonData = Laya.LocalStorage.getItem(Save.SAVE_KEY);
            if (jsonData) {
                GameLog.log("存档加载成功!");
                return JSON.parse(jsonData);
            }
            console.log("No saved found.");
        } catch (error) {
            console.error("Failed to load game:", error);
        }
        return null;
    }

    // 删除存档
    static deleteSave(): void {
        Laya.LocalStorage.removeItem(Save.SAVE_KEY);
        console.log("Save deleted successfully!");
    }

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