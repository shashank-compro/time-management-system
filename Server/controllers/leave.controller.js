"use strict";
const leavesDataLayer = require('../datalayer/leave.datalayer');
/**
 * Class representing leaves controller
 *
 * @class leavesController
 */
class leavesController {

    static async getLeavesByUserId (req, res) {
        const userId = req.query.user;
        if (!userId) {
            return res.status(400);
        }
        let leaves;
        try {
            leaves = await leavesDataLayer.getLeavesByUserId(userId);
        } catch (err) {
            console.log(err.message);
            return res.status(500);
        }
        return res.status(200).json(leaves);
    }

    static async createLeave (req, res) {
        let createdLeave;
        let {endDate, reason, startDate, userId} = req.body;
        if (!endDate || !reason || !startDate || !userId) {
            return res.status(400);
        }
        const newLeave = {
            "startDate": startDate,
            "endDate": endDate,
            "reason": reason,
            "userId": userId
        }
        try {
            createdLeave = await leavesDataLayer.createLeave(newLeave);
        } catch(err) {
            console.log(err.message);
            return res.status(500);
        }
        return res.status(201).json(createdLeave);
    }

    static async updateLeaveById (req, res) {
        let updatedLeave;
        const leaveId = req.params.leaveId;
        if (!leaveId) {
            return res.status(400);
        }
        let {endDate, reason, startDate, userId} = req.body;
        if (!endDate || !reason || !startDate || !userId) {
            return res.status(400);
        }
        const newLeave = {
            "startDate": startDate,
            "endDate": endDate,
            "reason": reason,
            "userId": userId
        }
        try {
            updatedLeave = await leavesDataLayer.updateLeaveById(leaveId, newLeave);
        } catch(err) {
            console.log(err.message);
            return res.status(500);
        }
        return res.status(200).json(updatedLeave);
    }

    static async deleteLeaveById (req, res) {
        const leaveId = req.params.leaveId;
        if (!leaveId) {
            return res.status(400);
        }
        let deletedLeave;
        try {
            deletedLeave = await leavesDataLayer.deleteLeaveById(leaveId);
        } catch(err) {
            console.log(err.message);
            return res.status(500);
        }
        if (!deletedLeave) {
            res.status(500).json(false);
        } else {
            res.status(400).json(true);
        }
        
    }
  
}
module.exports = leavesController;
