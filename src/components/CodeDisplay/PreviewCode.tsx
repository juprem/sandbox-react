import { css } from '@styled-system/css';

interface PreviewCodeProps {
    props: any;
}

export function PreviewCode({ props }: PreviewCodeProps) {
    return (
        <pre
            {...props}
            className={css({
                backgroundColor: 'gray',
                padding: '5px 10px',
                borderRadius: '10px',
            })}
        />
    );
}
