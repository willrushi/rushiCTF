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

const getCookie = (cname) => {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }

const handleMessage = (msg) => {
	if (msg) {
		if (msg.startsWith("!username")) {
			let name = msg.split(" ")[1];
			console.log(encode({
				username: name
			}));
			socket.emit('change_username', {
				data: encode({
					username: name
				})
			});
		}else if (msg.startsWith("!colour")) {
			let colour = msg.split(" ")[1];
			socket.emit('set_colour', {
				data: encode({
					colour: colour
				})
			});
		} else {
			// !flag
			socket.emit('new_message', {
				data: encode({
					message: msg,
					r: "ee11cbb19052e40b07aac0ca060c23ee"
				})
			});
		}
	}
}

const printMessage = (data) => {
	let msg = document.createElement('p');
	let time = document.createElement('span');
	let timeTxt = document.createTextNode(`${data.time} `);
	time.appendChild(timeTxt);
	let uname = document.createElement('span');
	let unameTxt = document.createTextNode(`${data.username}: `);
	uname.appendChild(unameTxt);
	let message = document.createElement('span');
	let messageTxt = document.createTextNode(`${data.message}`);
	message.appendChild(messageTxt);
	msg.appendChild(time);
	msg.appendChild(uname);
	msg.appendChild(message);

	msg.className = "message";
	uname.style.color = data.colour;

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


if(getCookie('username')){
	socket.emit('set_username', {data: encode({username: getCookie('username')})});
}

/*
	Handling events from the server
*/

socket.on('message_recieved', d => {
	let data = decode(d.data);
	printMessage(data);
});

socket.on('set_username', d => {
	let data = decode(d.data);
	document.cookie = "username=" + data.username;
})

socket.on('server_message', d => {
	let data = decode(d.data);
	let msg = document.createElement('p');
	let txt = document.createTextNode(data.message);
	msg.className = "serverMessage";
	msg.appendChild(txt);
	messages.appendChild(msg);
	messages.scrollTop = messages.scrollHeight;
})

socket.on('message_log', d => {
	data = decode(d.data);
	console.log(data);
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