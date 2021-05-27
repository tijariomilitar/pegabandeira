const FLAG = {
	TEAM_A:{
		x: CANVAS.width / 15,
		y: CANVAS.height / 2 - 15,
		r: 15,
		player: '',
		spawn: () => {
			FLAG.TEAM_A.player = '';
			FLAG.TEAM_A.x = CANVAS.width / 15;
			FLAG.TEAM_A.y = CANVAS.height / 2 - 15;
			socket.emit('update FLAG_A', { id: FLAG.TEAM_A.player, x: FLAG.TEAM_A.x, y: FLAG.TEAM_A.y });
		},
		move: function(){
			if(this.player==player.id){
				this.x = player.x;
				this.y = player.y;
				socket.emit('update FLAG_A', { id: this.player, x: this.x, y: this.y });
			};
		},
		scores: () => {
			if(FLAG.TEAM_A.player == player.id && FLAG.TEAM_A.x - FLAG.TEAM_A.r > PITCH.line.x + PITCH.line.width){
				FLAG.TEAM_A.spawn();
				SCORE.TEAM_B += 3;
				player.score += 3;
				socket.emit('touchdown', {TEAM_A: SCORE.TEAM_A, TEAM_B: SCORE.TEAM_B, id: player.id});
			};
		}
	},
	TEAM_B: {
		x: CANVAS.width - (CANVAS.width / 15),
		y: CANVAS.height / 2 - 15,
		r: 15,
		player: '',
		spawn: () => {
			FLAG.TEAM_B.player = '';
			FLAG.TEAM_B.x = CANVAS.width - (CANVAS.width / 15);
			FLAG.TEAM_B.y = CANVAS.height / 2 - 15;
			socket.emit('update FLAG_B', { id: FLAG.TEAM_B.player, x: FLAG.TEAM_B.x, y: FLAG.TEAM_B.y });
		},
		move: function(){
			if(this.player==player.id){
				this.x = player.x;
				this.y = player.y;
				socket.emit('update FLAG_B', { id: this.player, x: this.x, y: this.y });
			};
		},
		scores: () => {
			if(FLAG.TEAM_B.player == player.id && FLAG.TEAM_B.x + FLAG.TEAM_B.r < PITCH.line.x){
				FLAG.TEAM_B.spawn();
				SCORE.TEAM_A += 3;
				player.score += 3;
				socket.emit('touchdown', {TEAM_A: SCORE.TEAM_A, TEAM_B: SCORE.TEAM_B, id: player.id});
			};
		}
	},
	draw: () => {
		context.fillStyle = 'white';
		context.beginPath();
		context.arc(FLAG.TEAM_A.x, FLAG.TEAM_A.y, FLAG.TEAM_A.r, 0, 2 * Math.PI);
		context.arc(FLAG.TEAM_B.x, FLAG.TEAM_B.y, FLAG.TEAM_B.r, 0, 2 * Math.PI);
		context.fill();
	},
	reset: () => {
		FLAG.TEAM_A.player = '';
		FLAG.TEAM_B.player = '';
	}
};