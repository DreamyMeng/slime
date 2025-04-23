import { Config } from "./config";

declare global {
    interface String {
        toStr(): string;
    }
}

(String.prototype as any).toStr = function (): string {
    if (!this) return this;
    let data = Config.table.Tblang.get(this);
    if (data) return (data as any)[Language.key];
    console.error(`未找到语言：${this}`);
    return this;
};

export class Language {
    // static key: string = "zhCN";
    static key: string = "enUS";
    static init(): void {
        Language.key = Laya.LocalStorage.getItem('language') || 'enUS';
    }
    static setLanguage(language: string): void {
        Language.key = language;
        Laya.LocalStorage.setItem('language', language);
    }
}