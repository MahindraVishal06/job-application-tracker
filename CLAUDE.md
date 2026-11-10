# Job Application Tracker

A Chrome extension (Manifest V3) that saves a job automatically when the user applies,
reminds them to follow up, and shows stats. Core promise: zero manual data entry. All data
stays in the browser; there is no backend until Phase 3.

The full plan, including the numbered task list, is in
`../Job Application Tracker Extension Project Plan.pdf`. Work one task per session and stop
when that task is done.

## Stack

- **WXT** (Vite-based extension framework) on **Manifest V3**, **TypeScript**, **React 19**
- **Tailwind CSS v4** via `@tailwindcss/vite` (configured in `wxt.config.ts`)
- **Dexie.js** over IndexedDB for applications and status events
- **chrome.storage.sync** for small settings (reminder days, auto-ghost days, enabled sites)
- **chrome.alarms** + **chrome.notifications** for follow-up reminders
- **Zod** for validating scraped data and imported backups
- **Recharts** for dashboard charts
- **Vitest** with WXT's fake browser (`wxt/testing`) for unit tests; Playwright for e2e later
- **pnpm**, ESLint (flat config), Prettier

Add a library only when its task needs it; don't install ahead of the plan.

## Commands

```bash
pnpm dev            # dev build with hot reload, opens Chrome
pnpm build          # production build to .output/chrome-mv3
pnpm zip            # store-ready zip
pnpm test           # run Vitest once
pnpm test:watch     # Vitest in watch mode
pnpm lint           # ESLint
pnpm format         # Prettier write
pnpm format:check   # Prettier check
pnpm compile        # tsc --noEmit
```

Before calling a task done, run `pnpm lint`, `pnpm compile`, `pnpm test` and `pnpm build`,
and all four must pass.

## Folder layout

```
entrypoints/          WXT entrypoints; each file or folder becomes part of the manifest
  background.ts       service worker: saves jobs, sets badge, alarms, notifications
  content.ts          content script(s) on job sites: parse job, detect submit
  popup/              React popup: list, status, quick-add
  dashboard/          React full-page dashboard (Phase 5)
  options/            React options page (Phase 6)
components/           shared React components
lib/                  framework-free logic, importable from any runtime
  db/                 Dexie database, repository, status events
  parsers/            site parsers (generic JSON-LD, linkedin, indeed, ...)
  schemas.ts          Zod schemas and inferred types
  settings.ts         chrome.storage.sync wrapper with defaults
  stats.ts            dashboard stat functions
public/               static files copied as-is (icons)
tests/                test setup and shared fixtures (tests/fixtures/*.html)
```

Create folders only when a task needs them. Import with the `@/` alias (project root),
e.g. `import { db } from '@/lib/db'`.

## Conventions

- **Types come from Zod.** Define the schema once in `lib/schemas.ts` and derive the type
  with `z.infer`. Don't hand-write a duplicate interface.
- **One database.** Every runtime reads and writes through `lib/db`. UI code never calls
  Dexie tables directly; it goes through the repository functions.
- **Status changes go through the repository** so a `StatusEvent` is always logged.
- **Content scripts only parse and send.** They post job data to the background worker,
  which does the saving. Keep any in-page UI inside a Shadow DOM so site CSS can't leak in.
- **Read only the page the user is on.** No background crawling or fetching job sites.
- **Request only the permissions a feature needs**, and add host permissions only for the
  target job sites.
- Use the `browser` global from WXT, not `chrome.*` directly.
- Keep logic in `lib/` as plain functions so it can be tested without React or a browser.

## Naming

- Files: `kebab-case.ts`; React components: `PascalCase.tsx`, one component per file
- Functions and variables: `camelCase`; types and Zod schemas: `PascalCase`
  (`ApplicationSchema` and `type Application`)
- Enum-like values are lowercase string literals: `'applied' | 'interviewing' | ...`
- Tests: `name.test.ts` next to the file they test

## Testing rules

- Write unit tests for everything in `lib/`: repository, status events, settings, parsers,
  stats.
- Every parser gets tests against saved HTML fixtures in `tests/fixtures/`. When a site
  changes and a parser breaks, add the new HTML as a fixture before fixing it.
- Use `fakeBrowser` from `wxt/testing/fake-browser` for extension APIs and call
  `fakeBrowser.reset()` in `beforeEach`.
- Use `fake-indexeddb` for Dexie tests rather than mocking Dexie.
- Don't unit-test thin React layout; test the logic it calls.

## Workflow

1. Do only the current task from the plan.
2. Run lint, typecheck, tests and build.
3. Stop. The user reviews the diff, reloads the extension at `chrome://extensions`, and
   commits.
