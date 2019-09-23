"use strict";
const passport = require('passport');
var jwt = require('jsonwebtoken');
const passportConfig = require('../config/passport.config');
const dbConfig = require('../config/default');
/**
 * Class representing auth controller
 *
 * @class authController
 */
class authController {

  static login (req, res , next) {
      passport.authenticate('local', function(err, user, info) {
          if(err) {
              return next(err);
          }
          if (!user) { 
            return res.json( { message: info.message }) 
          }

          const payload = {
              username: user.username,
              expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
            };
      
            /** assigns payload to req.user */
            req.login(payload, {session: false}, (error) => {
              if (error) {
                res.status(400).send({ error });
              }
      
              /** generate a signed json web token and return it in the response */
              const token = jwt.sign(JSON.stringify(payload), dbConfig.passport.secret);

              res.json({token});
      
      });
  })(req,res, next);
  }


  // this function has to be called for protected requests of a user    
  static protectedRequest (req,res,next) {
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
      if(!user) {
        return res.status(401).send(info.message); // 401 status code is unauthorized user.
      }
      res.send(user)
    })(req,res, next)
    
  }
}

module.exports = authController;