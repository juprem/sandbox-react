import { useState } from 'react';
import type { OptionValue } from "../model/Option";

export function useSelectOptions(onChange: (selected: OptionValue[]) => void) {
    const [selectedValues, setSelectedValues] = useState<OptionValue[]>([]);

    const onChangeOptions = (values: OptionValue[] | OptionValue) => {
        if (Array.isArray(values)) {
            const isAllSelected = values.every((value) => selectedValues.includes(value));

            const newValues = isAllSelected
                ? selectedValues.filter((value) => !values.includes(value))
                : [...new Set([...selectedValues, ...values])];

            setSelectedValues(newValues);
            onChange(newValues);
        } else {
            const newValues = selectedValues.includes(values)
                ? selectedValues.filter((v) => v !== values)
                : [...selectedValues, values];

            setSelectedValues(newValues);
            onChange(newValues);
        }
    };

    return [selectedValues, onChangeOptions] as const;
}
