import styles from './MultiSelectOptionGroup.module.scss';
import { MultiSelectOption } from './MultiSelectOption';
import type { OptionGroup, OptionValue } from "../model/Option";

interface MultiSelectOptionGroupProps {
    group: OptionGroup;
    selectedValues: OptionValue[];
    onSelect: (value: OptionValue) => void;
    onSelectGroup: (group: OptionGroup) => void;
}

export function MultiSelectOptionGroup({
    group,
    selectedValues,
    onSelect,
    onSelectGroup,
}: MultiSelectOptionGroupProps) {
    return (
        <li className={styles.group}>
            <div className={styles.groupLabel} onClick={() => onSelectGroup(group)}>
                {group.label}
            </div>
            <ul className={styles.groupOptions}>
                {group.options.map((childOption) => (
                    <MultiSelectOption
                        key={childOption.value}
                        option={childOption}
                        isSelected={selectedValues.includes(childOption.value)}
                        onSelect={onSelect}
                    />
                ))}
            </ul>
        </li>
    );
}
