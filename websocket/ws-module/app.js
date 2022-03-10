const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const { WebSocketServer } = require('ws');

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
  return res.render('index');
});

app.get('/newroom', (req, res) => {
  return res.render('new');
});
app.post('/newroom', (req, res) => {
  const { title } = req.body;
  const roomId = req.sessionID + Date.now();
  app.get('db').push({ title, roomId });

  // 채팅방 새로 생성시 홈에 있는 사람들에게 새로은 방 목록 전송
  // TODO: 본인은 왜 제외될까?
  app.get('wss').clients.forEach((client) => {
    if (client.location === 'index') client.send(JSON.stringify(app.get('db')));
  });
  return res.redirect(`/chat/${roomId}`);
});
app.get('/chat/:roomId', (req, res) => {
  const { title } = app.get('db').find((room) => room.roomId === req.params.roomId);
  res.locals.title = title;
  res.render('chat');
});

// Error Exeption
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
require('./socket')(expressServer, app);
