export function* getXRandom(nbRand: number) {
    const buf = new Uint32Array(1);

    for (let i = 0; i < nbRand; i++) {
        crypto.getRandomValues(buf);
        yield buf[0] / (0xffffffff + 1);
    }
}
