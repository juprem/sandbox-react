import styles from './DaysHeader.module.scss';

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function DaysHeader() {
    return (
        <div className={styles.dayContainer}>
            {days.map((day) => (
                <div style={{ height: 'fit-content' }} key={day}>
                    {day}
                </div>
            ))}
        </div>
    );
}
