const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
	res.render('index');
})

server = app.listen(3000)

const io = require("socket.io")(server);

io.on('connection', (socket) => {
	console.log("new user connected");
	socket.username = "Anonymous";
	console.log(`Username set to ${socket.username}.`);
	console.log(socket.id);

	socket.on('new_message', data => {
		console.log(data);
		io.sockets.emit('message_recieved', {username: socket.username, message: data.message});
	});

	socket.on('change_username', (data) => {
		console.log(`${socket.username} changing to ${data.username}.`)
		socket.username = data.username;
		socket.emit('username_changed', {message: `Username changed to ${socket.username}.`});
	});

	socket.on('disconnect', () => {
		console.log(`${socket.username} | ${socket.id} disconnected.`)
	})
});