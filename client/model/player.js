const Player = function(id, username, team) {
	this.id = id;
	this.username = username;
	this.team = team;
	this.connection = true;
	this.score = 0;
	this.x = 10;
	this.y = 10;
	this.r = 17;
	this.speed = 0.2;
	this.maxSpeed = 2.5;
	this.dirX = 0;
	this.dirY = 0;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.draw = () => {
		if(this.team=='TEAM_A'){
			context.fillStyle = '#ff5a5a';
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			context.fill();
		} else if(this.team=='TEAM_B'){
			context.fillStyle = '#5a5aff';
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			context.fill();
		};
	};
	this.onKeyDown = function(key){
		if(key==37 || key==65){
			this.left = true;
		};
		if(key==39 || key==87){
			this.right = true;
		};
		if(key==38 || key==68){
			this.up = true;
		};
		if(key==40 || key==83){
			this.down = true;
		};
	};
	this.onKeyUp = function(key){
		if(key==37 || key==65){
			this.left = false;
			// this.dirX = 0;
		};
		if(key==39 || key==87){
			this.right = false;
			// this.dirX = 0;
		};
		if(key==38 || key==68){
			this.up = false;
			// this.dirY = 0;
		};
		if(key==40 || key==83){
			this.down = false;
			// this.dirY = 0;
		};
	};
	this.move = () => {
		this.x += this.dirX;
		this.y += this.dirY;
		if(this.team=='TEAM_A'){
			if(this.x - this.r < PITCH.sideA.width){
				this.dirX = this.maxSpeed;
			};
			if(this.x + this.r > CANVAS.width){
				this.dirX = -this.maxSpeed;
			};
		} else if(this.team=='TEAM_B'){
			if(this.x - this.r < CANVAS.x){
				this.dirX = this.maxSpeed;
			};
			if(this.x + this.r > PITCH.sideB.x){
				this.dirX = -this.maxSpeed;
			};
		};
		if(this.y - this.r < CANVAS.y){
			this.dirY = this.maxSpeed;
		};
		if(this.y + this.r > CANVAS.height){
			this.dirY = -this.maxSpeed;
		};
		
		// dir increments
		if(this.left){
			if(this.dirX > -this.maxSpeed){
				this.dirX -= this.speed;
			};
		};
		if(this.right){
			if(this.dirX < this.maxSpeed){
				this.dirX += this.speed;
			};
		};
		if(this.up){
			if(this.dirY > -this.maxSpeed){
				this.dirY -= this.speed;
			};
		};
		if(this.down){
			if(this.dirY < this.maxSpeed){
				this.dirY += this.speed;
			};
		};
	};
	this.spawn = () => {
		this.dirX = 0;
		this.dirY = 0;
		if(this.team=='TEAM_A'){
			this.x = random(PITCH.sideA.x + PITCH.sideA.width + this.r, PITCH.line.x - this.r);
		} else if(this.team=='TEAM_B'){
			this.x = random(PITCH.line.x + PITCH.line.width + this.r, PITCH.sideB.x - this.r);
		};
		this.y = random(CANVAS.y + this.r, CANVAS.height - this.r);
	};
	this.playersContact = () => {
		for(i in players){
			if(this.team == 'TEAM_A' && players[i].team == 'TEAM_B' && this.x - this.r > PITCH.line.x + PITCH.line.width){
				let dx = Math.abs(this.x - players[i].x);
				let dy = Math.abs(this.y - players[i].y);
				let dd = this.r + players[i].r;
				if(dd*dd >= (dx*dx)+(dy*dy)) {
					if(FLAG.TEAM_B.player == this.id){
						FLAG.TEAM_B.spawn();
					};
					this.spawn();
					SCORE.TEAM_B++;
					players[i].score++;
					socket.emit('update score', {TEAM_A: SCORE.TEAM_A, TEAM_B: SCORE.TEAM_B, id: players[i].id});
				};
			} else if(this.team == 'TEAM_B' && players[i].team == 'TEAM_A' && this.x + this.r < PITCH.line.x){
				let dx = Math.abs(this.x - players[i].x);
				let dy = Math.abs(this.y - players[i].y);
				let dd = this.r + players[i].r;
				if(dd*dd >= (dx*dx)+(dy*dy)) {
					if(FLAG.TEAM_A.player == this.id){
						FLAG.TEAM_A.spawn();
					};
					this.spawn();
					SCORE.TEAM_A++;
					players[i].score++;
					socket.emit('update score', {TEAM_A: SCORE.TEAM_A, TEAM_B: SCORE.TEAM_B, id: players[i].id});
				};
			};
		};
	};
	this.flagContact = () => {
		if(this.team == 'TEAM_A' && !FLAG.TEAM_B.player){
			let dx = Math.abs(this.x - FLAG.TEAM_B.x);
			let dy = Math.abs(this.y - FLAG.TEAM_B.y);
			let dd = this.r + FLAG.TEAM_B.r;
			if(dd*dd >= (dx*dx)+(dy*dy)) {
				FLAG.TEAM_B.player = this.id;
			};
		} if(this.team == 'TEAM_B' && FLAG.TEAM_B.player){
			let dx = Math.abs(this.x - FLAG.TEAM_B.x);
			let dy = Math.abs(this.y - FLAG.TEAM_B.y);
			let dd = this.r + FLAG.TEAM_B.r;
			if(dd*dd >= (dx*dx)+(dy*dy)) {
				FLAG.TEAM_B.spawn();
			};
		} 

		if(this.team == 'TEAM_B' && !FLAG.TEAM_A.player){
			let dx = Math.abs(this.x - FLAG.TEAM_A.x);
			let dy = Math.abs(this.y - FLAG.TEAM_A.y);
			let dd = this.r + FLAG.TEAM_A.r;
			if(dd*dd >= (dx*dx)+(dy*dy)) {
				FLAG.TEAM_A.player = this.id;
			};
		} else if(this.team == 'TEAM_A' && FLAG.TEAM_A.player) {
			let dx = Math.abs(this.x - FLAG.TEAM_A.x);
			let dy = Math.abs(this.y - FLAG.TEAM_A.y);
			let dd = this.r + FLAG.TEAM_A.r;
			if(dd*dd >= (dx*dx)+(dy*dy)) {
				FLAG.TEAM_A.spawn();
			};
		};
	};
	this.update = () => {
		socket.emit('update player', {id: this.id, x: this.x, y: this.y, r: this.r});
	};
	this.reset = () => {
		this.score = 0;
		this.dirX = 0;
		this.dirY = 0;
	}
};