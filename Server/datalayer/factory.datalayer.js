const MongoDataLayer = require('./mongo.datalayer');
const dbConfig = require('../config/default');
/**
 * Factory class for getting the dataLayer instance
 *
 * @class DataLayerFactory
 */
class DataLayerFactory {

    /**
    * Initializes the datalayer
    *
    * @returns connection to mongoDB
    */
 
    static initMongoDataLayer() {
        console.log("Connecting to mongo database:", dbConfig.mongo.database)
        return MongoDataLayer.connect(dbConfig.mongo);
    }
}

module.exports = DataLayerFactory;