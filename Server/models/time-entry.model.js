"use strict";

const mongoose = require('mongoose');
const timeEntriesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timein: {
        type: Date,
        required: true
    },
    timeout: {
        type: Date,
        required: true
    },
    onleave: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('timeentries', timeEntriesSchema);