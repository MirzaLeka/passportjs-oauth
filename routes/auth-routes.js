const router = require('express').Router();

router.get('/login', (req, res) => {
  res.send('login page');
});

routet.get('/logout', (req, res) => {
  res.send('loggint out');
});

router.get('/google', (req, res) => {
  res.send('logging with google');
});

module.exports = router;
