import { Form } from 'antd';
import { InputForm } from '../FormAntdWrapper/InputForm';
import { InputFormType } from '@model/FormWrapperModel';

interface FormItemWrapperProps {}

export function FormItemWrapper({}: FormItemWrapperProps) {
    return (
        <Form.Item>
            <InputForm type={InputFormType.INPUT} />
        </Form.Item>
    );
}
