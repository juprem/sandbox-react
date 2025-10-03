import { useCalendarStore } from '../store/useCalendarStore';
import { Button } from 'antd';
import styles from './Header.module.scss';


export function WeekHeader() {
    const day = useCalendarStore((state) => state.day);
    const setWeek = useCalendarStore((state) => state.setWeek);
    const start = day.set('day', 1).format('DD MMMM');
    const end = day.set('day', 7).format('DD MMMM');

    return (
        <div className={styles.weekHeader}>
            <Button icon={'<'} type="text" onClick={() => setWeek('previous')} />
            <div className={styles.rangeWeek}>
                {start} - {end}
            </div>
            <Button icon={'>'} type="text" onClick={() => setWeek('next')} />
        </div>
    );
}