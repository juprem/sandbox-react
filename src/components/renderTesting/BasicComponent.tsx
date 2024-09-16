import { basicShape } from '../../styles/GlobalStyle';

interface BasicComponentProps {
    id: string;
}

export function BasicComponent({ id }: BasicComponentProps) {
    console.log('render : ', id);

    return <div className={basicShape()} />;
}
