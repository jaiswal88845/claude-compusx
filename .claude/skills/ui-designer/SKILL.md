---
name: ui-designer-campusx
description: Design and build React components for the split-expense app using PrimeReact and PrimeFlex. Trigger whenever the user wants to design a new component, create a modal, make something responsive, or update styling. Always generates both the React TSX component and its accompanying CSS file, following the app's design patterns and design system.
---

# UI Designer for CampusX Split-Expense App

This skill helps you design and build React components that fit seamlessly into the split-expense app. It produces **both the React component code and its CSS file**, ensuring consistency with your existing design system.

## Design System Foundation

<details>
<summary><strong>⬇️ Component Structure</strong></summary>

Your app follows a **component-specific CSS pattern**:
- Each component has its own `.css` file (e.g., `Header.tsx` → `Header.css`)
- Global styles live in `App.css` and `index.css`
- Components import their CSS directly: `import './ComponentName.css'`
</details>

<details>
<summary><strong>⬇️ Technology Stack</strong></summary>

- **React 19** with **TypeScript**
- **PrimeReact** components (Button, Dialog, Card, InputText, etc.)
- **PrimeFlex** grid system (`p-grid`, `p-col-*`, `p-p-*`, `p-m-*`)
- **Custom CSS** for component-specific styling
</details>

<details>
<summary><strong>⬇️ Layout Patterns</strong></summary>

- **Two-column layout**: Header / (ExpenseSummary left + ExpenseList right) / Footer
- **Responsive grid**: Uses PrimeFlex's responsive classes
- **Card-based design**: Summary and list items use card containers
- **Modal dialogs**: Use PrimeReact's Dialog component for forms/actions
</details>

<details>
<summary><strong>⬇️ Responsive Design</strong></summary>

Use PrimeFlex responsive column classes:
- `p-col-12` — full width (mobile)
- `p-col-6` → `p-col-12` — half width on desktop, full on mobile
- `p-md-6` — half width on medium+ screens
- `p-lg-4` — one-third on large+ screens
</details>

## What This Skill Produces

### React Component File (`ComponentName.tsx`)
```typescript
import React, { useState, useEffect } from 'react';
import './ComponentName.css';
import { Button, Card } from 'primereact/index';

interface ComponentNameProps {
  // Props defined here
}

export const ComponentName: React.FC<ComponentNameProps> = ({...}) => {
  return (
    <div className="component-name-container">
      {/* Structure using PrimeFlex grid and PrimeReact components */}
    </div>
  );
};
```

### CSS File (`ComponentName.css`)
```css
/* Component-specific styling */
.component-name-container {
  /* Layout, spacing, typography */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  /* Mobile-specific overrides */
}
```

## How to Request a Design

### Creating a New Component
**You say:** "Design a new expense form component"
**The skill does:**
1. Creates a React component that fits your app's layout
2. Includes form fields using PrimeReact components
3. Generates CSS for layout, spacing, and responsive design
4. Adds state management as needed
5. Includes proper TypeScript interfaces and props

### Redesigning an Existing Component
**You say:** "Update the styling for ExpenseList to be more compact"
**The skill does:**
1. Modifies CSS for the requested changes
2. Maintains component behavior and props
3. Keeps responsive design intact
4. Suggests TypeScript/component changes if needed

### Making Components Responsive
**You say:** "Make this modal responsive for mobile devices"
**The skill does:**
1. Adds responsive PrimeFlex classes
2. Adjusts CSS media queries
3. Stacks columns on mobile (`p-col-12`), side-by-side on desktop
4. Ensures touch-friendly target sizes (min 44px)

### Design Consistency
**You say:** "Create a button component that matches our design system"
**The skill does:**
1. Uses PrimeReact's pre-built components
2. Applies CSS for custom styling where needed
3. Follows the existing visual hierarchy
4. Maintains accessibility standards (WCAG 2.1 AA)

## Key Design Principles

1. **Use PrimeReact Components** — don't reinvent buttons, modals, cards; customize with CSS
2. **Responsive by Default** — every component works on mobile, tablet, and desktop
3. **CSS in Component Files** — keep styles close to components; use global CSS only for resets/variables
4. **Grid-Based Layout** — use PrimeFlex's grid system for alignment and spacing
5. **Accessible** — semantic HTML, proper labels, sufficient color contrast
6. **Mobile-First Thinking** — design for mobile first, enhance for larger screens

## Output Format

When you request a component design, the skill will provide:

```
# [Component Name] Component

## React Component File: [ComponentName].tsx
[Full TSX code ready to copy]

## CSS File: [ComponentName].css
[Full CSS code ready to copy]

## Installation & Usage
- Where to place the files
- How to import and use the component
- Required props

## Notes
- Responsive behavior explanation
- Accessibility notes
- Any new dependencies needed
```

## Example Requests

- "Design a new category filter component for expenses"
- "Create a user profile modal for the app"
- "Update the header to include a search bar and make it responsive"
- "Design a payment reminder notification component"
- "Make the expense list cards more compact on mobile"
- "Create a dashboard summary card component"
