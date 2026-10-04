// Switch to splitwise database
db = db.getSiblingDB('splitwise');

// Insert 2 expenses into the expenses collection
const result = db.expenses.insertMany([
   {
    description: 'Grocery shopping at Whole Foods',
    category: 'Food',
    amount: 125.50,
    paidBy: 'jlj',
    date: new Date('2026-07-15'),
    participants: [
      { user: 'jlj', amount: 62.75 },
      { user: 'john_doe', amount: 62.75 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    description: 'Gas station fill-up',
    category: 'Travel',
    amount: 65,
    paidBy: 'jlj',
    date: new Date('2026-08-02'),
    participants: [
      { user: 'jlj', amount: 65 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    description: 'Concert tickets - Taylor Swift',
    category: 'Entertainment',
    amount: 280,
    paidBy: 'jlj',
    date: new Date('2026-08-18'),
    participants: [
      { user: 'jlj', amount: 140 },
      { user: 'jane_smith', amount: 140 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    description: 'Monthly utilities payment',
    category: 'Utilities',
    amount: 185,
    paidBy: 'jlj',
    date: new Date('2026-09-05'),
    participants: [
      { user: 'jlj', amount: 92.50 },
      { user: 'john_doe', amount: 92.50 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    description: 'Weekend brunch with friends',
    category: 'Food',
    amount: 95.75,
    paidBy: 'jlj',
    date: new Date('2026-09-28'),
    participants: [
      { user: 'jlj', amount: 31.92 },
      { user: 'john_doe', amount: 31.92 },
      { user: 'jane_smith', amount: 31.91 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('✓ Successfully inserted 7 expenses (2 existing + 5 new for jlj)');
print('Inserted IDs:', result.insertedIds);
