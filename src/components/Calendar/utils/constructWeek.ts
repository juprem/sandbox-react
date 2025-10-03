import { Dayjs } from 'dayjs';

export function constructWeek(day: Dayjs) {
    return Array.from({ length: 7 }, (_, i) => day.set('day', i + 1));
}