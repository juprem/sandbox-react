import { Rules } from '../GameOfLife/Rules.tsx';
import { Input } from 'antd';
import { css } from '../../../styled-system/css';
import { useState } from 'react';

interface CrashTestProps {
    to: number;
}

export function CrashTest({ to }: CrashTestProps) {
    const [number, setNumber] = useState(0);
    console.log(to);

    return (
        <>
            <Input
                className={css({ width: '50px' })}
                onChange={(value) => setNumber(Number(value.target.value))}
                type="number"
            />
            <Rules matrixSize={number} />
        </>
    );
}
