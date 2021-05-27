const ENGINESTATE = {
	status: 'load-game',
	system: {
		exe: () => {
			if(ENGINESTATE.status=='playing'){
				playerController.exe();
				flagController.exe();
			};
			if(ENGINESTATE.status=='paused'){

			};
			if(ENGINESTATE.status=='over'){

			};
		},
		render: () => {
			if(ENGINESTATE.status=='playing'){
				pitchController.render();
				playerController.render();
				playersController.render();
				scoreController.render();
				flagController.render();
				// hudController.render();
			};
			if(ENGINESTATE.status=='paused'){
				pitchController.render();
				playerController.render();
				playersController.render();
				flagController.render();
			};
			if(ENGINESTATE.status=='over'){
				pitchController.render();
			};
		}
	}
};

const ENGINE = {
	loop: () => {
		animation = requestAnimationFrame(ENGINE.loop);
		ENGINE.update();
		ENGINE.render();
		// cancelAnimationFrame(animation);
	},
	update: () => {
		ENGINESTATE.system.exe();
	},
	render: () => {
		// CANVAS.draw();
		ENGINESTATE.system.render();
	}
};