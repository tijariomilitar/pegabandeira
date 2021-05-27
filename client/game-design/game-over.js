function showResult(){
	team_a_div.innerHTML = '';
	team_b_div.innerHTML = '';
	if(player.team == 'TEAM_A'){
		if(SCORE.TEAM_A > SCORE.TEAM_B){
			result_div.innerHTML = '<h1>VITÓRIA</h1>';
		} else {
			result_div.innerHTML = '<h1>DERROTA</h1>';
		};

		team_a_div.innerHTML += '<h5>'+player.username+': '+player.score+'</h5';
	} else if(player.team == 'TEAM_B'){
		if(SCORE.TEAM_A < SCORE.TEAM_B){
			result_div.innerHTML = '<h1>VITÓRIA</h1>';
		} else {
			result_div.innerHTML = '<h1>DERROTA</h1>';
		};

		team_b_div.innerHTML += '<h5>'+player.username+': '+player.score+'</h5';
	};

	score_placeholder.innerHTML = '';
	score_placeholder.innerHTML += '<h3>'+SCORE.TEAM_A+'</h3>';
	score_placeholder.innerHTML += '<h3>X</h3>';
	score_placeholder.innerHTML += '<h3>'+SCORE.TEAM_B+'</h3>';

	for(i in players){
		if(players[i].team == 'TEAM_A'){
			team_a_div.innerHTML += '<h5>'+players[i].username+': '+players[i].score+' pts</h5';
		} else if(players[i].team == 'TEAM_B'){
			team_b_div.innerHTML += '<h5>'+players[i].username+': '+players[i].score+' pts</h5';
		};
	};
};