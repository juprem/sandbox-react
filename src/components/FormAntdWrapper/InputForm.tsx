import { InputFormType } from '@model/FormWrapperModel';
import { ReactNode } from 'react';
import { Input, SelectProps } from 'antd';

export interface MyInputProps<Tvalue> {
    value?: Tvalue;
    onChange?: (...event: unknown[]) => void;
    options?: SelectProps['options'];
}

type IRenderByInputType<T> = {
    [key in string]: (field: MyInputProps<T>) => ReactNode;
};

export const RenderByInputTypeString = {
    STRING: (props) => <Input {...props} />,
} satisfies IRenderByInputType<string>;

interface InputFormProps {
    type: InputFormType;
}

export function InputForm({ type }: InputFormProps) {
    console.log(type);
    return <></>;
}
