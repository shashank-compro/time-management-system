const mongoose = require('mongoose');

/**
 * Class representing mongo datalayer
 *
 * @class MongoDataLayer
 */
class MongoDataLayer {

    static connect(dbConfig){
        let connectionString = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.connectionString}`;
        return mongoose.connect(connectionString, { useNewUrlParser: true }).catch((err) => {
            throw new Error(`Could not connect to MongoDB: ${err.message}`);
        });
    }

    static disconnect(){
        return mongoose.connection.close();
    }
}
module.exports = MongoDataLayer;
