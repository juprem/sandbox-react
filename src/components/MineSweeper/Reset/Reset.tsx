import { GridActorContext } from '../statusHandling/gridStatushandling';
import { Button } from 'antd';

export function Reset() {
    const actorRef = GridActorContext.useActorRef();

    return <Button onClick={() => actorRef.send({ type: 'reset' })}>Reset</Button>;
}
