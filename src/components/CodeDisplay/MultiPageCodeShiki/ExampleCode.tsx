import { MultiPageCodeShiki } from './MultiPageCodeShiki';

const code = `
interface ButtonProps {
    children: ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ children, onClick }: Partial<ButtonProps>) {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}
`;

const code2 = `
interface ButtonProps2 {
    children: ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button2({ children, onClick }: Partial<ButtonProps>) {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}
`;

const code4 = `
interface ButtonProps4 {
    children: ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button4({ children, onClick }: Partial<ButtonProps>) {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}
`;
const code3 = `
interface ButtonProps3 {
    children: ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button3({ children, onClick }: Partial<ButtonProps>) {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}
`;

const list = [
    { title: 'Test.tsx', id: 1, code },
    { title: 'Test2.tsx', id: 2, code: code2 },
    { title: 'Test5.tsx', id: 11, code: code3 },
    { title: 'TestDeteTEsteDAarte.tsx', id: 6, code: code4 },
    { title: 'TestDeteTEsteDAarte.tsx', id: 7, code: code4 },
    { title: 'TestDeteTEsteDAarte.tsx', id: 8, code: code4 },
    { title: 'TestDeteTEsteDAarte.tsx', id: 9, code: code4 },
    { title: 'TestDeteTEsteDAarte.tsx', id: 10, code: code4 },
];

export function ExampleCode() {
    return <MultiPageCodeShiki files={list} />;
}
