import { BaseEntity } from './BaseStat';

export class Player extends BaseEntity {
    constructor() {
        super('PLAYER');
    }

    calculateDamageTaken(attackDamage: number) {
        const afterMitigatedDamage = attackDamage - this.defense.totalAmount;

        this.currentHP -= afterMitigatedDamage;

        if (this.currentHP <= 0) this.isAlive = false;
    }

    calcAttackSpeed = () => {
        if (this.attackSpeed.totalAmount <= 0) return 0;

        return 1000 / this.attackSpeed.totalAmount;
    };
}
