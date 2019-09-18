const mongoose = require('mongoose');
const leavesModel = require('../models/leave.model');

class leavesDataLayer {

    static getLeavesByUserId (userId) {
        return leavesModel.find({'userId': mongoose.Types.ObjectId(userId)}).exec().catch((err) => {
            throw new Error (`Could not retrieve leaves. Error message - ${err.message}`);
        });
    }

    static createLeave (reqObj) {
        let {endDate, reason, startDate} = reqObj;
        const newLeave = new leavesModel({
            startDate: startDate,
            endDate: endDate,
            reason: reason,
            userId: mongoose.Types.ObjectId(reqObj.userId)
        });
        return newLeave.save().catch((err) => {
            throw new Error (`Could not create leave. Error message - ${err.message}`);
        });
    }

    static updateLeaveById (leaveId, reqObj) {
        let {endDate, reason, startDate} = reqObj;
        let updatedLeave = {
            startDate: startDate,
            endDate: endDate,
            reason: reason
        };
        return leavesModel.findByIdAndUpdate(leaveId, updatedLeave).exec().catch((err) => {
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
