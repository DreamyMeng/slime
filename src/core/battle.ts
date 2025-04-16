// Battle.ts
import { SkillTrigger } from '../table/schema';
import { Main } from '../ui/Main';
import { RoleView } from '../ui/RoleView';
import { BuffMgr } from './buff';
import { BaseRole } from './role';
import { SkillMgr } from './skill';
import { delay, GameLog } from './utils';

export class Battle {
    player: BaseRole;
    enemy: BaseRole;
    static damage: number = 0;// 每轮攻击造成的伤害
    escape: boolean = false; // 是否逃跑

    constructor() {
        this.player = new BaseRole('player', Main.instance.Player.getComponent(RoleView)); // 创建玩家角色实例
        this.enemy = new BaseRole('enemy', Main.instance.Enemy.getComponent(RoleView)); // 创建敌人角色实例
        this.player.target = this.enemy; // 设置玩家的目标为敌人
        this.enemy.target = this.player; // 设置敌人的目标为玩家
    }

    async start(): Promise<void> {
        this.player.health.reset();
        this.enemy.health.reset();

        GameLog.log("Battle starts!");
        this.escape = false; // 重置逃跑标志
        let role = this.player;
        let target = this.enemy;

        // 开始战斗
        role.dispatchAsync(SkillTrigger.ready.toString());
        target.dispatchAsync(SkillTrigger.ready.toString());

        role.dispatchAsync(SkillTrigger.start.toString());
        target.dispatchAsync(SkillTrigger.start.toString());

        await delay(200);

        while (!this.escape && (role.isAlive() && target.isAlive())) {
            GameLog.log(`${role.camp} Turn!`);
            // // 更新自身 Buff
            // role.buff.updateBuffs();
            // // 如果被控制（如眩晕），跳过行动
            // if (role.buff.stats.get('skip')) {
            //     GameLog.log(`${role.camp} is stunned and skips the turn.`);
            // } else
            Battle.damage = 0;
            await role.round(target);

            BuffMgr.clearTemp(); // 清除临时buff
            // switch role and target
            [role, target] = [target, role];
        }

        if (this.escape) {
            GameLog.log('Player escapes the battle!');
        } else {
            const winner = this.player.isAlive() ? 'Player' : 'Enemy';
            GameLog.log(`${winner} wins the battle!`);

            // 处理胜利失败逻辑
        }

        SkillMgr.clear(); // 清除技能
        BuffMgr.clear(); // 清除buff
        this.player.clear(); // 清除玩家
        this.enemy.clear(); // 清除敌人

        Main.instance.show_map();
    }

}
