const express = require("express");
const app = express();
const robots = require('express-robots-txt');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(robots({
	UserAgent: '*',
	Disallow: '/c1f42a77c946733e6a6672ac04e3e3f9'
}));

app.get("/", (req, res) => {
	res.render('index');
})

app.get("/c1f42a77c946733e6a6672ac04e3e3f9", (req, res) => {
	res.send("!c1f42a77c946733e6a6672ac04e3e3f9");
})

server = app.listen(3000)

const io = require("socket.io")(server);

const atob = (str) => {
	let buff = new Buffer(str, 'base64');
	let result = buff.toString('ascii');
	return result;
}

const btoa = (str) => {
	let result = Buffer.from(str).toString('base64');
	return result;
}

const decode = (input) => {
	let decoded = atob(input);
	let result = JSON.parse(decoded);
	return result;
}

const encode = (input) => {
	let d = JSON.stringify(input);
	let result = btoa(d);
	return result;
}

// Stores 20 messages in a backlog
let messageLog = [];

io.on('connection', (socket) => {
	// Emitted on user connection
	socket.username = "Anonymous";
	console.log(`${socket.username} | ${socket.id} connected.`);
	socket.emit('message_log', {
		data: encode({
			messages: messageLog
		})
	});

	socket.on('set_colour', (d) => {
		let data = decode(d.data);
		let regex = /^[a-fA-F0-9]{6}$/;
		console.log(data.colour);
		console.log(regex.test(data.colour));
		if(regex.test(data.colour)){
			socket.emit('server_message', {data: encode({message: `Changed chat colour to #${data.colour}.`})})
			socket.colour = "#" + data.colour;
		}else{
			socket.emit('server_message', {data: encode({message: "Invalid colour. Please use 6 hex characters."})})
		}
	})

	socket.on('set_username', (d) => {
		let data = decode(d.data);
		console.log(`${socket.username} changing to ${data.username}.`)
		socket.username = data.username;
		socket.emit('set_username', {data: encode({username: data.username})});
		io.sockets.emit('server_message', {
			data: encode({
				message: `${socket.username} joined.`
			})
		});
	})

	socket.on('change_username', (d) => {
		let data = decode(d.data);
		console.log(`${socket.username} changing to ${data.username}.`)
		io.sockets.emit('server_message', {
			data: encode({
				message: `${socket.username} changed name to ${data.username}.`
			})
		});
		socket.username = data.username;
		socket.emit('set_username', {data: encode({username: data.username})});
	});

	socket.on('new_message', d => {
		if (socket.username === "Anonymous") {
			socket.emit('server_message', {
				data: encode({
					message: "Please assign a username with the !username command."
				})
			})
		} else {


			data = decode(d.data);
			let time = new Date();

			if (data.message === "!flag") {
				if (data.r === "21232f297a57a5a743894a0e4a801fc3") {
					socket.emit('flag', {
						data: encode({
							message: "You found the admin flag! FLAG{4dm1n_p0w3rs}"
						})
					});
					io.sockets.emit('flag_found', {
						data: encode({
							message: `************${socket.username} found a flag!************`
						})
					});
				} else {
					socket.emit('server_message', {
						data: encode({
							message: "You must be an admin to use that command."
						})
					});
				}
			} else if (data.message == "!c1f42a77c946733e6a6672ac04e3e3f9") {
				socket.emit('flag', {
					data: encode({
						message: "You found the robot flag! FLAG{r0b0t5_4r3_p30pl3_t00}"
					})
				});
				io.sockets.emit('flag_found', {
					data: encode({
						message: `************${socket.username} found a flag!************`
					})
				});
			} else {
				// Message backlog
				if (messageLog.length > 19) {
					messageLog = messageLog.slice(1, messageLog.length)
				}
				messageLog.push({
					username: socket.username,
					message: data.message,
					time: time.toTimeString().substr(0, 5),
					colour: socket.colour
				});

				io.sockets.emit('message_recieved', {
					data: encode({
						username: socket.username,
						message: data.message,
						time: time.toTimeString().substr(0, 5),
						colour: socket.colour
					})
				});
			}
		}
	});





	socket.on('disconnect', () => {
		io.sockets.emit('server_message', {
			data: encode({
				message: `${socket.username} has left the chat.`
			})
		})
		console.log(`${socket.username} | ${socket.id} disconnected.`)
	})
});