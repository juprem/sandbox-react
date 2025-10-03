import styles from './Hours.module.scss';
import { HourSection } from './HourSection/HourSection';
import { useEffect } from 'react';
import { Rdv } from '../../../../model/CalendarModel';
import { getColoredMultipleCalendar } from './utils/constructDayRdvs';

interface HoursProps {
    rdvs: Rdv[];
}

const hours = Array.from({ length: 24 }, (_, i) => i);

export function Hours({ rdvs }: HoursProps) {
    useEffect(() => {
        document.getElementById('7')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const t = getColoredMultipleCalendar(rdvs);

    const arr = Array.from({ length: t.length }, (_, i) => i);

    return (
        <div className={styles.calendarContainer}>
            {arr.map((i) => (
                <div className={styles.container} key={i}>
                    {hours.map((hour) => (
                        <HourSection key={`${hour}-${i}`} hour={hour} coloredQuarter={t[i]} calendarIndex={i} />
                    ))}
                </div>
            ))}
        </div>
    );
}
