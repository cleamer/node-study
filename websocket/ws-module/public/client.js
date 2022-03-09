const ws = new WebSocket('ws://localhost:8003');
ws.onopen = function () {
  console.log('connect!');
};
ws.onmessage = function (event) {
  console.log(event.data);
  ws.send('reply');
};
