import { Suspense } from 'react';

function memoize(fn: { (id: string): () => any; (arg0: any): any }) {
    const cache = new Map();
    return (...args: any) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            // @ts-ignore
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}

function wrapPromise(promise: Promise<string>) {
    let status = 'pending';
    let response: string | Error;

    const suspender = promise.then(
        (res) => {
            status = 'success';
            response = res;
        },
        (err) => {
            status = 'error';
            response = err;
        },
    );

    const handler = {
        pending: () => {
            throw suspender;
        },
        error: () => {
            throw response;
        },
    };

    // @ts-ignore
    console.log(handler[status]);

    // @ts-ignore
    return () => handler[status]?.() ?? response;
}

const getTime = memoize((id: string) =>
    wrapPromise(
        new Promise((resolve) => setTimeout(() => resolve(`${id} = started ${new Date().toLocaleTimeString()}`), 1000)),
    ),
);

function TimeFetcher({ id }: { id: string }) {
    const time = getTime(id);
    return <h2>{time()}</h2>;
}

export function React18Suspense() {
    return (
        <>
            <h1>React 18 - Simple</h1>
            <Suspense fallback={<h2>Top level suspense...</h2>}>
                <TimeFetcher id="time1" />
                <TimeFetcher id="time2" />
            </Suspense>
        </>
    );
}
