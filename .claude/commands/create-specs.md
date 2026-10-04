---
name: create-specs
description: Create a new feature specification file for the Claude CampusX project
allowed_tools:
  - read_file
  - create_file
  - list_dir
  - grep_search
workspace_scope: true
input_parameters:
  - name: feature_name
    type: string
    description: Name of the new feature to create specs for (e.g., "user-authentication", "expense-export")
    required: true
  - name: scope
    type: string
    description: Scope of the feature - "backend", "frontend", or "both"
    required: true
    options:
      - backend
      - frontend
      - both
  - name: description
    type: string
    description: Brief description of what the feature does
    required: true
---

# Create Specs Command

Generate a comprehensive feature specification file for the Claude CampusX project.

## Input Parameters

- **feature_name**: Name of the feature (e.g., "user-authentication", "bulk-expense-import")
- **scope**: Which part(s) the feature affects - "backend", "frontend", or "both"
- **description**: Brief description of what the feature does

## Instructions

**IMPORTANT: Use create_file tool to generate the specs file. Do NOT run or implement the feature.**

### Task: Create Specification File

Create a new spec file in `backend/.claude/specs/` folder with the naming convention: `{feature_name}.md`

**Specification File Structure:**

```markdown
# {Feature Name} - Specification

## Overview
{Description}

## Scope
- Affects: {backend|frontend|both}
- Priority: {High|Medium|Low}
- Estimated Effort: {small|medium|large}

## Requirements

### Functional Requirements
1. {Requirement 1}
2. {Requirement 2}
...

### Non-Functional Requirements
1. {Performance consideration if applicable}
2. {Security consideration if applicable}
3. {Scalability consideration if applicable}

## Design

### Architecture
{Describe the overall architecture}

### Data Model
{If backend: Describe database schema/models}
{If frontend: Describe state management, data flow}

### API Endpoints (if backend)
{List new/modified endpoints}
```
GET /api/{resource}
POST /api/{resource}
```

### Components (if frontend)
{List new React components}
- Component1.tsx
- Component2.tsx

### File Structure
{List files to be created/modified}

## Implementation Steps

1. {Step 1}
2. {Step 2}
3. {Step 3}
...

## Testing

### Test Cases
1. {Test case 1}
2. {Test case 2}

### Edge Cases
{List edge cases to handle}

## Dependencies

### External Libraries
{List any new npm packages needed}

### Internal Dependencies
{List other features this depends on}

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| {Risk 1} | {High/Medium/Low} | {Mitigation strategy} |

## Success Criteria

- ✅ {Criteria 1}
- ✅ {Criteria 2}
- ✅ {Criteria 3}

## Notes

{Any additional notes, references, or considerations}
```

## Workflow

1. Parse feature_name, scope, and description from input parameters
2. Validate that `.claude/specs` directory exists (create if needed)
3. Check for existing spec files to avoid duplicates
4. Generate comprehensive spec file based on scope (backend, frontend, or both)
5. Include realistic requirements, design decisions, and implementation steps based on the project architecture
6. Use create_file tool to save the spec file
7. Report the created file location and summary

## File Naming Convention

- Spec file: `.claude/specs/{feature_name}.md`
- Use kebab-case for file names (e.g., `user-authentication.md`, `expense-filtering.md`)
- Prepend with number if creating versioned specs (e.g., `01-user-authentication.md`)

## Context from Project

Reference the project's existing architecture:
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React 19 + TypeScript + Vite + PrimeReact
- **Data**: User (uid, username, email, password), Expense (description, category, amount, paidBy, participants, date)
- **API**: Routes at `/api/*` with controllers and models

## Success Criteria

- ✅ Spec file created in `.claude/specs/` folder
- ✅ File name follows kebab-case convention
- ✅ All sections populated with relevant information
- ✅ Scope correctly reflects backend/frontend/both
- ✅ File is valid markdown and well-formatted
- ✅ Spec includes realistic requirements for the project type

