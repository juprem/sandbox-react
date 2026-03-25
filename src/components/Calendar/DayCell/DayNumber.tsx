import styles from './DayCell.module.scss';

interface DayNumberProps {
  day: number;
}

export function DayNumber({ day }: DayNumberProps) {
  return <div className={styles.number}>{day}</div>;
}
