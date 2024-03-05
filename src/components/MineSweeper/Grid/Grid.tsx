import { GridActorContext } from '../statusHandling/gridStatushandling';
import { Reset } from '../Reset/Reset';
import { GridContent } from './GridContent';
import { Difficulty } from '../Difficulty/Difficulty';

export function Grid() {
    return (
        <GridActorContext.Provider>
            <GridContent />
            <Reset />
            <Difficulty />
        </GridActorContext.Provider>
    );
}
