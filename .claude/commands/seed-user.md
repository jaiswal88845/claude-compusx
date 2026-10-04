---
name: seed-user
description: Add a new user 'jlj' to the database with associated expenses by modifying MongoDB seed scripts
allowed_tools:
  - read_file
  - replace_string_in_file
  - multi_replace_string_in_file
workspace_scope: true
---

# Seed User Command

You are tasked with updating the MongoDB seed scripts to add a new user 'jlj' and their expenses.

## Instructions

**IMPORTANT: Do NOT run the scripts. Only modify the script files so they include the new data.**

### Task 1: Update insertUsers.mongo.js

Add only the new user to the `users.insertMany()` array in `backend/scripts/insertUsers.mongo.js`:

**User (new):**
- **uid**: `1`
- **username**: `jlj`
- **email**: `jlj@example.com`
- **password**: `jljpassword`
- Include standard `createdAt` and `updatedAt` timestamps

### Task 2: Update insertExpenses.mongo.js

Add 2-3 new expenses involving 'jlj' to the `expenses.insertMany()` array in `backend/scripts/insertExpenses.mongo.js`:

- At least one expense where `jlj` is the `paidBy` user
- Include 'jlj' as a participant in splits with other users
- Examples:
  - Groceries: paid by jlj, split with john_doe and jane_smith
  - Concert: paid by jlj, split with jane_smith
  - Coffee: paid by john_doe, but jlj is a participant

Keep all existing expenses intact. Maintain the same structure with `description`, `category`, `amount`, `paidBy`, `date`, `participants`, `createdAt`, and `updatedAt`.

## Workflow

1. Read both script files to understand current structure
2. Modify `insertUsers.mongo.js` to add the 'jlj' user
3. Modify `insertExpenses.mongo.js` to add expenses involving 'jlj'
4. Report what changes were made

## Success Criteria

- ✅ Only user 'jlj' (uid: 3) added to users collection
- ✅ 2-3 new expenses added involving 'jlj'
- ✅ User has uid, username, email, password, createdAt, updatedAt
- ✅ Script files still valid and executable
