
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const socket = io();


const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')
//retrive username and room id 
const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix: true});
socket.emit('joinRoom',{ username,  room});

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});


//recieving from server
socket.on('message', function (data) {
    console.log(data);
    outputToChat(data);

    // chatMessages.scrollTop = chatMessages.scrollHeight;
    //auto scroll down to bottom

});

//sumbit message
chatForm.addEventListener('submit', function (e) {
e.preventDefault();

const msg = e.target.elements.msg.value;
socket.emit('chatMessage',msg); //emit from client to server
e.target.elements.msg.value = '';
e.target.elements.msg.focus();
});

function outputToChat(message) {
  const div = document.createElement('div');
  div.classList.add('message'); //adding a class to div
  div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p>
  <p class="text">${message.text}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}


document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});