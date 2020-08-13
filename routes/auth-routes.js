const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.send('login page');
});

routet.get('/logout', (req, res) => {
  req.logout(); // passport destroy the cookie for us
  res.redirect('/');
});

// opens log in with google screen
router.get('/google', passport.authenticate('google', {
  scope: ['profile'] // user information that google API will return
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(`Logged in as ${req.user}`);
  // res.redirect('profile'); // this route will also have access to req.ueer
});

module.exports = router;
