import { MessageBox } from "../ui/MessageBox";
import { MyButton } from "../ui/MyButton";
import { NewScript } from "./NewScript";

const { regClass, property } = Laya;

@regClass()
export class TestList extends Laya.Script {
    declare owner: Laya.List;

    show(data: any): void {
        let list = this.owner;
        list.scrollBar.autoHide = true;
        list.renderHandler?.clear();
        list.array = data;
        list.renderHandler = Laya.Handler.create(this, (node: Laya.Sprite, index: number) => {
            let value = data[index];
            (node.getChildAt(0).getChildAt(0) as Laya.Label).text = value.name;
            (node.getChildAt(0).getChildAt(1) as Laya.Label).text = `<font color='#ffffff' size=24>${value.count}</font>`;
            node.getChildAt(0).getComponent(NewScript).onClick = () => {
                MessageBox.tip(`点击了${value.name}`);
            }
        }, null, false);
    }

    onAwake(): void {
        this.show([{ name: '测试1', count: 100 }, { name: '测试2', count: 200 }, { name: '测试3', count: 300 },
        { name: '测试4', count: 400 }, { name: '测试5', count: 500 }, { name: '测试6', count: 600 }, { name: '测试7', count: 700 }
        , { name: '测试8', count: 800 }, { name: '测试9', count: 900 }, { name: '测试10', count: 1000 }
        ]);
    }
}