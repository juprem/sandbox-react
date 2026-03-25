---
name: project-initializer
description: Use this skill whenever starting a new TanStack Start project, adding core database infrastructure, or configuring modern tooling (React Compiler, oxlint, oxfmt). This is the mandatory entry point for any project setup or foundational configuration changes.
---

# Project Initializer

This skill guides the initialization of a TanStack Start project with a robust stack: NeonDB, Drizzle ORM, Authentication, Panda CSS, and modern performance tooling.

## Why this stack?
- **TanStack Start**: Provides full-stack type safety and seamless routing.
- **NeonDB + Drizzle**: Offers a serverless PostgreSQL experience with a type-safe ORM for rapid development.
- **Panda CSS**: Delivers high-performance, atomic styling without the runtime overhead of traditional CSS-in-JS.
- **Ox-Tooling (oxlint/oxfmt)**: Extremely fast linting and formatting, significantly improving developer experience.
- **React Compiler**: Automates memoization, removing the need for `useMemo` and `useCallback` while ensuring optimal performance.

## Workflow

### 1. Project Initialization
- Initialize TanStack Start: `npx @tanstack/cli@latest create <app-name> --target-dir . -f --add-ons neon,drizzle,tanstack-query,compiler --package-manager pnpm --no-git --no-examples`.
- Install core dependencies: `pnpm install @tanstack/react-router @tanstack/start lucide-react clsx`.
- Setup oxlint & oxfmt: `pnpm add -D oxlint oxfmt`.
- Follow the structure: `src/routes`, `src/components`, `src/db`, `src/server`, `src/styles`.

### 2. Database Setup (NeonDB + Drizzle)
- Drizzle is already added via CLI add-on.
- Create `drizzle.config.ts` and `src/db/index.ts`.
- Run migrations: `pnpm db:generate` and `pnpm db:push`.

### 3. Styling (Panda CSS)
- Install Panda CSS & PostCSS: `pnpm add -D @pandacss/dev postcss autoprefixer`.
- Initialize Panda with PostCSS: `npx panda init -p`. 
- Configure Panda CSS in `panda.config.ts`.
- Use Panda CSS for styling.
- Add `prepare` script: `"prepare": "panda codegen"`.

### 4. Linting & Formatting (oxlint/oxfmt)
- Install: `pnpm add -D oxlint oxfmt`.
- Add scripts to `package.json`:
  ```json
  "lint": "oxlint src",
  "format": "oxfmt"
  ```
- Create `.oxlintrc.json` to avoid issues with loading ESM/TS configs:
  ```json
  {
    "rules": {
      "correctness": "warn"
    }
  }
  ```
- Create `.oxfmtrc.json`: `npx oxfmt --init`.

## Examples

**Example 1: Initializing a new project**
**Input:** "Create a new TanStack project with Neon and Drizzle."
**Output:** Starts the initialization command with the correct add-ons and structure.

**Example 2: Adding oxlint to an existing project**
**Input:** "Help me add fast linting to my project."
**Output:** Provides instructions for installing `oxlint`, adding scripts to `package.json`, and creating `.oxlintrc.json`.

## Guidelines
- **Package Manager**: Always use `pnpm`.
- **React Compiler**: The compiler handles optimization automatically. Do NOT use `useMemo` or `useCallback`.
- **Ox-Tooling**: Always use `oxlint` for linting and `oxfmt` for formatting.
- **Strict Typing**: All schemas, routes, and tRPC procedures must be fully typed.
- **Safety**: Never expose secrets on the client.
- **Directory Organization**: Maintain high granularity in the `src/components` directory. Never exceed 3 component files per directory; create subdirectories (e.g., `modals/`, `shared/`, `forms/`) to group related logic.

## References
see [refrences/trpc-router-config.md](references/trpc-router-config.md) for the exact set up of the trpc route inside tanstack router
