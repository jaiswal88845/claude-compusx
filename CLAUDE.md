# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A split-expense demo app (like Splitwise) with a separate Node/Express backend and React/Vite frontend. The backend connects to MongoDB using Mongoose for persistent data storage.

## Commands

**Backend** (from `backend/`):
```
npm install
npm run start    # node server.js
npm run dev      # nodemon server.js (auto-restart on file changes)
```

**Frontend** (from `frontend/`):
```
npm install
npm run dev      # vite dev server (http://localhost:5173)
npm run build    # vite build for production
npm run lint     # eslint .
npm run preview  # preview production build locally
```

**MongoDB Seeding** (from `backend/`):
```
# Run scripts in MongoDB shell to seed initial data
mongosh < scripts/insertUsers.mongo.js
mongosh < scripts/insertExpenses.mongo.js
```

**Environment Setup**:
- Backend requires `MONGO_URI` env var to connect to MongoDB (check `backend/.env`)
- Frontend expects backend API at `http://localhost:5000/api` by default
- Override frontend API base with `VITE_API_BASE` env var in `frontend/.env`

## Architecture

### Backend (`backend/`) — Three-tier structure with MongoDB

**Entry point**: `server.js`
- Mounts Express app with CORS and JSON body parsing
- Routes all `/api` requests through `routes/expenseRoutes.js`
- Connects to MongoDB via `config/db.js` on startup
- Disables API response caching to ensure fresh data

**Data layer**: `models/` (Mongoose schemas)
- `User.js` — `{ username (unique), email (unique), password, timestamps }`
- `Expense.js` — `{ description, category, amount, paidBy, date, participants (array), timestamps }`
  - Participants are nested objects: `{ user (string), amount (number) }`

**API layer**: `routes/expenseRoutes.js` + `controllers/expenseController.js`
- `POST /api/users` — creates a new user (registration)
  - Request: `{ username, email, password }`
  - Response (201): `{ uid, username, email, createdAt }`
  - Validates input (username 3–30 chars, valid email, password 8–72 chars)
  - Returns `409` if username or email already exists; `400` on validation error
  - Passwords hashed with bcrypt (cost 10); never returned in response
- `GET /api/users` — returns array of usernames
- `GET /api/expenses` — returns all expenses from DB
- `GET /api/expenses/:id` — returns single expense by MongoDB ObjectId
- `GET /api/summary` — computes and returns per-user balance summary:
  - `paid` = sum of amounts where user is `paidBy`
  - `owes` = sum of participant amounts for that user across all expenses
  - `balance = paid - owes`

**Seed scripts**: `scripts/insertUsers.mongo.js`, `scripts/insertExpenses.mongo.js`
- Bulk insert seed data into MongoDB (replaces existing collections)
- Run manually with `mongosh` when seeding the database

### Frontend (`frontend/`) — React 19 + TypeScript + Vite

**Styling**: Uses PrimeReact components + PrimeFlex grid system (`p-grid`, `p-col-*`) + custom CSS
- Component-specific CSS imported directly (e.g., `Header.css`, `Footer.css`)
- Global styles in `App.css` and `index.css`

**Layout** (`App.tsx`):
- Header / main (two-column grid: ExpenseSummary left, ExpenseList right) / Footer

**Components**:
- `Header.tsx` — navigation with Register button (accepts `onRegisterClick` prop)
- `Footer.tsx` — static layout
- `ExpenseSummary.tsx` — fetches `/api/summary`, displays totals and per-user balance; accepts optional `refreshKey` prop to refetch on registration
- `ExpenseList.tsx` — fetches `/api/expenses`, displays list; accepts optional `refreshKey` prop to refetch on registration; includes `ExpenseDetails.tsx`
- `RegisterUserModal.tsx` — PrimeReact Dialog for user registration; displays form with username, email, password fields; handles client-side validation and submission; props: `visible`, `onHide`, `onRegistered`

**API client**: `services/expenseService.ts`
- Single module for all backend calls; shared TypeScript interfaces live here
- Resolves backend URL via `getApiBase()` (respects `VITE_API_BASE` env var)
- Interfaces: `Participant`, `Expense`, `UserSummary`, `NewUser`, `RegisteredUser`
- Functions: `fetchUsers()`, `fetchExpenses()`, `fetchExpenseById()`, `fetchSummary()`, `registerUser()`
- Always add new endpoints as functions here rather than calling `fetch()` directly from components

## Data flow

1. Frontend components import types and functions from `expenseService.ts`
2. Frontend calls functions like `fetchExpenses()`, `fetchSummary()`, etc.
3. These resolve the API base and fetch from backend
4. Backend controller reads from MongoDB and computes summaries on-the-fly (no caching)
5. Responses are shaped and returned to frontend

## Key considerations

- **No persistence layer in old code** — earlier versions used in-memory seed data; now all data persists in MongoDB
- **Schema changes** — if adding fields to expenses or users, update both Mongoose models and seed scripts
- **Balance computation** — done in `getSummary()` controller, not in frontend; watch participant amount rounding in edge cases
- **Frontend-backend API contract** — defined by TypeScript interfaces in `expenseService.ts`; changes here must be coordinated with backend shape
- **Password security** — all new user registration uses bcryptjs (cost 10) for hashing; passwords are never returned in API responses
- **Data refresh** — `ExpenseSummary` and `ExpenseList` accept a `refreshKey` prop that triggers a refetch when incremented (used on successful user registration)
- **User registration** — `RegisterUserModal` component is mounted in `App.tsx`; the modal is controlled via `registerOpen` state and `refreshKey` is incremented on success to refresh all data