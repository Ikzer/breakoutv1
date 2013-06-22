// Obtener referencia al canvas
var ctx = $('#canvas')[0].getContext("2d");
 
var w = $("#canvas").width(); // Guardamos alto y ancho
var h = $("#canvas").height();
 
// Dibujar el canvas
 ctx.fillStyle = "white";
 ctx.fillRect(0, 0, w, h);
 ctx.strokeStyle = "black";
 ctx.strokeRect(0, 0, w, h);
 
//Dibujar un círculo
 ctx.beginPath();
 ctx.arc(75, 75, 10, 0, Math.PI*2, true);
 ctx.fillStyle = "black";
 ctx.closePath();
 ctx.fill();
 
 