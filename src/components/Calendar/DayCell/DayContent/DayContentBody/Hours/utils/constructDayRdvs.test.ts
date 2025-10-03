import { expect, test } from 'vitest';
import { Rdv } from '../../../../../model/CalendarModel';
import { getMultipleMappedRdvs } from './constructDayRdvs';

const mockedRdv: Rdv[] = [
    {
        id: 1,
        name: 'Meeting A',
        start_hour: '08:00',
        end_hour: '09:00',
        day_id: 1,
    },
    {
        id: 2,
        name: 'Meeting B',
        start_hour: '08:30',
        end_hour: '10:00',
        day_id: 1,
    },
    {
        id: 6,
        name: 'Meeting B',
        start_hour: '08:45',
        end_hour: '10:00',
        day_id: 1,
    },
    {
        id: 3,
        name: 'Meeting C',
        start_hour: '09:30',
        end_hour: '11:00',
        day_id: 1,
    },
    {
        id: 4,
        name: 'Meeting D',
        start_hour: '12:00',
        end_hour: '13:00',
        day_id: 1,
    },
    {
        id: 5,
        name: 'Meeting E',
        start_hour: '12:30',
        end_hour: '14:00',
        day_id: 1,
    },
];

test('test', () => {
    const res = getMultipleMappedRdvs(mockedRdv);

    expect(res.length).toEqual(3)
})