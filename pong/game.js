const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const regex = /[ \n\r\t]/g

let getTime = () => {
	let d = new Date();
	return d.getTime();
}

class Component{
	constructor(width, height, x, y){
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.colour = "#FFFFFF";
	}
	draw(){
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class Paddle extends Component{
	constructor(width, height, x, y){
		super(width, height, x, y);
	}
	move(dir){
		if(dir == "up"){
			this.y += 10;
		}
		if(dir == "down"){
			this.y -= 10;
		}
	}
	getHeight(){
		return this.height;
	}
}

class Ball extends Component{
	constructor(width, height, x, y){
		super(width, height, x, y);
		this.xVel = -8;
		this.yVel = 8;
	}
	move(){
		this.x += this.xVel;
		this.y += this.yVel;
	}
}

class Game{
	constructor(){
		this.start();
	}

	start(){
		this.tick = 0;
		this.api = Math.random();
		this.lose = false;
		this.win = false;
		this.components = [];
		this.upKey = false;
		this.downKey = false;
		this.startTimer = getTime();
		this.timer = 30;
		this.text = "";
		this.player = new Paddle(30, 200, 50, canvas.height/2 - 75);
		this.enemy = new Paddle(30, 200, (canvas.width - 80), canvas.height/2 - 75);
		this.ball = new Ball(30, 30, canvas.width/2, canvas.height/2);
		this.components.push(this.player, this.enemy, this.ball);

		document.addEventListener('keydown', (e) => {
			if(e.keyCode == 40){
				this.upKey = true;
			}
			if(e.keyCode == 38){
				this.downKey = true;
			}
		});
		document.addEventListener('keyup', (e) => {
			if(e.keyCode == 40){
				this.upKey = false;
			}
			if(e.keyCode == 38){
				this.downKey = false;
			}
		});

		requestAnimationFrame(() => this.update());
	}

	checkCollision(){
		if(this.ball.y <= 0){
			this.ball.yVel *= -1;
		}
		if(this.ball.y + this.ball.height >= canvas.height){
			this.ball.yVel *= -1;
		}
		if(this.ball.x < (50 + this.player.width/2 + this.ball.width/2) && this.ball.x > (this.player.width/2 + this.ball.width/2)){
			if(this.ball.y + this.ball.height > this.player.y && this.ball.y < this.player.y + this.player.height){
				this.ball.xVel *= -1.15;
			}
		}
		if(this.ball.x > (canvas.width - 80 - this.enemy.width/2 - this.ball.width/2)){
			if(this.ball.y + this.ball.height > this.enemy.y && this.ball.y < this.enemy.y + this.enemy.height){
				this.ball.xVel *= -1.15;
			}
		}
	}

	_0x195F2B(t){
		return md5(t);
	}

	_0x49F92A(){
		if(Math.abs(this.ball.xVel) > 3){
			let a = [this.start, this.checkCollision, this.checkWin, this.checkGameOver, this.player.height, this.enemy.height, this.ball.width, this.ball.height, this.update, Math.floor(this._0x10F10FAB)];
			let c = "";
			a.forEach(b => {
				c += b.toString();
			})
			c = c.replace(regex, "");
			return(this._0x195F2B(c));
		}	
	}

	_0x99FA91B(){
		console.log("Grabbing key...");
		return new Promise((resolve, reject) => {
			fetch("/key", {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"key":this._0x12F1BB})
			})
			.then(res=>res.json())
			.then(res => {
				resolve(res.response);
			});
		});
	}

	fetchTime(){
		return new Promise((resolve, reject) => {
			fetch("/time", {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"apiKey":this.api})
			})
			.then(res=>res.json())
				.then(res => {
					resolve(res.time);
				});
		});
	}

	checkWin(){
		this.fetchTime()
			.then(res => {
				if(res < 1){
					this._0x10F10FAB = res;
					this._0x12F1BB = this._0x49F92A();
					this._0x99FA91B()
						.then(f => {
							console.log("Flag: " + f);
							this.win = true;
							ctx.fillStyle = "#FFFFFF";
							ctx.font = "25px Arial";
							ctx.textAlign = "center";
							ctx.fillText(f, canvas.width/2, canvas.height/2);		
						})
				}
			})
		
	}

	checkGameOver(){
		if(this.ball.x <= 0){
			this.text = ""
		}
	}

	checkLose(){
		if(this.ball.x < -15){
			this.lose = true;
			ctx.fillStyle = "#FFFFFF";
			ctx.font = "50px Arial";
			ctx.textAlign = "center";
			ctx.fillText("You lost :( Press space to try again.", canvas.width/2, canvas.height/2);
			document.addEventListener('keydown', (e) => {
				if(e.keyCode == 32){
					location.reload();
				}
			})
		}
	}

	
	update(){
		this.tick++;
		if(this.tick % 60 == 0){
			this.checkWin();
		}
		this.checkLose();
		if(this.lose === true){

		}else if(this.win === false){
			ctx.clearRect(0, 0, 1500, 800);

			this.timer = 30 - Math.floor((getTime() - this.startTimer) / 1000);
	
			this.text = "TIME LEFT: " + this.timer;	
			
			ctx.fillStyle = "#FFFFFF";
			ctx.font = "50px Arial";
			ctx.textAlign = "center";
			ctx.fillText(this.text, canvas.width/2, 50);	
	
			this.components.forEach(c => c.draw());

			
	
			this.enemy.y = this.ball.y;
	
			this.ball.move();
	
			this.checkCollision();
	
			if(this.upKey){
				this.player.move("up");
			}
			if(this.downKey){
				this.player.move("down");
			}
			requestAnimationFrame(() => this.update());
		}
	}
}

let game = new Game();
