import styles from './MultiSelectOption.module.scss';
import type { Option, OptionValue } from "../model/Option";

interface MultiSelectOptionProps {
    option: Option;
    isSelected: boolean;
    onSelect: (value: OptionValue) => void;
}

export function MultiSelectOption({ option, isSelected, onSelect }: MultiSelectOptionProps) {
    return (
        <li
            className={`${styles.option} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect(option.value)}
        >
            {option.label}
        </li>
    );
}
