const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const cors = require('cors');

const homeRouter = require('../src/routers/home/homeRouter');
const loginRouter = require('../src/routers/login/loginRouter');
const chatRouter = require('../src/routers/chat/chatRouter');

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

  // Routers
  app.use('/', homeRouter);
  app.use('/login', loginRouter);
  app.use('/chat', chatRouter);

  // Error Exception
  app.use(errorRouter);

  return app;
};
