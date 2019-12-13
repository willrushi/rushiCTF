const express = require('express');
const mongo = require('mongodb').MongoClient;
const app = express();
const CONNECTION_URL = "mongodb+srv://rushictf:rushictf@rushictf-v86kz.mongodb.net/test?retryWrites=true&w=majority";
let db; 
let collection;

app.use(express.static('public'));
app.use(express.urlencoded())

app.get("/", (req, res) => {
	res.sendFile('index.html')
});

app.post("/login", (req, res) => {
	console.log(req.body);
  
  let user;
  let password;
  
  try{
    if(req.body.username.startsWith("{")){
    user = JSON.parse(req.body.username);
    }else{
      user = req.body.username
    }

    if(req.body.password.startsWith("{")){
      password = JSON.parse(req.body.password);
    }else{
      password = req.body.password
    }
    collection.find({username: user, password: password}).toArray((err, result) => {
		if (err) res.status(500).send('Something broke!');
    	console.log(result);
      if(result[0]){
        if(result[0].username === "admin"){
          res.redirect("4573db5d49cb757ead2416ef26bd0cee.html")
        }else{
          res.redirect("/?loginfailed=true");
        }
      }else{
          res.redirect("/?loginfailed=true");
      }
	  });
  }catch(e){
    res.status(500).send('Something broke!')
  }
});

app.listen(3002, function() {
	mongo.connect(CONNECTION_URL, (err, client) => {
		if (err) return console.log(err);
		db = client.db('rushictf');
		collection = db.collection('users');
		console.log('Connected to mongodb');
	});
});
