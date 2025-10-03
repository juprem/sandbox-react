type TypeOfList<T> = T extends Array<infer R> ? R : T;

interface A {
    id?: string;
    label: string;
    objet?: {
        firstName: string[];
        lastName: Array<{ essai: Array<{ toto: string }> }>;
    }[];
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type NextDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'STOP'];
type Inc<T> = T extends Digit ? NextDigit[T] : 'STOP';
type DotPrefix<T extends string | number | bigint | boolean> = T extends never ? never : `.${T}`;

type DeepKeyEnhanced<T, DEPTH = 0> = DEPTH extends 'STOP'
    ? ''
    : T extends object
      ? {
            [K in keyof T & string]: DEPTH extends 10
                ? `${K}`
                : Exclude<TypeOfList<T[K]>, undefined> extends object
                  ? `${K}${DotPrefix<DeepKeyEnhanced<TypeOfList<Exclude<T[K], undefined>>, Inc<DEPTH>>>}` | `${K}`
                  : `${K}`;
        }[keyof T & string]
      : '';

type W = DeepKeyEnhanced<A>;
