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

        //if user id not given in URL, send error message
        if (obj.userId == undefined){
            throw new Error('No User ID provided');
        }   

        //set default sort order
        let sortOrder = (obj.sortOrder == 'asc') ? { '_id': 1 } : { '_id': -1 };

        //set default limit
        let limit = (obj.limit == undefined) ? 1 : obj.limit;

        const params = {
            userId : obj.userId,
            limit : parseInt(limit),
            sortOrder : sortOrder
        };

        return timeEntryModel
            .find({"userId" : params.userId}, null, {limit: params.limit})
            .sort(sortOrder)
            .exec()
            .catch((err) => {
                throw new Error(`Could'nt fetch data with user ID ${userId}`);

        });
    }

    static createTimeEntry(obj) {

        //Formatting of date and time
        const ISODate = timeEntriesDatalayer.toISODate(obj);
        const ISOTime = timeEntriesDatalayer.toISOTime(obj, ISODate);

        const newTimeEntry = new timeEntryModel({
            userId: mongoose.Types.ObjectId(obj.userId),
            date: ISODate,
            timeIn: ISOTime.timeIn,
            timeOut: ISOTime.timeOut,
            onLeave: obj.onLeave
        });

        return newTimeEntry
            .save()
            .catch((err) => {
                throw new Error ('Could not create time entry');
        });
    }

    static updateTimeEntryById(obj) {

        //Formatting of date and time
        const ISODate = timeEntriesDatalayer.toISODate(obj);
        const ISOTime = timeEntriesDatalayer.toISOTime(obj, ISODate)

        const entriesToUpdate = {
            timeIn: ISOTime.timeIn,
            timeOut: ISOTime.timeOut,
            onLeave: obj.onLeave
        };

        const filter = {
            _id: obj.entryId
        };

        return timeEntryModel
            .findByIdAndUpdate(filter, entriesToUpdate, { new: true })
            .exec()
            .catch((err) => {
                throw new Error('Could not update Time entry');
        });
    }

    static toISODate (obj) {

        //Set date
        var x= moment(obj.date, 'YYYY/MM/DD')
        var y= x.toISOString(true);
        return y
    }

    static toISOTime(obj, date) {

        (date == undefined) ? date = moment(new Date()) : '' ;

        //Making ISO standard time stamp
        let selectedDate = date;
        let timeInString = obj.timeIn.split(':');
        let timeOutString = obj.timeOut.split(':');

        return {
            timeIn : moment(selectedDate).hour(timeInString[0]).minutes(timeInString[1]).toISOString(true),
            timeOut : moment(selectedDate).hour(timeOutString[0]).minutes(timeOutString[1]).toISOString(true)
        };
    }

}

module.exports = timeEntriesDatalayer;
