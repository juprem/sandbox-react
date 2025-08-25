// jrsinclair

type Iter<A> = Iterable<A>;

export function* fromIterable<A>(xs: Iter<A>) {
    for (const x of xs) yield x;
}

export function* unit<A>(a: A) {
    yield a;
}

export function* map<A, B>(f: (a: A) => B, xs: Iter<A>) {
    for (const x of xs) yield f(x);
}

export function* chain<A, B>(f: (a: A) => Iter<B>, xs: Iter<A>) {
    for (const x of xs) yield* f(x);
}

export const flatMap = chain;

export function join<A>(xs: Iter<Iter<A>>) {
    return chain((x) => x, xs);
}

export function ap<A, B>(fs: Iter<(a: A) => B>, xs: Iter<A>) {
    return chain((f) => map(f, xs), fs);
}

export function reduce<A, B>(r: (b: B, a: A) => B, init: B, xs: Iter<A>) {
    let b = init;
    for (const x of xs) b = r(b, x);
    return b;
}

export function find<X>(p: (x: X) => boolean, xs: Iter<X>): X | undefined {
    for (const x of xs) if (p(x)) return x;
}

export function* concat<A>(as: Iter<A>, bs: Iter<A>) {
    for (const a of as) yield a;
    for (const b of bs) yield b;
}

export function* empty<A>() {
    for (const x of [] as Iter<A>) yield x;
}

export function* filter<A>(p: (x: A) => boolean, xs: Iter<A>) {
    for (const x of xs) if (p(x)) yield x;
}

export function* take<A>(n: number, xs: Iter<A>) {
    let i = 0;
    for (const val of xs) {
        if (i >= n) return;
        yield val;
        i++;
    }
}

export function* drop<A>(n: number, xs: Iter<A>) {
    let i = 0;
    for (const val of xs) {
        if (i >= n) yield val;
        else i++;
    }
}

export function* genNat() {
    for (let i = 0; true; i++) yield i;
}

function memo<A, B>(f: (a: A) => B) {
    const memoCache = new Map();
    return (x: A): B => {
        if (!memoCache.has(x)) memoCache.set(x, f(x));
        return memoCache.get(x);
    };
}

const fib = memo(function fibonacci(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fib(n - 2) + fib(n - 1);
});

export const genFib = () => map(fib, genNat());

export function forEach<A>(f: (x: A) => unknown, xs: Iter<A>) {
    for (const x of xs) f(x);
}

export function head<A>(xs: Iter<A>) {
    return [...take(1, xs)][0];
}

export function tail<A>(xs: Iter<A>) {
    return drop(1, xs);
}

type Reducer<A, B> = (b: B, a: A) => B;
type Transducer<A, B, C> = (f: Reducer<A, B>) => Reducer<A, C>;

export function transduce<A, B, C>(
    transducer: Transducer<A, B, C>,
    reducer: Reducer<A, B>,
    init: C,
    xs: Iter<A>
) {
    return reduce(transducer(reducer), init, xs);
}

export function sequencePromise<A>(ps: Iter<Promise<A>>) {
    return reduce(
        (pOut, pIn) => pOut.then((g) => pIn.then((a) => concat(g, unit(a)))),
        Promise.resolve(empty() as Generator<A>),
        ps
    );
}

export function* zip<A, B>(as: Iter<A>, bs: Iter<B>): Generator<[A, B]> {
    let done = false;
    let resultA: IteratorResult<A>;
    let resultB: IteratorResult<B>;
    while (!done) {
        resultA = as[Symbol.iterator]().next();
        resultB = bs[Symbol.iterator]().next();
        yield [resultA.value, resultB.value];
        done = !!(resultA.done || resultB.done);
    }
}

export const zipWith = <A, B, C>(
    f: (a: A, B: B) => C,
    as: Iter<A>,
    bs: Iter<B>
) => {
    return map(([a, b]) => f(a, b), zip(as, bs));
};

export function* repeat<A>(val: A) {
    while (true) yield val;
}

export function replicate<A>(n: number, val: A) {
    return take(n, repeat(val));
}

export function* scanl<A, B>(r: (b: B, a: A) => B, init: B, xs: Iter<A>) {
    let b = init;
    yield b;
    for (const x of xs) {
        b = r(b, x);
        yield b;
    }
}

export function iterate<A>(f: (x: A) => A, a: A) {
    return drop(
        1,
        scanl((x) => f(x), a, repeat(a))
    );
}

export default {
    of: unit,
    unit,
    map,
    chain,
    flatMap,
    ap,
    reduce,
    concat,
    empty,
    filter,
    forEach,
    take,
    drop,
    zip,
    zipWith,
    transduce,
    sequencePromise,
    repeat,
    iterate,
    replicate,
    genFib,
    genNat
};
