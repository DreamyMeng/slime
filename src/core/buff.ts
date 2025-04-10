// buff.ts
import { skill, SkillType } from "../table/schema";
import { BaseRole } from "./role";
import { GameLog, toInt } from "./utils";

/**
 * Buff管理系统
 * 负责管理四类buff存储：
 * 1. 玩家阵营buff
 * 2. 敌人阵营buff 
 * 3. 临时buff（回合结束时清除）
 * 4. 永久buff（常驻效果）
 * 使用Map结构存储按事件触发的buff分组
 */
export class BuffMgr {
    /** 玩家阵营的buff列表 */
    static playerBuff: BaseBuff[] = [];
    /** 敌人阵营的buff列表 */
    static enemyBuff: BaseBuff[] = [];
    /** 临时buff列表（每回合结束时清空） */
    static tempBuff: BaseBuff[] = [];
    /** 永久生效的buff列表 */
    static permanentBuff: BaseBuff[] = [];
    /** 按触发条件分类的buff存储（键格式：阵营+触发类型） */
    static buffs: Map<string, BaseBuff[]> = new Map();

    /**
     * 根据阵营获取对应的buff列表
     * @param camp 阵营标识（'player'/'enemy'）
     * @returns 对应的buff数组
     */
    static getList(camp: string): BaseBuff[] {
        return camp == 'player' ? this.playerBuff : this.enemyBuff;
    }

    static getBuff(owner: BaseRole, data: skill): BaseBuff {
        let list = this.getList(owner.camp);
        return list.find(buff => buff.data.id === data.id) ?? null;
    }

    /**
     * 创建buff实例并存入对应阵营列表
     * @param owner buff持有者
     * @param data buff配置数据
     * @returns 创建的buff实例
     */
    static createBuff(owner: BaseRole, data: skill): BaseBuff {
        let buff;
        switch (data.type) {
            case SkillType.all:
                buff = new all(data, owner);  // 创建特定类型的buff
                break;
            default:
                buff = new BaseBuff(data, owner);  // 默认基础buff
                break;
        }
        this.getList(owner.camp).push(buff);
        return buff;
    }

    /**
     * 添加buff到对应的存储列表
     * @param role 作用目标角色
     * @param owner buff持有者
     * @param data buff配置数据
     */
    static addBuff(role: BaseRole, owner: BaseRole, data: skill) {
        if (data.buffRound === undefined) return;
        let buff = this.getBuff(owner, data);
        if (buff) {
            if (buff.reapply()) return;
        }

        buff = this.createBuff(owner, data);
        if (buff == null) return;
        buff.apply();
        if (data.buffRound === 0) {
            this.tempBuff.push(buff);
            return;
        }
        else if (data.buffRound === -1) {
            this.permanentBuff.push(buff);
            return;
        }

        let key = role.camp + data.trigger;
        if (!this.buffs.has(key)) {
            this.buffs.set(key, []);
        }
        this.buffs.get(key).push(buff);
    }

    /**
     * 从指定阵营列表中移除特定buff
     * @param owner 持有者角色（用于确定阵营）
     * @param buff 要移除的buff实例
     */
    static removeBuffByOwner(owner: BaseRole, buff: BaseBuff) {
        let list = this.getList(owner.camp);
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i] === buff) {
                list.splice(i, 1);
                break;
            }
        }
    }

    static is(owner: BaseRole, type: SkillType): boolean {
        return this.getList(owner.camp)?.some(buff => buff.type === type) ?? false;
    }

    static clearTemp() {
        if (this.tempBuff.length === 0) return;
        this.tempBuff.forEach(buff => buff.remove());
        this.tempBuff.length = 0;// 清空数组
    }

    static clearByRevive(owner: BaseRole) {
        this.clearTemp();

        // 清理buffs Map中的记录
        for (const [key, buffs] of this.buffs) {
            this.buffs.set(key, buffs.filter((b: BaseBuff) => {
                if (b.owner === owner) {
                    b.remove();
                    return false;
                }
                return true;
            }));
        }
    }

    static updateBuffs(key: string) {
        if (this.buffs.has(key)) {
            const currentBuffs = this.buffs.get(key)!;
            const toRemove = new Set<BaseBuff>();

            // 第一阶段：检测需要移除的buff
            for (const buff of currentBuffs) {
                if (buff.updateBuffs()) {
                    toRemove.add(buff);
                }
            }

            // 第二阶段：批量移除过期buff
            if (toRemove.size > 0) {
                this.buffs.set(key, currentBuffs.filter(b => !toRemove.has(b)));
            }
        }
    }
    //   static updateBuffs(key: string) {
    //         if (this.buffs.has(key)) {
    //             for (let buff of this.buffs.get(key)) {
    //                 if (buff.updateBuffs()) this.buffs.set(key, this.buffs.get(key).filter(b => b !== buff));
    //             }
    //         }
    //     }
}

/**
 * Buff基类
 * 定义buff的基础属性和生命周期方法
 */
export class BaseBuff {
    /** buff名称 */
    name: string;
    /** 剩余生效回合数 */
    duration: number;
    /** buff类型 */
    type: SkillType;

    /**
     * 初始化基础属性
     * @param data 配置表数据
     * @param owner 持有者角色
     */
    constructor(public data: skill, public owner: BaseRole) {
        this.name = data.name;
        this.duration = data.buffRound;
        this.type = data.type;
        GameLog.log(`${this.name} created with duration: ${this.duration} `);
    }

    /** 应用buff效果（子类实现） */
    apply(): void { };

    /** 移除buff的通用逻辑 */
    remove(): void {
        GameLog.log(`${this.name} removed from ${this.owner.camp} `);
        BuffMgr.removeBuffByOwner(this.owner, this);
    };

    reapply(): boolean {
        this.duration = this.data.buffRound;
        return true;
    }

    /**
     * 更新buff状态
     * @returns 是否需要移除（true表示已过期）
     */
    updateBuffs(): boolean {
        this.duration--;
        GameLog.log(`${this.name} remaining duration: ${this.duration} `);
        if (this.duration <= 0) {
            this.remove();
            return true;
        }
        return false;
    };
}

/**
 * 全能型buff实现
 * 包含攻击和防御加成的复合型buff
 */
export class all extends BaseBuff {
    /** 攻击力加成值 */
    attack: number = 0;
    /** 防御力加成值 */
    defence: number = 0;

    /**
     * 应用百分比加成的属性效果
     */
    apply() {
        GameLog.log(`Applying ${this.name} to ${this.owner.camp} `);
        if (this.data.values.has("1")) {
            let per = Number(this.data.values.get("1"));
            this.attack = toInt(per * this.owner.attack.value);
            GameLog.log(`${this.owner.camp} gains + ${this.attack} attack.`);
            this.owner.attack.add(this.attack);
        }
        if (this.data.values.has("2")) {
            let per = Number(this.data.values.get("2"));
            this.defence = toInt(per * this.owner.defence.value);
            GameLog.log(`${this.owner.camp} gains + ${this.defence} defence.`);
            this.owner.defence.add(this.defence);
        }
    }

    /**
     * 移除时还原属性加成
     */
    remove() {
        GameLog.log(`Removing ${this.name} from ${this.owner.camp} `);
        if (this.attack != 0) {
            this.owner.attack.add(-this.attack);
            GameLog.log(`${this.owner.camp} loses ${this.attack} attack.`);
        }
        if (this.defence != 0) {
            this.owner.defence.add(-this.defence);
            GameLog.log(`${this.owner.camp} loses ${this.defence} defence.`);
        }

        super.remove();
    }

    reapply(): boolean {
        if (this.data.buffRound > 0) return false;

        super.reapply();

        if (this.data.values.has("1")) {
            let temp = this.attack;
            let per = Number(this.data.values.get("1"));
            this.attack = toInt(per * this.owner.attack.value) + temp;
            GameLog.log(`${this.owner.camp} gains + ${this.attack} attack.`);
            this.owner.attack.add(-temp);
            this.owner.attack.add(this.attack);
        }
        if (this.data.values.has("2")) {
            let temp = this.defence;
            let per = Number(this.data.values.get("2"));
            this.defence = toInt(per * this.owner.defence.value) + temp;
            GameLog.log(`${this.owner.camp} gains + ${this.defence} defence.`);
            this.owner.defence.add(-temp);
            this.owner.defence.add(this.defence);
        }

        return true;
    }
}
