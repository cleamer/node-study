const router = require('express').Router();
const passport = require('passport');

router.post('/join', (req, res, next) => {});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.login(user, (err) => res.redirect('/'));
  })(req, res, next);
});

module.exports = router;
