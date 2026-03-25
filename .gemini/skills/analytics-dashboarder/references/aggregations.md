# SQL Aggregations (Drizzle - Generic Patterns)

## Event Counts (Group By Time)

Commonly used for time-series charts (e.g., daily activity, revenue over time).

```ts
import { db } from "../db";
import { events } from "../db/schema";
import { count, sql } from "drizzle-orm";

/**
 * Get event counts per day for a specific time range
 */
export async function getEventStats(days: number = 30) {
  return await db
    .select({
      time: sql<string>`DATE(${events.timestamp})`,
      count: count(),
    })
    .from(events)
    .where(sql`${events.timestamp} >= NOW() - INTERVAL '${sql.raw(days.toString())} days'`)
    .groupBy(sql`DATE(${events.timestamp})`)
    .orderBy(sql`DATE(${events.timestamp})`);
}
```

## Categorical Distribution (Pie/Bar Chart)

Commonly used for distribution charts (e.g., status breakdown, category percentage).

```ts
import { db } from "../db";
import { records } from "../db/schema";
import { count } from "drizzle-orm";

/**
 * Get count of records per category or status
 */
export async function getDistribution(column: string) {
  return await db
    .select({
      key: sql.raw(column),
      count: count(),
    })
    .from(records)
    .groupBy(sql.raw(column));
}
```

## Numerical Aggregations (Sum/Avg)

```ts
import { db } from "../db";
import { transactions } from "../db/schema";
import { sum, avg } from "drizzle-orm";

/**
 * Get total and average values
 */
export async function getNumericalStats() {
  return await db
    .select({
      total: sum(transactions.amount),
      average: avg(transactions.amount),
    })
    .from(transactions);
}
```
