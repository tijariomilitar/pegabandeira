var SCORE = {
	TEAM_A: 0,
	TEAM_B: 0,
	draw: () => {
		context.font = '23px Arial';
		context.fillStyle = '#222';
		context.fillText(SCORE.TEAM_A, ((CANVAS.width/2)*0)+(CANVAS.width/2)*0.5, CANVAS.y + 30);
		context.fillText(SCORE.TEAM_B, ((CANVAS.width/2)*1)+(CANVAS.width/2)*0.5, CANVAS.y + 30);
	},
	reset: () => {
		SCORE.TEAM_A = 0;
		SCORE.TEAM_B = 0;
	}
};