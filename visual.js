//visual.js

var displaying=false;
var consola=document.getElementById("console");
var amp=0;
var alt=0;
var radio=0;//hipotenusa del canvas
var margen=100;

var stage = new createjs.Stage("micanvas");
var canvasContext=document.getElementById("micanvas");

var funVisuals=[];////// visuales
var visualActivo=0;
var lines=0;
var arrTeclas=[];

var arrNotas=[];

createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.setFPS=60;
createjs.Ticker.addEventListener("tick", tick);


ponVisual=function(a,v){
  funVisuals[visualActivo](a,v)
  //ponEstrella(a,v)
}

escribe=function(t){/// input orders
  console.log(t);
  var i=document.getElementById("consola");
  i.value="";
  eval(t);
}

////// on init
function initVisual(){
  ajustaCanvas();
  funVisuals=[ponEstrella];
  
  initAudio(numeroDeVoces);

  window.document.onkeydown=function(a){
    if(ctx.state!="running"){retoma()}
    var n=a.keyCode//a.which.keyCode;
    //tocanota(n,88);
    //arrNotas.push(n);

  }
   

  window.document.onkeyup=function(){
    for(var i=0;i<arrNotas.length;i++){
       // tocanota(arrNotas[i]);
      //arrNotas.splice(i,1);
    }
  }
 
}


onload=function(){
	initVisual();
  info();
	addFunctions();
}

/////     HELPERS
function tick(event) {
 
  stage.update();
  raton.x = stage.mouseX
  raton.y = stage.mouseY;
}

window.onresize = function(event) {
  ajustaCanvas()
}

ajustaCanvas=function(){
  amp=canvasContext.width  = window.innerWidth;
  alt=canvasContext.height = window.innerHeight;
  radio= Math.round(Math.sqrt(amp*amp+alt*alt)/2);
  document.getElementById("pantalla").style.width=amp-10 ;
  equis=amp/2;
  igriega=alt/2;


}


displayData=function(t){
  console.log("d "+t)
	for (var i =0;i<arguments.length;i++){
		consola.value+="\n"+t+" ";
		consola.scrollTop = consola.scrollHeight;
	}
  lines = consola.value.split('\n');

  if (lines.length>8){
    lines.shift();
    consola.value=lines.join("\n");
  }
}

function handleComplete(dispon) {
  dispon.removeAllEventListeners();
  stage.removeChild(dispon);
  dispon=null;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomGris() {
    var letters = '0123456789ABCDEF';

    let color="";
    for (var i = 0; i < 2; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    //console.log("c0lor "+'#'+color+color+color)
    return '#'+color+color+color;
}

Function.prototype.method=function(name, func){
  this.prototype[name] = func;
  return this
}

Number.method('integer',function(){
  return Math.round(this)
  // return Math[this<0? 'ceil':'floor'](this)
});

Number.method('natural',function(){
  return Math.round(Math.abs(this))
  // return Math[this<0? 'ceil':'floor'](this)
});

function info(){
  console.log("::::::::::      info()     ::::::::::::")
  console.log("suena, compresion, arr, arrNotas, voces, numeroDeVoces, generalVol");
	console.log("starLocRandom","starLocColor","starLocMaxThick, starLocThick, starLoc");
  console.log("radioPlantet","radioCircleFinal","grisRandom","radioVelo","midimap()");
    console.log("vesLanzando(), raton, grabacion, grabando, lupeando, mapaMidi");
    console.log("Oido.escucha() para atender");
    console.log("paratodas()","cambiaSonido","arr","arrNotas","voces");
    console.log("final","grabacion","lupDurancion")

}

function vesLanzando(){
 let a=Math.round(Math.random()*40)+50;
 let v=Math.random()*.80+.20;
  ponEstrella(a,v);

  let b= Tone.Frequency(a, "midi").toFrequency();/// al loro

  sinte.triggerAttackRelease(a,v*8,Tone.Transport.now() ,v)
  console.log(a+" "+b)
}

//t=setInterval(vesLanzando,3000);

//t2=setInterval(function(){velSpacial=Math.random()*200000},1000);
