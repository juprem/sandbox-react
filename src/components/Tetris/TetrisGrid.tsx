import { css } from '@styled-system/css';
import { displayForm, gameOver, getNewForm, GridCell, hasHitFormOrBottomOnDown, rotate } from './utils/formManager';
import { useEffect, useState } from 'react';
import { useEventListener } from '@hooks/useEventListener';
import { usePositionReducer } from './positionReducer';
import { NextFormGrid } from './NextFormGrid';
import { Button } from 'antd';

const bigGrid = Array.from(
    { length: 20 * 15 },
    (_, i): GridCell => [i % 15, Math.trunc(i / 15), 'whitesmoke'] as const,
);

const movingForm = (pos: () => void, speed: number) => setInterval(() => pos(), speed);

export function TetrisGrid() {
    const [state, dispatch] = usePositionReducer();
    const [forms, setForms] = useState({
        current: getNewForm(),
        next: getNewForm(),
    });
    const [grid, setGrid] = useState(bigGrid);
    const [stop, setStop] = useState(false);
    const [speed, setSpeed] = useState(1000);

    useEventListener({
        eventListeners: [
            {
                eventType: 'keyup',
                listener: (event) => {
                    if (event.key === 'ArrowDown') {
                        setSpeed(1000);
                    }
                },
            },
            {
                eventType: 'keydown',
                listener: (event) => {
                    if (event.key === 'ArrowLeft') {
                        dispatch({ action: 'left', grid, form: forms.current });
                    }
                    if (event.key === 'ArrowRight') {
                        dispatch({ action: 'right', grid, form: forms.current });
                    }
                    if (event.key === 'ArrowDown') {
                        setSpeed(100);
                    }
                    if (event.key === 'r') {
                        setForms((prev) => ({ ...prev, current: rotate(prev.current, state.position) }));
                    }
                },
            },
        ],
    });
    useEffect(() => {
        const intervalId = stop ? 0 : movingForm(() => dispatch({ action: 'down', form: forms.current, grid }), speed);

        return () => clearInterval(intervalId);
    }, [speed, stop]);

    const gridWithForm = displayForm(grid, forms.current, state.position);

    if (!stop && hasHitFormOrBottomOnDown(state.position, forms.current.matrix, grid) && state.lastTick === 2) {
        setGrid(gridWithForm);
        if (gameOver(gridWithForm)) {
            setStop(true);
        } else {
            dispatch({ action: 'initial' });
            setForms((prev) => ({ current: prev.next, next: getNewForm() }));
        }
    }

    return (
        <>
            <NextFormGrid nextForm={forms.next} />
            <div
                className={css({
                    display: 'grid',
                })}
                style={{ gridTemplateColumns: `repeat(${15}, 30px)` }}
            >
                {gridWithForm.map((it) => (
                    <div
                        key={it.toString()}
                        style={{
                            backgroundColor: it[2],
                        }}
                        className={css({
                            height: '30px',
                            width: '30x',
                            border: '1px solid lightgray',
                        })}
                    />
                ))}
            </div>
            <Button
                onClick={() => {
                    setGrid(bigGrid);
                    setStop(false);
                }}
            >
                Reset
            </Button>
        </>
    );
}
