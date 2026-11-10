# Job Application Tracker

A Chrome extension that saves a job automatically when you apply, reminds you to follow
up, and shows what's working. Your data stays in your browser; there's no account and no
server.

> Status: early development. The popup is a placeholder; auto-capture, reminders and the
> dashboard are still to come.

## Requirements

- Node.js 20 or newer
- pnpm (`npm install -g pnpm`)
- Google Chrome (Edge and Brave also work)

## Setup

```bash
pnpm install
```

## Load the extension in Chrome

### Option A: dev mode (hot reload)

```bash
pnpm dev
```

WXT builds the extension and opens a fresh Chrome window with it already loaded. Code
changes reload automatically.

### Option B: load unpacked into your own Chrome

1. Build the extension:

   ```bash
   pnpm build
   ```

2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the `.output/chrome-mv3` folder in this project.
5. Pin the extension from the puzzle-piece menu and click its icon to open the popup.

After changing code, run `pnpm build` again and click the reload icon on the extension's
card at `chrome://extensions`.

## Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Dev build with hot reload in a Chrome window |
| `pnpm build`        | Production build to `.output/chrome-mv3`     |
| `pnpm zip`          | Zip for the Chrome Web Store                 |
| `pnpm test`         | Run unit tests (Vitest)                      |
| `pnpm test:watch`   | Unit tests in watch mode                     |
| `pnpm lint`         | ESLint                                       |
| `pnpm format`       | Format with Prettier                         |
| `pnpm format:check` | Check formatting                             |
| `pnpm compile`      | Type-check with `tsc`                        |

## Tech stack

WXT, TypeScript, React, Tailwind CSS, Dexie (IndexedDB), Zod and Vitest, on Chrome
Manifest V3. See [CLAUDE.md](CLAUDE.md) for the folder layout and conventions.
