import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

export function useDebounceState<T>(initialValue: T, debounceTime = 500) {
    const [value, setValue] = useState(initialValue);
    const debouncedValue = useDebounce(value, debounceTime)

    return [debouncedValue, value, setValue] as const;
}