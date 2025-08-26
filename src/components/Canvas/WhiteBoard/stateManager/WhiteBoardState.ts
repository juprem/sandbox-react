import { createActorContext } from '@xstate/react';
import { assign, setup } from 'xstate';
import { FormDrawing, WhiteBoardState } from '../models/CanvasModel';
import { setListenersForm } from './setListenersForm';

const whiteBoardState = setup({
    types: {
        context: {} as WhiteBoardState,
        events: {} as
            | { type: 'color'; newColor: string }
            | { type: 'form'; newForm: FormDrawing }
            | {
                  type: 'initCanvas';
                  newCanvas: HTMLCanvasElement;
              },
    },
    actions: {
        color: assign(({ context }, params: string) => {
            const { canvas, abortController } = context;

            if (!canvas) {
                return {};
            }

            abortController.abort();

            const newAbort = setListenersForm({ ...context, color: params, canvas });

            return { color: params, abortController: newAbort };
        }),
        form: assign(({ context }, params: FormDrawing) => {
            const { canvas, abortController } = context;

            if (!canvas) {
                return {};
            }

            abortController.abort();

            const newAbort = setListenersForm({ ...context, form: params, canvas });

            return { form: params, abortController: newAbort };
        }),
        initCanvas: assign(({ context }, params: HTMLCanvasElement) => {
            const { abortController } = context;

            abortController.abort();

            const newAbort = setListenersForm({ ...context, canvas: params });

            return { canvas: params, abortController: newAbort };
        }),
    },
}).createMachine({
    context: { color: 'black', form: 'LINE', canvas: undefined, abortController: new AbortController() },
    on: {
        color: {
            actions: {
                type: 'color',
                params: ({ event }) => event.newColor,
            },
        },
        form: {
            actions: {
                type: 'form',
                params: ({ event }) => event.newForm,
            },
        },
        initCanvas: {
            actions: {
                type: 'initCanvas',
                params: ({ event }) => event.newCanvas,
            },
        },
    },
});

export const WhiteBoardStateContext = createActorContext(whiteBoardState);
