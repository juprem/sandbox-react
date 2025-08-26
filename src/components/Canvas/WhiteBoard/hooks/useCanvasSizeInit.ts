import { useEffect, useRef } from 'react';
import { WhiteBoardStateContext } from '../stateManager/WhiteBoardState';

export function useCanvasSizeInit() {
    const ref = useRef<HTMLDivElement>(null);
    const actorRef = WhiteBoardStateContext.useActorRef();

    useEffect(() => {
        const canvas = document.querySelector('canvas');

        if (canvas && ref.current) {
            canvas.width = ref.current.offsetWidth;
            canvas.height = ref.current.offsetHeight;
            actorRef.send({ type: 'initCanvas', newCanvas: canvas });
        }
    }, []);

    return ref;
}
