export interface Form {
    name: string;
    matrix: [number, number][];
    color: `#${string}`;
}

export const line: Form = {
    name: 'line',
    matrix: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
    ],
    color: `#770abc`,
};

export const t: Form = {
    name: 't',
    matrix: [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
    ],
    color: `#ead02b`,
};

export const l: Form = {
    name: 'l',
    matrix: [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
    ],
    color: `#47cf0e`,
};

export const square: Form = {
    name: 'square',
    matrix: [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
    ],
    color: `#0d24bd`,
};

export const s: Form = {
    name: 's',
    matrix: [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
    ],
    color: `#c30606`,
};

export const reverseS: Form = {
    name: 'reverseS',
    matrix: [
        [0, 1],
        [1, 1],
        [1, 0],
        [2, 0],
    ],
    color: `#d38608`,
};

export const allForm = [t, s, reverseS, l, square, line];