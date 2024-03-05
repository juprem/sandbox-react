import { Dispatch, SetStateAction } from 'react';
import { css } from '../../../styled-system/css';
import { ActionMode } from './DraggableModal.tsx';
import Resize from '../../assets/resize.svg?react';
import Dragging from '../../assets/dragging.svg?react';
import { CustomModalButton } from './CustomModalButton.tsx';

interface TitleRenderProps {
    title: string;
    setActionMode: Dispatch<SetStateAction<ActionMode>>;
    actionMode: ActionMode;
    isDraggable: boolean;
    isResizable: boolean;
}

export function TitleRender({ title, setActionMode, actionMode, isResizable, isDraggable }: TitleRenderProps) {
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
            })}
        >
            {title}
            <CustomModalButton
                isEnable={isResizable}
                actionMode={actionMode}
                actionType="resize"
                onClick={() => setActionMode((prevState) => (prevState === 'resize' ? 'none' : 'resize'))}
            >
                <Resize />
            </CustomModalButton>
            <CustomModalButton
                actionMode={actionMode}
                actionType="drag"
                isEnable={isDraggable}
                onClick={() => setActionMode((prevState) => (prevState === 'drag' ? 'none' : 'drag'))}
            >
                <Dragging />
            </CustomModalButton>
        </div>
    );
}
