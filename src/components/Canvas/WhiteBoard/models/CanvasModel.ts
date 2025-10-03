export type FormDrawing = 'LINE' | 'SQUARE' | 'STRAIGHT_LINE';

const formTranslate: Record<FormDrawing, string> = {
    LINE: 'Line',
    SQUARE: 'Square',
    STRAIGHT_LINE: 'Straight Line',
};

export const formOptions = Object.entries(formTranslate).map(([key, value]) => ({
    value: key,
    label: value,
}));

export type WhiteBoardState = {
    color: string;
    form: FormDrawing;
    canvas?: HTMLCanvasElement;
    abortController: AbortController;
};

export type RemoveNullable<T> = { [K in keyof T]-?: NonNullable<T[K]> };

export type ListenersBoardState = RemoveNullable<WhiteBoardState>;
