//

var raton = new createjs.Shape();
var notaTouch=66;
var clicada;

raton.graphics.beginFill("white").drawCircle(0, 0, 1);
//raton.x = stage.mouseX
//raton.y = stage.mouseY;
stage.addChild(raton);


window.document.onmousedown=function (){
	//if(ctx.state!="running"){retoma()}
	tocanota(teclanota(true)+notaTouch,100);
	stage.setChildIndex( raton, stage.getNumChildren()-1);
	console.log("dow")
}


window.document.ontouchstart=function(a){
	if(ctx.state!="running"){retoma()}
	tocanota(teclanota(true)+notaTouch,100);
console.log("sta")

}

window.document.onmouseup=function (){paraNota(clicada+notaTouch)}

window.document.ontouchend=function(a){

	paraNota(clicada+notaTouch);
	console.log("sta")

}

function teclanota(diatonico){
	//if(diatonico)

	clicada=Math.floor(Math.random()*24);
	console.log("clicada : "+clicada)
	return clicada
}