const datalayerFactory = require('../datalayer/factory.datalayer');
const userDataLayer = require('../datalayer/user.datalayer');
/**
 * Class representing users controller
 *
 * @class usersController
 */
class usersController {

  static async createUser (req, res) {
    let reqObject = req.body;
        try {
            await userDataLayer.createUser(reqObject);
        } catch(err) {
            res.status(400).send(err.message);
            return;
        }
        res.status(200);
        res.send("User created successfully");
  }


  static async getUsersByUserId (req, res) {
    let userid = req.params._id;
    let user;
    try {
      user = await userDataLayer.getUsersByUserId(userid);
    }
    catch(err) {
      res.status(400).send(err.message);
      return;
    }
    res.status(200).json(user);
  }


  static async updateUserById (req, res) {
    let reqbody = req.body;
    let userid = req.params._id;
    try {
      await userDataLayer.updateUserById(userid , reqbody);
    }
    catch(err) {
      res.status(400).send(err.message);
      return;
      }
    res.status(200).send("User updated successfully");
  }


  static async deleteUserById (req, res) {
    let userid = req.params.id;
    let reqbody = req.body;

    try {
      await userDataLayer.deleteUserById(userid , reqbody);
    }
    catch(err) {
      res.status(400).send(err.message);
      return;
    }
    res.status(200).send("User deleted successfully");
  }
}

module.exports = usersController;
