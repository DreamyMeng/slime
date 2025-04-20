import { Config } from "../core/config";
import { GameLog } from "../core/utils";
import { PopUp } from "./PopUp";

export class MessageBox {
    static tipsQueue: Laya.Label[] = [];
    static tip(msg: string) {
        if (!msg) return;
        var offsetY = this.tipsQueue.length * 50;

        GameLog.log(msg);
        // 创建一个 Label
        var message = new Laya.Label();
        message.text = msg; // 设置消息内容
        message.fontSize = 36; // 设置字体大小
        message.color = "#ffffff"; // 设置字体颜色
        // message.bold = true; // 设置加粗
        message.pos(Laya.stage.width / 2, Laya.stage.height / 2 + offsetY); // 设置初始位置
        message.alpha = 1; // 设置初始透明度
        message.align = "center"; // 水平居中
        message.valign = "middle"; // 垂直居中
        message.anchorX = 0.5;
        message.anchorY = 0.5;
        message.width = 540;
        message.wordWrap = true;
        message.html = true;

        // 添加到舞台
        Laya.stage.addChild(message);

        // 执行向上移动和渐隐动画
        Laya.Tween.to(
            message,
            { scaleX: 1.5, scaleY: 1.5 }, // 放大
            200,
            Laya.Ease.quadIn,
            Laya.Handler.create(message, function () {
                Laya.Tween.to(
                    message,
                    { scaleX: 1, scaleY: 1 }, // 目标位置和透明度
                    200,
                    Laya.Ease.quadOut
                );
                Laya.Tween.to(
                    message,
                    { y: Laya.stage.height / 2 - 100 + offsetY, alpha: 0 }, // 目标位置和透明度
                    1000,
                    Laya.Ease.linearNone, // 缓动函数
                    Laya.Handler.create(message, function () {
                        // 动画结束后移除消息
                        message.removeSelf();
                        MessageBox.tipsQueue.shift();
                    })
                );
            })
        );

        // 添加到队列
        MessageBox.tipsQueue.push(message);
    }

    static show(msg: string, ok_callback?: () => void, no_callback?: () => void, isOk: boolean = true): PopUp {
        let message: PopUp = Laya.loader.getRes(Config.prefabs.get("PopUp")).create();
        Laya.stage.addChild(message);
        message.Label.text = msg;
        message.open();

        if (!isOk) {
            message.ok.visible = false;
            message.no.x = 285;
            message.no.title.text = "确认";
            GameLog.log(msg);
        } else {
            message.ok.visible = true;
            message.no.x = 420;
        }

        message.ok.onClick = () => {
            message.close(() => { message.destroy() });
            if (ok_callback) ok_callback();
        }
        message.no.onClick = () => {
            message.close(() => { message.destroy() });
            if (no_callback) no_callback();
        }

        return message;
    }
}