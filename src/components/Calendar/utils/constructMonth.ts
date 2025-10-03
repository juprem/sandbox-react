import { Dayjs } from 'dayjs';

export function constructMonth(day: Dayjs) {
    const nbOfDays = day.daysInMonth();

    const startOfMonth = day.set('date', 1).day();
    const endOfMonth = day.set('date', nbOfDays).day();
    const rStart = startOfMonth == 0 ? 6 : startOfMonth - 1;
    const rEnd = endOfMonth == 0 ? 0 : 7 - endOfMonth;

    return Array.from({ length: nbOfDays + rStart + rEnd }, (_, i) => {
        const position = i + 1 - rStart;

        return position <= 0 || position > nbOfDays ? 0 : day.set('date', position);
    });
}
