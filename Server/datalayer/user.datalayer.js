const userModel = require("../models/user.model");
/*
 * @class usersDatalayer
 */
class usersDatalayer {

    /**
    * Initializes the datalayer
    */

    // Creates new user 
    static createUser(reqbody) {
	let user = new userModel(
        {
            username: reqbody.username,
            email: reqbody.email,
            password: reqbody.password,
            firstname: reqbody.firstname,
            lastname: reqbody.lastname
        });

        return user.save().catch(err => {
        throw new error(`Not able to save - ${err}`);
      });
    }

    // Get user details based on id
    static getUsersByUserId(userid) {
        return userModel.findById(userid).exec().catch(err => {
        throw new Error(`Not able to get user - ${err}`);
        });
    }

    // Update user details based on id
    static updateUserById(userid , reqbody) {
        let updatedUser = new userModel({
            username: reqbody.username,
            email: reqbody.email,
            password: reqbody.password,
            firstname: reqbody.firstname,
            lastname: reqbody.lastname
        });
        return userModel.findByIdAndUpdate(userid, updatedUser).exec().catch(err => {
            throw new Error(`Not able to edit user details for ${userid}`);
        });
    }

    // Delete user details based on id
    static deleteUserById(userid) {
        return userModel.findByIdAndRemove(userid).exec().catch((err) => {
                throw new Error (`Not able to delete leave. Error stack - ${err}`);
            });
    }
}

module.exports = usersDatalayer;
