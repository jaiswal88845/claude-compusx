const { users, expenses } = require('../data/expenses');

function getUsers(req, res) {
  res.json(users);
}

function getExpenses(req, res) {
  res.json(expenses);
}

function getExpenseById(req, res) {
  const id = Number(req.params.id);
  const exp = expenses.find((e) => e.id === id);
  if (!exp) return res.status(404).json({ error: 'Expense not found' });
  res.json(exp);
}

function getSummary(req, res) {
  // compute totals per user
  const summary = {};
  users.forEach((u) => {
    summary[u] = { user: u, paid: 0, owes: 0, balance: 0 };
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
  getSummary
};
