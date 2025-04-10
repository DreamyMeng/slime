import { Tables } from "../table/schema";

export class Config {
    static table: Tables;

    static async load() {
        let jsonArr = [
            "resources/json/tbachieve.json",
            "resources/json/tbmap_level.json",
            "resources/json/tbother.json",
            "resources/json/tbrole.json",
            "resources/json/tbrole_level.json",
            "resources/json/tbskill.json",
        ]

        await Laya.loader.load(jsonArr, Laya.Loader.JSON).then((json: Laya.TextResource[]) => {
            // 处理加载的 JSON 数据
            var index = 0;
            Config.table = new Tables(() => {
                return json[index++].data;
            });

            console.log("加载配置表成功！");
        }).catch((err) => {
            console.error("加载配置表失败", err);
        });

        // 加载完成后释放资源
        jsonArr.forEach((res) => { Laya.loader.clearRes(res) });
    }
}