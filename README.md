# Claude CampusX — Split Expense Demo

This repository contains a simple split-expense demo application.

Structure
- `backend/` — Node.js + Express backend (in-memory data)
- `frontend/` — React + TypeScript frontend (Vite)

Start backend

```
cd backend
npm install
npm run start
```

Start frontend

```
cd frontend
npm install
npm run dev
```

The frontend expects the backend API at `http://localhost:5000/api` by default. You can set `VITE_API_BASE` in `.env` if needed.
