const users = [
  'Rahul',
  'Amit',
  'Priya',
  'Neha'
];

const expenses = [
  // Rahul's expenses
  {
    id: 1,
    description: 'Dinner at Restaurant',
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
    description: 'Cab to Airport',
    category: 'Travel',
    amount: 600,
    paidBy: 'Rahul',
    date: '2026-10-02',
    participants: [
      { user: 'Rahul', amount: 150 },
      { user: 'Amit', amount: 150 },
      { user: 'Priya', amount: 150 },
      { user: 'Neha', amount: 150 }
    ]
  },
  {
    id: 3,
    description: 'Movie Tickets',
    category: 'Entertainment',
    amount: 800,
    paidBy: 'Rahul',
    date: '2026-10-03',
    participants: [
      { user: 'Rahul', amount: 200 },
      { user: 'Amit', amount: 200 },
      { user: 'Priya', amount: 200 },
      { user: 'Neha', amount: 200 }
    ]
  },

  // Amit's expenses
  {
    id: 4,
    description: 'Lunch Buffet',
    category: 'Food',
    amount: 1200,
    paidBy: 'Amit',
    date: '2026-10-04',
    participants: [
      { user: 'Rahul', amount: 300 },
      { user: 'Amit', amount: 300 },
      { user: 'Priya', amount: 300 },
      { user: 'Neha', amount: 300 }
    ]
  },
  {
    id: 5,
    description: 'Train Tickets',
    category: 'Travel',
    amount: 1600,
    paidBy: 'Amit',
    date: '2026-10-05',
    participants: [
      { user: 'Rahul', amount: 400 },
      { user: 'Amit', amount: 400 },
      { user: 'Priya', amount: 400 },
      { user: 'Neha', amount: 400 }
    ]
  },
  {
    id: 6,
    description: 'Concert Tickets',
    category: 'Entertainment',
    amount: 2000,
    paidBy: 'Amit',
    date: '2026-10-06',
    participants: [
      { user: 'Rahul', amount: 500 },
      { user: 'Amit', amount: 500 },
      { user: 'Priya', amount: 500 },
      { user: 'Neha', amount: 500 }
    ]
  },

  // Priya's expenses
  {
    id: 7,
    description: 'Breakfast',
    category: 'Food',
    amount: 1000,
    paidBy: 'Priya',
    date: '2026-10-07',
    participants: [
      { user: 'Rahul', amount: 250 },
      { user: 'Amit', amount: 250 },
      { user: 'Priya', amount: 250 },
      { user: 'Neha', amount: 250 }
    ]
  },
  {
    id: 8,
    description: 'Flight Booking',
    category: 'Travel',
    amount: 3500,
    paidBy: 'Priya',
    date: '2026-10-08',
    participants: [
      { user: 'Rahul', amount: 875 },
      { user: 'Amit', amount: 875 },
      { user: 'Priya', amount: 875 },
      { user: 'Neha', amount: 875 }
    ]
  },
  {
    id: 9,
    description: 'Gaming Console',
    category: 'Entertainment',
    amount: 2400,
    paidBy: 'Priya',
    date: '2026-10-09',
    participants: [
      { user: 'Rahul', amount: 600 },
      { user: 'Amit', amount: 600 },
      { user: 'Priya', amount: 600 },
      { user: 'Neha', amount: 600 }
    ]
  },

  // Neha's expenses
  {
    id: 10,
    description: 'Coffee & Snacks',
    category: 'Food',
    amount: 500,
    paidBy: 'Neha',
    date: '2026-10-10',
    participants: [
      { user: 'Rahul', amount: 125 },
      { user: 'Amit', amount: 125 },
      { user: 'Priya', amount: 125 },
      { user: 'Neha', amount: 125 }
    ]
  },
  {
    id: 11,
    description: 'Bus Pass',
    category: 'Travel',
    amount: 400,
    paidBy: 'Neha',
    date: '2026-10-11',
    participants: [
      { user: 'Rahul', amount: 100 },
      { user: 'Amit', amount: 100 },
      { user: 'Priya', amount: 100 },
      { user: 'Neha', amount: 100 }
    ]
  },
  {
    id: 12,
    description: 'Board Games',
    category: 'Entertainment',
    amount: 1500,
    paidBy: 'Neha',
    date: '2026-10-12',
    participants: [
      { user: 'Rahul', amount: 375 },
      { user: 'Amit', amount: 375 },
      { user: 'Priya', amount: 375 },
      { user: 'Neha', amount: 375 }
    ]
  }
];

module.exports = {
  users,
  expenses
};
