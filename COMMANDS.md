# Flowly — Commands by commit

Shell commands used while building each roadmap step (`docs/ROADMAP.md`).  
Use this to **reproduce** a step or to see what tooling was involved.

Conventions:

- Run from the **repo root** unless noted.
- Package manager: **pnpm**
- Verification commands (`lint`, `build`, `format`) are listed when they were part of the step.
- Manual edits (files written in the editor) are **not** listed here—only shell/CLI.

---

## C01 — Scaffold Next.js

```bash
# Check toolchain
node -v
pnpm -v

# Scaffold App Router + TypeScript + Tailwind into the current directory
# (--disable-git: repo already had .git)
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm \
  --disable-git \
  --turbopack \
  --yes
```

Smoke check (optional):

```bash
pnpm dev
# open http://localhost:3000
```

> **Note:** `create-next-app` may install the current Next.js major (e.g. 16.x), not necessarily “15”. App Router concepts still match the roadmap.

**Git commit:** included in `chore: foundation C01–C02 (Next.js scaffold + tooling)`

---

## C02 — Tooling & folder structure

```bash
# Prettier + Tailwind class sorting + ESLint harmony
pnpm add -D prettier prettier-plugin-tailwindcss eslint-config-prettier

# Feature-oriented folders (tracked via .gitkeep)
mkdir -p \
  src/components/ui \
  src/components/layout \
  src/features \
  src/hooks \
  src/lib \
  src/types

touch \
  src/components/.gitkeep \
  src/components/ui/.gitkeep \
  src/components/layout/.gitkeep \
  src/features/.gitkeep \
  src/hooks/.gitkeep \
  src/lib/.gitkeep \
  src/types/.gitkeep
```

Config added by hand (not CLI): `.prettierrc`, `.prettierignore`, `eslint.config.mjs` (Prettier flat config), `package.json` scripts (`format`, `format:check`), `README.md`.

```bash
# Format + verify
pnpm format
pnpm format:check
pnpm lint
pnpm build
```

**Git commit:** included in `chore: foundation C01–C02 (Next.js scaffold + tooling)`

---

## C03 — shadcn/ui

```bash
# Initialize shadcn with defaults (base-nova, CSS variables)
pnpm dlx shadcn@latest init -d -y

# Add first primitives
pnpm dlx shadcn@latest add button card input -y

# Format + verify
pnpm format
pnpm lint
pnpm build
```

Home page smoke test (`src/app/page.tsx`) was edited by hand to use Button / Card / Input.

**Git commit:** `feat(ui): add shadcn/ui and home smoke test (C03)`

---

## Housekeeping (not a roadmap step)

After C03, IDE files were accidentally staged; cleaned up with:

```bash
# Append IDE ignores to .gitignore (or edit by hand)
# then untrack JetBrains config:
git rm -r --cached .idea
git add .gitignore
git commit -m "chore: ignore IDE config (.idea)"
```

---

## C04 — Prisma + PostgreSQL

```bash
# Dependencies (Prisma 7 + Postgres driver adapter)
pnpm add @prisma/client @prisma/adapter-pg pg dotenv
pnpm add -D prisma @types/pg tsx

# Allow Prisma engine postinstall scripts (pnpm)
# package.json → pnpm.onlyBuiltDependencies: ["@prisma/engines", "prisma", "esbuild"]
pnpm rebuild prisma @prisma/engines

# Scaffold Prisma (creates prisma/schema.prisma, prisma.config.ts, .env)
pnpm exec prisma init \
  --datasource-provider postgresql \
  --output ../src/generated/prisma

# Local Postgres (dedicated container; port 5434 to avoid clashes)
# docker-compose.yml was added by hand; then:
docker compose up -d
# or: pnpm db:up

# Point .env at local DB (also mirrored in .env.example)
# DATABASE_URL="postgresql://flowy:flowy@localhost:5434/flowy?schema=public"

# After editing prisma/schema.prisma with User / Project / Task models:
pnpm exec prisma migrate dev --name init
pnpm exec prisma generate

# Verify
pnpm lint
pnpm build
```

Files added/edited by hand in this step:

- `prisma/schema.prisma` — domain models
- `src/lib/db.ts` — Prisma client singleton + `@prisma/adapter-pg`
- `docker-compose.yml` — local Postgres
- `.env.example` — documented connection string
- `src/app/page.tsx` — Server Component DB smoke test
- `package.json` scripts: `db:*`, `postinstall`, `build` runs `prisma generate`

**Git commit:** `feat(db): prisma schema, client, and local postgres (C04)`

---

## Upcoming (fill in as we go)

### C05 — Clerk auth

_(pending)_

### C06 — App shell

_(pending)_

---

## Handy always-available scripts

| Command             | Purpose                              |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Dev server                           |
| `pnpm build`        | `prisma generate` + production build |
| `pnpm start`        | Run production server                |
| `pnpm lint`         | ESLint                               |
| `pnpm format`       | Prettier write                       |
| `pnpm format:check` | Prettier check                       |
| `pnpm db:up`        | `docker compose up -d`               |
| `pnpm db:down`      | `docker compose down`                |
| `pnpm db:migrate`   | `prisma migrate dev`                 |
| `pnpm db:generate`  | `prisma generate`                    |
| `pnpm db:studio`    | Prisma Studio                        |
