//mensaje.js

var herzio;
var intervalo=2000;

function decodifica(){
	console.log(": : : : : decodifico : : : : : :");

	for (var i = 0; i < grabacion.length; i++) {
		//if(grabacion[i][0][2]!=0){

			//findNoteOff(grabacion[i]);
		grabacion[i][1]*=.5;
		//}
	}
}



function chufle(){
	// randomiza to
	herzio= setInterval(randomiza,intervalo)
}

function randomiza(){
	console.log("randomizo");
	reproduce()
	velSpacial=Math.random()*10000
	radioCircle=Math.random()*3;
	radioCircleFinal=Math.random()*50;
	starLocThick=Math.random()*20;
	fadeTime=Math.random()*4000
}