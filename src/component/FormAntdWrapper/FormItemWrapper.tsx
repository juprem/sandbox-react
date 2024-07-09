import { Form } from 'antd';
import { InputForm } from '@component/FormAntdWrapper/InputForm.tsx';
import { InputFormType } from '@model/FormWrapperModel.ts';

interface FormItemWrapperProps {}

export function FormItemWrapper({}: FormItemWrapperProps) {
    return (
        <Form.Item>
            <InputForm type={InputFormType.INPUT} />
        </Form.Item>
    );
}
