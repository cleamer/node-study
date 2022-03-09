const ws = new WebSocket('ws://localhost:8003/chat');
ws.onopen = function () {
  console.log('chat connect!');
};
ws.onmessage = function (event) {
  console.log(event.data);
  ws.send('chat reply');
};
