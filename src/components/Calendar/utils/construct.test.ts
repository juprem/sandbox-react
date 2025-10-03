import { expect, test } from 'vitest';
import { constructMonth } from './constructMonth';
import dayjs from 'dayjs';
import { constructWeek } from './constructWeek';

const feb2026 = [
    0,
    0,
    0,
    0,
    0,
    0,
    dayjs('2026-02-01T22:00:00.000'),
    dayjs('2026-02-02T22:00:00.000'),
    dayjs('2026-02-03T22:00:00.000'),
    dayjs('2026-02-04T22:00:00.000'),
    dayjs('2026-02-05T22:00:00.000'),
    dayjs('2026-02-06T22:00:00.000'),
    dayjs('2026-02-07T22:00:00.000'),
    dayjs('2026-02-08T22:00:00.000'),
    dayjs('2026-02-09T22:00:00.000'),
    dayjs('2026-02-10T22:00:00.000'),
    dayjs('2026-02-11T22:00:00.000'),
    dayjs('2026-02-12T22:00:00.000'),
    dayjs('2026-02-13T22:00:00.000'),
    dayjs('2026-02-14T22:00:00.000'),
    dayjs('2026-02-15T22:00:00.000'),
    dayjs('2026-02-16T22:00:00.000'),
    dayjs('2026-02-17T22:00:00.000'),
    dayjs('2026-02-18T22:00:00.000'),
    dayjs('2026-02-19T22:00:00.000'),
    dayjs('2026-02-20T22:00:00.000'),
    dayjs('2026-02-21T22:00:00.000'),
    dayjs('2026-02-22T22:00:00.000'),
    dayjs('2026-02-23T22:00:00.000'),
    dayjs('2026-02-24T22:00:00.000'),
    dayjs('2026-02-25T22:00:00.000'),
    dayjs('2026-02-26T22:00:00.000'),
    dayjs('2026-02-27T22:00:00.000'),
    dayjs('2026-02-28T22:00:00.000'),
    0,
];

test("feb2026", () => {
    const month = constructMonth(dayjs("2026-02-14T22:00:00.000"))

    expect(month.length).toEqual(feb2026.length)
    expect(month).toEqual(feb2026)
})

test("week", () => {
    const week = constructWeek(dayjs())

    console.log(week);
})