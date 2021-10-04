
const socket = io('https://');
// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var d = new Date();
showmessages();
var audio = new Audio('../ting.mp3');





document.querySelector('emoji-picker').addEventListener('emoji-click', function (Event) {
    console.log(Event.detail)
    let emojimes = Event.detail.unicode;
    messageInput.value += emojimes;
})


// Function which will append event info to the contaner
const append = (nam, messag, positio) => {
    console.log("append called")
    if (messag.length === 0) {
        alert("you can't send emty message")
    }
    else {
        let messageElement1 = document.createElement('div');
        messageElement1.innerHTML = `<p class='message-head'> ${nam}</p>`;
        let chk = messag.toLowerCase();
        if (chk.startsWith('1') ||chk.startsWith('2') ||chk.startsWith('3') ||chk.startsWith('4') ||chk.startsWith('5') ||chk.startsWith('6') ||chk.startsWith('7') ||chk.startsWith('8') ||chk.startsWith('9') ||chk.startsWith('0') || chk.startsWith('a') ||chk.startsWith('b') ||chk.startsWith('c') ||chk.startsWith('d') ||chk.startsWith('e') ||chk.startsWith('f') ||chk.startsWith('g') ||chk.startsWith('h') ||chk.startsWith('i') ||chk.startsWith('j') ||chk.startsWith('k') ||chk.startsWith('l') ||chk.startsWith('m') ||chk.startsWith('n') ||chk.startsWith('o') ||chk.startsWith('p') ||chk.startsWith('q') ||chk.startsWith('r') ||chk.startsWith('s') ||chk.startsWith('t') ||chk.startsWith('u') ||chk.startsWith('v') ||chk.startsWith('w') ||chk.startsWith('x') ||chk.startsWith('y') ||chk.startsWith('z') == true) {
            messageElement1.innerHTML += `<div class="message-main"><h4 class="message-content"> ${messag}</h4> <p class="time"> ${d.getHours()}:${d.getMinutes()}</p></div>`;
        }
        else {
            messageElement1.innerHTML += `<div class="message-main"><h4 class="messageemoji"> ${messag}</h4> <p class="time"> ${d.getHours()}:${d.getMinutes()}</p></div>`;
        }
        
        
        messageElement1.classList.add('message');
        messageElement1.classList.add(positio);
        let bot = document.querySelector('#botto')

        messageContainer.insertBefore(messageElement1, bot);
		if(positio =='left'){ 
            audio.play();
        }
        let messages = localStorage.getItem('message');

        if (messages == null) {
            messageodj = [];
        }
        else {
            messageodj = JSON.parse(messages);
        }

        let newmessage = {
            message: messag,
            name: nam,
            position: positio,
            time: `${d.getHours()}:${d.getMinutes()}`
        }
        messageodj.push(newmessage);
        localStorage.setItem('message', JSON.stringify(messageodj));
        console.log(localStorage.getItem('message'))
		
    }
}
function showmessages() {
    let messages = localStorage.getItem('message');
    if (messages == null) {
        messageodj = [];
    }
    else {
        messageodj = JSON.parse(messages);
    }

    messageodj.forEach(function (element) {

        console.log(element.message)
        let messageElement = document.createElement('div');
        messageElement.innerHTML = `<p class='message-head'> ${element.name}</p>`;
        let chk = element.message.toLowerCase();
        if (chk.startsWith('1')||chk.startsWith('2') ||chk.startsWith('3') ||chk.startsWith('4') ||chk.startsWith('5') ||chk.startsWith('6') ||chk.startsWith('7') ||chk.startsWith('8') ||chk.startsWith('9') ||chk.startsWith('0') ||chk.startsWith('a') ||chk.startsWith('b') ||chk.startsWith('c') ||chk.startsWith('d') ||chk.startsWith('e') ||chk.startsWith('f') ||chk.startsWith('g') ||chk.startsWith('h') ||chk.startsWith('i') ||chk.startsWith('j') ||chk.startsWith('k') ||chk.startsWith('l') ||chk.startsWith('m') ||chk.startsWith('n') ||chk.startsWith('o') ||chk.startsWith('p') ||chk.startsWith('q') ||chk.startsWith('r') ||chk.startsWith('s') ||chk.startsWith('t') ||chk.startsWith('u') ||chk.startsWith('v') ||chk.startsWith('w') ||chk.startsWith('x') ||chk.startsWith('y') ||chk.startsWith('z') == true) {
            messageElement.innerHTML += `<div class="message-main"><h4 class="message-content"> ${element.message}</h4> <p class="time"> ${element.time}</p></div>`;
        }
        else {
            messageElement.innerHTML += `<div class="message-main"><h4 class="messageemoji"> ${element.message}</h4> <p class="time"> ${element.time}</p></div>`;
        }
        let bot = document.querySelector('#botto');
        messageElement.classList.add('message');
        messageElement.classList.add(element.position);
        console.log(messageElement);
        messageContainer.insertBefore(messageElement, bot);
    });

}

var user55 = localStorage.getItem('username')
// Ask new user for his/her name and let the server know
console.log(user55)

if (user55 == null) {
    var name = prompt("Enter your name to join");
    localStorage.setItem('username', name)
}
else {
    var name = user55;
}
socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name => {
    append(`${name}`, "joined the chat", 'left')
})

// If server sends a mess1age, receive it
socket.on('receive', data => {
    append(data.name, data.message, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name => {
    append(`${name}`, "left the chat", 'left')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    console.log('submited')
    e.preventDefault();
    const message = messageInput.value;
    append('', message, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
//localStorage.removeItem('username');