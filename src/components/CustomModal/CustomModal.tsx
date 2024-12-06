import { ReactNode, useRef } from 'react';
import styles from './CustomModal.module.scss';
import { Flex } from '../Flex/Flex';
import { CustomModalHeader } from './CustomModalHeader';
import { useEventListener } from '@hooks/useEventListener';

interface CustomModalProps {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
    destroyOnClose?: boolean;
    title?: ReactNode;
}

export function CustomModal({ children, open, onClose, destroyOnClose = false, title = <div /> }: CustomModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    useEventListener({
        htmlId: 'dialog',
        eventType: 'keypress',
        listener: (event) => {
            if (event.key === 'echap') {
                ref.current?.close();
            }
        },
    });

    if (open) {
        ref.current?.showModal();
    }

    if (!open) {
        ref.current?.close();
    }

    return (
        <dialog onClick={(e) => e.stopPropagation()} id="dialog" ref={ref} className={styles.dialog}>
            {(!destroyOnClose || open) && (
                <Flex height="100%" gap="1.5rem" flexDirection="column">
                    <CustomModalHeader onClose={onClose}>{title}</CustomModalHeader>
                    <div>{children}</div>
                </Flex>
            )}
        </dialog>
    );
}
