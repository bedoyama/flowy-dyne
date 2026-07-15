# Flowly — Commit-Sized Implementation Roadmap

Build the MVP in **small, reviewable commits**. Each commit should teach one concept and leave the app runnable.

Shell commands for each step are logged in [`COMMANDS.md`](../COMMANDS.md) (kept in sync as commits land).

**Stack defaults** (change only if you have a strong preference):

| Concern     | Choice                                        | Why                          |
| ----------- | --------------------------------------------- | ---------------------------- |
| Framework   | Next.js (App Router; current create-next-app) | RSC + Server Actions         |
| UI          | Tailwind + shadcn/ui                          | Fast, consistent components  |
| DB          | Prisma + PostgreSQL (Neon)                    | Simple serverless Postgres   |
| Auth        | Clerk                                         | Fastest path to working auth |
| Forms       | React Hook Form + Zod                         | Type-safe validation         |
| Client data | TanStack Query                                | Phase 4                      |
| UI state    | Zustand                                       | Phase 4                      |
| DnD         | @hello-pangea/dnd                             | Phase 3                      |

**Folder conventions** (introduced gradually):

```
src/
  app/                 # routes only
  components/ui/       # shadcn primitives
  components/layout/   # shell, nav, sidebar
  features/            # domain: projects, tasks, board, dashboard
  hooks/               # shared hooks
  lib/                 # db, auth helpers, utils
  types/               # shared types (optional)
```

**Commit message style**: `type(scope): short why`  
Examples: `chore: scaffold next.js app`, `feat(tasks): create task via server action`

---

## Phase 1 — Foundation

### C01 — Scaffold Next.js

- Create Next.js + TS + Tailwind + App Router + `src/`
- Smoke-check: `pnpm dev` shows default page
- **Learn**: App Router entry (`layout.tsx`, `page.tsx`)

### C02 — Tooling & structure

- Prettier (+ Tailwind plugin), align ESLint
- Add empty dirs: `components`, `features`, `hooks`, `lib` (+ `.gitkeep`)
- Root `README` stub: how to run
- **Learn**: project layout conventions

### C03 — shadcn/ui

- `shadcn init` + a few primitives (`button`, `card`, `input`)
- Replace home page with a simple branded shell using those components
- **Learn**: `components.json`, `cn()`, design tokens

### C04 — Prisma + PostgreSQL

- Install Prisma, `schema.prisma`, `lib/db.ts` singleton
- Models: `User` (clerk id), `Project`, `Task` (minimal fields)
- Env: `DATABASE_URL` (Neon free tier)
- Migration: `prisma migrate dev`
- **Learn**: Prisma client, migrations

### C05 — Clerk auth

- Clerk provider, middleware, sign-in/up routes
- Protect `/dashboard` (or `/projects`)
- Sync user to DB on first sign-in (webhook **or** upsert in a server helper)
- **Learn**: middleware, protected routes, identity → DB user

### C06 — App shell

- Layout with header, nav, user button
- Placeholder pages: Dashboard, Projects
- **Learn**: nested layouts, shared chrome

**Phase 1 done when**: signed-in user hits a protected page; DB connects; UI kit works.

---

## Phase 2 — Projects & Tasks

### C07 — Project schema polish + list page

- Ensure `Project` fields: `id`, `name`, `description?`, `ownerId`, timestamps
- Server Component page lists projects for current user
- **Learn**: RSC data fetching

### C08 — Create project (Server Action + form)

- Zod schema + Server Action `createProject`
- Form (start with native form + action; RHF later if needed)
- Revalidate path after create
- **Learn**: Server Actions, `revalidatePath`

### C09 — Project detail + task model

- Route `/projects/[projectId]`
- Task fields: `id`, `title`, `description?`, `status`, `order`, `projectId`
- List tasks under project (RSC)
- **Learn**: dynamic routes, relations

### C10 — Create / update / delete task

- Server Actions for CRUD
- Simple list UI with status select or buttons
- **Learn**: mutations + revalidation

### C11 — React Hook Form + Zod on forms

- Upgrade create project/task forms to RHF + Zod
- Shared form components if useful
- **Learn**: client forms talking to Server Actions

### C12 — Edit / delete project

- Complete project CRUD
- Empty states and basic validation messages
- **Learn**: full feature slice in `features/projects`

**Phase 2 done when**: user can own projects and manage tasks in a list.

---

## Phase 3 — Kanban & DnD

### C13 — Board layout (no DnD yet)

- Columns: `TODO` | `IN_PROGRESS` | `DONE`
- Group tasks by status (still click-to-change status OK)
- **Learn**: presentational board structure

### C14 — Drag and drop

- `@hello-pangea/dnd` on board
- Client component for board; pass initial tasks as props
- **Learn**: client islands inside RSC pages

### C15 — Persist status on drop

- Server Action updates `status` (+ `order` if easy)
- Optimistic UI on drop
- **Learn**: optimistic updates with server confirmation

### C16 — Reorder within column (optional stretch)

- Persist `order` for same-status tasks
- **Learn**: multi-field updates, edge cases

**Phase 3 done when**: drag changes status and survives refresh.

---

## Phase 4 — Client state & polish data UX

### C17 — TanStack Query setup

- Provider in client layout
- Query keys + hooks for projects/tasks where client interactivity needs them
- **Learn**: when RSC vs Query

### C18 — Loading / error / skeletons

- `loading.tsx`, error UI, skeleton components
- **Learn**: streaming & Suspense boundaries

### C19 — Zustand for UI state

- Sidebar open, board filters, view mode
- **Learn**: client UI store (not server data)

### C20 — Search & filters

- Filter tasks by status / text
- URL search params preferred for shareable filters
- **Learn**: `useSearchParams` / `nuqs` pattern

**Phase 4 done when**: filtering + loading states feel smooth.

---

## Phase 5 — Advanced MVP features

### C21 — Multi-step create dialog

- Dialog with 2–3 steps (e.g. basics → details → confirm)
- **Learn**: controlled multi-step UI

### C22 — Simple roles

- `ProjectMember` with `OWNER` | `COLLABORATOR`
- Authorize mutations by role
- **Learn**: authorization checks in Server Actions

### C23 — Dark mode

- `next-themes` + theme toggle
- **Learn**: theme provider + CSS variables (shadcn)

### C24 — Live-ish updates

- Polling **or** simple SSE for board refresh
- Start with polling via TanStack Query `refetchInterval`
- **Learn**: stale data strategies

### C25 — Dashboard stats

- Counts: projects, tasks by status, recent activity
- **Learn**: aggregate queries

**Phase 5 done when**: MVP feels product-like, not just a CRUD demo.

---

## Phase 6 — Polish & deploy

### C26 — Error boundaries & empty/error copy

### C27 — Responsive layout pass

### C28 — Env docs + production Prisma/Clerk config

### C29 — Deploy to Vercel

### C30 — README: architecture, scripts, env table, screenshots

**Phase 6 done when**: public URL works for a second user.

---

## How to use this roadmap day-to-day

1. Pick **one** commit ID (e.g. C01).
2. Implement only that scope.
3. Run the app and verify the “Learn” outcome.
4. Commit with the suggested style.
5. Stop if the diff grows past ~1–2 concerns — split instead of stuffing.

### Suggested session sizes

- **Busy day**: 1 commit
- **Normal evening**: 2–3 commits
- **Weekend deep work**: one full phase

### What _not_ to do early

- Don’t add TanStack Query before list CRUD works with RSC.
- Don’t add DnD before status lives in the DB.
- Don’t over-model permissions before single-user CRUD works.
- Don’t deploy until auth + one vertical feature works locally.

---

## Database sketch (target for C04–C09)

```prisma
model User {
  id        String    @id // Clerk user id
  email     String    @unique
  name      String?
  projects  Project[]
  createdAt DateTime  @default(now())
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  tasks       Task[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  order       Int        @default(0)
  projectId   String
  project     Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

Roles / members land in **C22**, not day one.

---

## Progress tracker

| ID      | Status  | Notes                         |
| ------- | ------- | ----------------------------- |
| C01     | done    | Next.js scaffold in repo root |
| C02     | done    | Prettier + folders + README   |
| C03     | done    | shadcn button/card/input      |
| C04     | pending | needs Neon `DATABASE_URL`     |
| C05     | pending | needs Clerk keys              |
| C06–C30 | pending |                               |

Update this table as you go.
