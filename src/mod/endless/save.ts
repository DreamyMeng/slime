import { GameLog } from "../../core/utils";

export interface SaveData_Endless {
    id: string;
    level: number;
    skills: string[];
    curScene: number;
    refresh: number,
    revive: number,
    roles: { [key: string]: number };
    isNew: boolean;
}

export function newData(): SaveData_Endless {
    return {
        id: 'h1',
        level: 1,
        skills: [],
        curScene: 0,
        refresh: 3,
        revive: 3,
        roles: {},
        isNew: true,
    };
}
// 保存游戏
export function saveGame(key: string, data: any): void {
    try {
        const jsonData = JSON.stringify(data);
        Laya.LocalStorage.setItem(key, jsonData);
        GameLog.log("存档保存成功!");
    } catch (error) {
        console.error("Failed to save game:", error);
    }
}

// 读取游戏
export function loadGame(key: string): any {
    try {
        const jsonData = Laya.LocalStorage.getItem(key);
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
export function deleteSave(key: string): void {
    Laya.LocalStorage.removeItem(key);
    console.log("Save deleted successfully!");
}
