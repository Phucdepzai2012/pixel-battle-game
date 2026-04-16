// game.js

// Character Classes
class Character {
    constructor(name, hp, skills) {
        this.name = name;
        this.hp = hp;
        this.skills = skills;
        this.currentCooldowns = {};
    }

    useSkill(skillName, target) {
        const skill = this.skills[skillName];
        if (!skill) {
            console.log(`${this.name} tried to use a non-existing skill: ${skillName}`);
            return;
        }

        if (this.currentCooldowns[skillName]) {
            console.log(`${skillName} is on cooldown!`);
            return;
        }

        // Calculate damage
        console.log(`${this.name} used ${skillName} on ${target.name}`);
        target.takeDamage(skill.damage);
        this.currentCooldowns[skillName] = skill.cooldown;

        // Start cooldown
        setTimeout(() => {
            delete this.currentCooldowns[skillName];
            console.log(`${skillName} is ready to use again!`);
        }, skill.cooldown * 1000);
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
        console.log(`${this.name} took ${damage} damage! Current HP: ${this.hp}`);
    }
}

// Sample Skills
const fireball = { damage: 30, cooldown: 5 };
const heal = { damage: -20, cooldown: 10 };

// Character Instances
const player = new Character('Hero', 100, { fireball, heal });
const enemy = new Character('Goblin', 50, { fireball });

// Basic Battle System
function battleRound() {
    player.useSkill('fireball', enemy);
    if (enemy.hp > 0) {
        enemy.useSkill('fireball', player);
    }

    if (player.hp <= 0) {
        console.log('Player has been defeated!');
    } else if (enemy.hp <= 0) {
        console.log('Enemy has been defeated!');
    }
}

// Simulating a battle
for (let i = 0; i < 5; i++) {
    console.log(`Round ${i + 1}`);
    battleRound();
}

// Basic Server Connection (Simulated)
function connectToServer() {
    console.log('Connecting to the game server...');
    // Simulate connection delay
    setTimeout(() => {
        console.log('Connected to the server!');
    }, 2000);
}

connectToServer();