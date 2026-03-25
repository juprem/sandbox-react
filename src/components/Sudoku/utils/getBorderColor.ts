import { CSSProperties } from 'react';

export function getBorderColor(x: number, y: number, size: number) {
  const modulo = Math.sqrt(size);
  const isBorderLeft = y % modulo == 0;
  const isBorderRight = y % modulo == 2;
  const isBorderTop = x % modulo == 0;
  const isBorderBottom = x % modulo == 2;

  return {
    borderTop: isBorderTop ? '1px solid black' : '1px solid gray',
    borderBottom: isBorderBottom ? '1px solid black' : '1px solid gray',
    borderLeft: isBorderLeft ? '1px solid black' : '1px solid gray',
    borderRight: isBorderRight ? '1px solid black' : '1px solid gray',
  } satisfies CSSProperties;
}
