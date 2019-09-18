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
        let leavesList;
        try {
            leavesList = await leavesDataLayer.getLeavesByUserId(userId);
        } catch (err) {
            console.log(err.message);
            return res.status(400);
        }
        return res.status(200).json(leavesList);
    }

    static async createLeave (req, res) {
        let createdLeave;
        try {
            createdLeave = await leavesDataLayer.createLeave(req.body);
        } catch(err) {
            console.log(err.message);
            return res.status(400);
        }
        return res.status(201).json(createdLeave);
    }

    static async updateLeaveById (req, res) {
        const leaveId = req.params.leaveId;
        let updatedLeave;
        try {
            updatedLeave = await leavesDataLayer.updateLeaveById(leaveId, req.body);
        } catch(err) {
            console.log(err.message);
            return res.status(400);
        }
        return res.status(200).json(updatedLeave);
    }

    static async deleteLeaveById (req, res) {
        const leaveId = req.params.leaveId;
        let deletedLeave;
        try {
            deletedLeave = await leavesDataLayer.deleteLeaveById(leaveId);
        } catch(err) {
            console.log(err.message);
            return res.status(400);
        }
        res.status(200).json(deletedLeave);
    }
  
}
module.exports = leavesController;
