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
        if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send("Bad Request");
        }
        let leaves;
        try {
            leaves = await leavesDataLayer.getLeavesByUserId(userId);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send("Internal Server Error");
        }
        return res.status(200).json(leaves);
    }

    static async createLeave (req, res) {
        let {startDate, endDate, reason,  userId} = req.body;
        if (!startDate || !endDate || !reason || !userId) {
            return res.status(400).send("Bad Request");
        }
        let newLeave = {startDate, endDate, reason,  userId};
        try {
            newLeave = await leavesDataLayer.createLeave(newLeave);
        } catch(err) {
            console.log(err.message);
            return res.status(500).send("Internal Server Error");
        }
        return res.status(201).json(newLeave);
    }

    static async updateLeaveById (req, res) {
        const leaveId = req.params.leaveId;
        if (!leaveId || !leaveId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send("Bad Request");
        }
        let {startDate, endDate, reason} = req.body;
        let updatedLeave = {startDate, endDate, reason};
        try {
            updatedLeave = await leavesDataLayer.updateLeaveById(leaveId, updatedLeave);
        } catch(err) {
            console.log(err.message);
            return res.status(500).send("Internal Server Error");
        }
        return res.status(200).json(updatedLeave);
    }

    static async deleteLeaveById (req, res) {
        const leaveId = req.params.leaveId;
        if (!leaveId || !leaveId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send("Bad Request");
        }
        let deletedLeave;
        try {
            deletedLeave = await leavesDataLayer.deleteLeaveById(leaveId);
        } catch(err) {
            console.log(err.message);
            return res.status(500).send("Internal Server Error");
        }
        if (!deletedLeave) {
            res.status(500).json(false);
        } else {
            res.status(200).json(true);
        }
        
    }
  
}
module.exports = leavesController;
