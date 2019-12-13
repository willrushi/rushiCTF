const express = require('express');
const mongo = require('mongodb').MongoClient;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded())

app.get("/", (req, res) => {
	res.sendFile('index.html')
});

app.post("/login", (req, res) => {
	console.log(req.body);
});

mongo.connect('link', (err, db) => {
	
	
	app.listen(3002, function() {
		console.log('listening on 3000');
	});
});
