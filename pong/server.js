const express = require('express');
const cors = require('cors');
const app = express();
const port = 8125;
const path = require("path");

app.use(express.json());
app.use(cors());
let activeSessions = {};

let getTime = () => {
	let d = new Date();
	return d.getTime();
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.get('/md5.js', (req, res) => res.sendFile(path.join(__dirname + '/md5.js')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname + '/script.js')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname + '/style.css')));




app.post('/time', (req, res) => {
  if(req.body.apiKey in activeSessions){
    let time = 30 - Math.floor((getTime() - activeSessions[req.body.apiKey]) / 1000);
    res.send(JSON.stringify({"time":time}));
  }else{
    activeSessions[req.body.apiKey] = getTime();
    res.send(getTime);
    console.log("added " + req.body.apiKey + " to table");
  }
})
app.post('/key', (req, res) => {
    console.log(req.body);
    if(req.body.key == "724f09e86481b7f9d8e2074c1a9627cf"){
        res.send(JSON.stringify({"response":"Well done! FLAG{h4sh3d_j5_1s_s3cur3}"}));
    }else{
        res.send(JSON.stringify({"response":"Do you think I wouldn't know that you tampered with my js?"}));
    }
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
