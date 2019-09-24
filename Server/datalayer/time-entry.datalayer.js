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

        const params = {
            userId : mongoose.Types.ObjectId(obj.user),
            limit : parseInt(obj.limit),
            sortOrder : obj.sort
        };

        return timeEntryModel
            .find({"userId" : params.userId}, null, {limit: params.limit})
            .sort(params.sortOrder)
            .exec()
            .catch((err) => {
                throw new Error(`Could'nt fetch data with user ID ${params.userId}`);

        });
    }

    static createTimeEntry(obj) {

        //Formatting of date and time
        const ISODate = timeEntriesDatalayer.convertToISODate(obj.date);
        const timeInMinutes = timeEntriesDatalayer.convertToMinutes(obj.timeIn);
        const timeOutMinutes = timeEntriesDatalayer.convertToMinutes(obj.timeOut);

        const newTimeEntry = new timeEntryModel({
            userId: mongoose.Types.ObjectId(obj.userId),
            date: ISODate,
            timeIn: timeInMinutes,
            timeOut: timeOutMinutes,
            onLeave: obj.onLeave
        });

        return newTimeEntry
            .save()
            .catch((err) => {
                throw new Error ('Could not create time entry');
        });
    }

    static updateTimeEntryById(obj) {

        //Formatting of time
        const timeInMinutes = timeEntriesDatalayer.convertToMinutes(obj.timeIn);
        const timeOutMinutes = timeEntriesDatalayer.convertToMinutes(obj.timeOut);

        const entriesToUpdate = {
            timeIn: timeInMinutes,
            timeOut: timeOutMinutes,
            onLeave: obj.onLeave
        };

        const filter = {
            _id: obj.entryId
        };

        return timeEntryModel
            .findByIdAndUpdate(filter, entriesToUpdate, { "omitUndefined": true, "new": true })
            .exec()
            .catch((err) => {
                throw new Error('Could not update Time entry');
        });
    }

    static convertToISODate (date) {

        //Set date
        return moment(date, 'YYYY/MM/DD').toISOString(true);
    }

    static convertToMinutes(time) {

        let timeStringArray = time.split(':');
        //convert in minutes
        return parseInt(timeStringArray[0]) * 60 + parseInt(timeStringArray[1]);
    }

}

module.exports = timeEntriesDatalayer;
