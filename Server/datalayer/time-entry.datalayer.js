const timeEntryModel = require('../models/time-entry.model');
const moment = require('moment');
const mongoose = require('mongoose');

/*
 * @class timeEntriesDatalayer
 */
class timeEntriesDatalayer {

    /**
     * Initializes the datalayer
     */
    static getTimeEntriesByUserId(obj) {

        let param = {
            userId : obj.userId,
            limit : parseInt(obj.limit),
            sortOrder : obj.sortOrder
        }

         //since sort order is optional
         let sortOrder = (param.sortOrder == 'asc') ? { '_id': 1 } : { '_id': -1 }

        return timeEntryModel
            .find({"userId" : param.userId}, null, {limit: param.limit})
            .sort(sortOrder)
            .exec()
            .catch((err) => {
                throw new Error(`Could'nt fetch data with user ID ${userId}`);

        });
    }

    static createTimeEntry(obj) {

        //Formatting of date and time
        const ISODateAndTimeObj = timeEntriesDatalayer.toISOFormat(obj);

        const newTimeEntry = new timeEntryModel({
            userId: mongoose.Types.ObjectId(obj.userId),
            date: ISODateAndTimeObj.date,
            timeIn: ISODateAndTimeObj.timeIn,
            timeOut: ISODateAndTimeObj.timeOut,
            onLeave: obj.onLeave
        });

        return newTimeEntry
            .save()
            .catch((err) => {
                throw new Error ('Could not create time entry');
        });
    }

    static updateTimeEntryById(obj) {

        const ISODateAndTimeObj = timeEntriesDatalayer.toISOFormat(obj);

        const entriesToUpdate = {
            timeIn: ISODateAndTimeObj.timeIn,
            timeOut: ISODateAndTimeObj.timeOut,
            onLeave: obj.onLeave
        };

        const filter = {
            _id: obj.entryId
        };

        return timeEntryModel
            .findOneAndUpdate(filter, entriesToUpdate, { new: true })
            .exec()
            .catch((err) => {
                throw new Error('Could not update Time entry');
        });
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

}

module.exports = timeEntriesDatalayer;
