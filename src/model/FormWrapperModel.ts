import { FormItemProps } from 'antd';

export enum InputFormType {
    INPUT,
    SELECT,
}

export interface DataDictionary {
    path: string;
    renderType: InputFormType;
    rules?: FormItemProps['rules'];
}

export const dataDicoTest: DataDictionary[] = [
    { path: 'name', renderType: InputFormType.INPUT },
    {
        path: 'surname',
        renderType: InputFormType.INPUT,
        rules: [{ required: true, message: 'Vous devez séectionner un prénom' }],
    },
];
