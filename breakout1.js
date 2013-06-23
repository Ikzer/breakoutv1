// Variables globales
var x = 150; // Posición inicial en X
var y = 150; // Posición inicial en Y
var dx = 2; // Velocidad en X
var dy = 4; // Velocidad en Y
var WIDTH; // Ancho del frame
var HEIGHT; // Alto del frame
var ctx; // Referencia al canvas
var paddlex; // Punto central de la barra
var paddleh = 10; // Altura de la barra
var paddlew = 75; // Ancho de la barra
var rightDown = false; // Tecla Derecha
var leftDown = false; // Tecla Izquierda
var intervalId = 0; // Identificador del intervalo de actualización

// Inicializar todo

function init() {
ctx = $('#canvas')[0].getContext("2d"); // Obtener el canvas
WIDTH = $("#canvas").width(); // Asignar su tamaño a las variables 
HEIGHT = $("#canvas").height();
paddlex = WIDTH / 2;
intervalId = setInterval(paint, 10); // Llamar a paint() cada 10ms
}

//Activar leftDown o rightDown si las teclas izquierda o derecha están pulsadas
function onKeyDown(evt) {
if (evt.keyCode == 39) rightDown = true;
else if (evt.keyCode == 37) leftDown = true;
}

// Y desactivarlas cuando dejan de estar pulsadas
function onKeyUp(evt) {
if (evt.keyCode == 39) rightDown = false;
else if (evt.keyCode == 37) leftDown = false;
}

// Enlazamos estas funciones al evento keydown() de jQuery
// que las lanzará cuando se pulsen o dejen de hacerlo

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

// Dibujar un círculo de centro en (x,y) y de radio r

function circle(x,y,r) { 
ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI*2, true);
ctx.fillStyle = "black";
ctx.closePath();
ctx.fill();
}

// Dibujar un rectángulo de ancho w, alto h, con la esquina superior izquierda en (x,y)

function rect(x,y,w,h) {
ctx.beginPath();
ctx.rect(x,y,w,h);
ctx.closePath();
ctx.fill();
}

// Limpiar el frame
function clear() {
// Limpiamos el canvas
 ctx.clearRect(0, 0, WIDTH, HEIGHT);
// Dibujar el canvas
 ctx.fillStyle = "white";
 ctx.fillRect(0, 0, WIDTH, HEIGHT);
 ctx.strokeStyle = "black";
 ctx.strokeRect(0, 0, WIDTH, HEIGHT);
}

// Dibujar el frame
function paint() {
clear();
circle(x, y, 10);

// Mover la barra si se pulsa izquierda o derecha
if (rightDown) paddlex += 5;
else if (leftDown) paddlex -= 5;
//Dibujar la barra
rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

//Detección de colisiones con los bordes
if (x + dx > WIDTH || x + dx < 0)
	dx = -dx;

if (y + dy < 0)
	dy = -dy;
else if (y + dy > HEIGHT) {
	if (x > paddlex && x < paddlex + paddlew)
	// Si cae dentro de la barra, cambiamos la dirección 
	dy = -dy;
	else
	// Fuera de la barra, paramos la animación
	clearInterval(intervalId);
	}

x += dx;
y += dy;
}

init();
init_paddle();