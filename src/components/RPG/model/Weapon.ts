import type { Qualifier, StaticQualifier } from './Qualifier';

interface Weapon {
    name: string;
    attack: StaticQualifier<'ATTACK'>;
    attackSpeed: StaticQualifier<'ATTACK_SPEED'>;
    qualifiers: Qualifier[]
}

interface Armor {
    name: string;
    defense: StaticQualifier<'DEFENSE'>;
    hp: StaticQualifier<"HP">;
    qualifiers: Qualifier[];
}