import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { CalendarBody } from './CalendarBody/CalendarBody';
import { CalendarWeekBody } from './CalendarWeekBody/CalendarWeekBody';
import { useCalendarStore } from './store/useCalendarStore';

export function Calendar() {
    const mode = useCalendarStore((state) => state.mode);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', height: '100%' }}>
            <CalendarHeader />
            {mode == 'week' ? <CalendarWeekBody /> : <CalendarBody />}
        </div>
    );
}
