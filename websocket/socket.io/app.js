const app = require('./config/express')();

const expressServer = app.listen(app.get('port'), () => console.log('Socket.io chat server is running on port ' + app.get('port')));
