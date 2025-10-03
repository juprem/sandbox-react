import { DisplayMode } from '../model/DisplayMode';
import { DayDisplayMode } from './DayDisplayMode';
import { AddRdv } from '../AddRdv/AddRdv';
import { Suspense } from 'react';

interface DayContentBodyProps {
    mode: DisplayMode;
}

export function DayContentBody({ mode }: DayContentBodyProps) {
    if (mode == 'display') {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <DayDisplayMode />
            </Suspense>
        );
    }

    if (mode == 'add') {
        return <AddRdv />;
    }

    return <>No Display</>;
}
