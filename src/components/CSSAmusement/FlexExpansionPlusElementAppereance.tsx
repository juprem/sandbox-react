import { useState } from 'react';
import styles from './CSSAmusement.module.scss';
import { Button } from 'antd';

export function FlexExpansionPlusElementAppereance() {
    const [rand, setRand] = useState('a');
    const [bool, setBool] = useState(false);

    return (
        <div className={styles.bigContainer}>
            <div className={styles.containerCell}>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
            </div>
            <Button onClick={() => setRand(crypto.randomUUID())}>Reset</Button>
            <Button onClick={() => setBool(!bool)}>Reset hidden</Button>
            {bool ? (
                <div key={rand} className={styles.starting}>
                    Success
                </div>
            ) : null}
        </div>
    );

}