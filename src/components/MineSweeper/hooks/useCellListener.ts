import { useEffect, useRef } from 'react';
import { GridActorContext } from '../statusHandling/gridStatushandling';

interface CellListenerVariable {
    x: number;
    y: number;
}

export function useCellListener({ x, y }: CellListenerVariable) {
    const ref = useRef<HTMLDivElement>(null);
    const actorRef = GridActorContext.useActorRef();

    useEffect(() => {
        const abortController = new AbortController();

        ref.current?.addEventListener(
            'click',
            () => {
                actorRef.send({ type: 'changeStatus', newCellStatus: { x, y, status: 'REVEALED' } });
            },
            { signal: abortController.signal },
        );
        ref.current?.addEventListener(
            'contextmenu',
            (e) => {
                e.preventDefault();
                actorRef.send({ type: 'changeStatus', newCellStatus: { x, y, status: 'FLAGGED' } });
            },
            { signal: abortController.signal },
        );

        return () => {
            abortController.abort();
        };
    }, []);

    return ref;
}
