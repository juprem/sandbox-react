import { Button, Select } from 'antd';
import { options } from '../model/CalendarModel';
import { useCalendarStore } from '../store/useCalendarStore';

export function MonthHeader() {
    const setMonth = useCalendarStore((state) => state.setMonth);
    const month = useCalendarStore((state) => state.month);
    const year = useCalendarStore((state) => state.year);

    return (
        <>
            <Button icon={'<'} type="text" onClick={() => setMonth(month.index - 1)} />
            <Select
                labelRender={() => `${month.label} ${year}`}
                style={{ width: '200px' }}
                value={month.index}
                options={options}
                onChange={setMonth}
            />
            <Button icon={'>'} type="text" onClick={() => setMonth(month.index + 1)} />
        </>
    );
}
