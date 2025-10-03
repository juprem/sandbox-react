import styles from './HourSection.module.scss';

interface HourSectionProps {
    hour: number;
    coloredQuarter: { color: string; name: string }[];
    calendarIndex: number;
}

const quarter = Array.from({ length: 4 }, (_, i) => i);

export function HourSection({ hour, coloredQuarter, calendarIndex }: HourSectionProps) {
    const isFirstCalendar = calendarIndex == 0;
    const quarterStyle = isFirstCalendar ? styles.quartersContainer : styles.quartersContainerFull;

    return (
        <div id={hour.toString()} className={styles.container}>
            {isFirstCalendar ? <span className={styles.hour}>{hour}</span> : null}
            <div className={quarterStyle}>
                <div className={styles.line} />
                {quarter.map((q) => (
                    <div className={styles.quarterContainer} key={q}>
                        <span className={styles.name}>{coloredQuarter[4 * hour + q].name}</span>
                        <div
                            className={styles.quarter}
                            style={{ backgroundColor: coloredQuarter[4 * hour + q].color ?? '' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
