# Flowly

Project and task management MVP built with Next.js (App Router), TypeScript, Tailwind, Prisma, and Clerk.

This repo is built **commit by commit**. See:

- [`docs/ROADMAP.md`](./docs/ROADMAP.md) — phased plan (C01–C30)
- [`COMMANDS.md`](./COMMANDS.md) — shell commands used per commit (reproduce each step)

## Prerequisites

- Node.js 20+
- pnpm
- Docker (for local Postgres) **or** any Postgres `DATABASE_URL`
- (later) Clerk keys for C05

## Setup

```bash
pnpm install
cp .env.example .env
pnpm db:up          # starts local Postgres on port 5434
pnpm db:migrate     # applies Prisma migrations
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The home page runs a small DB smoke query.

## Scripts

| Command            | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `pnpm dev`         | Dev server                                |
| `pnpm build`       | Generate Prisma client + production build |
| `pnpm start`       | Run production server                     |
| `pnpm lint`        | ESLint                                    |
| `pnpm format`      | Format with Prettier                      |
| `pnpm db:up`       | Start local Postgres (`docker compose`)   |
| `pnpm db:down`     | Stop local Postgres                       |
| `pnpm db:migrate`  | `prisma migrate dev`                      |
| `pnpm db:generate` | `prisma generate`                         |
| `pnpm db:studio`   | Prisma Studio                             |

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
  generated/prisma/    # Prisma Client (generated, gitignored)
prisma/
  schema.prisma
  migrations/
docs/
  ROADMAP.md           # commit-sized implementation plan
```

## Current progress

- **C01–C02** Scaffold + Prettier + folder structure
- **C03** shadcn/ui (`button`, `card`, `input`)
- **C04** Prisma + PostgreSQL (Docker on `:5434`)
- Next: **C05** Clerk auth

## License

Private / TBD
