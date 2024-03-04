import { useRef } from 'react';
import Draggable from 'react-draggable';
import { css } from '../../styled-system/css';

export function DivWithRefManipulation() {
    const divRef = useRef<HTMLDivElement>(null);
    document.addEventListener('dragend', (e: any) => {
        console.log(e.x, e.y);
        if (divRef.current) {
            console.log(e.target);
            e.target.classList.add(css({ top: e.x }));
            // divRef.current.className = divRef.current.className
            //     .split(',')
            //     .filter((s) => !s.includes('top') && !s.includes('left'))
            // .concat([`top: "${e.y}"`, `left: "${e.x}"`])
            // .reduce((prev, current) => {
            //     return prev + current;
            // });
        }
    });
    return (
        <>
            {/*<div*/}
            {/*    ref={divRef}*/}
            {/*    id="manip"*/}
            {/*    className={css({*/}
            {/*        backgroundColor: 'wheat',*/}
            {/*        width: '150px',*/}
            {/*        height: '50px',*/}
            {/*        borderRadius: '7px',*/}
            {/*        display: 'flex',*/}
            {/*        alignItems: 'center',*/}
            {/*        justifyContent: 'center',*/}
            {/*        color: 'black',*/}
            {/*    })}*/}
            {/*    style={{ resize: 'both' }}*/}
            {/*    onResize={() => console.log('resizing')}*/}
            {/*>*/}
            {/*    content*/}
            {/*</div>*/}
            <Draggable>
                <div
                    className={css({
                        width: '50px',
                        overflow: 'auto',
                        height: '50px',
                        backgroundColor: 'green',
                        resize: 'both',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                    })}
                    id="drag"
                    ref={divRef}
                />
            </Draggable>
            {/*<Button onClick={handleClick} />*/}
        </>
    );
}
