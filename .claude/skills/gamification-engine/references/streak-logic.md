# Streak Tracking Logic

## Streak Update Pattern

Track consecutive days of activity by comparing the current date with the last activity date.

```ts
/**
 * Update streak based on current and last activity dates
 */
export function updateStreak(currentDate: Date, lastActivityDate: Date, currentStreak: number) {
  const diffDays = Math.floor(
    (currentDate.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 1) {
    // Consecutive day: increment streak
    return currentStreak + 1;
  } else if (diffDays > 1) {
    // Break in streak: reset to 1
    return 1;
  }
  // Same day: no change
  return currentStreak;
}
```

## Streak Milestones

- **3 Days**: Novice (Small XP Bonus)
- **7 Days**: Dedicated (Achievement Unlock)
- **30 Days**: Master (Exclusive Badge)
- **365 Days**: Legend (Special Prize)
