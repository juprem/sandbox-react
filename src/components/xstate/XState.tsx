import { createActorContext } from '@xstate/react';
import { Button } from 'antd';
import { assign, setup } from 'xstate';
import { basicShape, flex } from '../../styles/GlobalStyle';
import { motion } from 'framer-motion';

const countMachine = setup({
    types: {
        context: {} as { count: number; valBool: boolean },
        events: {} as { type: 'inc' } | { type: 'dec' } | { type: 'bool' },
    },
    actions: {
        increment: assign({
            count: ({ context }, params: number) => context.count + 1 + params,
        }),
        decrement: assign({
            count: ({ context }) => context.count - 1,
            valBool: ({ context }) => !context.valBool,
        }),
        changeBol: assign({
            valBool: ({ context }) => !context.valBool,
        }),
    },
}).createMachine({
    context: { count: 0, valBool: false },
    on: {
        inc: { actions: { type: 'increment', params: 3 } },
        dec: { actions: 'decrement' },
        bool: { actions: 'changeBol' },
    },
});

const CountMachineContext = createActorContext(countMachine);

export function XState() {
    return (
        <CountMachineContext.Provider>
            <div className={flex()}>
                <ActionButton />
                <DisplayCount />
            </div>
        </CountMachineContext.Provider>
    );
}

function ActionButton() {
    const actorRef = CountMachineContext.useActorRef();

    console.log('render action');

    return (
        <div className={flex()}>
            <motion.div className={basicShape()} animate={{ rotateZ: 360 }} />
            <Button onClick={() => actorRef.send({ type: 'inc' })}>INC</Button>
            <Button onClick={() => actorRef.send({ type: 'dec' })}>DEC</Button>
            <Button onClick={() => actorRef.send({ type: 'bool' })}>BOOL</Button>
        </div>
    );
}

function DisplayCount() {
    const count = CountMachineContext.useSelector((state) => state.context.count);

    console.log('render');
    return (
        <div className={flex()}>
            <motion.div className={basicShape()} animate={{ rotateZ: 360, transition: { duration: 2 } }} />
            {count}
        </div>
    );
}
