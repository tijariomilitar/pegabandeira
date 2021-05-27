function joinRoom() {
	players = [];
	socket.emit('join room', player);
	GAMESTATE.loadGame();
};