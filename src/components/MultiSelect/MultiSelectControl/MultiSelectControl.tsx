import styles from "./MultiSelectControl.module.scss";
import { MultiSelectTag } from "./MultiSelectTag/MultiSelectTag";
import type { OptionValue } from "../model/Option";

interface MultiSelectControlProps {
    selectedValues: OptionValue[];
    placeholder: string;
    getLabel: (value: OptionValue) => string;
    onRemove: (value: OptionValue) => void;
    onToggle: () => void;
    isOpen: boolean;
}

export function MultiSelectControl({
    selectedValues,
    placeholder,
    getLabel,
    onRemove,
    onToggle,
    isOpen,
}: MultiSelectControlProps) {
    return (
        <div
            className={`${styles.selectControl} ${isOpen ? styles.open : ''}`}
            onClick={onToggle}
        >
            <div className={styles.selectedValue}>
                {selectedValues.length > 0 ? (
                    <div className={styles.tags}>
                        {selectedValues.map((value) => (
                            <MultiSelectTag
                                key={value}
                                label={getLabel(value)}
                                onRemove={() => onRemove(value)}
                            />
                        ))}
                    </div>
                ) : (
                    <span className={styles.placeholder}>{placeholder}</span>
                )}
            </div>
            <div className={styles.arrow}>
                <span className={styles.arrowIcon}>▼</span>
            </div>
        </div>
    );
}
