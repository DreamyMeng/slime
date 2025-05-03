export interface RoleLevel {
    id: number;
    need: number; // XP required to level up
    exp: number;  // XP gained on death
    attack: number;
    defence: number;
    health: number;
}

/**
 * Calculates role level attributes for a given level ID using formulas.
 * @param id The level (1 to 250 or higher)
 * @returns RoleLevel object with calculated attributes
 */
export function getRoleLevelAttributes(id: number): RoleLevel {
    if (id < 1) throw new Error("Level ID must be at least 1");

    let need: number;
    let exp: number;
    let attack: number;
    let defence: number;
    let health: number;

    if (id <= 99) {
        // Levels 1 to 99: Linear growth for need and exp, exponential for attributes
        need = 50 * (id - 1) + 100;
        exp = 5 * (id - 1) + 50;
        attack = Math.round(1000 * Math.pow(1.1, id - 1));
        defence = Math.round(500 * Math.pow(1.1, id - 1));
        health = Math.round(5000 * Math.pow(1.1, id - 1));
    } else {
        // Levels 100+: Exponential growth with adjusted rates
        // Base values at level 99
        let baseNeed = 5000; // need at level 99
        let baseExp = 540;   // exp at level 99
        let baseAttack = 11387094; // attack at level 99
        let baseDefence = 5702813; // defence at level 99
        let baseHealth = 56947219; // health at level 99

        // Growth rates for levels 100+
        need = Math.round(baseNeed * Math.pow(1.05, id - 99));
        exp = Math.round(baseExp * Math.pow(1.05, id - 99));
        attack = Math.round(baseAttack * Math.pow(1.01, id - 99));
        defence = Math.round(baseDefence * Math.pow(1.01, id - 99));
        health = Math.round(baseHealth * Math.pow(1.01, id - 99));
    }

    return { id, need, exp, attack, defence, health };
}

// Example usage: Generate attributes for a specific level
function printLevelAttributes(level: number): void {
    const attrs = getRoleLevelAttributes(level);
    console.log(`Level ${attrs.id}:`);
    console.log(`  Need: ${attrs.need} XP`);
    console.log(`  Exp: ${attrs.exp} XP`);
    console.log(`  Attack: ${attrs.attack}`);
    console.log(`  Defence: ${attrs.defence}`);
    console.log(`  Health: ${attrs.health}`);
}

// Test for a few levels
// printLevelAttributes(1);
// printLevelAttributes(50);
// printLevelAttributes(99);
// printLevelAttributes(100);
// printLevelAttributes(150);
// printLevelAttributes(250);