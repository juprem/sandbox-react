import { GridActorContext } from '../statusHandling/gridStatushandling';
import { GAME_STATUS } from '../statusHandling/changeStatus';

const status: Record<GAME_STATUS, string> = {
    WIN: 'You won!',
    GAME_OVER: 'Game Over',
    PLAYING: 'Playing',
};

export function GameStatus() {
    const gameStatus = GridActorContext.useSelector((state) => state.context.gameStatus);

    return <div>{status[gameStatus]}</div>;
}
