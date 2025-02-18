import { FormErrorOutput, FormOutput } from './FormType';

interface ErrorDisplayProps {
    state: FormOutput;
    path: keyof FormErrorOutput['message'];
}

export function ErrorDisplay({ state, path }: ErrorDisplayProps) {
    return (
        <div>
            {state.type === 'error' && !!state.message[path] ? `lastName : ${state.message[path].toString()}` : null}
        </div>
    );
}
