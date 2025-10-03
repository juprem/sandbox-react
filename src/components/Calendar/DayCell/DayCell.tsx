import { useState } from 'react';
import styles from './DayCell.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { DayContent } from './DayContent/DayContent';
import { useGetAllRdvByDay } from '@service/calendarService';
import { stringToColour } from '../../../utils/colorOnString';

interface DayCellProps {
    day: Dayjs;
}

export function DayCell({ day }: DayCellProps) {
    const [open, setOpen] = useState(false);
    const { data: rdvs } = useGetAllRdvByDay(day);
    const isToday = dayjs().isSame(day, 'date');

    const onClose = () => setOpen(false);
    const onOpen = () => setOpen(true);

    return (
        <>
            <button onClick={onOpen} className={styles.dayContainer + (isToday ? ' ' + styles.today : '')}>
                <div className={styles.number}>{day.date()}</div>
                <div className={styles.rdvContainer}>
                    {rdvs?.map((rdv) => (
                        <div
                            key={rdv.id}
                            className={styles.rdv}
                            style={{
                                backgroundColor: stringToColour(rdv.name),
                            }}
                        />
                    ))}
                </div>
            </button>
            {open ? <DayContent open={open} onClose={onClose} /> : null}
        </>
    );
}
