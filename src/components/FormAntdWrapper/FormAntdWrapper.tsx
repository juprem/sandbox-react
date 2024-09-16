import { Button, Form, FormProps } from 'antd';
import { ReactNode } from 'react';
import { css } from '@styled-system/css';

interface FormAntdWrapperProps extends Omit<FormProps, 'className'> {
    children: ReactNode;
}

export function FormAntdWrapper(props: FormAntdWrapperProps) {
    const { children, ...rest } = props;

    return (
        <Form {...rest} className={css({width: 'fit-content', maxWidth: '800px', minWidth: '300px'})}>
            {children}
            <div className={css({width: '100%', display: 'flex', justifyContent: 'flex-end'})}>
            <Button className={css({ backgroundColor: 'lightblue' })} htmlType="submit">
                Enregistrer
            </Button>
            </div>
        </Form>
    );
}
