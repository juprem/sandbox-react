---
name: db-architect
description: Use this skill whenever defining new tables, relationships, or performance indexes in the NeonDB database. It ensures a robust and performant schema design using Drizzle ORM. This is the mandatory entry point for any database architecture changes.
---

# DB Architect

This skill provides guidance for architecting robust and performant database schemas using Drizzle ORM with NeonDB.

## Why Drizzle and Neon?
- **NeonDB**: Provides a high-performance, serverless PostgreSQL with branching and autoscaling.
- **Drizzle ORM**: Offers a lightweight, type-safe, and SQL-like experience, making schema management and query construction highly predictable and efficient.
- **Relational Integrity**: Proper use of foreign keys and constraints ensures data consistency across the application.
- **Performance**: Strategic indexing prevents database bottlenecks as the application scales.

## Workflow

### 1. Schema Design

- Define tables in `src/db/schema.ts`.
- Use `uuid` for IDs and `timestamp` for tracking creation and updates.
- Use `pgTable` for PostgreSQL-specific features.
- Define relationships clearly (e.g., `one-to-many`, `many-to-many`).
- **Explicit Relations**: ALWAYS define explicit Drizzle relations using the `relations` function. This enables efficient and easy-to-read relational queries (using `db.query`) in tRPC procedures.

### 2. Migration Management

- Use `drizzle-kit` for migrations.
- `pnpm drizzle-kit generate`: Generate SQL migrations based on schema changes.
- `pnpm drizzle-kit push`: Apply changes directly to NeonDB for rapid development.
- `pnpm drizzle-kit studio`: Visualize and manage data in a browser.

### 3. Performance Optimization

- **Indexing**: ALWAYS add indexes to columns frequently used in `where`, `orderBy`, or `groupBy` clauses (e.g., `userId`, `status`, `priority`, `clerkId`). This prevents full table scans and keeps queries fast (<100ms) as the data grows.
- Use `NeonDB` specific features like branching for testing migrations.
- Monitor query performance and use `explain` to identify bottlenecks.

## Guidelines

- **Type Safety**: Leverage Drizzle's `InferSelectModel` and `InferInsertModel` for typed data access.
- **Atomic Operations**: Use transactions (`db.transaction`) for multi-step database updates to ensure data consistency and reduce roundtrips.
- **Relational Integrity**: Always define foreign keys and constraints.
- **Naming Conventions**: Use `snake_case` for database columns and `camelCase` for TypeScript fields.

## Reference Patterns

See [references/schema-patterns.md](references/schema-patterns.md) for common Drizzle patterns (Many-to-Many, Parent/Child, Timestamps).
