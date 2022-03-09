const ws = require('ws');

module.exports = (server) => {
  const wss = new ws.Server({ server });

  wss.on('connection', (ws, req) => {
    if (req.url === '/room') {
      ws.on('message', (message) => {
        console.log(`room message: ${message}`);
      });
      ws.send('your in room!');
    } else if (req.url.startsWith('/chat/')) {
      ws.roomId = req.url.split('/')[2];
      ws.on('message', (message) => {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN && client.roomId === ws.roomId) client.send(message.toString());
        });
      });
    }

    ws.on('error', (error) => console.error(error));

    ws.on('close', () => {
      console.log('close');
    });
  });
};
