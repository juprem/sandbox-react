import { useActionState } from 'react';
import { Button, Input } from 'antd';
import { css } from '@styled-system/css';
import { FormType, FormTypeSchema } from './FormTypeZod';

async function increment(prev: FormType, formData: FormData) {
    const formResult = { name: formData.get('name'), incr: Number(formData.get('incr')) };
    const parsedForm = FormTypeSchema.parse(formResult);

    return await new Promise<FormType>((resolve) => {
        setTimeout(() => {
            resolve({ ...parsedForm, incr: parsedForm.incr + prev.incr });
        }, 1000);
    });
}

export function React19() {
    const [state, formAction, isPending] = useActionState(increment, { name: '', incr: 0 }, '');

    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '2rem 0',
            })}
        >
            <form action={formAction} className={css({ display: 'flex', gap: '1rem' })}>
                <Input name="incr" type="number" />
                <Input name="name" />
                <Button htmlType="submit">Incrémenter</Button>
            </form>
            <div>
                {state.name} {state.incr}
            </div>
            <div className={css({ width: '200px' })}>{isPending ? 'isPending' : 'notPending'}</div>
        </div>
    );
}

