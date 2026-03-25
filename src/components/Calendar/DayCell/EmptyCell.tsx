import styles from './DayCell.module.scss';
import { DayNumber } from './DayNumber';

interface EmptyCellProps {
  day?: number;
}

export function EmptyCell({ day }: EmptyCellProps) {
  return <div className={styles.dayContainer}>{day && <DayNumber day={day} />}</div>;
}
