const chatBox = document.getElementById('chats');
const addChat = (message, didIsend) => {
  const row = document.createElement('div');
  row.classList.add('chat');
  row.classList.add(didIsend ? 'mychat' : 'yourchat');
  const text = document.createElement('div');
  text.classList.add('text');
  text.innerText = message;
  row.append(text);
  chatBox.append(row);
  chatBox.scrollTop = chatBox.scrollHeight;
};

const pathname = window.location.pathname; // '/chat/:roomId'
const ws = new WebSocket(`ws://localhost:8003${pathname}`);
ws.onopen = function () {
  console.log('chat connect!');
};
ws.onmessage = function (event) {
  const message = event.data;
  console.log('chat connection message: ' + message);
  addChat(message, false);
};

const type = document.getElementById('type');
const input = type.childNodes[0];
type.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value;
  ws.send(message);
  input.value = '';
  addChat(message, true);
});
