const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');

router.post('/users', controller.createUser);
router.post('/login', controller.loginUser);
router.get('/users', controller.getUsers);
router.get('/expenses', controller.getExpenses);
router.get('/expenses/:id', controller.getExpenseById);
router.get('/summary', controller.getSummary);

module.exports = router;
