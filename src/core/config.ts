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
    static async load_config() {
        // 配置文件路径列表
        const jsonArr = [
            "resources/json/tbachieve.json",
            "resources/json/tbmap_level.json",
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

    static sounds: Map<string, string> = new Map<string, string>();
    // 初始化加载声音资源
    static async load_sound() {
        // 预加载所有音效资源
        this.sounds.set("bgm", "resources/sound/bgm.mp3");
        this.sounds.set("ui_anniu", "resources/sound/ui_anniu.mp3");
        this.sounds.set("ui_anniu2", "resources/sound/ui_anniu2.mp3");
        this.sounds.set("att", "resources/sound/att.mp3");
        this.sounds.set("def", "resources/sound/def.mp3");
        this.sounds.set("die", "resources/sound/die.mp3");
        this.sounds.set("upgrade", "resources/sound/upgrade.mp3");
        this.sounds.set("win", "resources/sound/win.mp3");
        this.sounds.set("battle_bgm", "resources/sound/battle_bgm.mp3");

        await Laya.loader.load(Array.from(this.sounds.values()));
    }

    static prefabs: Map<string, string> = new Map<string, string>();

    static async load_prefab() {
        // 加载所有prefab资源
        this.prefabs.set("PopUp", "resources/prefab/PopUp.lh");
        this.prefabs.set("Damage", "resources/prefab/Damage.lh");

        await Laya.loader.load(Array.from(this.prefabs.values()));
    }
}

export let skill_rate: number = 0.2; // 获得技能概率
export let bossData = {
    attackRate: 1.2, // boss攻击倍数
    defenceRate: 1.2, // boss防御倍数
    healthRate: 2, // boss血量倍数
}
// 计算公式，数值修正
export let shift_config = {
    role_shift: 1.05, // 角色数值修正量
    power_shift: 10, // 战斗力数值修正量（为了好看）
    zhongzu_shift: 0.1, // 种族数值修正量
}
// 根据稀有度击杀足够数量可解锁角色
export let killCount = [100, 150, 200];
// 根据稀有度获得进化所需等级
export let jinhua_need = [10, 20, 30, 40, 45, 50, 55, 60, 65];

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

export let xinximoban = {
    zhandou: {
        kaishi: "----------开始战斗----------",
        jineng1: `<font color='${color_config.xinximoban.player}'>你使用了技能·<font color='${color_config.xinximoban.skill}'>*</font>,&</font>`,
        jineng2: `<font color='${color_config.xinximoban.enemy}'>^使用了技能·<font color='${color_config.xinximoban.skill}'>*</font>,&</font>`,
        shanbi1: `<font color='${color_config.xinximoban.player}'>你闪避了!</font>`,
        shanbi2: `<font color='${color_config.xinximoban.enemy}'>*闪避了!</font>`,
        gedang1: `<font color='${color_config.xinximoban.player}'>你格挡了!</font>`,
        gedang2: `<font color='${color_config.xinximoban.enemy}'>*格挡了!</font>`,
        huihe1: `<font color='${color_config.xinximoban.player}'>你对*发动了攻击,造成了<font color='${color_config.xinximoban.shanghai}'>&</font>点伤害.</font>`,
        huihe2: `<font color='${color_config.xinximoban.enemy}'>*对你发动了攻击,造成了<font color='${color_config.xinximoban.shanghai}'>&</font>点伤害.</font>`,
        huifu1: `<font color='${color_config.xinximoban.player}'>你恢复了<font color='${color_config.xinximoban.huixue}'>&</font>点生命.</font>`,
        huifu2: `<font color='${color_config.xinximoban.enemy}'>*恢复了<font color='${color_config.xinximoban.huixue}'>&</font>点生命.</font>`,
        siwang1: `你吞噬了*.`,
        siwang2: `*吞噬了你.`,
        jieshu: "----------战斗结束----------",
        taopao: `你逃出生天!`
    },
    qianjin: "你遇到了{0},{1},{2}!",
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
    buzu: "<font color='#FF0000'>等级不足</font>"
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

export let tishi = [
    "拟态失败有可能死亡，拟态需谨慎",
    "转生3次后，史莱姆会获得专属技能“解析”",
    "拟态时，属性匹配度越高、属性值越高成功率越高",
    "自动战斗可不一定是什么好事",
    "偷偷说一下，人族非常厉害",
    "淬炼可以让属性变得更纯粹",
    "拟态只会拟态成灵属性最高或无属性的生物",
    "已解锁的图鉴会给史莱姆提供属性加成",
    "等级超过99级后升级获得的属性会大幅下降",
    "所有生物20%概率吞噬敌人获得新的技能",
    "转生超过99次、199次后转生获得的属性会大幅下降",
]