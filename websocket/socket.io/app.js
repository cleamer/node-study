const app = require('./config/express')();

app.get('/', (req, res) => res.render('index'));

const expressServer = app.listen(app.get('port'), () => console.log('Socket.io chat server is running on port ' + app.get('port')));
