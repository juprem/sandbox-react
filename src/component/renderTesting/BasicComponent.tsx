import { basicShape } from '../../styles/GlobalStyle.ts';
import { useBasicContext } from '../../hooks/WithBasicContext.tsx';

interface BasicComponentProps {}

export function BasicComponent({}: BasicComponentProps) {
    const title = useBasicContext();

    console.log('render');

    return <div className={basicShape()}>{title}</div>;
}
