import styles from './GameOfLifeV2/ConwayDashbord.module.scss';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useDebounceState } from '@hooks/useDebounceState';

interface ColorsPickerProps {
    colors: Set<string>;
    setColors: Dispatch<SetStateAction<Set<string>>>;
}

export function ColorsPicker({ colors, setColors }: ColorsPickerProps) {
    const [color, _, setColor] = useDebounceState('');

    useEffect(() => {
        if (color != '') {
            setColors((prev) => new Set([...prev, color]));
        }
    }, [color]);

    return (
        <div>
            <input type="color" onChange={(e) => setColor(e.target.value)} />
            <div className={styles.colorsPicker}>
                {Array.from(colors).map((color) => (
                    <button
                        onClick={() =>
                            setColors((prev) => {
                                prev.delete(color);
                                return new Set(prev);
                            })
                        }
                        key={color}
                        style={{ backgroundColor: color }}
                        className={styles.color}
                    >
                        {color}
                    </button>
                ))}
            </div>
        </div>
    );
}
