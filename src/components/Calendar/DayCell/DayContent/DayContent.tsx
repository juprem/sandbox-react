import { Modal } from 'antd';
import { useState } from 'react';
import { DayContentHeader } from './DayContentHeader';
import { DisplayMode } from './model/DisplayMode';
import { DayContentBody } from './DayContentBody/DayContentBody';
import styles from './DayContent.module.scss';
import { useDayContext } from '../../hooks/dayContext';

interface DayContentProps {
    open: boolean;
    onClose: () => void;
}

export function DayContent({ open, onClose }: DayContentProps) {
    const [mode, setMode] = useState<DisplayMode>('display');
    const { day } = useDayContext();

    return (
        <Modal footer={null} title={day.format('dddd DD MMMM')} open={open} onCancel={onClose}>
            <DayContentHeader mode={mode} setMode={setMode} />
            <div className={styles.modalContainer}>
                <DayContentBody mode={mode} />
            </div>
        </Modal>
    );
}
