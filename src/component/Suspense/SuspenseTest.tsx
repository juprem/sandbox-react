// interface SuspenseTestProps {}

import { Suspense } from 'react';

export function SuspenseTest() {
    return <Suspense fallback={<div>Loading...</div>}></Suspense>;
}
