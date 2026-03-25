import styles from './MultiSelectTag.module.scss';

interface MultiSelectTagProps {
    label: string;
    onRemove: () => void;
}

export function MultiSelectTag({ label, onRemove }: MultiSelectTagProps) {
    return (
        <span className={styles.tag}>
            <span className={styles.tagContent}>{label}</span>
            <span
                className={styles.tagCloseIcon}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
            >
                X
            </span>
        </span>
    );
}
