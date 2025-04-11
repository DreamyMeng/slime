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
            "resources/json/tbrole.json",
            "resources/json/tbrole_level.json",
            "resources/json/tbskill.json",
        ]

        // 使用Laya加载器批量加载JSON
        await Laya.loader.load(jsonArr, Laya.Loader.JSON).then((json: Laya.TextResource[]) => {
            // 初始化配置表实例
            var index = 0;
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