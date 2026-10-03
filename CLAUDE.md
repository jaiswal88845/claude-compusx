# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A split-expense demo app (like Splitwise) with a separate Node/Express backend and React/Vite frontend. Data is in-memory (no database), seeded from a hardcoded module — no persistence layer exists yet despite `mongoose` being listed as a backend dependency.

## Commands

Backend (from `backend/`):
```
npm install
npm run start   # node server.js
npm run dev      # nodemon server.js (auto-restart)
```

Frontend (from `frontend/`):
```
npm install
npm run dev       # vite dev server
npm run build     # vite build
npm run lint      # eslint .
npm run preview   # preview production build
```

There are no test scripts/frameworks configured in either package.

Backend runs on `http://localhost:5000`; frontend expects the API at `http://localhost:5000/api` by default (override via `VITE_API_BASE` in a frontend `.env`).

## Architecture

**Backend** (`backend/`) — thin Express layer, three-tier structure:
- `server.js` — app entry point, mounts CORS, JSON body parsing, and routes at `/api`
- `routes/expenseRoutes.js` — route definitions only, delegates to controller
- `controllers/expenseController.js` — request handlers; also computes the per-user balance summary (`getSummary`) by iterating all expenses: `paid` (sum where user is `paidBy`), `owes` (sum of that user's `participants` entries across all expenses), `balance = paid - owes`
- `data/expenses.js` — in-memory seed data (`users` array of names, `expenses` array). Each expense has `paidBy` and a `participants` array of `{ user, amount }` splits. This is the single source of truth for data shape; any API/schema change starts here.

No persistence — restarting the server resets all data to the seed in `data/expenses.js`.

**Frontend** (`frontend/`) — React 19 + TypeScript + Vite, using PrimeReact/PrimeIcons/PrimeFlex for UI components and grid layout (`p-grid`, `p-col-*` classes alongside custom CSS).
- `src/services/expenseService.ts` — single API client module; all backend calls and shared TS types (`Expense`, `Participant`, `UserSummary`) live here. `getApiBase()` resolves the backend URL. New endpoints should be added as functions here rather than calling `fetch` directly from components.
- `src/components/` — `Header`, `Footer`, `ExpenseSummary`, `ExpenseList`, `ExpenseDetails`. `App.tsx` composes layout as Header / main (summary + list in a grid) / Footer.
- `src/styles/` — component-specific CSS (e.g. `Header.css`, `Footer.css`, `Layout.css`) imported directly into components, alongside `App.css` and `index.css` for global styles.

## Data flow

Frontend fetches from `/api/users`, `/api/expenses`, `/api/expenses/:id`, `/api/summary` → backend controller reads directly from the in-memory `data/expenses.js` arrays → shapes/aggregates are returned as-is or computed per-request (no caching).
