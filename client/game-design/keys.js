window.addEventListener('keydown', (e) => {
	if(ENGINESTATE.status == 'playing'){
		player.onKeyDown(e.keyCode);
	};
});

window.addEventListener('keyup', (e) => {
	if(ENGINESTATE.status == 'playing'){
		player.onKeyUp(e.keyCode);
	};
});

window.addEventListener('keydown', (e) => {
	if(ENGINESTATE.status == 'over' && e.keyCode == '13'){
		window.location.href = '/';
	};
});