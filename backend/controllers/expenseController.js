const User = require('../models/User');
const Expense = require('../models/Expense');

async function getUsers(req, res) {
  const users = await User.find({}, 'username -_id');
  res.json(users.map((u) => u.username));
}

async function getExpenses(req, res) {
  const expenses = await Expense.find();
  res.json(expenses);
}

async function getExpenseById(req, res) {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ error: 'Expense not found' });
  res.json(exp);
}

async function getSummary(req, res) {
  const [users, expenses] = await Promise.all([User.find(), Expense.find()]);

  const summary = {};
  users.forEach((u) => {
    summary[u.username] = { user: u.username, paid: 0, owes: 0, balance: 0 };
  });

  let totalExpenses = 0;

  expenses.forEach((e) => {
    totalExpenses += e.amount;
    if (summary[e.paidBy]) summary[e.paidBy].paid += e.amount;
    e.participants.forEach((p) => {
      if (summary[p.user]) summary[p.user].owes += p.amount;
    });
  });

  Object.values(summary).forEach((s) => {
    s.balance = s.paid - s.owes;
  });

  res.json({ totalExpenses, summary: Object.values(summary) });
}

module.exports = {
  getUsers,
  getExpenses,
  getExpenseById,
  getSummary,
};
