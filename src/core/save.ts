import { start } from "../Main";
import { isAndroid, loadOldData } from "../platform";
import { Main } from "../ui/Main";
import { Config } from "./config";
import { GameLog } from "./utils";

export interface SaveData_Scene {
    count: number;
    pass: number;
    boss: string;
    level: number;
}

export interface SaveData_Player {
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
}

// SaveData.ts
export interface SaveData {
    // 每轮游戏产生的数据
    player: SaveData_Player;
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

    static reset(id: string = 'h1'): SaveData_Player {
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
        if (this.data?.player) {
            data.forget = this.data.player.forget;
            data.revive = this.data.player.revive;
            data.mimicry = this.data.player.mimicry;
        }
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
                loadOldData();
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