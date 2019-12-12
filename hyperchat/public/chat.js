const socket = io.connect('http://127.0.0.1:3000/');
const textbox = document.getElementById("textbox");
const messages = document.getElementById("messages");

const encode = (data) => {
	let d = JSON.stringify(data);
	let result = btoa(d);
	return result;
}

const decode = (data) => {
	let decoded = atob(data);
	let result = JSON.parse(decoded);
	return result;
}

const handleMessage = (msg) => {
	if(msg){
		if(msg.startsWith("!username")){
			let name = msg.split(" ")[1];
			console.log(encode({username: name}));
			socket.emit('change_username', {data: encode({username: name})});
		}else{
			// !flag
			socket.emit('new_message', {data: encode({message: msg, r: "ee11cbb19052e40b07aac0ca060c23ee"})});
		}
	}
}

const printMessage = (d) => {
	let data = decode(d.data);
	let msg = document.createElement('p');
	let txt = document.createTextNode(`${data.time} ${data.username}: ${data.message}`);
	msg.className = "message";
	msg.style.color = data.color;
	msg.appendChild(txt);
	messages.appendChild(msg);
	messages.scrollTop = messages.scrollHeight;
}

textbox.addEventListener('submit', (e) => {
	e.preventDefault();
	const formdata = new FormData(e.target);
	const msg = formdata.get("message");
	handleMessage(msg);
	e.target.reset();
});

/*
	Handling events from the server
*/

socket.on('message_recieved', data => {
	printMessage(data);
});

socket.on('server_message', d => {
	let data = decode(d.data);
	let msg = document.createElement('p');
	let txt = document.createTextNode(data.message);
	msg.className = "serverMessage";
	msg.appendChild(txt);
	messages.appendChild(msg);
	messages.scrollTop = messages.scrollHeight;
})

socket.on('message_log', data => {
	data.messages.forEach(message => {
		printMessage(message);
	});
});

socket.on('flag_found', d => {
	let data = decode(d.data);
	let msg = document.createElement('p');
	let txt = document.createTextNode(data.message);
	msg.className = "flagFound";
	msg.appendChild(txt);
	messages.appendChild(msg);
	messages.scrollTop = messages.scrollHeight;
})

socket.on('flag', d => {
	let data = decode(d.data);
	let msg = document.createElement('p');
	let txt = document.createTextNode(data.message);
	msg.className = "flag";
	msg.appendChild(txt);
	messages.appendChild(msg);
	messages.scrollTop = messages.scrollHeight;
})