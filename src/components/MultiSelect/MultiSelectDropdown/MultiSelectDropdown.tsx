import styles from './MultiSelectDropdown.module.scss';
import { MultiSelectOption } from '../MultiSelectOption/MultiSelectOption';
import { MultiSelectOptionGroup } from '../MultiSelectOption/MultiSelectOptionGroup';
import type { OptionGroup, OptionValue, SelectOption } from "../model/Option";

interface MultiSelectDropdownProps {
    options: SelectOption[];
    selectedValues: OptionValue[];
    onSelect: (value: OptionValue) => void;
    onSelectGroup: (group: OptionGroup) => void;
}

export function MultiSelectDropdown({
    options,
    selectedValues,
    onSelect,
    onSelectGroup,
}: MultiSelectDropdownProps) {
    return (
        <ul className={styles.dropdown}>
            {options.map((option) =>
                'options' in option ? (
                    <MultiSelectOptionGroup
                        key={option.label}
                        group={option}
                        selectedValues={selectedValues}
                        onSelect={onSelect}
                        onSelectGroup={onSelectGroup}
                    />
                ) : (
                    <MultiSelectOption
                        key={option.value}
                        option={option}
                        isSelected={selectedValues.includes(option.value)}
                        onSelect={onSelect}
                    />
                ),
            )}
        </ul>
    );
}
