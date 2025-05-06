// Battle.ts
import * as utils from "../core/utils";
import * as cfg from "../table/schema";
import { Chengjiu } from "../ui/Chengjiu";
import { HPBar } from "../ui/HPBar";
import { Main } from '../ui/Main';
import { MessageBox } from '../ui/MessageBox';
import { RoleView } from '../ui/RoleView';
import { BuffMgr } from './buff';
import { bossData, Config, xinximoban } from './config';
import { getRoleLevelAttributes, RoleLevel } from "./level";
import { BaseRole } from './role';
import { Save } from './save';
import { SkillMgr } from './skill';

export class Battle {
    player: BaseRole;
    enemy: BaseRole;
    bossHp: HPBar;
    escape: boolean; // 是否逃跑
    draw: boolean; // 是否平局

    constructor() {
        this.bossHp = Main.instance.Battle.getComponent(HPBar);
        this.player = new BaseRole('player', Main.instance.Player.getComponent(RoleView)); // 创建玩家角色实例
        this.enemy = new BaseRole('enemy', Main.instance.Enemy.getComponent(RoleView)); // 创建敌人角色实例
        this.player.target = this.enemy; // 设置玩家的目标为敌人
        this.enemy.target = this.player; // 设置敌人的目标为玩家
    }

    init(id: string, level: number, isBoss: boolean): void {
        let playerData = Save.data.player;
        let roleData: cfg.role = Config.table.Tbrole.get(playerData.id);
        let levelData: RoleLevel = getRoleLevelAttributes(playerData.level);
        let rebirthData: cfg.rebirth = Config.table.Tbrebirth.get(Save.data.game.rebirth);
        let addition = Main.getAddition();
        let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
        let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
        let health = Main.getHealth(roleData, levelData, rebirthData, addition);

        this.player.init(attack, defence, health, roleData.skills.concat(playerData.skills));
        // this.player.init(attack, defence, health, ["koushui"]);
        // this.player.init(999999999999999, 999999999999999, 999999999999999, roleData.skills.concat(playerData.skills));

        let sceneData: cfg.map_level = Config.table.Tbmap_level.get(playerData.curScene);
        roleData = Config.table.Tbrole.get(id);
        levelData = getRoleLevelAttributes(level);
        attack = utils.toInt(levelData.attack * roleData.attackRate * sceneData.attackRate);
        defence = utils.toInt(levelData.defence * roleData.defenceRate * sceneData.defenceRate);
        health = utils.toInt(levelData.health * roleData.healthRate * sceneData.healthRate);

        if (isBoss) { // 是boss
            attack = utils.toInt(attack * bossData.attackRate);
            defence = utils.toInt(defence * bossData.defenceRate);
            health = utils.toInt(health * bossData.healthRate);
        }

        Main.instance.Enemy.getComponent(RoleView).show_skin(isBoss);
        this.bossHp.bg.visible = isBoss;
        this.enemy.init(attack, defence, health, roleData.skills, isBoss);
    }

    async start(): Promise<void> {
        utils.GameLog.log(xinximoban.zhandou.kaishi);
        let music = Config.sounds.get("battle_bgm");
        if (Laya.SoundManager._bgMusic !== music) Laya.SoundManager.playMusic(music);

        this.player.health.reset();
        this.enemy.health.reset();

        this.escape = false; // 重置逃跑标志
        this.draw = false; // 重置逃跑标志
        this.round_count = 0;
        let role = this.player;
        let target = this.enemy;

        // 开始战斗
        role.dispatchAsync(cfg.SkillTrigger.ready.toString());
        target.dispatchAsync(cfg.SkillTrigger.ready.toString());

        role.dispatchAsync(cfg.SkillTrigger.start.toString());
        target.dispatchAsync(cfg.SkillTrigger.start.toString());

        await utils.delay(200);

        this.round(role);
    }

    round_count: number = 0;

    async round(role: BaseRole): Promise<void> {
        if (role.camp === 'player') {
            this.round_count++;
            utils.GameLog.log(`第*回合`.toStr().replace('*', this.round_count.toString()));
            if (this.round_count > 100) {
                this.round_count = 0;
                this.draw = true;
            }
        }

        if (!this.escape && !this.draw && (role.isAlive() && role.target.isAlive())) {
            // console.log(`${role.camp} Turn!`);

            // // 更新自身 Buff
            // role.buff.updateBuffs();
            // // 如果被控制（如眩晕），跳过行动
            // if (role.buff.stats.get('skip')) {
            //     GameLog.log(`${role.camp} is stunned and skips the turn.`);
            // } else
            await role.round();

            // switch role and target
            // [role, target] = [target, role];
            return;
        }

        SkillMgr.clear(); // 清除技能
        BuffMgr.clear(); // 清除buff
        this.player.clear(); // 清除玩家
        this.enemy.clear(); // 清除敌人

        // await utils.delay(200);

        Main.instance.deal_battle_result();
    }

    victory(): void {
        let roleData = this.enemy.view.data;
        let level = this.enemy.view.level;
        let isBoss = this.enemy.isBoss;

        // MessageBox.tip(`战斗胜利！，吞噬：${Main.getRoleName(roleData)}`);
        Chengjiu.addCount('kill', roleData.id);

        let playerData = Save.data.player;
        playerData.scenes[playerData.curScene].count++;
        let levelData = getRoleLevelAttributes(level);

        Main.addExp(levelData.exp * roleData.expDead);
        Main.addValue(roleData);

        Main.instance.learn(roleData);// 获得技能

        if (isBoss) {
            MessageBox.tip("闯关成功！");
            playerData.scenes[playerData.curScene].pass = 1;
            playerData.maxScene = playerData.curScene;
            Chengjiu.addCount('map');
            Main.instance.update_map();
        }

        Main.instance.update_player();
    }
}
