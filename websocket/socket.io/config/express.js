require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const cors = require('cors');
const passportConfig = require('./passport');
const passport = passportConfig();

// Routers
const pageRouter = require('../src/routers/pages/pageRouter');
const authRouter = require('../src/routers/auth/authRouter');

// Error Exception
const errorRouter = require('../src/routers/error/errorRouter');

module.exports = function () {
  const app = express();

  app.set('port', process.env.PORT || 8004);
  app.set('views', path.join(process.cwd(), 'views'));
  app.set('view engine', 'pug');

  app.use(morgan('dev'));
  // app.use(cors());
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      store: new FileStore(),
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Routers
  app.use('/', pageRouter);
  app.use('/auth', authRouter);

  // Error Exception
  app.use(errorRouter);

  return app;
};
