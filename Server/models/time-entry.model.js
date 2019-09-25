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
    timeIn: {
        type: Number,
        required: true
    },
    timeOut: {
        type: Number,
        required: true
    },
    onLeave: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('timeentries', timeEntriesSchema);