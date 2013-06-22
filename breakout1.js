// Variables globales
var x = 150; // Posición inicial en X
var y = 150; // Posición inicial en Y
var dx = 2; // Velocidad en X
var dy = 4; // Velocidad en Y
var WIDTH; // Ancho del frame
var HEIGHT; // Alto del frame
var ctx;

// Inicializar todo

function init() {
ctx = $('#canvas')[0].getContext("2d"); // Obtener el canvas
WIDTH = $("#canvas").width(); // Asignar su tamaño a las variables 
HEIGHT = $("#canvas").height();
return setInterval(paint, 10); // Llamar a paint() cada 10ms
}

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

x += dx;
y += dy;
}

init();