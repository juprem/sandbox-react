type ObjectOfList<T> = T extends Array<unknown> ? never : T;

type DeepKeys<T> = T extends object
    ? {
        [K in keyof T & string]: T[K] extends object ? `${K}.${DeepKeys<ObjectOfList<T[K]>>}` | `${K}` : `${K}`;
    }[keyof T & string]
    : '';

type U = ObjectOfList<{ firstName: string }[]>;

interface A {
    id: string;
    label: string;
    objet: {
        firstName: string[];
        lastName: { essai: string }[];
    };
}

type X = DeepKeys<A>;
