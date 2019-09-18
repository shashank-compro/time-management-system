"use strict";
/**
 * Class representing time entries controller
 *
 * @class timeEntriesController
 */
const mongoose = require('mongoose');
const timeEntryModel = require('../models/time-entry.model');
const dataLayer = require('../datalayer/time-entry.datalayer')
const moment = require('moment');


class timeEntriesController {

    //  GET 

    static async getTimeEntriesByUserId(req, res) {
        let timeEntries;

        const obj = {
            "userId": req.query.user,
            "limit": req.query.limit
        }

        try {
            timeEntries = await dataLayer.getTimeEntriesByUserId(obj);
        } catch (e) {
            return res
                .status(400)
                .send({ "status": "error", "message": `Failed to get time entries for user: ${obj.userId}` });
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
            onLeave: req.body.onLeave
        }
        //Formatting of date and time
        const ISODateAndTimeObj = timeEntriesController.toISOFormat(obj);

        const newTimeEntry = new timeEntryModel({
            userId: mongoose.Types.ObjectId(obj.userId),
            date: ISODateAndTimeObj.date,
            timeIn: ISODateAndTimeObj.timeIn,
            timeOut: ISODateAndTimeObj.timeOut,
            onLeave: obj.onLeave
        });

        try {
            newEntry = await dataLayer.createTimeEntry(newTimeEntry);
        } catch (e) {
            return res
                .status(400)
                .send({ "status": "error", "message": "Failed to create time entry" });
        }

        res.status(200)
            .json(newEntry);
    }

    static toISOFormat(dateAndTimeObj) {

        //Set date
        const dateObj = dateAndTimeObj.date.split('/');
        const date = moment(new Date(dateObj[0], dateObj[1] - 1, dateObj[2])).format('YYYY-MM-DD');

        //Making ISO standard time stamp
        const a = date;
        const timeIn = moment(new Date(`${a} ${dateAndTimeObj.timeIn}`).toISOString())
        const timeOut = moment(new Date(`${a} ${dateAndTimeObj.timeOut}`).toISOString());

        return {
            "date": date,
            "timeIn": timeIn,
            "timeOut": timeOut
        };
    }

    //PUT

    static async updateTimeEntryById(req, res) {

        let updatedTimeEntry;

        const objForISOFormat = {
            date: req.body.date,
            timeIn: req.body.timeIn,
            timeOut: req.body.timeOut,
            onLeave: req.body.onLeave,
            entryId: req.params.timeEntryId
        }

        const ISODateAndTimeObj = timeEntriesController.toISOFormat(objForISOFormat);

        const obj = {
            timeIn: ISODateAndTimeObj.timeIn,
            timeOut: ISODateAndTimeObj.timeOut,
            onLeave: objForISOFormat.onLeave,
            entryID: objForISOFormat.entryId
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