import { basicShape } from '../../styles/GlobalStyle.ts';

interface BasicComponentProps {
    id: string;
}

export function BasicComponent({ id }: BasicComponentProps) {
    console.log('render : ', id);

    return <div className={basicShape()} />;
}
