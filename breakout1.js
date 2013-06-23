//Variables globales
var x = 150; // Posición inicial en X
var y = 250; // Posición inicial en Y
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
var canvasMinX; // Posición izquierda del canvas
var canvasMaxX; // Posición derecha del canvas
var bricks; // El array de bloques
var NROWS = 5; // Número de filas
var NCOLS = 5; // Número de columnas
var BRICKWIDTH; // Ancho de los bloques
var BRICKHEIGHT = 15; // Altura de los bloques
var PADDING = 1; // Separación entre bloques
var ballr = 10;
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var paddlecolor = "#FFFFFF";
var ballcolor = "#FFFFFF";
var backcolor = "#000000";
var score;

//Inicializar todo

function init() {
	ctx = $('#canvas')[0].getContext("2d"); // Obtener el canvas
	WIDTH = $("#canvas").width(); // Asignar su tamaño a las variables 
	HEIGHT = $("#canvas").height();
	paddlex = WIDTH / 2;
	BRICKWIDTH = (WIDTH/NCOLS) - 1;
	score = 0;
	canvasMinX = $("#canvas").offset().left;
	canvasMaxX = canvasMinX + WIDTH;
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

// Movemos la barra si el ratón se encuentra dentro de canvas
function onMouseMove(evt) {
	if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
		paddlex = evt.pageX - canvasMinX;
	}
}

// Enlazamos el movimiento del ratón al evento de navegador
$(document).mousemove(onMouseMove);

//Enlazamos estas funciones al evento keydown() de jQuery
//que las lanzará cuando se pulsen o dejen de hacerlo

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

//Dibujar un círculo de centro en (x,y) y de radio r
function circle(x,y,r) { 
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

//Dibujar un rectángulo de ancho w, alto h, con la esquina superior izquierda en (x,y)
function rect(x,y,w,h) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

//Limpiar el frame
function clear() {
//	Limpiamos el canvas
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
//	Dibujar el canvas
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, WIDTH, HEIGHT);

}

//Dibujar el frame
function paint() {
	ctx.fillStyle = backcolor;
	clear();
	ctx.fillStyle = ballcolor;
	circle(x, y, ballr);
	
	// Pintamos la puntuación
	var score_text = "Score: " + score;
	ctx.fillStyle = "white";
	ctx.fillText(score_text, 5, HEIGHT-5);
	 
//	Mover la barra si se pulsa izquierda o derecha
	if (rightDown) paddlex += 5;
	else if (leftDown) paddlex -= 5;
//	Dibujar la barra
	ctx.fillStyle = paddlecolor;
	rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
//	Dibujar los bloques	
	paintbricks();
	


	// Verificar si le damos a un bloque
	rowheight = BRICKHEIGHT + PADDING; // Altura de una fila
	colwidth = BRICKWIDTH + PADDING; // Ancho de una columna
	row = Math.floor(y/rowheight); // Fila en la que se encuentra la bola
	col = Math.floor(x/colwidth); // Columna en la que se encuentra la bola
	// Si coincide, rebotar la bola y marcar el bloque como golpeado
	if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
		dy = -dy;
		bricks[row][col] = 0;
	}

//	Detección de colisiones con los bordes
	if (x + dx > WIDTH || x + dx < 0)
		dx = -dx;

	if (y + dy < 0)
		dy = -dy;
	else if (y + dy + ballr > HEIGHT) {
		if (x > paddlex && x < paddlex + paddlew){
			// Mover la bola diferente según donde toque la barra
			 dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
			// Si cae dentro de la barra, cambiamos la dirección 
			dy = -dy;
			// Incrementamos la puntuación
			score ++;
		}
		else
			// Fuera de la barra, paramos la animación
			clearInterval(intervalId);
	}

	x += dx;
	y += dy;
	
}

// Rellenar el array de bloques
// 1 = Mostrar bloque
// 2 = Bloque golpeado, no mostrar
function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}

//Pintar los bloques
//Saltar el espacio si el valor del bloque es 0
function paintbricks() {
	for (i=0; i < NROWS; i++) {
		ctx.fillStyle = rowcolors[i];
		for (j=0; j < NCOLS; j++) {
			if (bricks[i][j] == 1) {
				rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
						(i * (BRICKHEIGHT + PADDING)) + PADDING,
						BRICKWIDTH, BRICKHEIGHT);
			}
		}
	}
}

init();
initbricks();