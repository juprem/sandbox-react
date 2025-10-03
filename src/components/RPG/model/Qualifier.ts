import type { StatType } from './BaseStat';

type QualifierModificator = 'percent' | 'flat';

export interface Qualifier {
    type: StatType;
    amount: number;
    modifier: QualifierModificator;
}

export interface StaticQualifier<T extends StatType> {
    type: T;
    amount: number;
    modifier: QualifierModificator;
}
