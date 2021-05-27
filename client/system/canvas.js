const CANVAS = document.querySelector('canvas');
const context = CANVAS.getContext('2d');

CANVAS.x = 0;
CANVAS.y = 0;
CANVAS.width = 901;
CANVAS.height = 400;
CANVAS.draw = () => {
	context.fillStyle = '#a0c8ee';
	context.fillRect(CANVAS.x, CANVAS.y, CANVAS.width, CANVAS.height);
};