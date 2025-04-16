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

    static reset(name: string): SaveData["player"] {
        let data = {
            name: name,
            quality: {
                None: 0
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
            skills: [] as string[],
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
        let name = "h1";
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
