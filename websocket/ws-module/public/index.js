const roomList = document.getElementById('room_list');
const drawRooms = (rooms) => {
  roomList.innerHTML = '';
  rooms.reduce((tbody, { title, roomId }) => {
    console.log(tbody);
    const tr = document.createElement('tr');
    const tdTitle = document.createElement('td');
    tdTitle.innerText = title;
    const tdJoin = document.createElement('td');
    const form = document.createElement('form');
    form.action = `/chat/${roomId}`;
    form.method = 'get';
    const button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Join';

    form.appendChild(button);
    tdJoin.appendChild(form);
    tr.append(tdTitle, tdJoin);
    tbody.appendChild(tr);
    return tbody;
  }, roomList);
};

const ws = new WebSocket('ws://localhost:8003/rooms');
ws.onopen = function () {
  console.log('rooms connect!');
};
ws.onmessage = function (event) {
  console.log(`rooms connection sent message: ${event.data}`);
  const rooms = JSON.parse(event.data);
  drawRooms(rooms);
};
