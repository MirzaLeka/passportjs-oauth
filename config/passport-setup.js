const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

// is invoked with done and ID is sent to the client
passport.serializeUser((user, done) => {
  done(null, user.id); // first param is error
});

// ID is sent from the client upon every request
passport.deserializeUser((id, done) => {

    // check if user with given id exist in db
  User.findById(id).then(user => {
    // attaching the user we find to req.user to redirect route
    done(null, user);
  });

});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect', // custom made route
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
  }, (accessToken, refreshToken, profileData, done) => {

    // check if user exists in our db
    User.findOne({ googleId: profileData.googleId }).then(currentUser => {
      if (currentUser) {
        done((e) => {
          if (e) {
            console.log(e);
          }
        }, currentUser);
      } else {
        registerNewUser(profileData, done);
      }
    });

  })
)

function registerNewUser(data, done) {
  new User({
    username: data.displayName, // data coming from google API
    googleId: data.id
  }).save().then((newUser) => {

    done((e) => {
      if (e) {
        console.log(e);
      }
     }, newUser);

  });
}
