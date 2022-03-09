const pathname = window.location.pathname;
const ws = new WebSocket(`ws://localhost:8003${pathname}`);
ws.onopen = function () {
  console.log('chat connect!');
};
ws.onmessage = function (event) {
  const message = event.data;
  console.log(`chat sent message: ${message}`);
};

const type = document.getElementById('type');
const input = type.childNodes[0];
type.addEventListener('submit', (e) => {
  e.preventDefault();
  ws.send(input.value);
  input.value = '';
});
