import { Battle } from "./core/battle";
import { Config, tishi } from "./core/config";
import { EventDispatcher } from "./core/event";
import { Language } from "./core/i18n";
import { BaseRole } from "./core/role";
import { Save } from "./core/save";
import { delay, GameLog } from "./core/utils";


export async function main() {
    // let label = Laya.stage.addChild(new Laya.Label());
    // label.dataSource = { width: Laya.stage.width, height: Laya.stage.height, align: "center", valign: "middle", fontSize: 30, color: "#ffffff" };

    // label.text = tishi[Math.floor(Math.random() * tishi.length)];
    Language.init();

    await Config.load_config();
    await Config.load_sound();
    await Config.load_prefab();

    GameLog.log("----------开局一只史莱姆----------");
    Save.init();

    await Laya.Scene.open("Scene.ls");
    // label.destroy();

    //    new Laya.Image().on(Laya.Event.CLICK, null, () => {
    //         //点击后，打开UI场景示例
    //         console.log("uiBtn");
    //         Laya.Scene.open("scenes/UiMain.ls");
    //     });

    // let hero = table.Tbdemo.get(1001);

    // console.log(hero.name);

    // 创建测试实例并运行
    // const test = new EventDispatcherTest();
    // test.runTests();

    // 测试战斗系统
    /*     const player = new BaseRole().init('player', 110, 90, 1000, ['feixing2', 'xiaoyue']);
        const enemy = new BaseRole().init('enemy', 150, 30, 800, ['zaie', 'zhendi']);
    
        const battle = new Battle(player, enemy);
    
        battle.start(); */
}

class EventDispatcherTest {
    private dispatcher: EventDispatcher;

    constructor() {
        this.dispatcher = new EventDispatcher();
    }

    // 测试普通事件
    testNormalEvent() {
        console.log("====== 测试普通事件 ======");
        this.dispatcher.on("testEvent", this, this.onEvent);
        this.dispatcher.dispatchAsync("testEvent", "Hello, World!");
    }

    // 测试异步事件
    async testAsyncEvent() {
        console.log("====== 测试异步事件 ======");
        this.dispatcher.on("asyncEvent", this, this.asyncEventHandler);
        await this.dispatcher.dispatchAsync("asyncEvent", "Async Data").then(() => {
            console.log("所有异步事件执行完成", "callback");
        });
        console.log("所有异步事件执行完成");
    }

    // 测试一次性事件
    testOnceEvent() {
        console.log("====== 测试一次性事件 ======");
        this.dispatcher.once("onceEvent", this, this.onEvent);
        this.dispatcher.dispatchAsync("onceEvent", "Once Data");
        this.dispatcher.dispatchAsync("onceEvent", "This should not trigger");
    }

    // 测试事件移除
    testRemoveEvent() {
        console.log("====== 测试事件移除 ======");
        this.dispatcher.on("removeEvent", this, this.onEvent);
        this.dispatcher.off("removeEvent", this, this.onEvent);
        this.dispatcher.dispatchAsync("removeEvent", "This will not be logged");
    }

    // 测试多事件同时触发
    testMultipleEvents() {
        console.log("====== 测试多事件同时触发 ======");
        this.dispatcher.on("multiEvent", this, this.onEvent);
        this.dispatcher.on("multiEvent", this, this.asyncEventHandler);
        this.dispatcher.dispatchAsync("multiEvent", "Multi Event Data");
    }

    // 普通事件处理器
    onEvent(data: any) {
        console.log(`普通事件处理: ${data}`);
    }

    // 异步事件处理器
    async asyncEventHandler(data: any) {
        console.log(`开始处理异步事件: ${data}`);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log(`异步事件处理完成: ${data}`);
                resolve();
            }, 1000);
        });
    }

    // 运行所有测试
    async runTests() {
        // this.testNormalEvent();
        // 没有等待
        setTimeout(() => {
            console.log("====== waitting ======");
        }, 1500);

        await this.testAsyncEvent();

        console.log("====== end ======");
        // setTimeout(() => this.testOnceEvent(), 3000);
        // // setTimeout(() => this.testRemoveEvent(), 4500);
        // setTimeout(() => this.testMultipleEvents(), 6000);
    }
}


