import { css } from '../../../styled-system/css';
import { LifeGame } from './LifeGame';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { Flex } from '../Flex/Flex';
import { Rules } from './Rules';

export function ConwayGame() {
    const [start, setStart] = useState(false);
    const [matrixSize, setMatrixSize] = useState(10);
    const [speed, setSpeed] = useState(1000);

    return (
        <div className={css({ color: 'white', margin: '1rem', overflow: 'auto' })}>
            <Flex gap="1rem">
                <div>Temps de résolu :</div>
                <Input
                    style={{ width: '200px' }}
                    onChange={(val) => setSpeed(Number(val.target.value))}
                    type="number"
                    defaultValue={1000}
                />
            </Flex>
            <Flex gap="1rem">
                <div>Taille de la grille :</div>
                <Input
                    style={{ width: '200px' }}
                    onChange={(val) => setMatrixSize(Number(val.target.value))}
                    type="number"
                    defaultValue={10}
                />
            </Flex>
            <Rules />
            <Button className={css({ marginBottom: '1rem' })} onClick={() => setStart(!start)}>
                Start
            </Button>
            <LifeGame matrixSize={matrixSize} key={matrixSize} start={start} speedResolve={speed} />
        </div>
    );
}
