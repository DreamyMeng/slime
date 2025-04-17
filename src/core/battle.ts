// Battle.ts
import { role, SkillTrigger } from '../table/schema';
import { Main } from '../ui/Main';
import { MessageBox } from '../ui/MessageBox';
import { RoleView } from '../ui/RoleView';
import { BuffMgr } from './buff';
import { Config } from './config';
import { BaseRole } from './role';
import { Save } from './save';
import { SkillMgr } from './skill';
import { delay, GameLog } from './utils';

export class Battle {
    player: BaseRole;
    enemy: BaseRole;
    static damage: number = 0;// 每轮攻击造成的伤害
    escape: boolean = false; // 是否逃跑
    static skill_rate: number = 0.2; // 获得技能概率

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
            GameLog.log('player escapes the battle!');
        } else {
            // 处理胜利失败逻辑
            if (this.player.isAlive()) {
                GameLog.log(`${this.player.camp} wins the battle!`);
                this.victory(this.enemy.view.data, this.enemy.view.level, this.enemy.view.isBoss);
            } else {
                GameLog.log(`${this.enemy.camp} wins the battle!`);
            }
        }

        SkillMgr.clear(); // 清除技能
        BuffMgr.clear(); // 清除buff
        this.player.clear(); // 清除玩家
        this.enemy.clear(); // 清除敌人

        Main.instance.show_map();
    }

    victory(roleData: role, level: number, boss: boolean): void {
        MessageBox.tip(`战斗胜利！，吞噬：${Main.getRoleName(roleData)}`);

        // CollectionScene.addCount(CollectionType.other, id);

        let playerData = Save.data.player;
        playerData.scenes[playerData.curScene].count++;
        let levelData = Config.table.Tbrole_level.get(level);

        Main.addExp(levelData.exp * roleData.expDead);
        Main.addValue(roleData);

        Main.learn(roleData);// 获得技能

        Main.instance.update_player();

        // if (Battle.isAuto) {
        //     // 自动战斗逻辑
        //     var sceneData = Config.getSceneConfig(parseInt(Config.save.player.curScene.level));
        //     var id = Main.getMonsterByScene(sceneData);
        //     var roleData = Config.getRoleConfig(id);
        //     var levelData = Config.getLevelConfig(Enemy.getLevel(sceneData));
        //     var attack = toInt(levelData.roleAttribute.attack * roleData.attribute.attack * sceneData.roleAttribute.attack);
        //     var defence = toInt(levelData.roleAttribute.defence * roleData.attribute.defence * sceneData.roleAttribute.defence);
        //     var health = toInt(levelData.roleAttribute.health * roleData.attribute.health * sceneData.roleAttribute.health);
        //     var level = levelData.id;
        //     this.onShow(true, (view, role) => {
        //         view.Name.text = Config.getRoleName(roleData);
        //         view.setLevel(level);
        //         role.level = level;
        //         role.isBoss = false;
        //         role.init(roleData.id, attack, defence, health, roleData.skillList);
        //     });
        //     return;
        // }

        // 如果是boss，胜利后将直接进入下一关
        // 解锁tip，最大值限制
        // if (boss) {
        //     MessageBox.tip("闯关成功！");
        //     // 解锁最大值
        //     Config.save.player.scenes[curScene.level].pass = true;
        //     var max = Math.min(parseInt(curScene.max) + 1, Config.tables.Tbscene.getDataList().length);
        //     curScene.max = max.toString();
        //     CollectionScene.addCount(CollectionType.level);
        //     Main.instance.forward();

        //     // 地图解锁
        //     Config.tables.Tbmap.getDataList().forEach((item) => {
        //         if (max >= item.unlock) {
        //             if (!Config.save.player.map[item.id]) {
        //                 Config.save.player.map[item.id] = true;
        //                 MessageBox.show(`解锁地图：<font color=${item.color}>${item.id}</font>`, null, null, true);
        //             }
        //         }
        //     });
        // }
    }
}
