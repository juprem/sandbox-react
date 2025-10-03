import { CSSProperties } from 'react';

export function getBorderColor(x: number, y: number) {
    const isBorderLeft = y % 3 == 0;
    const isBorderRight = y % 3 == 2;
    const isBorderTop = x % 3 == 0;
    const isBorderBottom = x % 3 == 2;

    return {
        borderTop: isBorderTop ? '1px solid black' : '1px solid gray',
        borderBottom: isBorderBottom ? '1px solid black' : '1px solid gray',
        borderLeft: isBorderLeft ? '1px solid black' : '1px solid gray',
        borderRight: isBorderRight ? '1px solid black' : '1px solid gray',
    } satisfies CSSProperties;
}
