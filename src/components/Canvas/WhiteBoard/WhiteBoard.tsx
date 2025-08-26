import { CanvasDrawing } from './CanvasDrawing';
import { WhiteBoardStateContext } from './stateManager/WhiteBoardState';

export function WhiteBoard() {
    return (
        <WhiteBoardStateContext.Provider>
            <CanvasDrawing />
        </WhiteBoardStateContext.Provider>
    );
}
