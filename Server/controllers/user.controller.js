const userDataLayer = require('../datalayer/user.datalayer');
/**
 * Class representing users controller
 *
 * @class usersController
 */
class usersController {

  static async createUser (req, res) {
    const userObj = {
      // username : req.body.username,
      email : req.body.email,
      password : req.body.password,
      firstname : req.body.firstname,
      lastname : req.body.lastname
    }
    try {
        await userDataLayer.createUser(userObj);
    } catch(err) {
        res.status(400).send(err.message);
        return;
    }
    res.status(200).json({"message" : "User created successfully"});
  }


  static async getUserById (req, res) {
    let userid = req.params.userid;
    let user;
    try {
      user = await userDataLayer.getUserById(userid);
    }
    catch(err) {
      res.status(400).send(err.message);
      return;
    }
    res.status(200).json(user);
  }


  static async updateUserById (req, res) {
    let userid = req.params.userid;
    const updateUserObj = {
     // username : req.body.username,
      email : req.body.email,
      password : req.body.password,
      firstname : req.body.firstname,
      lastname : req.body.lastname
    }
    try {
      await userDataLayer.updateUserById(userid , updateUserObj);
    }
    catch(err) {
      res.status(400).send(err.message);
      return;
      }
    res.status(200).json({"message" : "User updated successfully"});
  }


  static async deleteUserById (req, res) {
    let userid = req.params.userid;
    try {
      await userDataLayer.deleteUserById(userid);
    }
    catch(err) {
      res.status(400).send(err.message);
      return;
    }
    res.status(200).json({"message" : "User deleted successfully"});
  }
}

module.exports = usersController;
