# Drizzle Schema Patterns (Generic)

## Many-to-Many Relationship

```ts
import { pgTable, text, uuid, primaryKey, timestamp } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull().unique(),
});

export const itemToCategories = pgTable(
  "item_to_categories",
  {
    itemId: uuid("item_id")
      .references(() => items.id)
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => categories.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.itemId, t.categoryId] }),
  }),
);
```

## Parent/Child Relationship

```ts
export const entities = pgTable("entities", {
  id: uuid("id").defaultRandom().primaryKey(),
  parentId: uuid("parent_id").references(() => entities.id, { onDelete: "cascade" }),
  data: text("data").notNull(),
});
```

## Common Meta Fields

```ts
export const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};
```

## Indexing & Constraints

```ts
import { index, uniqueIndex } from "drizzle-orm/pg-core";

export const records = pgTable(
  "records",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    identifier: text("identifier").notNull(),
    ownerId: uuid("owner_id").notNull(),
  },
  (t) => ({
    identifierIdx: uniqueIndex("identifier_idx").on(t.identifier),
    ownerIdx: index("owner_idx").on(t.ownerId),
  }),
);
```
