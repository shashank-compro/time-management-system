const userModel = require("../models/user.model");
const saltRounds = 10;
const bcrypt = require('bcrypt');
/*
 * @class usersDatalayer
 */
class usersDatalayer {

    /**
    * Initializes the datalayer
    */

    // Creates new user 
    static createUser(userObj) {
        const hashPassword = this.hashPassword(userObj.password);
        let user = new userModel(
            {
                username: userObj.username,
                email: userObj.email,
                password: hashPassword,
                firstname: userObj.firstname,
                lastname: userObj.lastname
            });

        return user.save().catch(err => {
            throw new error(`Not able to save - ${err}`);
        });
    }

    // Get user details based on id
    static getUserById(userid) {
        return userModel.findById(userid).exec().catch(err => {
            throw new Error(`Not able to get user - ${err}`);
        });
    }

    // Update user details based on id
    static updateUserById(userid , updateUserObj) {
        const hashPassword = this.hashPassword(updateUserObj.password);
        let updatedUser = new userModel({
            username: updateUserObj.username,
            email: updateUserObj.email,
            password: hashPassword,
            firstname: updateUserObj.firstname,
            lastname: updateUserObj.lastname
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

    // Creates hash for a password
    static hashPassword (origPassword) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hashPassword = bcrypt.hashSync(origPassword, salt);
        return hashPassword;
    }
}

module.exports = usersDatalayer;
