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

       debugger
        const ISODate = timeEntriesDatalayer.toISODate(obj);
        const ISOTime = timeEntriesDatalayer.toISOTime(obj, ISODate)

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
        debugger
        const ISODate = timeEntriesDatalayer.toISODate(obj);
        const ISOTime = timeEntriesDatalayer.toISOTime(obj, ISODate);

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
        return moment(obj.date, 'YYYY/MM/DD').toISOString();
    }

    static toISOTime(obj, date) {

        //Making ISO standard time stamp
        return {
            timeIn : moment(new Date(`${date} ${obj.timeIn}`).toISOString()),
            timeOut : moment(new Date(`${date} ${obj.timeOut}`).toISOString())
        }
    }

}

module.exports = timeEntriesDatalayer;
