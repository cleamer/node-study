const ws = require('ws');

module.exports = (server) => {
  const wss = new ws.Server({ server });

  wss.on('connection', (ws, req) => {
    if (req.url === '/room') {
      ws.on('message', (message) => {
        console.log(`room message: ${message}`);
      });

      ws.send('your in room!');
    } else if (req.url === '/chat') {
      ws.on('message', (message) => {
        console.log(`chat message: ${message}`);
      });
      ws.send('your in chat!');
    }

    ws.on('error', (error) => console.error(error));

    ws.on('close', () => console.log('close'));
  });
};
