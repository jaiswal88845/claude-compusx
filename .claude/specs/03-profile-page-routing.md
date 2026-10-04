# Profile Page Routing After Login - Specification

## Overview

Implement client-side routing to display a user profile page after successful login. This feature enables users to view and manage their profile information, with seamless navigation between the expense list view and their personal profile dashboard.

## Scope

- Affects: **frontend**
- Priority: **High**
- Estimated Effort: **medium**

## Requirements

### Functional Requirements

1. **Route-based Navigation**: Implement React Router to enable navigation between `/` (expense dashboard) and `/profile` (profile page)
2. **Post-Login Redirect**: After successful user login, automatically redirect to `/profile` page
3. **Profile Display**: Show logged-in user's profile information (username, email, account creation date)
4. **Navigation**: Add profile link to header for logged-in users
5. **Logout Functionality**: Provide logout button on profile page that returns user to main dashboard
6. **Protected Routes**: Only logged-in users can access `/profile`; unauthenticated users redirected to `/`

### Non-Functional Requirements

1. **Performance**: Profile data fetches in <500ms
2. **Security**: Profile page only accessible to authenticated users; store auth token securely
3. **Accessibility**: Profile page WCAG 2.1 AA compliant; proper semantic HTML and aria labels
4. **Responsive Design**: Profile page works on mobile (375px), tablet (768px), and desktop (1440px+)

## Design

### Architecture

```
Frontend (React Router v6+)
├── App.tsx (adds Router wrapper)
├── pages/
│   ├── Dashboard.tsx (existing main view)
│   └── Profile.tsx (new profile page)
├── components/
│   └── PrivateRoute.tsx (route protection guard)
└── services/
    └── authService.ts (new auth state management)
```

**Authentication State**: Store user session in localStorage + optional context/state management (useState or Zustand)

### Data Model

**Frontend Auth State**:
```typescript
interface AuthState {
  user: {
    uid: string;
    username: string;
    email: string;
    createdAt: string;
  } | null;
  isAuthenticated: boolean;
  token?: string;
}
```

**Session Storage**:
- Store `currentUser` in `localStorage` after login
- Store auth token (JWT or session ID) if backend implements it
- Clear on logout

### API Endpoints

**No new backend endpoints required.** Use existing:
- `POST /api/users` — registration (already used by RegisterUserModal)
- `GET /api/users` — fetch list of usernames (update to include logged-in user info)
- Consider new endpoint for future enhancement:
  - `GET /api/users/:uid` — fetch specific user profile (optional, for scalability)

### Components

**New Components to Create**:
- `Profile.tsx` — profile page component displaying user info
- `PrivateRoute.tsx` — route guard for protected pages

**Modified Components**:
- `App.tsx` — wrap with React Router, add route definitions
- `Header.tsx` — add conditional Profile link for authenticated users

### File Structure

**Files to Create**:
```
frontend/src/pages/
├── Dashboard.tsx (refactored from current App.tsx)
└── Profile.tsx (new)

frontend/src/components/
└── PrivateRoute.tsx (new)

frontend/src/services/
└── authService.ts (new)
```

**Files to Modify**:
```
frontend/src/App.tsx
frontend/src/components/Header.tsx
frontend/src/services/expenseService.ts (optional: add getCurrentUser)
```

## Implementation Steps

1. **Install React Router**: `npm install react-router-dom` (v6+)

2. **Create Authentication Service** (`authService.ts`):
   - Function: `setCurrentUser(user)` — save user to localStorage
   - Function: `getCurrentUser()` — retrieve current user from localStorage
   - Function: `logout()` — clear localStorage and auth state
   - Function: `isAuthenticated()` — check if user is logged in

3. **Create PrivateRoute Component** (`PrivateRoute.tsx`):
   - Guard that checks `isAuthenticated()`
   - Redirects to `/` if not authenticated
   - Renders protected page if authenticated

4. **Create Profile Page** (`Profile.tsx`):
   - Display current user's username, email, account creation date
   - Show "Last login" or user stats if available
   - Include logout button
   - Style with PrimeReact Card + PrimeFlex grid

5. **Refactor App Layout**:
   - Extract main expense dashboard into `Dashboard.tsx`
   - Update `App.tsx` to use React Router BrowserRouter wrapper
   - Define routes: `/` → Dashboard, `/profile` → Profile

6. **Update Header Component**:
   - Show "Profile" link (or dropdown) when user is authenticated
   - Show "Register" button only when not authenticated
   - Add logout shortcut in header

7. **Integrate Login → Profile Redirect**:
   - Modify `LoginUserModal` to call `setCurrentUser()` on successful login
   - Use `useNavigate()` to redirect to `/profile` after login

8. **Update RegisterUserModal**:
   - After successful registration, auto-login user
   - Redirect to `/profile`

## Testing

### Test Cases

1. **Unauthenticated Access**: Navigate to `/profile` → redirect to `/`
2. **Successful Login**: Login → redirect to `/profile` → user info displayed
3. **Profile Display**: Username, email, and creation date render correctly
4. **Logout**: Click logout → clear auth state → redirect to `/`
5. **Page Refresh**: Refresh on `/profile` → persist session from localStorage
6. **Route Navigation**: Can navigate between `/` and `/profile` when authenticated

### Edge Cases

- User logs out → `/profile` becomes inaccessible
- Multiple browser tabs: logout in one tab → other tabs reflect session loss
- localStorage cleared externally → logout on next action
- User data mismatch: handle if returned user data differs from stored state

## Dependencies

### External Libraries

- `react-router-dom` (v6+) — for client-side routing
- Existing: PrimeReact, PrimeFlex, TypeScript

### Internal Dependencies

- Existing `RegisterUserModal` component (updated)
- Existing `LoginUserModal` component (updated)
- `expenseService.ts` (may extend)

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Breaking existing layout if refactoring App.tsx incorrectly | High | Test all routes after refactor; keep Dashboard logic intact |
| localStorage data corruption or unavailable | Medium | Add try-catch around localStorage access; fallback to null state |
| User session lost on page refresh | Medium | Always restore from localStorage on app mount |
| Timing issue: redirect happens before user state updates | Medium | Ensure `setCurrentUser()` called before `navigate()` |
| Mobile navigation: small header icons on touch devices | Low | Use min-height: 44px for touch targets; test on real devices |

## Success Criteria

- ✅ React Router v6+ installed and configured
- ✅ User can log in and is redirected to `/profile`
- ✅ Profile page displays correct user information
- ✅ `/profile` route protected; unauthenticated users redirected to `/`
- ✅ Header shows profile link when authenticated; register/login buttons when not
- ✅ Logout clears session and redirects to `/`
- ✅ Session persists across page refresh
- ✅ All pages responsive on mobile/tablet/desktop
- ✅ No console errors or TypeScript errors
- ✅ Accessibility audit passes (WCAG 2.1 AA)

## Notes

- **Future Enhancement**: Implement JWT tokens on backend for secure session management
- **Future Enhancement**: Add profile editing (update email, password)
- **Future Enhancement**: Add profile picture/avatar upload
- **State Management**: Currently using localStorage; consider Zustand/Redux for larger app
- **API Contract**: If backend adds user profile endpoint (GET /api/users/:uid), update `expenseService.ts` and Profile component to fetch fresh data on mount
