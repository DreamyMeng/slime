import { SkillTrigger, SkillType } from "../table/schema";
import { RoleView } from "../ui/RoleView";
import { Battle } from "./battle";
import { BuffMgr } from "./buff";
import { Config } from "./config";
import { EventDispatcher } from "./event";
import { SkillMgr } from "./skill";
import { delay, GameLog, toInt, tweenTo } from "./utils";

export class BaseRole extends EventDispatcher {
    camp: string;
    health: Health;
    attack: Attribute;
    defence: Attribute;
    target: BaseRole;
    hurt: number = 0; // 造成伤害的倍率
    bear: number = 0; // 承受伤害的倍率

    constructor(camp: string, protected view: RoleView) {
        super();
        this.camp = camp;
        this.health = new Health((cur, per) => {
            console.log(this.camp, ' health remain:', cur, per);
            view.hpBar?.setValue(per);
        });
        this.attack = new Attribute((cur, max) => {
            console.log(this.camp, ' attack change:', cur - max, ' remian:', cur);
        });
        this.defence = new Attribute((cur, max) => {
            console.log(this.camp, ' defence change:', cur - max, ' remian:', cur);
        });
    }

    clear(): void {
        this.health.reset();
        this.offAll(); // 移除所有事件监听
    }

    init(attack: number, defence: number, health: number, skills: string[]): void {
        this.attack.init(attack);
        this.defence.init(defence);
        this.health.init(health);

        for (let skill of skills) {
            let skillData = Config.table.Tbskill.get(skill);
            if (skillData) {
                console.log(`Skill ${skillData.name} created!`);
                SkillMgr.createSkill(this, skillData);
            } else {
                console.log(`Skill ${skill} not found!`);
            }
        }
    }

    async round(target: BaseRole): Promise<void> {
        if (BuffMgr.is(this, SkillType.skip)) {
            console.log(`${this.camp} skip!`);
            return;
        }

        this.hurt = 0;
        target.bear = 0;
        await this.dispatchAsync(SkillTrigger.round.toString());

        await this.dispatchAsync(SkillTrigger.attack.toString());
        await target.dispatchAsync(SkillTrigger.hit.toString());

        await this.dispatchAsync(SkillTrigger.attacking.toString());
        await target.dispatchAsync(SkillTrigger.hitting.toString());

        await this.attackAction(target);
    }

    // async attackAnimation(func: Function): Promise<void> {
    //     let owner = this.view.owner;
    //     owner.parent.setChildIndex(owner, owner.parent.numChildren - 1);
    //     await tweenTo(
    //         owner,
    //         { x: this.target.view.original_x, y: this.target.view.original_y },
    //         200,
    //         Laya.Ease.strongIn,
    //     );
    //     func();
    //     await tweenTo(
    //         owner,
    //         { x: this.view.original_x, y: this.view.original_y },
    //         200,
    //         Laya.Ease.strongOut
    //     );
    // }

    async attackAction(target: BaseRole): Promise<void> {
        if (BuffMgr.is(this, SkillType.abandon)) { console.log(`${this.camp} abandon!`); return; }
        if (BuffMgr.is(target, SkillType.miss)) {
            console.log(`${target.camp} miss!`);
            if (BuffMgr.is(this, SkillType.hit)) console.log(`${this.camp} hit!`);
            else return;
        }
        if (BuffMgr.is(this, SkillType.replace)) {
            console.log(`${this.camp} replace!`);
            target = target.target;
        }

        let owner = this.view.owner;
        owner.parent.setChildIndex(owner, owner.parent.numChildren - 1);
        this.view.play_anim(this.camp);
        await delay(200);
        // damage action
        // await this.attackAnimation(() => {
        Battle.damage = toInt(target.getDamage(this.attack.value) * (1 + this.hurt) * (1 + target.bear));
        GameLog.log(`${this.camp} attacks ${target.camp}! damage: ${Battle.damage}`);
        target.takeDamage(Battle.damage);
        // });

        await this.dispatchAsync(SkillTrigger.attacked.toString());
        await target.dispatchAsync(SkillTrigger.hitted.toString());
    }

    // damage_action() {
    //     Battle.damage = toInt(target.getDamage(this.attack.value) * (1 + this.hurt) * (1 + target.bear));
    //     GameLog.log(`${this.camp} attacks ${target.camp}! damage: ${Battle.damage}`);
    //     target.takeDamage(Battle.damage);
    // }

    getDamage(damage: number): number {
        return Math.max(0, damage - this.defence.value);
    }

    takeDamage(damage: number): void {
        if (damage === 0) return;
        this.health.add(-damage);
    }

    isAlive(): boolean {
        return this.health.value > 0;
    }
}

class Attribute {
    protected cur: number = 0;
    protected max: number = 0;
    callback: (cur: number, max?: number) => void;

    constructor(callback?: (cur: number, max?: number) => void) {
        this.callback = callback;
    }

    reset() {
        this.value = this.max;
    }

    init(v: number) {
        this.max = v;
        this.reset();
    }

    set value(v: number) {
        this.cur = v;
        if (this.cur < 0) this.cur = 0;
        if (this.callback) this.callback(this.cur, this.max);
    }

    get value(): number {
        return this.cur;
    }

    add(v: number): void {
        this.value += v;
    }

    getMax() {
        return this.max;
    }
}

class Health extends Attribute {
    per: number;

    set value(v: number) {
        this.cur = v;
        if (this.cur < 0) this.cur = 0;
        if (this.cur > this.max) this.cur = this.max;
        if (this.callback) this.callback(this.cur, this.per = this.cur / this.max);
    }

    get value(): number {
        return this.cur;
    }

    get original(): number {
        return this.max;
    }

    addMax(v: number): void {
        this.max += v;
        this.value += v;
    }
}