"use strict";

const mongoose = require('mongoose');
const sampleSchema = new mongoose.Schema({
    _id: {
      type: String,
      required: true
    }
  });
  
module.exports = mongoose.model('Sample', sampleSchema);