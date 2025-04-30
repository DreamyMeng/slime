import { Config } from "../../core/config";
import { role, skill } from "../../table/schema";
import { SaveData_Endless } from "./save";

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
export function drawGacha(data: SaveData_Endless): any[] {
  const results: any[] = [];
  const ownedSkills = new Set(data.skills.concat(Config.table.Tbrole.get(data.id).skills));
  const ownedRoles = new Set(Object.keys(data.roles));
  while (results.length < 3) {
    const rewardType = drawRewardType();
    if (rewardType === "skill") {
      // 排除已有技能
      const pool = Config.table.Tbskill.getDataList().filter(s => !ownedSkills.has(s.id));
      if (pool.length === 0) {
        continue;
      }
      const rarity = drawRarity();
      const filtered = pool.filter(s => s.rarity === rarity);
      if (filtered.length === 0) {
        continue;
      }
      const idx = Math.floor(Math.random() * filtered.length);
      results.push({ type: "skill", value: filtered[idx] });
    } else if (rewardType === "role") {
      // 排除已有角色
      const pool = Config.table.Tbrole.getDataList().filter(r => !ownedRoles.has(r.id));
      if (pool.length === 0) {
        continue;
      }
      const rare = drawRoleRarity();
      const filtered = pool.filter(r => r.rare === rare);
      if (filtered.length === 0) {
        continue;
      }
      const idx = Math.floor(Math.random() * filtered.length);
      results.push({ type: "role", value: filtered[idx] });
    } else if (rewardType === "refresh") {
      results.push({ type: "refresh", value: drawRefreshCount() });
    } else {
      results.push({ type: "level", value: drawRefreshCount() }); // 这里可自定义level奖励
    }
  }
  return results;
}

// 奖励类型概率配置
const refreshCountRates = [
  { type: 1, rate: 0.8 },
  { type: 2, rate: 0.15 },
  { type: 3, rate: 0.05 },
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
export function drawSkill(owners: string[]): skill | null {
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
function drawCharacter(owners: { [key: string]: number }): role | null {
  const rare = drawRoleRarity();
  const pool = Config.table.Tbrole.getDataList().filter(r => r.rare === rare);
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}


// Function to calculate spawn weight based on rarity and level
function calculateWeight(rarity: number, level: number): number {
  // Base weight decreases with rarity to make common roles more likely at low levels
  const baseWeight = Math.max(1, 10 - rarity);
  // Level scaling: higher levels increase weight for rarer roles
  const levelFactor = Math.min(1 + level / 10, 5); // Caps at 5x weight
  // Rarity scaling: rarer roles get exponentially higher weights at higher levels
  const rarityFactor = Math.pow(1.5, rarity) * (level / (level + 5));
  return baseWeight * levelFactor * (rarity <= 3 ? 1 : rarityFactor);
}

// Function to select a role based on weighted probabilities
function selectWeightedRole(roles: role[], level: number): role {
  // Calculate weights for all roles
  const weights = roles.map(role => calculateWeight(role.rare, level));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  // Generate a random value between 0 and totalWeight
  let random = Math.random() * totalWeight;

  // Select role based on cumulative weight
  for (let i = 0; i < roles.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return roles[i];
    }
  }
  // Fallback to last role (should rarely happen)
  return roles[roles.length - 1];
}

// Main function to spawn 3 unique roles
// 计算不同稀有度在当前level下的权重（平滑限制高低稀有度出现）
function getDynamicRarityWeights(level: number): number[] {
  // 稀有度范围1~9
  const minRare = 1, maxRare = 9;
  const weights: number[] = [];
  for (let rare = minRare; rare <= maxRare; rare++) {
    // 稀有度出现的等级区间（可根据实际调整）
    // 例如：稀有度3，10级开始出现，20级完全开放
    //      稀有度4，20级开始出现，35级完全开放
    //      稀有度5，35级开始出现，50级完全开放
    //      稀有度6，50级开始出现，65级完全开放
    //      稀有度7，65级开始出现，80级完全开放
    //      稀有度8，80级开始出现，95级完全开放
    //      稀有度9，95级开始出现，110级完全开放
    let appear = 0, full = 0;
    if (rare === 1) { appear = 1; full = 50; }
    else if (rare === 2) { appear = 1; full = 60; }
    else if (rare === 3) { appear = 10; full = 20; }
    else if (rare === 4) { appear = 20; full = 35; }
    else if (rare === 5) { appear = 35; full = 50; }
    else if (rare === 6) { appear = 50; full = 65; }
    else if (rare === 7) { appear = 65; full = 80; }
    else if (rare === 8) { appear = 80; full = 95; }
    else if (rare === 9) { appear = 95; full = 110; }

    // 低于出现等级，不出现
    if (level < appear) {
      weights.push(0);
      continue;
    }
    // 在出现到完全开放区间，线性插值
    let openRate = 1;
    if (level < full) {
      openRate = (level - appear) / (full - appear);
    }
    // 高等级逐步减少低稀有度
    let reduceLow = 1;
    if (rare === 1 && level > 80) {
      reduceLow = Math.max(0, 1 - (level - 80) / 40); // 120级时为0
    }
    if (rare === 2 && level > 100) {
      reduceLow = Math.max(0, 1 - (level - 100) / 40); // 140级时为0
    }
    // 基础权重
    const base = Math.max(0, 10 - rare);
    // 高稀有度随等级提升权重增加
    const growth = Math.pow(level / 100, rare * 0.8);
    weights.push((base * (1 - growth) + growth * rare * 2) * openRate * reduceLow);
  }
  return weights;
}

// 按权重抽取稀有度
function drawDynamicRarity(level: number): number {
  const weights = getDynamicRarityWeights(level);
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return i + 1; // 稀有度从1开始
  }
  return 9;
}

// 修改spawnMonsters，按动态稀有度抽取
export function spawnMonsters(level: number): string[] {
  if (level < 1) {
    throw new Error("Level must be at least 1");
  }

  const selectedRoles: string[] = [];
  const availableRoles = [...Config.table.Tbrole.getDataList()];

  for (let i = 0; i < 3; i++) {
    if (availableRoles.length === 0) break;

    // 动态抽取稀有度
    const rare = drawDynamicRarity(level);
    const pool = availableRoles.filter(r => r.rare === rare);
    if (pool.length === 0) continue;

    const idx = Math.floor(Math.random() * pool.length);
    const selected = pool[idx];
    selectedRoles.push(selected.id);

    // 移除已选
    const index = availableRoles.findIndex(role => role.id === selected.id);
    availableRoles.splice(index, 1);
  }

  return selectedRoles;
}
