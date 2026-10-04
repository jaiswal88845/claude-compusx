---
name: seed-expense
description: Add multiple expenses for a specific user to the MongoDB seed script
allowed_tools:
  - read_file
  - replace_string_in_file
  - multi_replace_string_in_file
workspace_scope: true
argument-hint: "<uid> <num_expenses> <num_months>"
 

# Seed Expense Command

You are tasked with adding multiple expenses for a specific user to the MongoDB seed script.

## Input Parameters

- **uid**: User ID (e.g., 1, 2, 3)
- **num_expenses**: Number of expenses to generate (e.g., 3, 5, 10)
- **num_months**: Number of months to span (e.g., 3, 6, 12)

## Instructions

**IMPORTANT: Do NOT run the scripts. Only modify the script files so they include the new data.**

### Task: Update insertExpenses.mongo.js

Add the specified number of expenses to the `expenses.insertMany()` array in `backend/scripts/insertExpenses.mongo.js`:

**Requirements:**
1. Generate `num_expenses` unique expenses for the user with the given `uid`
2. Distribute the expenses across `num_months` months going back from today
3. Vary the expense categories (e.g., Food, Entertainment, Shopping, Travel, Utilities, etc.)
4. Vary the descriptions for each expense
5. Create realistic amounts (between $10 and $500)
6. Set `paidBy` as the username matching the uid (e.g., if uid is 1, use 'john_doe')
7. Include participants in a realistic way:
   - Some expenses can be solo (user only)
   - Some expenses can be split with other users (john_doe, jane_smith, jlj)
   - Use reasonable split amounts
8. Keep all existing expenses intact
9. Maintain the same structure with `description`, `category`, `amount`, `paidBy`, `date`, `participants`, `createdAt`, and `updatedAt`

**Date Distribution:**
- Calculate start date: Today - (num_months * 30 days)
- Distribute num_expenses evenly across the date range
- Ensure dates are realistic (not in future, going backwards in time)

**Participant Logic:**
- For solo expenses: participants = [{ user: paidBy, amount: total_amount }]
- For split expenses: distribute amount among 2-4 other users including the paidBy user
- Ensure participant amounts sum exactly to the total amount

## Workflow

1. Read `insertExpenses.mongo.js` to understand current structure
2. Calculate date range based on num_months parameter
3. Generate num_expenses unique expense objects with varied categories and descriptions
4. Modify `insertExpenses.mongo.js` to add all new expenses to the insertMany array
5. Verify all amounts balance correctly
6. Report what changes were made

## Success Criteria

- ✅ Exactly num_expenses expenses added for the specified uid
- ✅ Expenses distributed across num_months period
- ✅ All expenses have realistic descriptions and categories
- ✅ All participant amounts sum correctly to total amount
- ✅ All existing data preserved
- ✅ Script files still valid and executable
- ✅ Dates are within the num_months range going backwards from today

