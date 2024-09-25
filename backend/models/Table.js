const mongoose = require('mongoose');

// Define the schema for time range (startTime, endTime)
const TimeRangeSchema = new mongoose.Schema({
  startTime: { 
    type: String, 
    required: true, 
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:mm format
  },
  endTime: { 
    type: String, 
    required: true, 
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:mm format
  }
});

// Define the Table schema with time ranges for each day of the week
const TableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  rules: {
    startOfDay: { type: Boolean, default: false },
    endOfDay: { type: Boolean, default: false }
  },
  wednesday: TimeRangeSchema,
  thursday: TimeRangeSchema,
  friday: TimeRangeSchema,
  saturday: TimeRangeSchema,
  sunday: TimeRangeSchema,
  monday: TimeRangeSchema,
  tuesday: TimeRangeSchema
});

module.exports = mongoose.model('Table', TableSchema);
