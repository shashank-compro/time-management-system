"use strict";
/**
 * Class representing time entries controller
 *
 * @class timeEntriesController
 */
const dataLayer = require('../datalayer/time-entry.datalayer')


class timeEntriesController {

    //  GET 

    static async getTimeEntriesByUserId(req, res) {
        let timeEntries;
        const {user, limit, sort} = req.query;
        const obj = {user, limit, sort};

         //if user id not given in URL, send error message
        if (!obj.user){
            return res
                .status(400)
                .send({ "status": "error", "message": "Bad Request" });
        }   

        //check sort value
        if (!obj.sort) obj.sort = 'desc';

        //set default limit
        obj.limit = obj.limit || 1;
        try {
            timeEntries = await dataLayer.getTimeEntriesByUserId(obj);
        } catch (e) {
            return res
                .status(400)
                .send({ "status": "error", "message": `Failed to get time entries for user: ${obj.user}` });
        }

        res.status(200)
            .json(timeEntries);

    }

    //POST

    static async createTimeEntry(req, res) {

        let newEntry;
        const obj = {
            date: req.body.date,
            timeIn: req.body.timeIn,
            timeOut: req.body.timeOut,
            userId: req.body.userId,
            onLeave: req.body.onLeave,
            limit: req.query.limit,
            sortOrder: req.query.sort
        }

        try {
            newEntry = await dataLayer.createTimeEntry(obj);
        } catch (e) {
            return res
                .status(400)
                .send({ "status": "error", "message": "Failed to create time entry" });
        }

        res.status(200)
            .json(newEntry);
    }

    //PUT

    static async updateTimeEntryById(req, res) { 

        let updatedTimeEntry;

        const obj = {
            date: req.body.date,
            timeIn: req.body.timeIn,
            timeOut: req.body.timeOut,
            onLeave: req.body.onLeave,
            entryId: req.params.timeEntryId
        }

        try {
            updatedTimeEntry = await dataLayer.updateTimeEntryById(obj);
        } catch (e) {
           return res
                .status(400)
                .send({ "status": "error", "message": "Failed to update time entry" });
        }

        res.status(200)
            .json(updatedTimeEntry);
    }

}
module.exports = timeEntriesController;