import { Main } from "../ui/Main";
import { Config } from "./config";

export interface SaveData_Scene {
    count: number;
    pass: boolean;
    boss: string;
    level: number;
}

// SaveData.ts
export interface SaveData {
    // 每轮游戏产生的数据
    player: {
        name: string;
        quality: { [key: string]: number };
        relation: { [key: string]: number };
        exp: number;
        level: number;
        forget: number;
        skills: string[];

        curScene: number;
        scenes: { [key: string]: SaveData_Scene };
    };
    // 永久数据
    game: {
        isNew: boolean;
        rebirth: number;
        roles: { [key: string]: boolean };
        kills: { [key: string]: number };
        collection: { [key: string]: number };
    }
    // 设置
    setting: {
        music: number;
        sound: number;
    };
}

// Save.ts
export class Save {
    public static data: SaveData;
    public static readonly SAVE_KEY = "game_save";

    static reset(name: string = 'h1'): SaveData["player"] {
        let data = {
            name: name,
            quality: {
                None: 0
            },
            relation: {
                chi: 4524520,
                hui: 454250,
                lin: 24654153150,
                mao: 1230,
                jia: 4524520,
                luo: 36630,
                yu: 40,
                zhao: 2456320,
                ti: 1230,
                jiao: 4120,
                zhi: 1230
            },
            exp: 0,
            level: 91,
            forget: 0,
            skills: ['tunshi1'] as string[],
            curScene: 1,
            scenes: {} as { [key: string]: SaveData_Scene },
        }

        Config.table.Tbmap_level.getDataList().forEach((scene) => {
            data.scenes[scene.id] = {
                count: 0,
                pass: false,
                boss: Main.getBoss(scene),
                level: Main.getLevel(scene)
            };
        });

        if (this.data?.game.rebirth > 3) data.skills.push("jiexi");

        return data;
    }

    static newGame(): SaveData {
        let name = "h14";
        return {
            player: Save.reset(name),
            game: {
                isNew: true,
                rebirth: 1,
                roles: { name: true },
                kills: {},
                collection: {}
            },
            setting: {
                music: 0.5,
                sound: 0.5
            }
        };
    }

    static init(): void {
        this.data = /* this.loadGame() || */ this.newGame();
    }

    // 保存游戏
    static saveGame(): void {
        try {
            const jsonData = JSON.stringify(this.data);
            Laya.LocalStorage.setItem(Save.SAVE_KEY, jsonData);
            console.log("Game saved successfully!");
        } catch (error) {
            console.error("Failed to save game:", error);
        }
    }

    // 读取游戏
    static loadGame(): SaveData | null {
        try {
            const jsonData = Laya.LocalStorage.getItem(Save.SAVE_KEY);
            if (jsonData) {
                const data: SaveData = JSON.parse(jsonData);
                console.log("Game loaded successfully!");

                return data;
            }
            console.warn("No saved game found.");
            return this.newGame();
        } catch (error) {
            console.error("Failed to load game:", error);
            return null;
        }
    }

    // 删除存档
    static deleteSave(): void {
        Laya.LocalStorage.removeItem(Save.SAVE_KEY);
        console.log("Save deleted successfully!");
    }
}
