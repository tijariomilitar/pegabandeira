function registerPlayer(){
	let username = document.getElementById('username').value;
	localStorage.setItem('username', username);
	socket.emit('connected', username);
	GAMESTATE.menu();
};