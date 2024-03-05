import { Button } from 'antd';
import { useState } from 'react';
import { css } from '@styled-system/css';

const abort = new AbortController();
const refFunction = (node: HTMLElement | null) => {
    if (!node) return;

    console.log('render');
    node.addEventListener('mouseenter', () => console.log('hovering'), { signal: abort.signal });

    return () => {
        abort.abort();
    };
};

export function FunctionRef() {
    const [clicking, setClicking] = useState(false);
    const [showDiv, setShowDiv] = useState(true);
    console.log('render by clicking');

    return (
        <>
            {showDiv ? (
                <div
                    role="button"
                    className={css({
                        border: '1px wheat solid',
                        borderRadius: '5px',
                        marginBottom: '1rem',
                        width: 'fit-content',
                        padding: '5px',
                        _hover: { boxShadow: '0 0 8px 0 white' },
                    })}
                    ref={refFunction}
                    onMouseLeave={(node) => console.log('leaving')}
                >
                    Coucou
                </div>
            ) : null}
            <Button onClick={() => setClicking(!clicking)}>Render</Button>
            <Button onClick={() => setShowDiv(!showDiv)}>ShowingDiv</Button>
        </>
    );
}
