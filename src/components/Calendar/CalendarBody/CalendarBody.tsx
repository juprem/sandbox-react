import { useCalendarStore } from '../store/useCalendarStore';
import { constructMonth } from '../utils/constructMonth';
import dayjs from 'dayjs';
import { DaysHeader } from '../DaysHeader/DaysHeader';
import { EmptyCell } from '../DayCell/EmptyCell';
import { DayCell } from '../DayCell/DayCell';
import styles from './CalendarBody.module.scss';
import { DayContext } from '../hooks/dayContext';
import { Suspense } from 'react';

export function CalendarBody() {
  const monthNumber = useCalendarStore((state) => state.month.index);
  const year = useCalendarStore((state) => state.year);
  const month = constructMonth(dayjs().set('month', monthNumber).set('year', year));

  return (
    <>
      <DaysHeader />
      <div className={styles.calendarContainer}>
        {month.map((day, index) =>
          day == 0 ? (
            <EmptyCell key={index} />
          ) : (
            <DayContext.Provider key={day.toString()} value={{ day }}>
              <Suspense fallback={<EmptyCell day={day.date()} />}>
                <DayCell day={day} />
              </Suspense>
            </DayContext.Provider>
          ),
        )}
      </div>
    </>
  );
}
