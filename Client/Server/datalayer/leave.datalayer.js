const mongoose = require('mongoose');
const leavesModel = require('../models/leave.model');

class leavesDataLayer {

    static getLeavesByUserId (userId) {
        return leavesModel.find({'userId': mongoose.Types.ObjectId(userId)}).exec().catch((err) => {
            throw new Error (`Could not retrieve leaves. Error message - ${err.message}`);
        });
    }

    static createLeave (leave) {
        let {startDate, endDate, reason,  userId} = leave;
        const newLeave = new leavesModel({
            startDate: startDate,
            endDate: endDate,
            reason: reason,
            userId: mongoose.Types.ObjectId(userId)
        });
        return newLeave.save().catch((err) => {
            throw new Error (`Could not create leave. Error message - ${err.message}`);
        });
    }

    static updateLeaveById (leaveId, updatedLeave) {
        return leavesModel.findByIdAndUpdate(leaveId, updatedLeave, {"omitUndefined": true, "new": true}).exec().catch((err) => {
            throw new Error (`Could not update leave. Error message - ${err.message}`);
        });
    }

    static deleteLeaveById (leaveId) {
        return leavesModel.findByIdAndRemove(leaveId).exec().catch((err) => {
            throw new Error (`Could not delete leave. Error message - ${err.message}`);
        });
    }
}
module.exports = leavesDataLayer;
