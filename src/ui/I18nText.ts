const { regClass } = Laya;

@regClass()
export class I18nText extends Laya.Script {
    declare owner: Laya.Text;

    onAwake(): void {
        this.owner.text = this.owner.text.toStr();
    }
}