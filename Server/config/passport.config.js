const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const saltRounds = 10;

// Local passport strategy is used to authenticating user and generating a token  
passport.use(new LocalStrategy({
usernameField: 'username',
passwordField: 'password',
}, async (username, password, done) => {
try {
    var userDocument = await userModel.findOne({username: username}).exec();
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    const passwordsMatch = await bcrypt.compare(userDocument.password, hash);
    if (passwordsMatch) {
    return done(null, userDocument);
    } else {
    return done('Incorrect Username / Password');
    }
} catch (error) {
    done(error);
}
}));

const opts = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'),
  secretOrKey : 'secretkey'
}

// JWT strategy is used to check if the same authentic user has sent the request, It returns if the user is not authenticated
passport.use(new JWTStrategy(opts, async (payload, done) => {
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
}))

