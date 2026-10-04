const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Expense = require('../models/Expense');

// Validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function createUser(req, res) {
  try {
    // Destructure only expected fields (ignore extra or client-supplied uid)
    const { username, email, password } = req.body;

    // Validation
    const trimmedUsername = username?.trim();
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedPassword = password?.trim();

    if (!trimmedUsername || trimmedUsername.length < 3 || trimmedUsername.length > 30) {
      return res.status(400).json({ error: 'Username must be 3-30 characters' });
    }

    if (!trimmedEmail || !isValidEmail(trimmedEmail) || trimmedEmail.length > 254) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!trimmedPassword || trimmedPassword.length < 8 || trimmedPassword.length > 72) {
      return res.status(400).json({ error: 'Password must be 8-72 characters' });
    }

    // Duplicate check before hashing (faster fail for duplicates)
    const existingUser = await User.findOne({
      $or: [
        { username: trimmedUsername },
        { email: trimmedEmail },
      ],
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already in use' });
    }

    // Get next uid
    const lastUser = await User.findOne().sort({ uid: -1 });
    const nextUid = lastUser ? lastUser.uid + 1 : 1;

    // Hash password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Create and save user
    const newUser = new User({
      uid: nextUid,
      username: trimmedUsername,
      email: trimmedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    // Return user without password
    res.status(201).json({
      uid: newUser.uid,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    // Handle Mongo duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Username or email already in use' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

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

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Find user by username
    const user = await User.findOne({ username: trimmedUsername });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Return user data without password
    res.status(200).json({
      uid: user.uid,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getExpenses,
  getExpenseById,
  getSummary,
};
