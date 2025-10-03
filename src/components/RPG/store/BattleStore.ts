import { assign, setup } from 'xstate';
import { Player } from '../model/Player';
import { Monster } from '../model/Monster';

interface BattleStoreContext {
    player: Player;
    monster: Monster;
}

const battleStore = setup({
    types: {
        context: {} as BattleStoreContext,
        events: {} as { type: 'attack' } | { type: 'init', newBattle: BattleStoreContext},
    },
    actions: {
        init: assign((_, params: BattleStoreContext) => {
            return { player: params.player, monster: params.monster };
        }),
    }
});
