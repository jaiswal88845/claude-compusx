const users = [
  'Rahul',
  'Amit',
  'Priya',
  'Neha'
];

const expenses = [
  {
    id: 1,
    description: 'Dinner',
    category: 'Food',
    amount: 2000,
    paidBy: 'Rahul',
    date: '2026-10-01',
    participants: [
      { user: 'Rahul', amount: 500 },
      { user: 'Amit', amount: 500 },
      { user: 'Priya', amount: 500 },
      { user: 'Neha', amount: 500 }
    ]
  },
  {
    id: 2,
    description: 'Cab',
    category: 'Travel',
    amount: 800,
    paidBy: 'Amit',
    date: '2026-10-02',
    participants: [
      { user: 'Rahul', amount: 200 },
      { user: 'Amit', amount: 200 },
      { user: 'Priya', amount: 200 },
      { user: 'Neha', amount: 200 }
    ]
  },
  {
    id: 3,
    description: 'Hotel',
    category: 'Hotel',
    amount: 4000,
    paidBy: 'Priya',
    date: '2026-10-03',
    participants: [
      { user: 'Rahul', amount: 750 },
      { user: 'Amit', amount: 700 },
      { user: 'Priya', amount: 1750 },
      { user: 'Neha', amount: 800 }
    ]
  }
];

module.exports = {
  users,
  expenses
};
