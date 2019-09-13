"use strict";
/**
 * Class representing status controller
 *
 * @class statusController
 */
class statusController {

    static checkStatus(req, res) {
        res.json({"success": true});
    }

   
}
module.exports = statusController;
