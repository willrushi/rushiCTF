let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

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
	bounce(){

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
		this.components = [];
		this.start();
		this.upKey = false;
		this.downKey = false;
		this.startTimer = getTime();
		this.timer = 30;
		this.text = "";
	}

	start(){
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

	checkGameOver(){
		if(this.ball.x <= 0){
			this.text = ""
		}
	}

	
	update(){
		ctx.clearRect(0, 0, 1500, 800);

		this.timer = 30 - Math.floor((getTime() - this.startTimer) / 1000);

		this.text = "TIME LEFT: " + this.timer;
		console.log(this.text);

		
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

let game = new Game();