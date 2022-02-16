const mongoose = require('mongoose');

const launchSchema = mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  customer: {
    type: [String],
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
  },
});

// the 1st string input is always the the singular name of the collection
// this creates Launch model for launches collection
// Launch model will create and read launch document
module.exports = mongoose.model('Launch', launchSchema);
