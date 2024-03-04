import { ChangeEvent } from 'react';

interface InputProps {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ onChange }: InputProps) {
    return <input onChange={onChange} />;
}
