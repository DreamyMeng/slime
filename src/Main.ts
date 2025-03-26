import { Tables } from "./table/schema";

export async function main() {
    console.log("Hello, world!");

    let table: Tables;

    await Laya.loader.load("resources/json/tbdemo.json").then((json: Laya.TextResource) => {
        table = new Tables(() => {
            return json.data;
        });
        console.log('加载配置表成功')
    });

    let hero = table.Tbdemo.get(1001);

    console.log(hero.name);
}