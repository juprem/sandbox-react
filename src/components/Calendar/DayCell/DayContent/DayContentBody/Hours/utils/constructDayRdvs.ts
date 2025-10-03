import { Rdv } from '../../../../../model/CalendarModel';
import { stringToColour } from '../../../../../../../utils/colorOnString';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';

dayjs.extend(objectSupport);

const minute = [0, 15, 30, 45];

const hours = Array.from({ length: 96 }, (_, i) => ({ hour: Math.floor(i / 4), minute: minute[i % 4] }));

function getHourAndMinute(time: string) {
    const [hour, minute] = time.split(':').map((val) => parseInt(val));

    return [hour, minute];
}

interface MappedRdv {
    start: number[];
    end: number[];
    name: string;
}

function getMultipleMappedRdvs(data: Rdv[]) {
    const mapStartEnd = data
        .map((rdv) => ({
            start: getHourAndMinute(rdv.start_hour),
            end: getHourAndMinute(rdv.end_hour),
            name: rdv.name,
        }))
        .sort(({ start: [aH, aM] }, { start: [bH, bM] }) => (aH == bH ? aM - bM : aH - bH));

    const calendarDays: MappedRdv[][] = [[]];

    mapStartEnd.forEach((mse) => {
        const depth = getCalendarDepthToInsert(calendarDays, mse);

        if (depth == calendarDays.length) {
            calendarDays.push([mse]);
        } else {
            calendarDays[depth].push(mse);
        }
    });

    return calendarDays;
}

function getCalendarDepthToInsert(mappedRdv: MappedRdv[][], newRdv: MappedRdv, depth: number = 0) {
    const maxDepth = mappedRdv.length;

    if (maxDepth == depth) {
        return depth;
    }
    const isCrossingOtherEvent = mappedRdv[depth].find((rdv) => isCrossing(rdv, newRdv));

    if (isCrossingOtherEvent) {
        return getCalendarDepthToInsert(mappedRdv, newRdv, depth + 1);
    }

    return depth;
}

function isCrossing(rdv: MappedRdv, newRdv: MappedRdv) {
    const endRdv = dayjs({ hour: rdv.end[0], minute: rdv.end[1] });
    const startRdv = dayjs({ hour: rdv.start[0], minute: rdv.start[1] });
    const startNewRdv = dayjs({ hour: newRdv.start[0], minute: newRdv.start[1] });

    return startNewRdv.isBefore(endRdv) && startNewRdv.isAfter(startRdv);
}

export function getColoredMultipleCalendar(data: Rdv[]) {
    const mappedRdv = getMultipleMappedRdvs(data);

    return mappedRdv.map((rdvs) => {
        return hours.map((hour) => {
            const rdv = rdvs.find(
                (val) =>
                    hour.hour >= val.start[0] &&
                    hour.hour <= val.end[0] &&
                    (hour.minute >= val.start[1] || hour.hour > val.start[0]) &&
                    (hour.minute < val.end[1] || hour.hour < val.end[0]),
            );
            const isRowName = rdv && hour.hour == rdv.start[0] && hour.minute == rdv.start[1];

            return {
                color: rdv ? stringToColour(rdv.name) : '',
                name: isRowName ? rdv.name : '',
            };
        });
    });
}
