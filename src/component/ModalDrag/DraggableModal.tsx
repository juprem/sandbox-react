import { Modal, Button } from 'antd';
import { useState, ReactNode } from 'react';
import Draggable from 'react-draggable';
import styles from '../DraggableModal.module.scss';
import { TitleRender } from './TitleRender.tsx';

export type ActionMode =  'drag' | 'resize' | 'none';

export function DraggableModal() {
    const [open, setOpen] = useState<boolean>(false);
    const [actionMode, setActionMode] = useState<ActionMode>('none');
    const modalRender = (children: ReactNode) => <Draggable disabled={actionMode !== 'drag'}>{children}</Draggable>;
    console.log(actionMode);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Ouvrir</Button>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                modalRender={modalRender}
                className={actionMode === 'resize' ? styles.modalResize : styles.modal}
                title={<TitleRender title={'Coucou'} setActionMode={setActionMode} actionMode={actionMode}/>}
            >
                <div>Coucou</div>
            </Modal>
        </>
    );
}
