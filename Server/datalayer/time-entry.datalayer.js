const timeentries = require('../models/time-entry.model');

/*
 * @class timeEntriesDatalayer
 */
class timeEntriesDatalayer {

    /**
     * Initializes the datalayer
     */
    static getTimeEntriesByUserId(obj) {

        let param = {
            "userId" : obj.userId,
            "limit" : parseInt(obj.limit)
        }
        let sortOrder = {
            '_id': -1
        };

        return timeentries
            .find({"userId" : param.userId}, null, {limit: param.limit})
            .sort(sortOrder)
            .exec()
            .catch((err) => {
            if (err) throw new Error(`Could'nt fetch data with user ID ${userId}`);

        });
    }

    static createTimeEntry(newTimeEntry) {

        return newTimeEntry
            .save()
            .catch((err) => {
                if (err) throw new Error ('Could not create time entry');
        });
    }

    static updateTimeEntryById(obj) {

        const filter = {
            _id: obj.entryID
        };
        const entriesToUpdate = {
            timeIn: obj.timeIn,
            timeOut: obj.timeOut
        };

        return timeentries
            .findOneAndUpdate(filter, entriesToUpdate, { new: true })
            .exec()
            .catch((err, entry) => {
                if (err) throw new Error('Could not update Time entry');
                return entry;
        });
    }

}

module.exports = timeEntriesDatalayer;
