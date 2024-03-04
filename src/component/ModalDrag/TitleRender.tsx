import { Dispatch, SetStateAction } from 'react';
import { css } from '../../../styled-system/css';
import { Button } from '../Button.tsx';
import { ActionMode } from './DraggableModal.tsx';
import Resize from '../../assets/resize.svg?react';
import Dragging from '../../assets/dragging.svg?react';

interface TitleRenderProps {
    title: string;
    setActionMode: Dispatch<SetStateAction<ActionMode>>;
    actionMode: ActionMode;
}

export function TitleRender({ title, setActionMode, actionMode }: TitleRenderProps) {
    console.log(actionMode);
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
            })}
        >
            {title}
            <Button
                className={
                    actionMode === 'resize'
                        ? css({
                              cursor: 'pointer',
                              borderRadius: '5px',
                              width: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'lightgray',
                          })
                        : css({
                              width: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                          })
                }
                onClick={() => setActionMode('resize')}
            >
                <Resize />
            </Button>
            <Button className={
                actionMode === 'drag'
                    ? css({
                        cursor: 'pointer',
                        borderRadius: '5px',
                        width: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'lightgray',
                    })
                    : css({
                        width: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })
            } onClick={() => setActionMode('drag')}><Dragging /></Button>
        </div>
    );
}
