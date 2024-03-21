import { Modal, Button, ModalProps } from 'antd';
import { useState, ReactNode } from 'react';
import Draggable from 'react-draggable';
import styles from '../crashTest/DraggableModal.module.scss';
import { TitleRender } from './TitleRender.tsx';
import classNames from 'classnames';
import { useActionMode } from '../../hooks/useActionMode.ts';

interface DraggableModalProps extends Omit<ModalProps, ''> {
    enableBackground?: boolean;
    isDraggable?: boolean;
    isResizable?: boolean;
    title: ReactNode;
    children: ReactNode;
}

export function DraggableModal({
    isDraggable = false,
    isResizable = false,
    enableBackground = false,
    children,
    title,
    ...modalProps
}: DraggableModalProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [actionMode, setActionMode] = useActionMode();
    const resizableStyle = isResizable && actionMode === 'resize' ? styles.resizable : '';

    const modalRender = (children: ReactNode) => (
        <Draggable disabled={actionMode !== 'drag'}>
            <div>{children}</div>
        </Draggable>
    );

    return (
        <>
            <Button onClick={() => setOpen(true)}>Ouvrir</Button>
            <Modal
                {...modalProps}
                open={open}
                onCancel={() => setOpen(false)}
                maskClosable={false}
                mask={!enableBackground}
                modalRender={modalRender}
                className={classNames(styles.modal, resizableStyle)}
                wrapClassName={styles.backgroundInteraction}
                title={
                    <TitleRender
                        setActionMode={setActionMode}
                        actionMode={actionMode}
                        isDraggable={isDraggable}
                        isResizable={isResizable}
                    >{title}</TitleRender>
                }
            >
                {children}
            </Modal>
        </>
    );
}
