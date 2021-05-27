const flagController = {
	exe: () => {
		FLAG.TEAM_A.move()
		FLAG.TEAM_B.move()
		FLAG.TEAM_A.scores()
		FLAG.TEAM_B.scores()
	},
	render: () => {
		FLAG.draw();
	}
};