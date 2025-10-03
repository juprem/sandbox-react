import { useState, useRef, useEffect } from 'react';
import styles from './MultiSelect.module.scss';
import { useSelectOptions } from './hooks/useSelectOptions';
import { MultiSelectControl } from './MultiSelectControl/MultiSelectControl';
import { MultiSelectDropdown } from './MultiSelectDropdown/MultiSelectDropdown';
import { OptionGroup, OptionValue, SelectOption } from './model/Option';

type MultiSelectProps = {
    options: SelectOption[];
    placeholder?: string;
    onChange?: (selected: OptionValue[]) => void;
};

export function MultiSelect({ options, placeholder = 'Select...', onChange = () => {} }: MultiSelectProps) {
    const [selectedValues, setSelectedValues] = useSelectOptions(onChange);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const allOptions = options.flatMap((opt) => ('options' in opt ? opt.options : [opt]));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (value: OptionValue) => {
        setSelectedValues(value);
    };

    const selectGroupOptions = (group: OptionGroup) => {
        const groupValues = group.options.map((opt) => opt.value);
        setSelectedValues(groupValues);
    };

    const getLabel = (value: OptionValue) => {
        return allOptions.find((opt) => opt.value === value)?.label || value.toString();
    };

    return (
        <div className={styles.multiSelectContainer} ref={containerRef}>
            <MultiSelectControl
                selectedValues={selectedValues}
                placeholder={placeholder}
                getLabel={getLabel}
                onRemove={handleSelect}
                onToggle={() => setIsOpen((prev) => !prev)}
                isOpen={isOpen}
            />

            {isOpen ? (
                <MultiSelectDropdown
                    options={options}
                    selectedValues={selectedValues}
                    onSelect={handleSelect}
                    onSelectGroup={selectGroupOptions}
                />
            ) : null}
        </div>
    );
}
