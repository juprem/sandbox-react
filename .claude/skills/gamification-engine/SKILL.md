---
name: gamification-engine
description: Use this skill whenever implementing reward systems, tracking user progress (XP, levels, streaks), or designing achievements. It provides a consistent framework for driving user engagement and retention.
---

# Gamification Engine

This skill guides the implementation of gamification mechanics, focusing on XP calculation, level progression, and streak tracking.

## Why Gamification?
- **XP & Levels**: Provides a sense of accomplishment and clear milestones, encouraging continuous user activity.
- **Streaks**: Encourages daily habits and consistent usage by rewarding consecutive active days.
- **Achievements**: Drives long-term engagement by providing specific, unlockable goals.
- **Feedback Loops**: Instant rewards (XP) create a positive reinforcement cycle that keeps the application "alive."

## Workflow

### 1. XP Calculation

- Award XP for specific user actions (e.g., completing a task, daily login).
- Use multipliers for specific conditions (e.g., high priority tasks, long streaks).
- Implement a server-side logic to award XP securely.

### 2. Level Progression

- Define XP thresholds for level-up.
- Use formulas for exponential level scaling.
- Award bonuses or unlock features on level-up.

### 3. Streak Tracking

- Track consecutive days of activity.
- Implement logic to handle streak freezes or grace periods.
- Award extra XP or badges for achieving streak milestones.

### 4. Achievements & Rewards

- Define a list of unlockable achievements.
- Trigger achievement unlocks based on user data.
- Award virtual or real rewards for achievements.

## Guidelines

- **Consistency**: Ensure XP is awarded consistently and fairly across all actions.
- **Fair Play**: Implement safeguards to prevent users from gaming the system.
- **Feedback**: Provide immediate visual feedback for XP awards and level-ups.
- **Progression**: Design progression to be engaging and challenging over time.

## Reference Patterns

See [references/formulas.md](references/formulas.md) for XP and level calculation formulas.
See [references/streak-logic.md](references/streak-logic.md) for streak tracking implementation details.
