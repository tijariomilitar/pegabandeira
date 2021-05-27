const playerController = {
	exe: () => {
		player.move();
		player.playersContact();
		player.flagContact();
		player.update();
	},
	render: () => {
		player.draw();
	}
};