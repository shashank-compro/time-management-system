const mongoose = require('mongoose');

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
        let connectionString = `mongodb://${this.config.user}:${this.config.password}@cluster0-shard-00-00-jt05i.mongodb.net:27017,cluster0-shard-00-01-jt05i.mongodb.net:27017,cluster0-shard-00-02-jt05i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
        return mongoose.connect(connectionString, { useNewUrlParser: true }).catch((err) => {
            throw new Error(`Could not connect to MongoDB: ${err.message}`);
        });
    }

    disconnect(){
        return mongoose.connection.close();
    }

}
module.exports = MongoDataLayer;
