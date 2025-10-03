import { Dayjs } from 'dayjs';
import { createContext, useContext } from 'react';

type DayContext = {
    day: Dayjs
}

export const DayContext = createContext<DayContext | null>(null)

export const useDayContext = () => {
    const context = useContext(DayContext);

    if (!context) {
        throw new Error("not inside dayContext")
    }

    return context
}