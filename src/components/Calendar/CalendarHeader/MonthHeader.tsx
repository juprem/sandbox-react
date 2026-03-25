import { Button, Select } from 'antd';
import { options } from '../model/CalendarModel';
import { useCalendarStore } from '../store/useCalendarStore';
import { useShallow } from 'zustand/react/shallow';
import { SelectMonth } from './SelectMonth';

export function MonthHeader() {
  const { next, prev } = useCalendarStore(
    useShallow((state) => ({
      prev: state.setPrevMonth,
      next: state.setNextMonth,
      setMonth: state.setMonth,
    })),
  );

  return (
    <>
      <Button icon={'<'} type="text" onClick={() => prev()} />
      <SelectMonth />
      <Button icon={'>'} type="text" onClick={() => next()} />
    </>
  );
}
