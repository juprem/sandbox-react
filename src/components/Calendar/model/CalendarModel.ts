import { z } from 'zod';
import { TodoSchema } from '@model/TodoModel';

export const MONTHS = {
    JANUARY: { label: 'Janvier', index: 0 },
    FEBRUARY: { label: 'Février', index: 1 },
    MARCH: { label: 'Mars', index: 2 },
    APRIL: { label: 'Avril', index: 3 },
    MAY: { label: 'Mai', index: 4 },
    JUNE: { label: 'Juin', index: 5 },
    JULY: { label: 'Juillet', index: 6 },
    AUGUST: { label: 'Août', index: 7 },
    SEPTEMBER: { label: 'Septembre', index: 8 },
    OCTOBER: { label: 'Octobre', index: 9 },
    NOVEMBER: { label: 'Novembre', index: 10 },
    DECEMBER: { label: 'Décembre', index: 11 },
} as const;

type GetValueOfAsConst<T> = T[keyof T];

export type Months = GetValueOfAsConst<typeof MONTHS>;

export const listedMonth = Object.values(MONTHS);
export const options = listedMonth.map((month) => ({ label: month.label, value: month.index }));

export const DaySchema = z.object({
    id: z.number(),
    day: z.number().min(1).max(31),
    month: z.number().min(0).max(11),
    year: z.number(),
});

export const CreateDaySchema = z.object({
    day: z.number().min(1).max(31),
    month: z.number().min(0).max(11),
    year: z.number(),
});

export type Day = z.infer<typeof DaySchema>;

export const RdvSchema = z.object({
    id: z.number(),
    day_id: z.number(),
    name: z.string(),
    start_hour: z.string(),
    end_hour: z.string(),
});

export const RdvsSchema = z.array(RdvSchema);

export const DaysSchema = z.array(DaySchema);

const hoursRegex = RegExp('^[0-9]{1,2}:[0-9]{2}');

export const RdvCreateSchema = z.object({
    day: z.number(),
    day_month: z.number(),
    name: z.string(),
    day_year: z.number(),
    start_hour: z.string().refine((val) => hoursRegex.test(val)),
    end_hour: z.string(),
});

export type Rdv = {
    day?: Day
} & z.infer<typeof RdvSchema>
