import { css } from '../../../styled-system/css';

interface SeparatorProps {
    display: boolean;
}

export function Separator({display}: SeparatorProps) {
    return <>
        {display && <div className={css({height: "1px", backgroundColor: "gray", width: "80%", marginLeft: "10%", marginTop: "1rem"})}/>}
    </>;
}