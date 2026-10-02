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

export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(path);
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
