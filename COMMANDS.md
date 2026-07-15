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

## Upcoming (fill in as we go)

### C04 — Prisma + PostgreSQL

*(pending — will document `pnpm add`, `prisma init`, migrate, etc.)*

### C05 — Clerk auth

*(pending)*

### C06 — App shell

*(pending)*

---

## Handy always-available scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check |
