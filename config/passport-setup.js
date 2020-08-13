const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect', // custom made route
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
  }, (accessToken, refreshToken, profileData, done) => {

    // check if user exists in our db
    User.findOne({ googleId: profileData.googleId }).then((currentUser) => {
      if (currentUser) {

      } else {
        registerNewUser(profileData);
      }
    });

  })
)

function registerNewUser(data) {
  new User({
    username: data.displayName, // data coming from google API
    googleId: data.id
  }).save().then((newUser) => {
    console.log('new user creatred ', newUser);
  });
}
