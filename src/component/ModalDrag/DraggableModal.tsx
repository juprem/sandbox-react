import { Modal, Button } from 'antd';
import { useState, ReactNode, useRef } from 'react';
import Draggable from 'react-draggable';
import styles from '../DraggableModal.module.scss';
import { TitleRender } from './TitleRender.tsx';

export type ActionMode = 'drag' | 'resize' | 'none';

interface DraggableModalProps {
    enableBackground?: boolean;
    isDraggable?: boolean;
    isResizable?: boolean;
}
export function DraggableModal({ isDraggable = false, isResizable = false, enableBackground = false }: DraggableModalProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [actionMode, setActionMode] = useState<ActionMode>('none');
    const modalRef = useRef<HTMLDivElement>(null);
    const modalRender = (children: ReactNode) => (
        <Draggable disabled={actionMode !== 'drag'}>
            <div ref={modalRef}>{children}</div>
        </Draggable>
    );

    return (
        <>
            <Button onClick={() => setOpen(true)}>Ouvrir</Button>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                maskClosable={enableBackground}
                mask={enableBackground}
                modalRender={modalRender}
                className={actionMode === 'resize' ? styles.modalResize : styles.modal}
                title={<TitleRender title={'Coucou'} setActionMode={setActionMode} actionMode={actionMode} isDraggable={isDraggable} isResizable={isResizable} />}
            >
                <div>Coucou</div>
            </Modal>
        </>
    );
}
