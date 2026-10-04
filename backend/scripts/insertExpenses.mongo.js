// Switch to splitwise database
db = db.getSiblingDB('splitwise');

// Insert 2 expenses into the expenses collection
const result = db.expenses.insertMany([
  {
    description: 'Dinner at restaurant',
    category: 'Food',
    amount: 120,
    paidBy: 'john_doe',
    date: new Date('2026-10-01'),
    participants: [
      { user: 'john_doe', amount: 60 },
      { user: 'jane_smith', amount: 60 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    description: 'Movie tickets',
    category: 'Entertainment',
    amount: 50,
    paidBy: 'jane_smith',
    date: new Date('2026-10-02'),
    participants: [
      { user: 'jane_smith', amount: 25 },
      { user: 'john_doe', amount: 25 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('✓ Successfully inserted 2 expenses');
print('Inserted IDs:', result.insertedIds);
