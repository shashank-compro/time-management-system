"use strict";

const mongoose = require('mongoose');
const leavesSchema = new mongoose.Schema({
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    } 
  });
  
module.exports = mongoose.model('leaves', leavesSchema);