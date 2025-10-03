import { ReactNode, useState } from 'react';
import styles from './ActionButton.module.scss';
import { CustomModal } from '../../CustomModal/CustomModal';

interface ActionButtonProps {
    children: ReactNode;
    content: ReactNode;
}

export function ActionButton({ children, content }: ActionButtonProps) {
    const [openModal, setOpenModal] = useState(false);

    const onOpenModal = () => setOpenModal(true);

    return (
        <>
            <button className={styles.buttonCode} onClick={onOpenModal}>
                {children}
            </button>
            <CustomModal open={openModal} onClose={() => setOpenModal(false)}>
                {content}
            </CustomModal>
        </>
    );
}
