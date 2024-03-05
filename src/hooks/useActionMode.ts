import { useState } from 'react';

export type ActionMode = 'drag' | 'resize' | 'none';

export function useActionMode() {
    const [actionMode, setActionMode] = useState<ActionMode>('none');
    const setActionModeWithPrev = (mode: ActionMode) => {
        setActionMode((prevState) => prevState === mode ? 'none' : mode)
    }

    return [actionMode, setActionModeWithPrev] as const;
}