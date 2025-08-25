export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export const difficultyOptions: Record<Difficulty, string> = {
    EASY: 'facile',
    MEDIUM: 'normal',
    HARD: 'difficile',
};

export const difficultyReference: Record<Difficulty, number> = {
    HARD: 30,
    EASY: 10,
    MEDIUM: 20,
};