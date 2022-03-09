const ws = new WebSocket('ws://localhost:8003/room');
ws.onopen = function () {
  console.log('room connect!');
};
ws.onmessage = function (event) {
  console.log(event.data);
  ws.send('room reply');
};
