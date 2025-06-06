// Skill.ts
import { map_level, role, skill, SkillType, Target } from '../table/schema';
import { Main } from '../ui/Main';
import { BuffMgr } from './buff';
import { color_config, Config, xinximoban } from './config';
import { BaseRole } from './role';
import { Save } from './save';
import { GameLog, toInt } from './utils';

export interface TriggerCondition {
    check(role: BaseRole): boolean;
}

export function createCondition(data: skill): TriggerCondition {
    if (data.condition && data.condition.has('hp')) return new HealthCondition(data);
    return new ProbabilityCondition(data);
}

/**
 * 概率触发条件基类
 * 根据技能配置的触发概率进行随机判定
 */
export class ProbabilityCondition implements TriggerCondition {
    constructor(protected data: skill) { }

    check(_role: BaseRole): boolean {
        let random = Math.random();
        // console.log("random: ", random, "probability: ", this.data.rate);
        return random <= this.data.rate;
    }
}

/**
 * 血量触发条件
 * 当角色血量低于指定百分比时才有概率触发
 */
export class HealthCondition extends ProbabilityCondition {
    check(role: BaseRole): boolean {
        if (this.data.condition) {
            if (this.data.condition.has('hp')) {
                if (role.health.per <= this.data.condition.get('hp')) return super.check(role);
            }
        } else {
            return super.check(role);
        }
        return false;
    }
}

// 技能管理器 
// 增删改查
export class SkillMgr {
    /** 玩家技能列表 */
    static playerSkills: BaseSkill[] = [];
    /** 敌人技能列表 */
    static enemySkills: BaseSkill[] = [];

    /**
     * 获取对应阵营的技能列表
     * @param camp 阵营标识 ('player'/'enemy')
     */
    static getList(camp: string): BaseSkill[] {
        return camp == 'player' ? this.playerSkills : this.enemySkills;
    }

    /**
     *  创建技能
     *  根据技能类型创建技能
     *  @param owner 技能的拥有者
     *  @param data 技能的数据
     *  @returns 技能实例
     */
    static createSkill(owner: BaseRole, data: skill): BaseSkill {
        let skill;
        switch (data.type) {
            case SkillType.health: skill = new health(data, owner);
                break;
            case SkillType.revive: skill = new revive(data, owner);
                break;
            case SkillType.change: skill = new change(data, owner);
                break;
            case SkillType.damage: skill = new damage(data, owner);
                break;
            case SkillType.skill: skill = new GetSkill(data, owner);
                break;
            case SkillType.ban: skill = new ban(data, owner);
                break;
            case SkillType.learn: skill = new learn(data, owner);
                break;
            default:
                skill = new BaseSkill(data, owner); // 默认基础技能
                break;
        }
        this.getList(owner.camp).push(skill);
        return skill;
    }

    static clear() {
        this.playerSkills.length = 0;
        this.enemySkills.length = 0;
    }

    // static triggerSkill(owner: BaseRole, type: SkillTrigger) {
    //     this.getList(owner.camp).forEach(skill => {
    //         if (skill.data.trigger === type) {
    //             skill.onTrigger();
    //         }
    //     });
    // }
}
/**
 *  技能基类
 *  所有技能的基类，包含技能的名称、触发条件、效果等
 *  技能的触发条件和效果由子类实现
 *  技能的触发条件由角色触发，技能的效果由角色执行
 */
export class BaseSkill {
    name: string;
    condition: TriggerCondition;

    /**
     *  构造函数
     *  @param data 技能的数据
     *  @param owner 技能的拥有者
     *  @returns 技能实例
     */
    constructor(public data: skill, protected owner: BaseRole) {
        this.name = data.name;
        this.condition = createCondition(data);
        owner.on(data.trigger.toString(), this, this.onTrigger);
    }

    onTrigger() {
        // BuffMgr.updateBuffs(this.getTarget().camp + this.data.name);
        if (this.checkCondition()) this.trigger();
    }

    /**
     *  触发技能
     *  技能的触发条件由角色触发，技能的效果由技能实例执行
     */
    protected trigger(): void {
        if (this.data.buffRound === undefined) return;
        BuffMgr.addBuff(this.getTarget(), this.data);
    }

    checkCondition(): boolean {
        if (this.condition.check(this.owner)) {
            let str;
            if (this.owner.camp === 'player') str = xinximoban.zhandou.jineng1.toStr().replace('{p}', color_config.xinximoban.player).replace('{s}', color_config.xinximoban.skill);
            else {
                str = xinximoban.zhandou.jineng2.toStr().replace('{e}', color_config.xinximoban.enemy).replace('{s}', color_config.xinximoban.skill);
                str = str.replace('^', Main.getRoleName(this.owner.view.data));
            }
            str = str.replace('*', this.data.name.toStr());
            str = str.replace('&', this.data.effectStr.toStr());
            GameLog.log(str, false);
            return true;
        }

        return false;
    }

    /**
     * 
     *  获取目标
     *  根据目标类型获取目标
     *  @returns 目标角色
     */
    protected getTarget(): BaseRole {
        return this.data.target == Target.self ? this.owner : this.owner.target;
    }

    // 移除技能触发器，状态提示
    ban() {
        GameLog.log(`${Main.getRoleName(this.owner.view.data)} 禁用技能: ${this.name}`);
        this.owner.off(this.data.trigger.toString(), this, this.onTrigger);
    }
}

export class health extends BaseSkill {
    trigger(): void {
        let value = 0;
        let target = this.getTarget();
        if (this.data.values.has("1")) {
            let per = Number(this.data.values.get("1"));
            value = toInt(per * this.owner.attack.value);
            console.log(`${target.camp} health + ${value}`);
            target.takeDamage(this.owner, target, value);
        }
        if (this.data.values.has("2")) {
            let per = Number(this.data.values.get("2"));
            value = toInt(per * this.owner.damage);
            console.log(`${target.camp} health + ${value}`);
            target.takeDamage(this.owner, target, value);
        }
    }
}

export class revive extends BaseSkill {
    checkCondition(): boolean {
        if (!this.owner.isAlive()) {
            if (this.count < 1) {
                GameLog.log(`<font color='${color_config.xinximoban.skill}'>${this.data.name}</font>:` + `复活次数已用尽！`.toStr());
                return;
            }

            let str;
            if (this.owner.camp === 'player') str = xinximoban.zhandou.jineng1.toStr().replace('{p}', color_config.xinximoban.player).replace('{s}', color_config.xinximoban.skill);
            else {
                str = xinximoban.zhandou.jineng2.toStr().replace('{e}', color_config.xinximoban.enemy).replace('{s}', color_config.xinximoban.skill);
                str = str.replace('^', Main.getRoleName(this.owner.view.data));
            }
            str = str.replace('*', this.data.name.toStr());
            str = str.replace('&', this.data.effectStr.toStr());
            GameLog.log(str, false);
            return true;
        }

        return false;
    }

    count: number = 0;
    constructor(data: skill, owner: BaseRole) {
        super(data, owner);
        if (data.values.has("1")) {
            this.count = Number(data.values.get("1"));
        }
    }

    trigger(): void {
        this.count--;
        let target = this.getTarget();
        target.health.reset();
        BuffMgr.clearByRevive(target);
        console.log(`${target.camp} revive!`);
    }
}

export class change extends BaseSkill {
    trigger(): void {
        let target = this.getTarget();
        let temp = target.attack.value;
        target.attack.init(target.defence.value);
        target.defence.init(temp);
    }
}

export class damage extends BaseSkill {
    trigger(): void {
        let value = 0;
        let target = this.getTarget();

        if (this.data.values.has("1")) {
            value = Number(this.data.values.get("1"));
            target.hurt += value;
            console.log(`${target.camp} hurt + ${value}`);
        }
        if (this.data.values.has("2")) {
            value = Number(this.data.values.get("2"));
            target.bear += value;
            console.log(`${target.camp} bear + ${value}`);
        }
    }
}

export class ban extends BaseSkill {
    /**
     * 执行技能禁用逻辑：
     * 1. 随机选择指定数量技能
     * 2. 移除事件监听
     * 3. 从技能列表移除
     */
    trigger(): void {
        let value = 0;
        let target = this.getTarget();

        if (this.data.values.has("1")) {
            value = toInt(this.data.values.get("1"));
            let skills = SkillMgr.getList(target.camp);

            // 随机选择技能（不重复）
            const selected = this.getRandomSkills(skills, value);

            // 移除技能及其事件监听
            selected.forEach(skill => {
                // 从角色事件系统移除监听
                skill.ban();
                // 从技能管理器移除
                skills.splice(skills.indexOf(skill), 1);
            });
        }

    }
    /** 从数组随机获取n个不重复元素 */
    private getRandomSkills(arr: BaseSkill[], n: number): BaseSkill[] {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(n, shuffled.length));
    }
}

export class GetSkill extends BaseSkill {
    /**
     * 技能触发逻辑：
     * 1. 获取全部可用技能
     * 2. 过滤已拥有技能
     * 3. 随机选择指定数量
     * 4. 创建新技能实例
     */
    trigger(): void {
        let value = 0;
        let target = this.getTarget();

        if (this.data.values.has("1")) {
            value = Number(this.data.values.get("1"));
            let allSkills = Config.table.Tbskill.getDataList().map(s => s.id);
            let ownedSkills = SkillMgr.getList(target.camp);

            // 获取未拥有的技能
            const newSkills = GetSkill.getNewSkills(allSkills, ownedSkills, value);

            // 创建并添加新技能
            newSkills.forEach(id => {
                let skillData = Config.table.Tbskill.get(id);
                SkillMgr.createSkill(target, skillData);
                GameLog.log(`${Main.getRoleName(this.owner.view.data)} 获得技能: ${skillData.name}`);
            });
        }
    }

    /** 从全部技能中筛选未拥有的 */
    static getNewSkills(all: string[], owned: BaseSkill[], count: number): string[] {
        const ownedIds = new Set(owned.map(s => s.data.id));
        const available = all.filter(s => !ownedIds.has(s));

        // 随机选择指定数量的新技能
        return this.getRandomSkills(available, count);
    }

    /** 从数组随机获取n个不重复元素 */
    static getRandomSkills(arr: string[], n: number): string[] {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(n, shuffled.length));
    }
}

export class learn extends BaseSkill {
    /**
     * 特殊学习逻辑：
     * - 仅对敌方生效
     * - 根据层数进度解锁更多技能
     */
    trigger(): void {
        let value = 0;
        let target = this.getTarget();
        if (target.camp === 'player') return;

        let mapLevel = Save.data.player.curScene;
        let max = Config.table.Tbmap_level.getDataList().length;
        if (mapLevel > max) mapLevel = max;

        let allSkills: string[];
        let ownedSkills = SkillMgr.getList(target.camp);

        if (mapLevel > 100) {
            allSkills = Config.table.Tbskill.getDataList().map(s => s.id);
        } else {
            allSkills = [];
            for (let i = 1; i <= mapLevel; i++) {
                let sceneData: map_level = Config.table.Tbmap_level.get(i);
                for (const key in sceneData.monsters) {
                    if (!sceneData.monsters[key as keyof typeof sceneData.monsters]) continue;
                    let monster: role = Config.table.Tbrole.get(key);
                    for (const key in monster.skills) {
                        if (allSkills.indexOf(monster.skills[key]) === -1) {
                            allSkills.push(monster.skills[key]);
                        }
                    }
                }
            }
        }

        if (this.data.id === 'chimei') {
            if (this.data.values.has("2")) {
                let level = Save.data.player.curScene;
                console.log(`当前层数: ${level}`);
                value = level - 100;
                value = Math.max(1, Math.min(5, value)); // 确保 value 在 1 到 5 之间
            }
        } else {
            if (this.data.values.has("1")) {
                value = Number(this.data.values.get("1"));
            }
        }

        // 获取未拥有的技能
        const newSkills = GetSkill.getNewSkills(allSkills, ownedSkills, value);

        // 创建并添加新技能
        newSkills.forEach(id => {
            let skillData = Config.table.Tbskill.get(id);
            SkillMgr.createSkill(target, skillData);
            GameLog.log(`${Main.getRoleName(this.owner.view.data)} 获得技能: ${skillData.name}`);
        });
    }
}