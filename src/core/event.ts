type EventCallback = (...args: any[]) => void | Promise<void>;

/**
 * 每个监听项的布局结构（按顺序存储4个元素）：
 * [0] callback - 事件回调函数
 * [1] target - 回调函数所属对象
 * [2] args - 预置参数数组
 * [3] flag - 监听状态标记（0=删除，1=普通，2=一次性）
 */
const ITEM_LAYOUT = 4; // callback, target, args, flag

/**
 * 事件委托管理器
 * 使用线性结构存储监听项，支持同步/异步回调混合处理
 */
export class Delegate {
    private _flag = 0; // 处理状态标记（0=空闲，1=正在触发，2=需要清理）
    private _items: any[] = []; // 监听项存储数组

    /**
     * 添加持久事件监听
     * @param callback 回调函数
     * @param target 回调目标对象（用于上下文绑定）
     * @param args 预置参数（将在事件触发时追加到动态参数前）
     */
    add(callback: EventCallback, target: any, args?: any[]) {
        const arr = this._items;
        const index = arr.findIndex((value, i) => value === callback && arr[i + 1] === target);

        if (index !== -1) {
            arr[index + 2] = args;
            arr[index + 3] = 1; // 标记为普通监听
        } else {
            arr.push(callback, target, args, 1);
        }
    }

    /**
     * 添加一次性事件监听
     * @param callback 回调函数（触发后自动移除）
     * @param target 回调目标对象
     * @param args 预置参数
     */
    once(callback: EventCallback, target: any, args?: any[]) {
        const arr = this._items;
        const index = arr.findIndex((value, i) => value === callback && arr[i + 1] === target);

        if (index !== -1) {
            arr[index + 2] = args;
            arr[index + 3] = 2; // 标记为一次性监听
        } else {
            arr.push(callback, target, args, 2);
        }
    }

    /**
     * 移除指定监听
     * @param callback 要移除的回调函数
     * @param target 要移除的目标对象
     */
    remove(callback: EventCallback, target: any) {
        const arr = this._items;
        const index = arr.findIndex((value, i) => value === callback && arr[i + 1] === target);

        if (index !== -1) {
            if (this._flag !== 0) {
                arr[index + 3] = 0; // 标记为删除
                this._flag = 2;
            } else {
                arr.splice(index, ITEM_LAYOUT);
            }
        }
    }

    /**
     * 清空所有监听（延迟执行模式）
     */
    clear() {
        if (this._flag !== 0) {
            for (let i = 3; i < this._items.length; i += ITEM_LAYOUT) {
                this._items[i] = 0;
            }
            this._flag = 2;
        } else {
            this._items.length = 0;
        }
    }

    /**
     * 清除特定目标的所有监听
     * @param target 要清除的目标对象
     */
    clearForTarget(target: any) {
        if (!target) return;
        const arr = this._items;
        if (this._flag !== 0) {
            for (let i = 1; i < arr.length; i += ITEM_LAYOUT) {
                if (arr[i] === target) arr[i + 3] = 0;
            }
            this._flag = 2;
        } else {
            for (let i = arr.length - ITEM_LAYOUT; i >= 0; i -= ITEM_LAYOUT) {
                if (arr[i + 1] === target) arr.splice(i, ITEM_LAYOUT);
            }
        }
    }

    /** 当前监听数量 */
    get count(): number {
        return this._items.length / ITEM_LAYOUT;
    }

    /**
     * 异步触发事件监听
     * @param args 动态参数（将在预置参数后追加）
     * @returns 等待所有异步回调完成的Promise
     */
    async invokeAsync(...args: any[]): Promise<void> {
        if (this._flag !== 0) return;
        this._flag = 1;

        const arr = this._items;
        const promises: Promise<void>[] = [];

        for (let i = 0; i < arr.length; i += ITEM_LAYOUT) {
            if (arr[i + 3] === 0) continue;

            const callback = arr[i] as EventCallback;
            const target = arr[i + 1];
            const fixedArgs = arr[i + 2];

            try {
                const result = fixedArgs
                    ? callback.call(target, ...fixedArgs, ...args)
                    : callback.call(target, ...args);

                if (result instanceof Promise) {
                    promises.push(result);
                }
            } catch (error) {
                console.error(error);
            }

            if (arr[i + 3] === 2) {
                arr[i + 3] = 0;
                this._flag = 2;
            }
        }

        if (promises.length > 0) {
            await Promise.all(promises);
        }

        if (this._flag === 2) {
            for (let i = 0; i < arr.length;) {
                if (arr[i + 3] === 0) {
                    arr.splice(i, ITEM_LAYOUT);
                } else {
                    i += ITEM_LAYOUT;
                }
            }
        }

        this._flag = 0;
    }
}

/**
 * 事件派发系统
 * 提供基于类型的事件管理接口，支持同步/异步混合监听
 */
export class EventDispatcher {
    private _events: Record<string, Delegate> = {}; // 事件类型到委托的映射

    /** 判断指定事件类型是否有监听 */
    hasListener(type: string): boolean {
        const listeners = this._events[type];
        return !!listeners && listeners.count > 0;
    }

    /**
     * 注册事件监听
     * @param type 事件类型
     * @param caller 调用方标识（用于精准移除监听）
     * @param listener 监听函数
     * @param args 预置参数
     */
    on(type: string, caller: any, listener: EventCallback, args?: any[]) {
        if (!this._events[type]) {
            this._events[type] = new Delegate();
        }
        this._events[type].add(listener, caller, args);
    }

    /**
     * 注册一次性事件监听
     * @param type 事件类型
     * @param caller 调用方标识
     * @param listener 监听函数
     * @param args 预置参数
     */
    once(type: string, caller: any, listener: EventCallback, args?: any[]) {
        if (!this._events[type]) {
            this._events[type] = new Delegate();
        }
        this._events[type].once(listener, caller, args);
    }

    /**
     * 移除事件监听
     * @param type 事件类型
     * @param caller 调用方标识
     * @param listener 监听函数
     */
    off(type: string, caller: any, listener: EventCallback) {
        const listeners = this._events[type];
        if (listeners) {
            listeners.remove(listener, caller);
        }
    }

    /**
     * 移除全部监听
     * @param type 可选事件类型（不传则清空所有类型）
     */
    offAll(type?: string) {
        if (type) {
            delete this._events[type];
        } else {
            this._events = {};
        }
    }

    /**
     * 异步派发事件
     * @param type 事件类型 
     * @param data 动态参数
     * @returns 当所有异步回调完成时resolve的Promise
     */
    async dispatchAsync(type: string, ...data: any[]): Promise<void> {
        const listeners = this._events[type];
        if (listeners) {
            await listeners.invokeAsync(...data);
        }
    }
}
