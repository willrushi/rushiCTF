const socket = io.connect('http://localhost:3000/');
const textbox = document.getElementById("textbox");
const messages = document.getElementById("messages");

const handleMessage = (msg) => {
	socket.emit('new_message', {message: msg});
	if(msg.startsWith("!username")){
		let name = msg.split(" ")[1];
		socket.emit('change_username', {username: name});
	}
}

textbox.addEventListener('submit', (e) => {
	e.preventDefault();
	const formdata = new FormData(e.target);
	const msg = formdata.get("message");
	handleMessage(msg);
});

socket.on('message_recieved', data => {
	console.log(data);
	let msg = document.createElement('p');
	let txt = document.createTextNode(`${data.username}: ${data.message}`);
	msg.className = "message";
	msg.appendChild(txt);
	messages.appendChild(msg);
	messages.scrollTop = messages.scrollHeight;
});

socket.on('username_changed', data => {
	let msg = document.createElement('p');
	let txt = document.createTextNode(data.message);
	msg.className = "usernameChanged";
	msg.appendChild(txt);
	messages.appendChild(msg);
	messages.scrollTop = messages.scrollHeight;
})