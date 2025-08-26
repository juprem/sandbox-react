import { WhiteBoardStateContext } from '../stateManager/WhiteBoardState';

export function ColorControl() {
    const actorRef = WhiteBoardStateContext.useActorRef();

    return <input type="color" onChange={(val) => actorRef.send({ type: 'color', newColor: val.target.value })} />;
}
