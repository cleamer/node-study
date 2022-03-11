const ws = require('ws');

module.exports = (server, app) => {
  const wss = new ws.Server({ server });
  // for sending a rooms data when a new room is created
  // used at app.post('newroom') on app.js
  app.set('wss', wss);

  wss.on('connection', (ws, req) => {
    if (req.url === '/rooms') {
      ws.location = 'index';
      // get a data when into index
      ws.send(JSON.stringify(app.get('db').rooms));
    } else if (req.url.startsWith('/chat/')) {
      ws.location = req.url.split('/')[2];
      ws.on('message', (message) => {
        // send message to open sockets in my room without me
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN && client.location === ws.location) client.send(message.toString());
          // send message to
          // open sockets (client.readyState === ws.OPEN)
          // in my room (client.roomId === ws.roomId)
          // without me (client !== ws)
        });
      });
    }

    ws.on('error', (error) => {
      console.error(error);
      app.locals.message = error.message;
      app.locals.error = process.env.NODE_ENV !== ' production' ? error : {};
      app.render('error');
    });

    ws.on('close', () => console.log(`${req.url} connection close`));
  });
};
