import { useOptimistic, useState } from 'react';
import { Button, Input } from 'antd';
import { css } from '@styled-system/css';

interface OptimisticUpdateProps {
    name: string;
    setName: (val: string) => void;
}

export const simulatingPromise = async (isReject = false, value: string, previous: string) =>
    await new Promise((resolve, reject) => {
        if (isReject) setTimeout(reject, 1000);
        setTimeout(resolve, 1000);
    })
        .then(() => value)
        .catch(() => previous);

function OptimisticUpdate({ name, setName }: OptimisticUpdateProps) {
    const [optiName, optiUpdate] = useOptimistic(name, (state, action: string) => action);

    const submitAction = async (formData: FormData) => {
        const newName = formData.get('name')?.toString() ?? '';
        optiUpdate(newName);

        const updatedName = await simulatingPromise(true, newName, name);
        setName(updatedName);
    };

    return (
        <form action={submitAction} className={css({ display: 'flex', gap: '1rem' })}>
            <Input name="name" className={css({ width: '300px !important' })} />
            <Button htmlType="submit" loading={optiName != name}>Submit</Button>
            {optiName}
        </form>
    );
}

export function OptimisticWrapper() {
    const [name, setName] = useState('');

    return <OptimisticUpdate name={name} setName={setName} />;
}
