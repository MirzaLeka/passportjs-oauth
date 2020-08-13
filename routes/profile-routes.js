const router = require('express').Router();
const isAuthenticated = require('../middlewares/is-authenticated');

// we protect this route from not logged in users
router.get('/', isAuthenticated, (req, res) => {
    // we can see this screen only if isAuthenticated is passed
    res.send('Profile page: ', req.user);
});

module.exports = router;
