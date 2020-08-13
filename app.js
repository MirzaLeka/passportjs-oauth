require('dotenv').config()
require('./config/passport-setup');
require('./db/mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passport = require('passport');

const app = express();
const oneDay = 24 * 36 * 100_000;

// set up view engine
app.set('view engine', 'ejs');

// this invoked when serializing users and cookie is sent to client
app.use(cookieSession({
  maxAge: oneDay,
  keys: [process.env.cookieKey] // secret key
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
   res.send('hello world');
});

app.listen(3000, () => console.log('listenin on port 3000'));
