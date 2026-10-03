# Plan: Database Setup — MongoDB + Mongoose

## Context

The backend currently serves all data from a hardcoded in-memory module (`backend/data/expenses.js`). The spec (`01-databse-setup.md`) requires wiring up a real MongoDB connection at `mongodb://localhost:27017/`, creating two Mongoose models (`User` and `Expense`), seeding them with the existing dummy data, and updating the REST API layer to query the database instead of the static file.

`mongoose` and `dotenv` are already listed as dependencies in `backend/package.json` — no new packages needed.

---

## Files to Create

| File | Purpose |
|---|---|
| `backend/.env` | `MONGO_URI=mongodb://localhost:27017/splitwise` |
| `backend/config/db.js` | Mongoose connect helper |
| `backend/models/User.js` | `User` schema/model |
| `backend/models/Expense.js` | `Expense` schema/model |
| `backend/seed.js` | One-time script to drop collections and insert dummy data |

## Files to Modify

| File | Change |
|---|---|
| `backend/server.js` | Import `dotenv` + `connectDB`; call `connectDB()` before `app.listen` |
| `backend/controllers/expenseController.js` | Replace all `data/expenses.js` reads with async Mongoose queries |

`backend/data/expenses.js`, `backend/routes/expenseRoutes.js` — **no changes needed**.

---

## Step-by-Step Implementation

### 1. `backend/.env`
```
MONGO_URI=mongodb://localhost:27017/splitwise
```

### 2. `backend/config/db.js`
```js
const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
}

module.exports = connectDB;
```

### 3. `backend/models/User.js`
Fields: `username` (String, required, unique), `email` (String, required, unique), `password` (String, required), `createdAt` (Date, default now).

### 4. `backend/models/Expense.js`
Fields mirroring the existing data shape:
- `description` String
- `category` String
- `amount` Number
- `paidBy` String (username reference — keep as string to match existing API shape)
- `date` Date
- `participants` — array of `{ user: String, amount: Number }`

### 5. `backend/seed.js`
- `require('dotenv').config()`
- Connect via `connectDB()`
- Drop `users` and `expenses` collections
- Insert the 4 users from `data/expenses.js` (auto-generate email/password per user, e.g. `rahul@example.com` / `password123`)
- Insert the 12 expenses from `data/expenses.js`
- Disconnect and exit

### 6. Update `backend/server.js`
Add at the top:
```js
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
```

### 7. Update `backend/controllers/expenseController.js`
- Remove `require('../data/expenses')`
- Import `User` and `Expense` models
- Make all four handlers `async`/`await`:
  - `getUsers` → `User.find({}, 'username')` → return array of username strings (keeps API contract identical)
  - `getExpenses` → `Expense.find()`
  - `getExpenseById` → `Expense.findById(req.params.id)` (note: id changes from integer to Mongo ObjectId)
  - `getSummary` → `User.find()` + `Expense.find()` → run the same balance-computation logic already in the function

> **API contract note**: `getExpenseById` currently uses numeric `id`. After the migration, the `:id` param becomes a MongoDB ObjectId string. The frontend's `expenseService.ts` calls `/api/expenses/:id` — the URL shape stays the same, only the id value changes. This is acceptable for a dev app with no persistence yet.

---

## Seed Script Usage

After implementation, to populate the database once:
```bash
cd backend
node seed.js
```

Then start the server normally:
```bash
npm run dev
```

---

## Verification

1. Start MongoDB locally (`mongod` or via MongoDB Compass).
2. Run `node seed.js` — should log "Seeded X users and Y expenses".
3. `npm run dev` — server should log "MongoDB connected".
4. Test endpoints:
   - `GET http://localhost:5000/api/users` → array of 4 usernames
   - `GET http://localhost:5000/api/expenses` → 12 expense objects
   - `GET http://localhost:5000/api/expenses/<ObjectId>` → single expense
   - `GET http://localhost:5000/api/summary` → totals + per-user balance
5. Verify frontend still renders correctly against the running backend.
