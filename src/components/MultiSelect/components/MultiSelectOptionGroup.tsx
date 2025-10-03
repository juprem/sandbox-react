import styles from '../MultiSelect.module.scss';
import { OptionGroup } from '../MultiSelect';
import { MultiSelectOption } from './MultiSelectOption';

type MultiSelectOptionGroupProps = {
    group: OptionGroup;
    selectedValues: string[];
    onSelect: (value: string) => void;
    onSelectGroup: (group: OptionGroup) => void;
};

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
