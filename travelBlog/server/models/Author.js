const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    diaries: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Author', AuthorSchema);
