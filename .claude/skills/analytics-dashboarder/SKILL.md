---
name: analytics-dashboarder
description: Use this skill whenever building data-intensive dashboards, reports, or visualizations. It provides a standardized approach to data aggregation with Drizzle and visualization with Recharts. This is the mandatory entry point for any analytics-related tasks.
---

# Analytics Dashboarder (Recharts Edition)

This skill guides the implementation of analytics dashboards, focusing on data aggregation (SQL/Drizzle) and visualization using Recharts.

## Why this approach?
- **Drizzle Aggregation**: Leverages the power of SQL for efficient server-side data processing, ensuring fast dashboard loads even with large datasets.
- **Recharts**: Offers a highly composable and responsive charting library that fits perfectly into the React ecosystem.
- **Dynamic Filters**: Using TanStack Router search params for filters ensures that dashboard states are shareable and persistent across navigation.
- **Optimized Performance**: Combining TanStack Query caching with indexed NeonDB queries provides a snappy, high-performance user experience.

## Dashboard Component Structure
ALWAYS structure your dashboard pages or components as follows:

```tsx
interface DashboardProps {
    // Props for filters or data
}

export function DashboardComponent({ ... }: DashboardProps) {
    // 1. Filter State (TanStack Router Search Params)
    // 2. Data Fetching (TanStack Query + tRPC)
    // 3. Transformation (Mapping data for Recharts)

    return (
        <div className={/* Panda CSS Layout */}>
            {/* 4. ResponsiveContainer + Recharts Chart */}
        </div>
    )
}
```

## Workflow

### 1. Data Aggregation (SQL/Drizzle)

- Use `Drizzle` to perform complex SQL aggregations.
- Implement efficient queries for time-series and categorical data.
- Ensure data is formatted correctly for Recharts consumption.

### 2. Visualization (Recharts)

- Use `Recharts` for composable and responsive charts (Line, Bar, Pie, Area).
- Leverage Recharts' components (`ResponsiveContainer`, `Tooltip`, `Legend`, `XAxis`, `YAxis`).
- Style charts via Panda CSS or Recharts' inline props for a consistent aesthetic.

### 3. Filters & Interaction

- Implement date range filters and category filters for analytics.
- Use `TanStack Router` search params to drive the analytics filters.
- Allow users to interact with chart data (e.g., tooltips, clicking on data points).

### 4. Performance & Caching

- Use `TanStack Query` to cache analytics data for faster repeated access.
- Ensure aggregation queries are optimized with proper indexes in NeonDB.

## Guidelines

- **Clarity**: Ensure visualizations are easy to understand and interpret.
- **Responsiveness**: Always wrap charts in `ResponsiveContainer` to ensure they fit various screen sizes.
- **Consistency**: Maintain a consistent color palette across all charts using Panda CSS tokens.
- **Performance**: Optimize data fetching and aggregation to avoid slow dashboard loads.

## Reference Patterns

See [references/aggregations.md](references/aggregations.md) for common SQL aggregation patterns using Drizzle.
See [references/chart-configs.md](references/chart-configs.md) for Recharts configuration examples.
