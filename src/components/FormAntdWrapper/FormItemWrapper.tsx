import { Form } from 'antd';
import { InputForm } from './InputForm';
import { InputFormType } from '@model/FormWrapperModel';

export function FormItemWrapper() {
    return (
        <Form.Item>
            <InputForm type={InputFormType.INPUT} />
        </Form.Item>
    );
}
