import styles from './CSSAmusement.module.scss';
import { Flex } from '../Flex/Flex';

export function HasSelector() {
    return (
        <Flex gap="1rem">
            <div className={styles.hasSelector}/>
            <div className={styles.hasSelector}>
                <div />
            </div>
        </Flex>
    );
}
