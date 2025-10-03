import { Button } from 'antd';
import { MonthHeader } from './MonthHeader';
import { WeekHeader } from './WeekHeader';
import styles from './Header.module.scss';
import { useCalendarStore } from '../store/useCalendarStore';

export function CalendarHeader() {
    const mode = useCalendarStore((state) => state.mode);
    const changeMode = useCalendarStore((state) => state.changeMode);

    return (
        <div className={styles.container}>
            {mode == 'week' ? <WeekHeader /> : <MonthHeader />}
            <Button onClick={changeMode}>{mode == 'week' ? 'Mois' : 'Semaine'}</Button>
        </div>
    );
}
