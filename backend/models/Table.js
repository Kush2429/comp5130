const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  rules: {
    startOfDay: { type: Boolean, default: false },
    endOfDay: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model('Table', TableSchema);
