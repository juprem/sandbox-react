import { Button, Select } from 'antd';
import { useCalendarStore } from '../store/useCalendarStore';
import { options } from '../model/CalendarModel';

export function SelectMonth() {
  const month = useCalendarStore((state) => state.month);
  const year = useCalendarStore((state) => state.year);
  const setMonth = useCalendarStore((state) => state.setMonth);

  return (
    <Select
      labelRender={() => `${month.label} ${year}`}
      style={{ width: '200px' }}
      value={month.index}
      options={options}
      onChange={setMonth}
    />
  );
}
