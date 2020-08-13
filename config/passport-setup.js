const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect', // custom made route
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
  }, (accessToken, refreshToken, profileData, done) => {

  })
)
