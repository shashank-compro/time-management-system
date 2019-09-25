const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const dbConfig = require('../config/default');

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  }, async (email, password, done) => {
  try {
      var userDocument = await userModel.findOne({email: email}).exec();
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
  secretOrKey : dbConfig.passport.secret
}

const jwtStrategy = new JWTStrategy(JWTStrategyOptions, async (payload, done) => {
  try { 
    // var userDocument = await userModel.findOne({ "username": payload.username });
    if(!userDocument) {
      return done(null, false)
    }
    return done(null, true); //  returning true if the user exists
  }
  catch(error) {
      return done(error, false);
  }
});

// JWT strategy is used to check if the same authentic user has sent the request, It returns if the user is not authenticated
passport.use(jwtStrategy);

