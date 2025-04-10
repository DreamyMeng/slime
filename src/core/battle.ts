// Battle.ts
import { SkillTrigger } from '../table/schema';
import { BuffMgr } from './buff';
import { BaseRole } from './role';
import { GameLog } from './utils';

export class Battle {
    static damage: number = 0;// 每轮攻击造成的伤害

    constructor(private player: BaseRole, private enemy: BaseRole) {
        this.player.target = enemy; // 设置玩家的目标为敌人
        this.enemy.target = player; // 设置敌人的目标为玩家
    }

    async start(): Promise<void> {
        GameLog.log("Battle starts!");

        let role = this.player;
        let target = this.enemy;

        // 开始战斗
        role.dispatchAsync(SkillTrigger.ready.toString());
        target.dispatchAsync(SkillTrigger.ready.toString());

        role.dispatchAsync(SkillTrigger.start.toString());
        target.dispatchAsync(SkillTrigger.start.toString());

        while (role.isAlive() && target.isAlive()) {
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

        const winner = this.player.isAlive() ? 'Player' : 'Enemy';
        GameLog.log(`${winner} wins the battle!`);
        // this.dispatchAsync('battleEnd', this.player, this.enemy);
    }

}
