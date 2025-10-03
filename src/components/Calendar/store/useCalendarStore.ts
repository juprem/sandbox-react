import { listedMonth, Months } from '../model/CalendarModel';
import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

type NextPrevious = 'previous' | 'next';

type CalendarMode = 'week' | 'month';

type State = {
    month: Months;
    year: number;
    mode: CalendarMode;
    day: Dayjs;
};

type Action = {
    setMonth: (monthNumber: number) => void;
    changeMode: () => void;
    setWeek: (direction: NextPrevious) => void;
};

export const useCalendarStore = create<State & Action>((set) => ({
    month: listedMonth[dayjs().month()],
    year: dayjs().year(),
    mode: 'month',
    day: dayjs(),

    setWeek: (direction: NextPrevious) =>
        set((state) => {
            const nextValue = direction == 'next' ? state.day.add(1, 'week') : state.day.subtract(1, 'week');

            return { day: nextValue, month: listedMonth[nextValue.month()], year: nextValue.year() };
        }),

    changeMode: () =>
        set((state) => {
            return state.mode == 'month' ? { mode: 'week' } : { mode: 'month' };
        }),
    setMonth: (monthNumber: number) =>
        set((state) => {
            if (monthNumber == listedMonth.length) {
                return {
                    month: listedMonth[0],
                    year: state.year + 1,
                    day: state.day
                        .set('month', 0)
                        .set('year', state.year + 1)
                        .set('date', 1),
                };
            }

            if (monthNumber < 0) {
                return {
                    month: listedMonth[listedMonth.length - 1],
                    year: state.year - 1,
                    day: state.day
                        .set('month', listedMonth.length - 1)
                        .set('year', state.year - 1)
                        .set('date', 1),
                };
            }

            return {
                month: listedMonth[monthNumber],
                day: state.day.set('month', monthNumber).set('date', 1),
            };
        }),
}));
