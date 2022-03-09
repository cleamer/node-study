const ws = require('ws');

module.exports = (server) => {
  const wss = new ws.Server({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
      console.log(`message: ${message}`);
    });

    ws.on('error', (error) => console.error(error));

    ws.on('close', () => console.log('close'));

    ws.send('something');
  });
};
