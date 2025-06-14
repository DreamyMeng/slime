const { regClass } = Laya;
import { Config } from "../../../core/config";
import { role } from "../../../table/schema";
import { RoleEditorBase } from "./RoleEditor.generated";

@regClass()
export class RoleEditor extends RoleEditorBase {
    roles: role[];

    onAwake() {
        this.roles = Config.table.Tbrole.getDataList();
        this.ComboBox.dataSource = this.roles;
        this.ComboBox.selectHandler = new Laya.Handler(this, this.onSelect);
    }

    onSelect(index: number) {
        let role = this.roles[index];

        console.log(role.name);
    }
}