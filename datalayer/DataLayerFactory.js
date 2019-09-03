const MongoDataLayer = require('./MongoDataLayer');
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
        this.mongoDataLayer = new MongoDataLayer(dbConfig.mongo);
        console.log("Connecting to mongo database:", dbConfig.mongo.database)
        return this.mongoDataLayer.connect();
    }


    /**
    * Factory function to get mongo datalayer
    *
    * @returns {object} Datalayer object
    */
   static getMongoDataLayer() {
    return this.mongoDataLayer;
}

}

module.exports = DataLayerFactory;
