import { assign, setup } from 'xstate';
import { Player } from '../model/Player';

const playerStore = setup({
    types: {
        context: {} as { player: Player },
        events: {} as { type: 'init' },
    },
    actions: {
        init: assign({
            player: () => new Player(),
        }),
    },
});
