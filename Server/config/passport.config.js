const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

const localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  }, async (username, password, done) => {
  try {
      var userDocument = await userModel.findOne({username: username}).exec();
      const passwordsMatch = await bcrypt.compare(password, userDocument.password);
      if (passwordsMatch) {
        return done(null, userDocument);
      } 
      else {
        return done('Incorrect Username / Password');
      }
    } 
  catch (error) {
      done(error);
  }
});

// Local passport strategy is used to authenticating user and generating a token  
passport.use(localStrategy);

// JWT Strategy options to be used in passport JWTStrategy
const JWTStrategyOptions = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'),
  secretOrKey : 'secretkey'
}

const jwtStrategy = new JWTStrategy(JWTStrategyOptions, async (payload, done) => {
  try {
    var userDocument = await userModel.findOne({ "username": payload.username });
    console.log(userDocument);
    if(!userDocument) {
      return done(null, false)
    }
    return done(null, userDocument);
  }
  catch(error) {
      return done(error, false);
  }
});

// JWT strategy is used to check if the same authentic user has sent the request, It returns if the user is not authenticated
passport.use(jwtStrategy);

