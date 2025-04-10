// GameLog.ts

/**
 * 游戏日志系统
 * 用于记录游戏运行过程中的各种事件信息
 */
export class GameLog {
    /** 存储日志内容的静态数组 */
    static logs: string[] = [];

    /**
     * 记录日志并输出到控制台
     * @param message 需要记录的日志信息
     */
    static log(message: string) {
        this.logs.push(message);
        console.log(`[LOG]: ${message}`);
    }
}

/**
 * 数值取整工具函数
 * @param value 需要处理的浮点数
 * @returns 向下取整后的整数值
 */
export function toInt(value: number) {
    return Math.floor(value);
}