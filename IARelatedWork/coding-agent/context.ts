// Project-specific context injected into every agent system prompt.
// Update this file when conventions, schema, or tRPC procedures change.
export const PROJECT_CONTEXT = `
## Calendar App — Project Context

Tech stack: TanStack Start (SSR), TanStack Router (file-based), tRPC 11, Prisma 7,
NeonDB (PostgreSQL), Clerk auth, Ant Design 6, Tailwind CSS 4, Zustand, Day.js.
Language: TypeScript strict mode. Build: Vite + Cloudflare Workers.

Path aliases: @/* and #/* both resolve to ./src/*.

Architecture (request flow):
  Browser → TanStack Router (src/routes/) → Components (src/components/)
  → Service hooks (src/services/) → tRPC (src/integrations/trpc/router/)
  → Prisma (src/db.ts) → NeonDB

MANDATORY conventions (violations = critical review issues):
1. Named exports only — no export default
2. No "as" type assertions — use Zod .safeParse() or satisfies
3. No "any" types
4. One component per file
5. All API calls go through service hooks in src/services/ — never call tRPC directly in components
6. Input validation with Zod schemas defined in src/models/
7. New routes → file under src/routes/ (auto-discovered)
8. New tRPC procedures → add to existing sub-router in src/integrations/trpc/router/,
   or create a new sub-router and register it in router.ts
9. UI: Ant Design components + Tailwind for layout/spacing only
10. Dates: Day.js. Always store as UTC midnight ISO string "YYYY-MM-DDT00:00:00.000Z"

Database schema (Prisma — PostgreSQL via Neon):
- day: id, date (DateTime @unique @db.Date), → many rdv
- rdv: id, day_id (FK), start_hour, end_hour, name, rdv_type?, is_confirmed?
- contact: id, firstname, lastname, email?, phone_number?, notes?

Current tRPC procedures:
- calendar.listByDay(isoDate: string) → day + rdvs
- calendar.listByWeek({ startDay, startMonth, startYear }) → 7 days
- calendar.listByMonth({ month, year }) → all days in month
- calendar.addRdv(RdvCreateSchema) → new rdv
- contacts.listAll() → all contacts
- contacts.addContact(CreateContactSchema) → new contact
`.trim()
