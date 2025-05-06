import { SkillTrigger, SkillType } from "../table/schema";
import { DamagePool } from "../ui/DamagePool";
import { Main } from "../ui/Main";
import { RoleView } from "../ui/RoleView";
import { BuffMgr } from "./buff";
import { color_config, Config, xinximoban } from "./config";
import { EventDispatcher } from "./event";
import { SkillMgr } from "./skill";
import { GameLog, getValueStr, toInt } from "./utils";

export class BaseRole extends EventDispatcher {
    camp: string;
    health: Health;
    attack: Attribute;
    defence: Attribute;
    target: BaseRole;
    hurt: number = 0; // 造成伤害的倍率
    bear: number = 0; // 承受伤害的倍率
    isBoss: boolean = false; // 是否是boss
    damage: number = 0;

    constructor(camp: string, public view: RoleView) {
        super();
        this.camp = camp;
        this.view.role = this;
        this.health = new Health((cur, per) => {
            console.log(this.camp, ' health remain:', cur, per);
            view.hpBar?.setValue(per);
            if (this.isBoss) Main.instance.battle.bossHp?.setValue(per);
            GameLog.log(`${Main.getRoleName(this.view.data)} ` + '当前生命值:'.toStr() + getValueStr(cur));
        });
        this.attack = new Attribute((cur, max) => {
            // console.log(this.camp, ' attack change:', cur - max, ' remian:', cur);
            GameLog.log(`${Main.getRoleName(this.view.data)} ` + '当前攻击力:'.toStr() + getValueStr(cur));
        });
        this.defence = new Attribute((cur, max) => {
            // console.log(this.camp, ' defence change:', cur - max, ' remian:', cur);
            GameLog.log(`${Main.getRoleName(this.view.data)} ` + '当前防御力:'.toStr() + getValueStr(cur));
        });
    }

    clear(): void {
        // this.view.hpBar.setValue(1, false);
        this.offAll(); // 移除所有事件监听
    }

    init(attack: number, defence: number, health: number, skills: string[], isBoss: boolean = false): void {
        this.isBoss = isBoss;
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

    async round(): Promise<void> {
        if (BuffMgr.is(this, SkillType.skip)) {
            Main.instance.battle.round(this.target);
            return;
        }

        this.hurt = 0;
        this.damage = 0; // 重置伤害数
        this.target.bear = 0;
        await this.dispatchAsync(SkillTrigger.round.toString());

        await this.dispatchAsync(SkillTrigger.attack.toString());
        await this.target.dispatchAsync(SkillTrigger.hit.toString());

        await this.dispatchAsync(SkillTrigger.attacking.toString());
        await this.target.dispatchAsync(SkillTrigger.hitting.toString());

        if (BuffMgr.is(this, SkillType.abandon)) Main.instance.battle.round(this.target);
        else this.view.play_anim(this.camp);
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

    attackAction(): void {

        Laya.SoundManager.playSound(Config.sounds.get("att" + toInt(Math.random() * 3)));

        let target = this.target;
        let miss = false;
        if (BuffMgr.is(target, SkillType.miss)) {
            console.log(`${target.camp} miss!`);
            if (BuffMgr.is(this, SkillType.hit)) console.log(`${this.camp} hit!`);
            else miss = true;
        }

        if (BuffMgr.is(this, SkillType.replace)) {
            console.log(`${this.camp} replace!`);
            target = target.target;
        }

        // damage action
        // await this.attackAnimation(() => {
        this.damage = toInt(target.getDamage(this.attack.value) * (1 + this.hurt) * (1 + target.bear));
        this.damage = Math.max(0, this.damage);
        if (miss || this.damage === 0) {
            Laya.SoundManager.playSound(Config.sounds.get("def" + toInt(Math.random() * 3)));
            if (miss) {
                DamagePool.showDodge(target.view);
                let str;
                if (target.camp === 'player') str = xinximoban.zhandou.shanbi1.toStr().replace('{p}', color_config.xinximoban.player);
                else {
                    str = xinximoban.zhandou.shanbi2.toStr().replace('{e}', color_config.xinximoban.enemy);
                    str = str.replace('*', Main.getRoleName(target.view.data));
                }
                GameLog.log(str, false); // 闪避
            }
            else {
                DamagePool.showBlock(target.view);
                let str;
                if (target.camp === 'player') str = xinximoban.zhandou.gedang1.toStr().replace('{p}', color_config.xinximoban.player);
                else {
                    str = xinximoban.zhandou.gedang2.toStr().replace('{e}', color_config.xinximoban.enemy);
                    str = str.replace('*', Main.getRoleName(target.view.data));
                }
                GameLog.log(str, false); // 闪避
            }
        } else {
            console.log(`${this.camp} attacks ${target.camp}! damage: ${this.damage}`);
            target.takeDamage(this, target, -this.damage);
        }
        // });

        this.dispatchAsync(SkillTrigger.attacked.toString());
        if (!miss) target.dispatchAsync(SkillTrigger.hitted.toString());
    }

    // damage_action() {
    //     Battle.damage = toInt(target.getDamage(this.attack.value) * (1 + this.hurt) * (1 + target.bear));
    //     GameLog.log(`${this.camp} attacks ${target.camp}! damage: ${Battle.damage}`);
    //     target.takeDamage(Battle.damage);
    // }

    getDamage(damage: number): number {
        return Math.max(0, damage - this.defence.value);
    }

    takeDamage(owner: BaseRole, target: BaseRole, damage: number): void {
        if (damage === 0) return;

        if (damage > 0) {
            DamagePool.showHeal(damage, this.view);
            let str;
            if (owner.camp === 'player') str = xinximoban.zhandou.huifu1.toStr().replace('{p}', color_config.xinximoban.player).replace('{s}', color_config.xinximoban.huixue);
            else {
                str = xinximoban.zhandou.huifu2.toStr().replace('{e}', color_config.xinximoban.enemy).replace('{s}', color_config.xinximoban.huixue);
                str = str.replace('*', Main.getRoleName(owner.view.data));
            }
            str = str.replace('&', getValueStr(damage));
            GameLog.log(str, false);
        }
        if (damage < 0) {
            DamagePool.showDamage(damage, this.view);
            let str;
            if (owner.camp === 'player') {
                str = xinximoban.zhandou.huihe1.toStr().replace('{p}', color_config.xinximoban.player).replace('{s}', color_config.xinximoban.shanghai);
                str = str.replace('*', Main.getRoleName(target.view.data));
            }
            else {
                str = xinximoban.zhandou.huihe2.toStr().replace('{e}', color_config.xinximoban.enemy).replace('{s}', color_config.xinximoban.shanghai);
                str = str.replace('*', Main.getRoleName(owner.view.data));
            }
            str = str.replace('&', getValueStr(Math.abs(damage)));
            GameLog.log(str, false);
        }

        this.health.add(damage);
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
        // if (this.cur < 0) this.cur = 0;
        if (this.callback) this.callback(this.cur, this.max);
    }

    get value(): number {
        // return Math.max(0, this.cur);
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