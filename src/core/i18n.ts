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
    console.log(`未找到语言：${this}`);
    return this;
};

export class Language {
    static key: string;
    static init(): void {
        Language.key = Laya.LocalStorage.getItem('language') || 'CHS';
    }
    static setLanguage(language: string): void {
        Language.key = language;
        Laya.LocalStorage.setItem('language', language);
    }
}