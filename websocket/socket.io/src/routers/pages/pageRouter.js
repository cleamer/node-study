const router = require('express').Router();

router.get('/', (req, res) => res.render('home'));

router.get('/signin', (req, res) => res.render('signIn'));
router.get('/signup', (req, res) => res.render('signUp'));

router.get('/profile', (req, res) => res.render('profile'));

router.get('/chat/:chatId', (req, res) => res.send(`chatId: ${req.params.chatId}`));
router.get('/chat/', (req, res) => res.send('chat router'));

router.get('/chats/', (req, res) => res.render('chats'));

module.exports = router;
