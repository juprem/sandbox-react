import { css } from '@styled-system/css';
import { displayForm, gameOver } from './utils/formManager';
import { useEffect, useState } from 'react';
import { useEventListener } from '@hooks/useEventListener';
import { usePositionReducer } from './positionReducer';
import { NextFormGrid } from './NextFormGrid';
import { Button } from 'antd';

const movingForm = (pos: () => void, speed: number) => setInterval(() => pos(), speed);

export function TetrisGrid() {
    const [state, dispatch] = usePositionReducer();
    const [stop, setStop] = useState(false);
    const [speed, setSpeed] = useState(1000);

    useEventListener({
        eventType: 'keyup',
        listener: (event) => {
            if (event.key === 'ArrowDown') {
                setSpeed(1000);
            }
        },
    });
    useEventListener({
        eventType: 'keydown',
        listener: (event) => {
            if (event.key === 'ArrowLeft') {
                dispatch({ action: 'left' });
            }
            if (event.key === 'ArrowRight') {
                dispatch({ action: 'right' });
            }
            if (event.key === 'ArrowDown') {
                setSpeed(100);
            }
            if (event.key === 'r') {
                dispatch({ action: 'rotate' });
            }
        },
    })
    useEffect(() => {
        const intervalId = stop ? 0 : movingForm(() => dispatch({ action: 'down' }), speed);

        return () => clearInterval(intervalId);
    }, [speed, stop]);

    const gridWithForm = displayForm(state.grid, state.currentForm, state.position);

    if (!stop && state.lastTick === 2) {
        if (gameOver(gridWithForm)) {
            setStop(true);
        } else {
            dispatch({ action: 'initial', newGrid: gridWithForm });
        }
    }

    return (
        <>
            <NextFormGrid nextForm={state.nextForm} />
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
                            fontSize: 10,
                        })}
                    >
                        <div>{it[0]}</div>
                        <div>{it[1]}</div>
                    </div>
                ))}
            </div>
            <Button
                onClick={() => {
                    setStop(false);
                }}
            >
                Reset
            </Button>
            <Button
                onClick={() => {
                    setStop(!stop);
                }}
            >
                Pause
            </Button>
        </>
    );
}
