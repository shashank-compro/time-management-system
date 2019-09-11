const mongoose = require('mongoose');
const leavesModel = require('../models/leavesModel');

/**
 * Class representing mongo datalayer
 *
 * @class MongoDataLayer
 */
class MongoDataLayer {
    constructor(dbConfig) {
        this.config = dbConfig;
    }

    connect(){
        let connectionString = `mongodb://${this.config.user}:${this.config.password}@cluster0-shard-00-00-jt05i.mongodb.net:27017,cluster0-shard-00-01-jt05i.mongodb.net:27017,cluster0-shard-00-02-jt05i.mongodb.net:27017/${this.config.database}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
        return mongoose.connect(connectionString, { useNewUrlParser: true }).catch((err) => {
            throw new Error(`Could not connect to MongoDB: ${err.message}`);
        });
    }

    disconnect(){
        return mongoose.connection.close();
    }

    getLeavesByUserId (userId) {
        return leavesModel.find({'userId': mongoose.Types.ObjectId(userId)}).exec().catch((err) => {
            throw new Error (`Could not retrieve leaves for userId - ${userId}`);
        });
    }

    addLeaves (reqObj) {
        let {endDate, reason, startDate} = reqObj;
        const newLeave = new leavesModel({
            startDate: startDate,
            endDate: endDate,
            reason: reason,
            userId: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001')
        });
        return newLeave.save().catch((err) => {
            throw new Error (`Could not add leave. Error stack - ${err}`);
        });
    }

    editLeave (leaveId, reqObj) {
        let {endDate, reason, startDate} = reqObj;
        let updatedLeave = {
            startDate: startDate,
            endDate: endDate,
            reason: reason
        };
        return leavesModel.findByIdAndUpdate(leaveId, updatedLeave).exec().catch((err) => {
            throw new Error (`Could not edit leave. Error stack - ${err}`);
        });
    }

    deleteLeave (leaveId) {
        return leavesModel.findByIdAndRemove(leaveId).exec().catch((err) => {
            throw new Error (`Could not delete leave. Error stack - ${err}`);
        });
    }
}
module.exports = MongoDataLayer;
