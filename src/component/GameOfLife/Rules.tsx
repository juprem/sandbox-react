// interface RulesProps {}

import { css } from '../../../styled-system/css';
import { LifeGame } from './LifeGame.tsx';
import { Button, Input } from 'antd';
import { useState } from 'react';

export function Rules({ matrixSize }: { matrixSize: number }) {
    const [start, setStart] = useState(false);
    const [speed, setSpeed] = useState(1000);

    return (
        <div className={css({ color: 'black', marginLeft: '1rem', overflow: 'auto', marginBottom: "2rem" })}>
            <Input onChange={(val) => setSpeed(Number(val.target.value))} type="number" defaultValue={1000} />
            <span>
                À chaque itération, l'état d’une cellule est entièrement déterminé par l’état de ses huit cellules
                voisines, selon les règles suivantes :
            </span>
            <li>
                Une cellule morte possédant exactement trois cellules voisines vivantes devient vivante (elle naît);
            </li>
            <li>Une cellule vivante possédant deux ou trois cellules voisines vivantes le reste, sinon elle meurt.</li>
            <li>
                si une cellule a exactement trois voisines vivantes, elle est vivante à l’étape suivante. C’est le cas
                de la cellule verte dans la configuration de gauche ;
            </li>
            <li>
                si une cellule a exactement deux voisines vivantes, elle reste dans son état actuel à l’étape suivante.
                Dans le cas de la configuration de gauche, la cellule située entre les deux cellules vivantes reste
                morte à l’étape suivante ;
            </li>
            <li>
                si une cellule a strictement moins de deux ou strictement plus de trois voisines vivantes, elle est
                morte à l’étape suivante. C’est le cas de la cellule rouge dans la configuration de gauche.
            </li>
            <Button onClick={() => setStart(!start)}>Start</Button>
            <LifeGame matrixSize={matrixSize} key={matrixSize} start={start} speedResolve={speed} />
        </div>
    );
}
