import { FormAntdWrapper } from '@component/FormAntdWrapper/FormAntdWrapper.tsx';
import { Form, Input } from 'antd';

interface CrashTestProps {
    to: number;
}

export function CrashTest({ to }: CrashTestProps) {
    console.log(to);

    return (
        <FormAntdWrapper name="basicForm" onValuesChange={(e) => console.log(e)}>
            <Form.Item rules={[{required: true, message: "Mandart"}]} name={['fullName', 'firstName']}>
                <Input />
            </Form.Item>
        </FormAntdWrapper>
    );
}
