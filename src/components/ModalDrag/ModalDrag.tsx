import styles from './ModalDrag.module.scss';
import { Drag } from './Drag';
import { Modal } from 'antd';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface ModalDragProps {
    x: number;
    y: number;
    onClose: () => void;
    open: boolean;
}

export function ModalDrag({ x, y, onClose, open }: ModalDragProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Modal
            style={{
                ...style,
                top: y,
                left: x,
            }}
            open={open}
            onCancel={onClose}
            className={styles.resizable}
            title={
                <div {...attributes} {...listeners}>
                    Dragging
                </div>
            }
            modalRender={(content) => <Drag setNodeRef={setNodeRef}>{content}</Drag>}
        >
            Content
        </Modal>
    );
}
