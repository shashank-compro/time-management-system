"use strict";
const datalayerFactory = require('../datalayer/DataLayerFactory');

/**
 * Class representing leaves controller
 *
 * @class leavesController
 */
class leavesController {

    static async getLeavesByUserId(req, res) {
        const userId = req.query.user;
        let leavesList;
        try {
            leavesList = await datalayerFactory.getMongoDataLayer().getLeavesByUserId(userId);
        } catch (err) {
            console.log(err);
            res.status(500);
        }
        res.status(200);
        res.json(leavesList);
    }

    static async addLeaves(req, res) {
        let reqObject = req.body;
        try {
            await datalayerFactory.getMongoDataLayer().addLeaves(reqObject);
        } catch(err) {
            throw new Error(err);
        }
        res.status(200);
        res.send("Post successful");
    }

    static async editLeave(req, res) {
        let leaveId = req.params.leaveId;
        let reqObject = req.body;
        try {
            await datalayerFactory.getMongoDataLayer().editLeave(leaveId, reqObject);
        } catch(err) {
            throw new Error(err);
        }
        res.status(200);
        res.send("Edit successful");
    }

    static async deleteLeave(req, res) {
        let leaveId = req.params.leaveId;
        try {
            await datalayerFactory.getMongoDataLayer().deleteLeave(leaveId);
        } catch(err) {
            throw new Error(err);
        }
        res.status(200);
        res.send("Delete successful");
    }
   
}
module.exports = leavesController;