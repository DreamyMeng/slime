// GameLog.ts

/**
 * 游戏日志系统
 * 用于记录游戏运行过程中的各种事件信息
 */
export class GameLog {
    static instance: GameLog;
    /** 存储日志内容的静态数组 */
    private logs: string[];
    public callback: () => void;

    constructor(private maxLength: number = 200) {
        this.logs = [];
        this.maxLength = maxLength;
    }

    add(log: string) {
        if (this.logs.length >= this.maxLength) {
            this.logs.shift(); // 删除最早的元素
        }
        this.logs.push(log);

        console.log(log);
        if (this.callback) this.callback();
    }

    /**
     * 记录日志并输出到控制台
     * @param message 需要记录的日志信息
     */
    static log(message: string) {
        if (!this.instance) this.instance = new GameLog();
        this.instance.add(message);
        console.log(`[LOG]: ${message}`);
    }

    static get() {
        return this.instance.logs;
    }

    static clear() {
        this.instance.logs.length = 0;
    }
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function tweenTo(target: any, props: any, duration: number, ease?: Function | null) {
    return new Promise((resolve) => {
        Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(null, resolve));
    });
}

/**
 * 数值取整工具函数
 * @param value 需要处理的浮点数
 * @returns 向下取整后的整数值
 */
export function toInt(value: number) {
    return Math.floor(value);
}

export function toPerStr(value: number): string {
    const percentage = Math.floor(value * 1000) / 10; // 保留一位小数
    return `${percentage}%`;
}

export function getValueStr(num: number): string {
    const units = [
        { value: 1e12, symbol: '兆' },  // 万亿
        { value: 1e8, symbol: '亿' },
        { value: 1e4, symbol: '万' }
    ];

    for (const unit of units) {
        if (num >= unit.value) {
            const formatted = (num / unit.value).toFixed(2);
            // 移除末尾无用的零和小数点（如1.00万→1万）
            return formatted.replace(/\.?0+$/, '') + unit.symbol;
        }
    }
    return num.toString();
}

// 新增数字转中文方法
export function numberToChinese(num: number): string {
    const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return num.toString().split('').map(n => chineseNumbers[parseInt(n)]).join('');
}