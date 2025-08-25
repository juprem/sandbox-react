import { GridActorContext } from '../statusHandling/gridStatushandling';
import { Reset } from '../Reset/Reset';
import { GridContent } from './GridContent';
import { DifficultySelector } from '../Difficulty/DifficultySelector';
import { GameStatus } from './GameStatus';

export function Grid() {
    return (
        <GridActorContext.Provider>
            <GridContent />
            <Reset />
            <DifficultySelector />
            <GameStatus />
        </GridActorContext.Provider>
    );
}
