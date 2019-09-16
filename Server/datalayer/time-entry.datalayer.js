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
            '_id': 1
        };
        console.log(param,param.userId,param.limit)

        return timeentries
            .find({"userId" : param.userId}, null, {limit: param.limit})
            .sort(sortOrder)
            .exec()
            .catch((err) => {
            if (err) throw new Error(`Could'nt fetch data user with ID ${userId}`);
        });
    }

    static createTimeEntry(newTimeEntry) {
        return newTimeEntry.save().catch((err) => {
            if (err) throw new Error (`Could not add leave. Error stack - ${err}`);
            else console.log("Entry submitted: ", data);
        });
    }

    static updateTimeEntryById(obj) {

        const filter = {
            _id: obj.entryID
        };
        const update = {
            timeIn: obj.timeIn,
            timeOut: obj.timeOut
        };
        // mongoose.set('useFindAndModify', false);
        return timeentries.findOneAndUpdate(filter, update, {
            new: true
        }).exec().catch( (err, entry) => {
            if (err) throw new Error('Could not update Time entry');
            return entry;
        });
    }

}

module.exports = timeEntriesDatalayer;
