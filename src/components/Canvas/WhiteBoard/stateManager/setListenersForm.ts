import { ListenersBoardState } from '../models/CanvasModel';

type ListenersSetter = {
    canvas: HTMLCanvasElement;
    color: string;
    abortController: AbortController;
};

export function setListenersForm(whiteBoard: ListenersBoardState): AbortController {
    const { form, color, canvas } = whiteBoard;

    const abortController = new AbortController();

    const listenerSetter = { canvas, color, abortController } satisfies ListenersSetter;

    if (form == 'LINE') {
        addLineListeners(listenerSetter);
    }

    if (form == 'SQUARE') {
        addSquareListeners(listenerSetter);
    }

    if (form == 'STRAIGHT_LINE') {
        addStraightLineListeners(listenerSetter);
    }

    return abortController;
}

function addSquareListeners({ canvas, color, abortController }: ListenersSetter) {
    const ctx = canvas.getContext('2d')!;

    canvas.addEventListener(
        'mousedown',
        (event) => {
            ctx.fillStyle = color;
            ctx.fillRect(event.offsetX, event.offsetY, 50, 50);
        },
        { signal: abortController.signal },
    );
}

function addStraightLineListeners({ canvas, color, abortController }: ListenersSetter) {
    const ctx = canvas.getContext('2d')!;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    const stopDrawing = (event: MouseEvent) => {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        ctx.closePath();
    };

    const startDraw = (event: MouseEvent) => {
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    };

    canvas.addEventListener('mousedown', startDraw, { signal: abortController.signal });
    canvas.addEventListener('mouseup', stopDrawing, { signal: abortController.signal });
}

function addLineListeners({ canvas, color, abortController }: ListenersSetter) {
    const ctx = canvas.getContext('2d')!;

    let isDrawing = false;

    const draw = (event: MouseEvent) => {
        if (!isDrawing) return;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    };

    const startDraw = (event: MouseEvent) => {
        isDrawing = true;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    };

    const stopDrawing = () => {
        isDrawing = false;
        ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDraw, { signal: abortController.signal });
    canvas.addEventListener('mousemove', draw, { signal: abortController.signal });
    canvas.addEventListener('mouseup', stopDrawing, { signal: abortController.signal });
    canvas.addEventListener('click', (e) => console.log(e), { signal: abortController.signal });
}
