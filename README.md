# Flowly

Project and task management MVP built with Next.js (App Router), TypeScript, Tailwind, Prisma, and Clerk.

This repo is built **commit by commit**. See:

- [`docs/ROADMAP.md`](./docs/ROADMAP.md) — phased plan (C01–C30)
- [`COMMANDS.md`](./COMMANDS.md) — shell commands used per commit (reproduce each step)

## Prerequisites

- Node.js 20+
- pnpm
- (later) Neon Postgres URL and Clerk keys

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Purpose               |
| ------------- | --------------------- |
| `pnpm dev`    | Dev server            |
| `pnpm build`  | Production build      |
| `pnpm start`  | Run production server |
| `pnpm lint`   | ESLint                |
| `pnpm format` | Format with Prettier  |

## Project layout

```
src/
  app/                 # routes (App Router)
  components/ui/       # design-system primitives (shadcn)
  components/layout/   # app chrome
  features/            # domain modules (projects, tasks, …)
  hooks/               # shared hooks
  lib/                 # db, auth helpers, utils
  types/               # shared types
docs/
  ROADMAP.md           # commit-sized implementation plan
```

## Current progress

- **C01–C02** Scaffold + Prettier + folder structure
- **C03** shadcn/ui (`button`, `card`, `input`)
- Next: **C04** Prisma + PostgreSQL (needs `DATABASE_URL`)

## License

Private / TBD
