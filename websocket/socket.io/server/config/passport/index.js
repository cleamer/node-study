const passport = require('passport');
const local = require('./localStrategy');
const google = require('./googleStrategy');

module.exports = () => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    //   User.findOne({
    //     where: { id },
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['id', 'nick'],
    //         as: 'Followers',
    //       },
    //       {
    //         model: User,
    //         attributes: ['id', 'nick'],
    //         as: 'Followings',
    //       },
    //     ],
    //   })
    //     .then((user) => done(null, user))
    //     .catch((err) => done(err))
  });

  local();
  //google();

  return passport;
};
