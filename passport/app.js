const express = require('express');
const path = require('path');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB
const db = [
  { id: 'myid', pw: 'mypw', nickname: 'cloer' },
  { id: 'yourid', pw: 'yourpw', nickname: 'ploer' },
  { id: 'hisid', pw: 'hispw', nickname: 'qloer' },
  { id: 'hersid', pw: 'herspw', nickname: 'tloer' },
];
const userFinder = (column, what) => {
  try {
    const [user] = db.filter((user) => user[column] === what);
    return user;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// session
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'session_secret',
    store: new FileStore(),
  })
);

/**
 * Passport
 */
const passport = require('passport');
const LocalStrategy = require('passport-local');

// express에 passport 등록
app.use(passport.initialize());
// 요청의 쿠키의 connect.id로 세션 쿠키에서 id를 뽑아 deserializeUser로 전달
app.use(passport.session());

// 세션 스토어에 유저 식별자와 쿠키 쌍 저장(로그인시 한번 호출)
passport.serializeUser(function (user, cb) {
  console.log('---- serializeUser');
  cb(null, user.id);
});
// 로그인 한 후 쿠키를 세션과 대조해 유저 정보 꺼내기
passport.deserializeUser(function (id, cb) {
  console.log('---- deserializeUser');
  const user = userFinder('id', id);
  return user ? cb(null, user) : cb(null, false, console.log('no user'));
});

// 로그인 로직
passport.use(
  new LocalStrategy({ usernameField: 'id', passwordField: 'pw' }, (username, password, cb) => {
    console.log('---- LocalStrategy callback');
    const user = userFinder('id', username);
    if (user) {
      if (user.pw === password) return cb(null, user);
      else return cb(null, false, { message: 'Incorrected password' });
    } else return cb(null, false, { message: 'Incorrected ID' });
  })
);

/**
 * Router
 */

// middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else return res.redirect('/');
};
const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else return res.redirect('/');
};

app.post(
  '/auth/login',
  isNotLoggedIn,
  passport.authenticate('local', {
    // successRedirect: '/mypage',
    failureRedirect: '/login',
  }),
  (req, res) => {
    console.log('---- /auth/login callback');
    return res.redirect('/mypage');
  }
);

app.get('/auth/logout', isLoggedIn, (req, res) => {
  console.log('---- /auth/logout');
  req.logout();
  req.session.destroy();
  return res.redirect('/');
});
app.post('/auth/signin', isNotLoggedIn, (req, res) => {
  console.log('---- /auth/signin');
  const newUser = req.body;
  const redundancy = userFinder('id', newUser.id);
  if (redundancy) return res.redirect('/signin');
  db.push(newUser);
  return res.redirect('/login');
});

app.get('/login', isNotLoggedIn, (req, res) => {
  console.log('---- /login');
  res.locals.sginOrLog = 'login';
  return res.render('idpw');
});
app.get('/signin', isNotLoggedIn, (req, res) => {
  console.log('---- /signin');
  res.locals.sginOrLog = 'signin';
  return res.render('idpw');
});

app.get('/mypage', isLoggedIn, (req, res) => {
  console.log('---- /mypage');
  res.locals.user = req.user;
  return res.render('mypage');
});

app.get('/', (req, res) => {
  console.log('---- /');
  res.locals.isLoggedIn = !!req.user;
  res.locals.user = req.user;
  return res.render('index');
});

// Error exception
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found.`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).render('error');
});
app.listen(8080, () => console.log('Server is running port 8080'));
