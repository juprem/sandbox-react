import { useGetAllRdvByDay } from '@service/calendarService';
import { Hours } from './Hours/Hours';
import { useDayContext } from '../../../hooks/dayContext';

export function DayDisplayMode() {
    const { day } = useDayContext();
    const { data } = useGetAllRdvByDay(day);

    return <Hours rdvs={data ?? []} />;
}
