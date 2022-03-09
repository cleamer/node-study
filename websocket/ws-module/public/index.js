const ws = new WebSocket('ws://localhost:8003/room');
ws.onopen = function () {
  console.log('room connect!');
};
ws.onmessage = function (event) {
  console.log(`room sent message: ${event.data}`);
  // ws.send('room reply');
};
