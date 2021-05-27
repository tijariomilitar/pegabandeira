const HUD = {
	TEAM_A: {
		player1: undefined,
		player2: undefined,
		player3: undefined
	},
	TEAM_B: {
		player1: undefined,
		player2: undefined,
		player3: undefined	
	},
	draw: () => {
		context.font = '15px Arial';
		context.fillStyle = '#222';
		context.fillText(HUD.TEAM_A.player1.username+':'+HUD.TEAM_A.player1.connection, PITCH.sideA.x + 5, PITCH.sideA.y + (10 * 2));
		context.fillText(HUD.TEAM_A.player2.username+':'+HUD.TEAM_A.player2.connection, PITCH.sideA.x + 5, PITCH.sideA.y + (10 * 4));
		context.fillText(HUD.TEAM_A.player3.username+':'+HUD.TEAM_A.player3.connection, PITCH.sideA.x + 5, PITCH.sideA.y + (10 * 6));
		context.fillText(HUD.TEAM_B.player1.username+':'+HUD.TEAM_B.player1.connection, PITCH.sideB.x + 5, PITCH.sideB.y + (10 * 2));
		context.fillText(HUD.TEAM_B.player2.username+':'+HUD.TEAM_B.player2.connection, PITCH.sideB.x + 5, PITCH.sideB.y + (10 * 4));
		context.fillText(HUD.TEAM_B.player3.username+':'+HUD.TEAM_B.player3.connection, PITCH.sideB.x + 5, PITCH.sideB.y + (10 * 6));
	},
	config: () => {
		
	}
}