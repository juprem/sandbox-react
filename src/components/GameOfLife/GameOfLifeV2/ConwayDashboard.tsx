import { ConwayGameV2 } from './ConwayGameV2';
import { Button, Input } from 'antd';
import styles from './ConwayDashbord.module.scss';
import { useDebounceState } from '@hooks/useDebounceState';
import { useState } from 'react';
import { ColorsPicker } from './ColorsPicker';

export function ConwayDashboard() {
    const [nbOfCellPerRow, ndnbOfCellPerRow, setNbOfCellPerRow] = useDebounceState(50);
    const [nbOfRow, ndnbOfRow, setNbOfRow] = useDebounceState(20);
    const [scale, ndscale, setScale] = useDebounceState(10);
    const [iterationPerSecond, nditerationPerSecond, setIterationPerSecond] = useDebounceState(10);
    const [colors, ndcolors, setColors] = useDebounceState(new Set(['#000000']));
    const [reset, setReset] = useState(false);

    return (
        <div>
            <ConwayGameV2
                nbOfCellPerRow={nbOfCellPerRow}
                nbOfRow={nbOfRow}
                iterationPerSecond={iterationPerSecond}
                scale={scale}
                colors={Array.from(colors)}
                key={`${nbOfCellPerRow}-${nbOfRow}-${iterationPerSecond}-${scale}-${reset}-${Array.from(colors).toString()}`}
            />
            <div className={styles.settings}>
                <Input
                    prefix="Nombre de cellule par ligne : "
                    value={ndnbOfCellPerRow}
                    onChange={(e) => setNbOfCellPerRow(+e.target.value)}
                    type="number"
                />
                <Input
                    prefix="Nombre de ligne : "
                    value={ndnbOfRow}
                    onChange={(e) => setNbOfRow(+e.target.value)}
                    type="number"
                />
                <Input
                    prefix="Iteration par seconde : "
                    value={nditerationPerSecond}
                    onChange={(e) => setIterationPerSecond(+e.target.value)}
                    type="number"
                />
                <Input
                    prefix="Taille des cellules : "
                    value={ndscale}
                    onChange={(e) => setScale(+e.target.value)}
                    type="number"
                />
                <ColorsPicker colors={ndcolors} setColors={setColors} />
                <Button onClick={() => setReset(!reset)}>Reset</Button>
            </div>
        </div>
    );
}
