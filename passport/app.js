const express = require('express');
const path = require('path');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Passport
var passport = require('passport');
var LocalStrategy = require('passport-local');

// express에 passport 등록
app.use(passport.initialize());

// passport가 세션 제어
app.use(passport.session());

// 세션 스토어에 유저 식별자와 쿠키 쌍 저장(로그인시 한번 호출)
passport.serializeUser(function (user, cb) {
  console.log('serializeUser');
  cb(null, user.id);
});
// 로그인 한 후 쿠키를 세션과 대조해 유저 정보 꺼내기
passport.deserializeUser(function (id, cb) {
  console.log('deserializeUser');
  const user = userFinder('id', id);
  return user ? cb(null, user) : cb(null, false, console.log('no user'));
});

// 로그인 로직
passport.use(
  new LocalStrategy({ usernameField: 'id', passwordField: 'pw' }, (username, password, cb) => {
    console.log('LocalStrategy callback');
    const user = userFinder('id', username);
    if (user) {
      if (user.pw === password) return cb(null, user);
      else return cb(null, false, { message: 'Incorrected password' });
    } else return cb(null, false, { message: 'Incorrected ID' });
  })
);

// 로그인 성공 혹은 실패 시 처리
app.post(
  '/auth/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (req, res) => {
    console.log('/post/login -> render mypage');
    res.locals.user = req.user;
    res.render('mypage');
  }
);
app.get('/auth/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/mypage', (req, res) => {
  res.locals.user = req.user;
  res.render('mypage');
});

app.get('/', (req, res) => {
  res.locals.isLoggedIn = !!req.user;
  res.locals.user = req.user;
  res.render('index');
});

app.listen(8080, () => console.log('Server is running port 8080'));
