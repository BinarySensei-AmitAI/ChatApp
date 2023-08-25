const socket = io('http://localhost:8000');

const form = document.getElementById('Form');
const messageInput = document.getElementById('messageInp');
const container = document.querySelector(".container");
var audio1 = new Audio('../sound/receive.mp3');
var audio2 = new Audio('../sound/send.mp3');

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} has joined the chat`, 'right');
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
});

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
    if(position =='left') {
        audio1.play();
    }
    else {
        audio2.play();
    }
}
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left', name=>{
    append(`${name} has left the chat`,'left');
})