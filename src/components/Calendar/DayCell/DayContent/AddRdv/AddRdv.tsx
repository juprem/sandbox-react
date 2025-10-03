import { Button, Form, Input, TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { useCreateRdv } from '@service/calendarService';
import { useDayContext } from '../../../hooks/dayContext';

const { RangePicker } = TimePicker;

export function AddRdv() {
    const { day } = useDayContext();
    const { mutate, isPending } = useCreateRdv();

    const onFinish = (val: { name: string; hours: [Dayjs, Dayjs] }) => {
        mutate({
            day: day.date(),
            day_month: day.month(),
            day_year: day.year(),
            name: val.name,
            start_hour: val.hours[0].format('HH:mm'),
            end_hour: val.hours[1].format('HH:mm'),
        });
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item name="name" label="Nom">
                <Input />
            </Form.Item>
            <Form.Item name="hours" label="Début">
                <RangePicker minuteStep={15} showSecond={false} />
            </Form.Item>
            <Button htmlType="submit" loading={isPending}>Ajouter le rdv</Button>
        </Form>
    );
}
