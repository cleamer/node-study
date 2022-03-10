const ws = require('ws');

module.exports = (server, app) => {
  const wss = new ws.Server({ server });
  app.set('wss', wss); // 새로 채팅방 생성시 express router에서 사용하기 위해

  wss.on('connection', (ws, req) => {
    if (req.url === '/room') {
      ws.location = 'index';
      // home으로 돌아올 때 본인만 데이터 받기
      wss.clients.forEach((client) => {
        if (client === ws && client.readyState === ws.OPEN && client.location === 'index') {
          client.send(JSON.stringify(app.get('db').rooms));
        }
      });
    } else if (req.url.startsWith('/chat/')) {
      ws.location = req.url.split('/')[2];
      ws.on('message', (message) => {
        // 같은 채팅방의 본인을 제외한 사람에게 채팅 전송
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN && client.location === ws.location) client.send(message.toString());
          // send message to
          // client.readyState === ws.OPEN: open sockets
          // client.roomId === ws.roomId: in my room
          // client !== ws: without me
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
