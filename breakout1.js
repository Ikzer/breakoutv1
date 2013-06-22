// Variables
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var ctx;
 
function init() {
 ctx = $('#canvas')[0].getContext("2d");
 return setInterval(paint, 10);
}

function paint() {
	 // Limpiamos el canvas
	 ctx.clearRect(0,0,300,300);
	 // Dibujar el canvas
	 ctx.fillStyle = "white";
	 ctx.fillRect(0, 0, w, h);
	 ctx.strokeStyle = "black";
	 ctx.strokeRect(0, 0, w, h);
	 
	 // Dibujar el círculo
	 ctx.beginPath();
	 ctx.arc(x, y, 10, 0, Math.PI*2, true);
	 ctx.fillStyle = "black";
	 ctx.closePath();
	 ctx.fill();
	 x += dx;
	 y += dy;
	 }
 