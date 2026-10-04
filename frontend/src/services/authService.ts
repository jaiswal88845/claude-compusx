import type { LoggedInUser } from './expenseService';

const STORAGE_KEY = 'currentUser';

export function setCurrentUser(user: LoggedInUser): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to localStorage:', error);
  }
}

export function getCurrentUser(): LoggedInUser | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to retrieve user from localStorage:', error);
    return null;
  }
}

export function logout(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to logout:', error);
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
