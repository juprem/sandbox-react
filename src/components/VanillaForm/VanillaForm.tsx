import { useActionState } from 'react';
import { z } from 'zod';
import { flex } from '../../styles/GlobalStyle';
import { css } from '@styled-system/css';
import { FormOutput, FormSchema, FormSubmitStructure } from './FormType';


async function submitForm(prev: FormOutput, formData: FormData) {
    const formValue: FormSubmitStructure<z.infer<typeof FormSchema>> = {
        lastName: formData.get('lastName'),
        firstName: formData.get('firstName'),
    };

    const verifiedValue = FormSchema.safeParse(formValue);

    console.log(verifiedValue);

    if (!verifiedValue.success) {
        return {
            type: 'error' as const,
            message: verifiedValue.error.flatten().fieldErrors,
        };
    }

    const result = await new Promise<FormOutput>((resolve) =>
        setTimeout(
            () =>
                resolve({
                    type: 'success' as const,
                    message: 'Succès',
                }),
            1000,
        ),
    );

    return result;
}

export function VanillaForm() {
    const [state, formAction, isPending] = useActionState(submitForm, { type: undefined }, '');

    return (
        <>
            <form action={formAction} className={flex({ visual: 'column' })}>
                <input name="firstName" className={css({ color: 'black' })} />
                <input name="lastName" className={css({ color: 'black' })} />
                <button
                    type="submit"
                    className={css({
                        border: '1px solid gray',
                        backgroundColor: '#050505',
                        borderRadius: '5px',
                        padding: '2px 5px',
                        cursor: 'pointer',
                    })}
                >
                    Submit
                </button>
            </form>
            <div>{isPending ? 'loading' : 'notLoading'}</div>
            <div>{state.type === 'success' ? state.message : 'success message'}</div>
            <div>
                {state.type === 'error' && state.message.firstName
                    ? `firstName : ${state.message.firstName.toString()}`
                    : null}
            </div>
            <div>
                {state.type === 'error' && state.message.lastName
                    ? `lastName : ${state.message.lastName.toString()}`
                    : null}
            </div>
        </>
    );
}
