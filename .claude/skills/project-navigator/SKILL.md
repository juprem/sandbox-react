---
name: project-navigator
description: Use this skill to navigate the sandbox-react project. Reference it whenever you need to find a file, understand the project structure, locate a component, add a new route/feature, or understand the tRPC/data layer layout. This is the mandatory starting point for any task in this repository — use it before reading files to know exactly where to look.
---

# sandbox-react — Project Navigator

/btw**Dev server:** `pnpm dev` → `http://localhost:3001`  
**Stack:** TanStack Start · React 19 · Vite · Panda CSS · Ant Design · tRPC · Prisma/NeonDB · framer-motion · Effect 3.x

---

## src/ Directory Layout

```
src/
├── assets/          SVG icons (cross, dragging, flag, mine, plus, react, resize)
├── components/      All sandbox demo components — one PascalCase dir each
├── hooks/           Shared custom hooks
├── integrations/    tanstack-query provider + tRPC client & router
├── model/           Shared TypeScript interfaces/types
├── pages/           Full-page components (Todo feature)
├── routes/          TanStack Router file-based routes (mirrors URL structure)
├── service/         Data-fetching service functions
├── styles/          Panda CSS CVA utilities (GlobalStyle.ts)
└── utils/           Pure utility functions
```

---

## Routes → Component mapping

| Route file | URL | Renders |
|---|---|---|
| `__root.tsx` | (layout) | Sidebar + Content shell; sidebar menu defined here |
| `index.lazy.tsx` | `/` | Home/index page |
| `effect-todo.tsx` | `/effect-todo` | `EffectTodo` — Effect library course (7 chapters) |
| `basic-animation.tsx` | `/basic-animation` | Framer Motion demos |
| `canvas-filler.tsx` | `/canvas-filler` | Canvas whiteboard |
| `code-display.tsx` | `/code-display` | Shiki code display demo |
| `conway-game.tsx` | `/conway-game` | Conway's Game of Life v1 |
| `conway-game2.tsx` | `/conway-game2` | Conway's Game of Life v2 |
| `crash-test.tsx` | `/crash-test` | Error boundary / suspense test |
| `draggable-motion.tsx` | `/draggable-motion` | Framer Motion drag |
| `enhanced-switch.tsx` | `/enhanced-switch` | Animated toggle switch |
| `infinite-loading.tsx` | `/infinite-loading` | TanStack Query infinite scroll |
| `mine-sweeper.tsx` | `/mine-sweeper` | Minesweeper game |
| `mounting.tsx` | `/mounting` | Mount/unmount lifecycle test |
| `pedantix.tsx` | `/pedantix` | Pedantix word game |
| `tetris.tsx` | `/tetris` | Tetris game |
| `x-state.tsx` | `/x-state` | XState finite state machine demo |
| `todo/index.tsx` | `/todo` | Todo list page |
| `todo/$todoId.tsx` | `/todo/:todoId` | Todo detail page |
| `api/trpc.$.ts` | `/api/trpc/*` | tRPC API handler (server) |

**Adding a new route:**
1. Create `src/components/MyComponent/MyComponent.tsx`
2. Create `src/routes/my-route.tsx` with `createFileRoute('/my-route')({ component: MyComponent })`
3. Add `{ label: 'My Label', path: '/my-route' }` to the `menu` array in `src/routes/__root.tsx`

---

## Key files — find anything fast

| What you need | Where to look |
|---|---|
| Sidebar menu items | `src/routes/__root.tsx` → `const menu` array (line ~25) |
| Global layout (Sidebar/Content shell) | `src/components/Layout/` — `Sidebar.tsx`, `Content.tsx`, `Breadcrumbs.tsx` |
| Panda CSS utility classes | `src/styles/GlobalStyle.ts` — `flex`, `buttonShape`, `inputShape`, `basicShape` |
| Panda CSS `css()` function | `import { css } from '@styled-system/css'` (generated) |
| tRPC init (procedures) | `src/integrations/trpc/init.ts` — exports `TRPCRouter`, `publicProcedure` |
| tRPC React client | `src/integrations/trpc/react.ts` |
| tRPC root router | `src/integrations/trpc/router/router.ts` |
| tRPC sub-routers | `src/integrations/trpc/router/{calendar,rdv,task}Router.ts` |
| TanStack Query provider | `src/integrations/tanstack-query/root-provider.tsx` |
| Prisma DB client | `src/db.ts` |
| Shared TypeScript models | `src/model/` — `TodoModel.ts`, `TaskModel.ts`, `PedantixModel.ts`, etc. |
| Global hooks | `src/hooks/` — `useTodos.ts`, `useTasks.ts`, `useDebounceState.ts`, etc. |
| Data services | `src/service/` — `todoService.ts`, `taskService.ts`, `calendarService.ts` |
| Shiki syntax highlighter (reusable) | `src/components/CodeDisplay/MultiPageCodeShiki/CodeDisplayShiki.tsx` |
| Auto-generated route tree | `src/routeTree.gen.ts` (do not edit manually) |

---

## tRPC Router Structure

```
trpcRouter (src/integrations/trpc/router/router.ts)
├── calendar  → calendarRouter  (calendarRouter.ts)
├── rdv       → rdvRouter       (rdvRouter.ts)
└── taskRouter → taskRouter     (taskRouter.ts)
```

All procedures use `publicProcedure` from `src/integrations/trpc/init.ts`. No auth middleware currently.

---

## Styling conventions

- **Panda CSS** for all new styles: `import { css } from '@styled-system/css'`
- **CVAs** for reusable variants: `import { flex, buttonShape } from 'src/styles/GlobalStyle'`
- Dark theme tokens: bg `#2e2e2e`, card `#1e1e1e`, border `#3b3b3b`, text `wheat`/`white`
- **No raw CSS files** for new components — Panda CSS only
- Exception: older components use `.module.scss` (CSS Modules) — leave those as-is

---

## State management patterns

| Pattern | Used by |
|---|---|
| `useState` | Most demo components |
| Zustand store | Calendar (`useCalendarStore`), Sudoku (`useSudokuStore`), RPG (`BattleStore`, `PlayerStore`), Pedantix (`PedantixStore`) |
| TanStack Query | Todo page, InfiniteScrolling |
| tRPC + TanStack Query | Todo page data layer |
| XState | `xstate/XState.tsx` |
| Effect 3.x | `EffectTodo/` (course), `TodoEffect/` (service pattern) |

---

## Component conventions

- One component per file, named exports only (`export function MyComponent`)
- Complex components use sub-directories with `model/`, `hooks/`, `store/`, `utils/` inside
- Sub-components live alongside the parent in its directory
- Max 3 component files per flat directory; create sub-dirs when exceeded

For the full component directory listing see [references/components-map.md](references/components-map.md).
