import { css } from '@styled-system/css';
import Resize from '../../assets/resize.svg';
import Dragging from '../../assets/dragging.svg';
import { CustomModalButton } from './CustomModalButton';
import { flex } from '../../styles/GlobalStyle';
import { ActionMode } from '@hooks/useActionMode';
import { ReactNode } from 'react';

interface TitleRenderProps {
    children: ReactNode;
    setActionMode: (mode: ActionMode) => void;
    actionMode: ActionMode;
    isDraggable: boolean;
    isResizable: boolean;
}

export function TitleRender({ children, setActionMode, actionMode, isResizable, isDraggable }: TitleRenderProps) {
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
            })}
        >
            {children}
            <div className={flex()}>
                <CustomModalButton
                    isEnable={isResizable}
                    actionMode={actionMode}
                    actionType="resize"
                    onClick={() => setActionMode('resize')}
                >
                    <Resize />
                </CustomModalButton>
                <CustomModalButton
                    actionMode={actionMode}
                    actionType="drag"
                    isEnable={isDraggable}
                    onClick={() => setActionMode('drag')}
                >
                    <Dragging />
                </CustomModalButton>
            </div>
        </div>
    );
}
