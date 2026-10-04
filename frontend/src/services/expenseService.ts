export interface Participant {
  user: string;
  amount: number;
}

export interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  paidBy: string;
  date: string;
  participants: Participant[];
}

export interface UserSummary {
  user: string;
  paid: number;
  owes: number;
  balance: number;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface RegisteredUser {
  uid: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface LoggedInUser {
  uid: number;
  username: string;
  email: string;
  createdAt: string;
  message: string;
}

export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(path, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  // Handle 304 Not Modified by re-fetching without cache headers
  if (res.status === 304) {
    return fetch(path, { cache: 'no-store' }).then(r => r.json());
  }
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function getApiBase() {
  return import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
}

export async function fetchUsers(): Promise<string[]> {
  return getJSON<string[]>(`${getApiBase()}/users`);
}

export async function fetchExpenses(): Promise<Expense[]> {
  return getJSON<Expense[]>(`${getApiBase()}/expenses`);
}

export async function fetchExpenseById(id: number): Promise<Expense> {
  return getJSON<Expense>(`${getApiBase()}/expenses/${id}`);
}

export async function fetchSummary(): Promise<{ totalExpenses: number; summary: UserSummary[] }> {
  return getJSON(`${getApiBase()}/summary`);
}

export async function registerUser(user: NewUser): Promise<RegisteredUser> {
  const res = await fetch(`${getApiBase()}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    let errorMessage = 'Registration failed';
    try {
      const data = await res.json();
      errorMessage = data.error || errorMessage;
    } catch {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function loginUser(username: string, password: string): Promise<LoggedInUser> {
  const res = await fetch(`${getApiBase()}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    let errorMessage = 'Login failed';
    try {
      const data = await res.json();
      errorMessage = data.error || errorMessage;
    } catch {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
