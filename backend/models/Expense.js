const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    user:   { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    description:  { type: String, required: true },
    category:     { type: String, required: true },
    amount:       { type: Number, required: true },
    paidBy:       { type: String, required: true },
    date:         { type: Date,   required: true },
    participants: { type: [participantSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
