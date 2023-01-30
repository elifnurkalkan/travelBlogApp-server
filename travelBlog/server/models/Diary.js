const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      max: 20,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Diary', DiarySchema);
