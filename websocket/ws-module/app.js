const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 8003);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || 'secret',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// dummy DB
app.set('db', new Array());

app.get('/', (req, res) => {
  res.locals.rooms = app.get('db');
  console.log(app.get('db'));
  return res.render('index');
});

app.get('/newroom', (req, res) => {
  return res.render('new');
});
app.post('/newroom', (req, res) => {
  const { title } = req.body;
  const cid = req.sessionID + Date.now();
  const db = app.get('db').push({ title, cid });

  return res.redirect(`/chat/${cid}`);
});
app.get('/chat/:cid', (req, res) => {
  const room = app.get('db').find((room) => room.cid === req.params.cid);
  res.locals.room = room;
  res.render('chat');
});

app.use((req, res, next) => {
  const notFoundError = new Error(`${req.method} ${req.url} NotFound`);
  notFoundError.status = 404;
  next(notFoundError);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== ' production' ? err : {};
  res.status(err.status || 500).render('error');
});

const expressServer = app.listen(app.get('port'), () => console.log('ws module server is running on port ' + app.get('port')));

// socket
require('./socket')(expressServer);
