import { Dayjs } from 'dayjs';
import { useTRPC } from '../integrations/trpc/react';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGetAllDay = () => {
    const trpc = useTRPC();
    return useQuery(trpc.calendar.getAllDays.queryOptions());
};
//
// export const useGetDay = (day: Dayjs) => {
//     const trpc = useTRPC();
//     return trpc.calendar.getDay.useQuery({
//         day: day.date(),
//         month: day.month(),
//         year: day.year(),
//     });
// };
//
export const useGetAllRdvByDay = (day: Dayjs) => {
    const trpc = useTRPC();

    return useSuspenseQuery(
        trpc.rdv.getAllRdvByDays.queryOptions({
            day: day.date(),
            month: day.month(),
            year: day.year(),
        }),
    );
};

export const useCreateRdv = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation({
        ...trpc.rdv.addRdv.mutationOptions(),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: trpc.rdv.getAllRdvByDays.queryKey({
                    day: variables.day,
                    month: variables.day_month,
                    year: variables.day_year,
                }),
            });
            toast.success("Rdv ajouté")
        },
    });
};
