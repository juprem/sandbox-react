import { CustomModal } from '../CustomModal/CustomModal.tsx';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { basicShape, flex } from '../../styles/GlobalStyle.ts';
import { css } from '../../../styled-system/css';

interface CrashTestProps {
    to: number;
}

export function CrashTest({ to }: CrashTestProps) {
    console.log(to);

    return (
        <div className={css({ display: 'flex', flexDirection: 'column', height: '90vh' })}>
            <div className={css({ height: '160px', backgroundColor: 'orange', width: '100%' })}>
                First Content
            </div>
            <div className={css({ overflow: 'auto', width: '100%' })}>
                <div
                    className={css({
                        height: '10000px',
                        backgroundColor: 'blue',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    })}
                >
                    <div>Second Content</div>
                    <div>Second ContentBis</div>
                </div>
            </div>
        </div>
    );
}
