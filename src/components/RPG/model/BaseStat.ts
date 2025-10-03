export type StatType = 'HP' | 'ATTACK' | 'DEFENSE' | 'ATTACK_SPEED';
export type EntityType = 'PLAYER' | 'MONSTER'

export class BaseState {
    public totalAmount = 0;

    constructor(
        public type: StatType,
        public flatAmount: number,
        public percentMultiplicator: number,
    ) {
        this.totalAmount = flatAmount + flatAmount * (percentMultiplicator / 100);
    }

    setFlatAmount(amount: number) {
        this.flatAmount += amount;
    }

    setPercentMultiplicator(amount: number) {
        this.percentMultiplicator += amount;
    }
}


export abstract class BaseEntity {
    public currentHP = 0;

    protected constructor(
        public entityType: EntityType,
        public hp = new BaseState('HP', 10, 0),
        public attack = new BaseState('ATTACK', 1, 0),
        public defense = new BaseState('DEFENSE', 1, 0),
        public attackSpeed = new BaseState('ATTACK_SPEED', 1, 0),
        public isAlive = true,
    ) {
        this.currentHP = hp.totalAmount
    }

    abstract calculateDamageTaken(attackDamage: number): void
}