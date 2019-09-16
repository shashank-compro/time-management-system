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
            res.status(400).send({
                errorCode: e.errorCode,
                dbMessage: e.dbMessage
            });
        }

        res.status(200).json(timeEntries);

    }

    //POST

    static async createTimeEntry(req, res) {
        let entry;
        var dateAndTimeObj = {
            date: req.body.date,
            timeIn: req.body.timeIn,
            timeOut: req.body.timeOut
        }
        //Formatting of date and time
        let ISODateAndTimeObj = timeEntriesController.toISOFormat(dateAndTimeObj);

        let newTimeEntry = new timeEntryModel({
            userId: mongoose.Types.ObjectId(req.body.userId), //need to check token from login page
            date: ISODateAndTimeObj.date,
            timeIn: ISODateAndTimeObj.timeIn,
            timeOut: ISODateAndTimeObj.timeOut,
            onLeave: req.body.onLeave
        });

        try {
            entry = await dataLayer.createTimeEntry(newTimeEntry);

            // //save entry ID - WILL BE FETCHED FROM URL IN FUTURE
            // timeEntriesController.currentEntryID = entry._id;
        } catch (e) {
            res.status(400).send({
                errorCode: e.errorCode,
                dbMessage: e.dbMessage
            });
        }
        res.status(200).json(entry);
    }

    static toISOFormat(dateAndTimeObj) {

        //Set date
        var dateObj = dateAndTimeObj.date.split('/');
        let date = moment(new Date(dateObj[0], dateObj[1] - 1, dateObj[2])).format('YYYY-MM-DD');
        console.log('s', date)

        //Making ISO standard time stamp
        let a = date;

        let timeIn = moment(`${a} ${dateAndTimeObj.timeIn}`).toISOString();
        let timeOut = moment(`${a} ${dateAndTimeObj.timeOut}`).toISOString();

        return {
            "date": date,
            "timeIn": timeIn,
            "timeOut": timeOut
        };
    }

    //PUT

    static async updateTimeEntryById(req, res) {

        let updatedTimeEntry;
        let ISODateAndTimeObj = timeEntriesController.toISOFormat(req.body);

        var obj = {
            userId: mongoose.Types.ObjectId(req.body.userId),
            date: ISODateAndTimeObj.date,
            timeIn: ISODateAndTimeObj.timeIn,
            timeOut: ISODateAndTimeObj.timeOut,
            onLeave: req.body.onLeave,
            entryID: req.params.timeEntryId
        }
        try {
            updatedTimeEntry = await dataLayer.updateTimeEntryById(obj);

        } catch (e) {
            res.status(400).send({
                errorCode: e.errorCode,
                dbMessage: e.dbMessage
            });
        }
        res.status(200).json(updatedTimeEntry);
    }

}
module.exports = timeEntriesController;