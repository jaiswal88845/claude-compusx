const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    uid:      { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    email:    { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
