const router = require('express').Router();

router.get('/:chatId', (req, res) => res.send(`chatId: ${req.params.chatId}`));
router.get('/', (req, res) => res.send('chat router'));

module.exports = router;
