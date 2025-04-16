import { Tables } from "../table/schema";

/**
 * 游戏配置管理类
 * 负责加载和管理所有游戏配置表数据
 */
export class Config {
    /** 静态配置表实例 */
    static table: Tables;

    /**
     * 异步加载所有JSON配置表
     * 加载顺序按照数组定义顺序执行
     */
    static async load() {
        // 配置文件路径列表
        let jsonArr = [
            "resources/json/tbachieve.json",
            "resources/json/tbmap_level.json",
            "resources/json/tbother.json",
            "resources/json/tbrebirth.json",
            "resources/json/tbrole.json",
            "resources/json/tbrole_level.json",
            "resources/json/tbskill.json",
        ]

        // 使用Laya加载器批量加载JSON
        await Laya.loader.load(jsonArr, Laya.Loader.JSON).then((json: Laya.TextResource[]) => {
            // 初始化配置表实例
            let index = 0;
            Config.table = new Tables(() => {
                return json[index++].data; // 顺序获取加载完成的配置数据
            });

            console.log("加载配置表成功！");
        }).catch((err) => {
            console.error("加载配置表失败", err);
        });

        // 清理加载器缓存
        jsonArr.forEach((res) => { Laya.loader.clearRes(res) });
    }
}

export let xinximoban = {
    zhandou: {
        kaishi: "--------开始战斗---------",
        jineng1: "你使用了技能*,&",
        jineng2: "*使用了技能&,^",

        shanbi1: "你闪避了*的攻击",
        shanbi2: "*闪避了你的攻击",
        baoji1: "你对*的攻击触发了暴击,造成了#点伤害.",
        baoji2: "*对你的攻击触发了暴击,造成了#点伤害.",
        huihe1: "你对*发动了攻击,造成了&点伤害.",
        huihe2: "*对你发动了攻击,造成了&点伤害.",
        huifu1: "你恢复了*点生命.",
        huifu2: "*恢复了&点生命.",

        siwang1: "你已经被*吞噬.",
        siwang2: "*已经被你吞噬.",
        jieshu: "--------战斗结束---------",
        taopao: "你逃出生天!"
    },
    qianjin: "你遇到了*,&,^!",
    zhandouli: "当前战斗力为:*.",
    shenru: "你来到第*层.",
    shengji: "你的等级为:*.",
    zhuansheng: "转生成功，属性成长提升.",
    cuilian: "淬炼成功，属性向拟态生物靠拢",
    jinhua: {
        chenggong: "拟态成功,拟态为*.",
        shibai1: "拟态失败,肉身崩坏死亡！",
        shibai2: "拟态失败，损失等级10级。"
    },
    tunshi: "你吞噬了*,解析成功获得技能&",
}

export let shuxing_config = {
    "chi": "齿",
    "hui": "喙",
    "lin": "鳞",
    "mao": "毛",
    "jia": "甲",
    "luo": "蠃",
    "yu": "羽",
    "zhao": "爪",
    "ti": "蹄",
    "jiao": "角",
    "zhi": "智"
}

export let color_config = {
    xinximoban: {
        shanghai: "#ff0200",
        huixue: "#5aff00",
        player: "#e1ffd5",
        enemy: "#ffe8e4",
        skill: "#fffe00",
    },
    pinzhi: {
        none: "#bfbfbf",
        ling: "#00b0f0",
        xian: "#ffff00",
        shen: "#ff0000",
    },
    name: {
        hui: "#bfbfbf",
        dian: "#bfbfbf",

        0: "#bfbfbf",
        1: "#ffffff",
        2: "#90ee90",
        3: "#06b400",
        4: "#8ea9db",
        5: "#00b0f0",
        6: "#7030a0",
        7: "#ffff00",
        8: "#ffc000",
        9: "#ff0000",
    },
}