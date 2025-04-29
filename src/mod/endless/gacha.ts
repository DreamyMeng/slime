import { Config } from "../../core/config";
import { role, skill } from "../../table/schema";

type RewardType = "skill" | "level" | "role" | "refresh";

// 奖励类型概率配置
const rewardTypeRates = [
  { type: "skill", rate: 0.35 },
  { type: "level", rate: 0.35 },
  { type: "role", rate: 0.1 },
  { type: "refresh", rate: 0.2 }
];

// 随机抽取奖励类型
function drawRewardType(): RewardType {
  const rand = Math.random();
  let acc = 0;
  for (const item of rewardTypeRates) {
    acc += item.rate;
    if (rand < acc) return item.type as RewardType;
  }
  return "skill";
}

// 主抽奖函数
export function drawGacha(): any[] {
  const results: any[] = [];
  for (let i = 0; i < 3; i++) {
    const rewardType = drawRewardType();
    if (rewardType === "skill") {
      results.push({ type: "skill", value: drawSkill() });
    } else if (rewardType === "role") {
      results.push({ type: "role", value: drawCharacter() });
    } else if (rewardType === "refresh") {
      results.push({ type: "refresh", value: drawRefreshCount() });
    } else if (rewardType === "level") {
      results.push({ type: "level", value: 1 }); // 这里可自定义level奖励
    }
  }

  return results;
}

// 奖励类型概率配置
const refreshCountRates = [
  { type: 1, rate: 0.6 },
  { type: 2, rate: 0.3 },
  { type: 3, rate: 0.1 },
];

function drawRefreshCount(): number {
  const rand = Math.random();
  let acc = 0;
  for (const item of refreshCountRates) {
    acc += item.rate;
    if (rand < acc) return item.type;
  }
  return 1;
}

// 稀有度概率配置（总和为1）
const rarityRates = [
  { rarity: 1, rate: 0.5 },
  { rarity: 2, rate: 0.3 },
  { rarity: 3, rate: 0.15 },
  { rarity: 4, rate: 0.04 },
  { rarity: 5, rate: 0.01 },
];

// 根据概率抽取稀有度
function drawRarity(): number {
  const rand = Math.random();
  let acc = 0;
  for (const item of rarityRates) {
    acc += item.rate;
    if (rand < acc) return item.rarity;
  }
  return rarityRates[rarityRates.length - 1].rarity;
}

// 从指定稀有度池中随机抽取一个skill
export function drawSkill(): skill | null {
  const rarity = drawRarity();
  const pool = Config.table.Tbskill.getDataList().filter(s => s.rarity === rarity);
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

// role稀有度概率配置（需根据实际需求调整，总和为1）
const roleRarityRates = [
  { rare: 1, rate: 0.3 },
  { rare: 2, rate: 0.18 },
  { rare: 3, rate: 0.15 },
  { rare: 4, rate: 0.12 },
  { rare: 5, rate: 0.1 },
  { rare: 6, rate: 0.08 },
  { rare: 7, rate: 0.04 },
  { rare: 8, rate: 0.02 },
  { rare: 9, rate: 0.01 }
];

// 根据概率抽取role稀有度
function drawRoleRarity(): number {
  const rand = Math.random();
  let acc = 0;
  for (const item of roleRarityRates) {
    acc += item.rate;
    if (rand < acc) return item.rare;
  }
  return roleRarityRates[roleRarityRates.length - 1].rare;
}

// 根据稀有度随机抽取一个role
function drawCharacter(): role | null {
  const rare = drawRoleRarity();
  const pool = Config.table.Tbrole.getDataList().filter(r => r.rare === rare);
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}
