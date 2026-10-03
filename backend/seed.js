require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Expense = require('./models/Expense');

const seedUsers = [
  { username: 'Rahul', email: 'rahul@example.com', password: 'password123' },
  { username: 'Amit',  email: 'amit@example.com',  password: 'password123' },
  { username: 'Priya', email: 'priya@example.com', password: 'password123' },
  { username: 'Neha',  email: 'neha@example.com',  password: 'password123' },
];

const seedExpenses = [
  // Rahul's expenses
  {
    description: 'Dinner at Restaurant',
    category: 'Food',
    amount: 2000,
    paidBy: 'Rahul',
    date: '2026-10-01',
    participants: [
      { user: 'Rahul', amount: 500 },
      { user: 'Amit',  amount: 500 },
      { user: 'Priya', amount: 500 },
      { user: 'Neha',  amount: 500 },
    ],
  },
  {
    description: 'Cab to Airport',
    category: 'Travel',
    amount: 600,
    paidBy: 'Rahul',
    date: '2026-10-02',
    participants: [
      { user: 'Rahul', amount: 150 },
      { user: 'Amit',  amount: 150 },
      { user: 'Priya', amount: 150 },
      { user: 'Neha',  amount: 150 },
    ],
  },
  {
    description: 'Movie Tickets',
    category: 'Entertainment',
    amount: 800,
    paidBy: 'Rahul',
    date: '2026-10-03',
    participants: [
      { user: 'Rahul', amount: 200 },
      { user: 'Amit',  amount: 200 },
      { user: 'Priya', amount: 200 },
      { user: 'Neha',  amount: 200 },
    ],
  },

  // Amit's expenses
  {
    description: 'Lunch Buffet',
    category: 'Food',
    amount: 1200,
    paidBy: 'Amit',
    date: '2026-10-04',
    participants: [
      { user: 'Rahul', amount: 300 },
      { user: 'Amit',  amount: 300 },
      { user: 'Priya', amount: 300 },
      { user: 'Neha',  amount: 300 },
    ],
  },
  {
    description: 'Train Tickets',
    category: 'Travel',
    amount: 1600,
    paidBy: 'Amit',
    date: '2026-10-05',
    participants: [
      { user: 'Rahul', amount: 400 },
      { user: 'Amit',  amount: 400 },
      { user: 'Priya', amount: 400 },
      { user: 'Neha',  amount: 400 },
    ],
  },
  {
    description: 'Concert Tickets',
    category: 'Entertainment',
    amount: 2000,
    paidBy: 'Amit',
    date: '2026-10-06',
    participants: [
      { user: 'Rahul', amount: 500 },
      { user: 'Amit',  amount: 500 },
      { user: 'Priya', amount: 500 },
      { user: 'Neha',  amount: 500 },
    ],
  },

  // Priya's expenses
  {
    description: 'Breakfast',
    category: 'Food',
    amount: 1000,
    paidBy: 'Priya',
    date: '2026-10-07',
    participants: [
      { user: 'Rahul', amount: 250 },
      { user: 'Amit',  amount: 250 },
      { user: 'Priya', amount: 250 },
      { user: 'Neha',  amount: 250 },
    ],
  },
  {
    description: 'Flight Booking',
    category: 'Travel',
    amount: 3500,
    paidBy: 'Priya',
    date: '2026-10-08',
    participants: [
      { user: 'Rahul', amount: 875 },
      { user: 'Amit',  amount: 875 },
      { user: 'Priya', amount: 875 },
      { user: 'Neha',  amount: 875 },
    ],
  },
  {
    description: 'Gaming Console',
    category: 'Entertainment',
    amount: 2400,
    paidBy: 'Priya',
    date: '2026-10-09',
    participants: [
      { user: 'Rahul', amount: 600 },
      { user: 'Amit',  amount: 600 },
      { user: 'Priya', amount: 600 },
      { user: 'Neha',  amount: 600 },
    ],
  },

  // Neha's expenses
  {
    description: 'Coffee & Snacks',
    category: 'Food',
    amount: 500,
    paidBy: 'Neha',
    date: '2026-10-10',
    participants: [
      { user: 'Rahul', amount: 125 },
      { user: 'Amit',  amount: 125 },
      { user: 'Priya', amount: 125 },
      { user: 'Neha',  amount: 125 },
    ],
  },
  {
    description: 'Bus Pass',
    category: 'Travel',
    amount: 400,
    paidBy: 'Neha',
    date: '2026-10-11',
    participants: [
      { user: 'Rahul', amount: 100 },
      { user: 'Amit',  amount: 100 },
      { user: 'Priya', amount: 100 },
      { user: 'Neha',  amount: 100 },
    ],
  },
  {
    description: 'Board Games',
    category: 'Entertainment',
    amount: 1500,
    paidBy: 'Neha',
    date: '2026-10-12',
    participants: [
      { user: 'Rahul', amount: 375 },
      { user: 'Amit',  amount: 375 },
      { user: 'Priya', amount: 375 },
      { user: 'Neha',  amount: 375 },
    ],
  },
];

async function seed() {
  try {
    await connectDB();

    await User.deleteMany({});
    await Expense.deleteMany({});

    const users = await User.insertMany(seedUsers);
    const expenses = await Expense.insertMany(seedExpenses);

    console.log(`Seeded ${users.length} users and ${expenses.length} expenses`);
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
