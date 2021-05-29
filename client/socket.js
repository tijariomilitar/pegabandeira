socket.on('my player', data => {
	player = new Player(data.id, data.username, data.team);
});

socket.on('new player', data => {
	let newPlayers = [];
	for(i in data){
		if(data[i].id != player.id){
			newPlayers.push(data[i]);
		};
	};
	players = newPlayers;
	connected_players.innerHTML = '';
	for(i in players){
		connected_players.innerHTML += '<h4>'+players[i].username+' conectou</h4>';
	};
});

socket.on('start warning', () => {
	player.reset();
	SCORE.reset();
	FLAG.reset();
	player.spawn();
	socket.emit('update player', {id: player.id, x: player.x, y: player.y, r: player.r});
	connected_players.innerHTML += '<h3>O jogo vai começar, prepare-se!</h3>';
});

socket.on('start game', () => {
	GAMESTATE.playing();
});

socket.on('update players', data => {
	for(i in players){
		if(data.id == players[i].id){
			players[i].x = data.x;
			players[i].y = data.y;
			players[i].r = data.r;
		};
	};
});

socket.on('update FLAG_A', data => {
	FLAG.TEAM_A.player = data.id;
	FLAG.TEAM_A.x = data.x;
	FLAG.TEAM_A.y = data.y;
});

socket.on('update FLAG_B', data => {
	FLAG.TEAM_B.player = data.id;
	FLAG.TEAM_B.x = data.x;
	FLAG.TEAM_B.y = data.y;
});

socket.on('update score', data => {
	for(i in players){
		if(players[i].id == data.id){
			players[i].score++;
		}
	};
	if(data.id == player.id){
		player.score++;
	};
	SCORE.TEAM_A = data.TEAM_A;
	SCORE.TEAM_B = data.TEAM_B;
});

socket.on('touchdown', data => {
	for(i in players){
		if(players[i].id == data.id){
			players[i].score += 2;
		};
	};
	SCORE.TEAM_A = data.TEAM_A;
	SCORE.TEAM_B = data.TEAM_B;
});

socket.on('game over', () => {
	socket.emit('leave room');
	endGame();
});

socket.on('user left room', (data) => {
	if(ENGINESTATE.status!='over'){
		let connectedPlayers = [];
		for(i in players){
			if(data.id != players[i].id){
				connectedPlayers.push(players[i]);
			};
		};
		players = connectedPlayers;
		connected_players.innerHTML = '';
		for(i in players){
			connected_players.innerHTML += '<h4>'+players[i].username+' conectou</h4>';
		};
	};
});

socket.on('user left', (data) => {
	for(i in players){
		if(data.id == players[i].id){
			players[i].connection = data.connection;
		};
	};
});