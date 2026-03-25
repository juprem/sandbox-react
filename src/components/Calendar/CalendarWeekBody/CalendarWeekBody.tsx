import { DaysHeader } from '../DaysHeader/DaysHeader';
import { useCalendarStore } from '../store/useCalendarStore';
import { constructWeek } from '../utils/constructWeek';
import { DayCell } from '../DayCell/DayCell';
import styles from './CalendarWeekBody.module.scss';
import { DayContext } from '../hooks/dayContext';
import { Suspense } from 'react';

export function CalendarWeekBody() {
    const day = useCalendarStore((state) => state.day);
    const allWeekDay = constructWeek(day);

    return (
      <>
        <DaysHeader />
        <div className={styles.weekContainer}>
          {allWeekDay.map((day) => (
            <DayContext.Provider key={day.toString()} value={{ day }}>
              <Suspense fallback={null}>
                <DayCell key={day.toString()} day={day} />
              </Suspense>
            </DayContext.Provider>
          ))}
        </div>
      </>
    );
}
