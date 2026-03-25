# XP and Level Formulas

## Level Calculation (Exponential)

A common formula for level calculation where each level requires more XP than the last.

```ts
/**
 * Calculate level based on total XP
 */
export function calculateLevel(totalXP: number) {
  const baseXP = 100;
  const exponent = 1.5;
  // level = (totalXP / baseXP) ^ (1 / exponent)
  return Math.floor(Math.pow(totalXP / baseXP, 1 / exponent)) + 1;
}

/**
 * Calculate XP required for a specific level
 */
export function xpForLevel(level: number) {
  const baseXP = 100;
  const exponent = 1.5;
  // xp = baseXP * (level - 1) ^ exponent
  return Math.floor(baseXP * Math.pow(level - 1, exponent));
}
```

## XP Award Table

| Action              | XP Award |
| :------------------ | :------- |
| Task Created        | 5        |
| Task Completed      | 20       |
| High Priority Bonus | +10      |
| Daily Login         | 10       |
| Weekly Goal         | 100      |
