
var ctx = new AudioContext();
var arr = [];
var arrSonando = [];
var tonica = 24;
var generalVol = 1;
var numeroDeVoces = 12;

var compresion=0.9;

var mainGain=ctx.createGain()
mainGain.connect(ctx.destination);
mainGain.gain.value=0.5;

function tocanota(a,v){
  if(v>0.01){
    apretarNota(a,v/127);
  }else{
    paraNota(a);
  }
}


function apretarNota(n,v){/// osc, nota MIDI, vel
 // console.log("n: "+ n ,"v: "+ v);
  var ob;
  for (var i = 0; i < arr.length; i++) {
    if(arrSonando.indexOf(arr[i])==-1){// si no esta sonando
      ob=arr[i];
    }
  }
  if(ob==undefined){console.log("too much polyphony");return}// estan sonando todas las voces
  
  let no=n||60;
  no=midiToFreq(no);
 
  let ve=v*compresion+1-compresion||0.7;
     
  //ob.ganancia.gain.cancelAndHoldAtTime(ctx.currentTime+0.001);
 
  ob.osc.frequency.setTargetAtTime(no , ctx.currentTime, 0.001);
  //arr[os][1].gain.linearRampToValueAtTime(0,ctx.currentTime+0.01);// start from 0
  ob.ganancia.gain.setTargetAtTime(ve , ctx.currentTime , 0.001);// attack
  ob.ganancia.gain.setTargetAtTime(ob.sosten , ctx.currentTime+ob.ataque+ob.caida, 0.1);// decay
  ob.nota=n;
  arrSonando.push(ob);
  ponVisual(n,ve,ob);
}

function paraNota(n){

  for (var i = 0; i < arrSonando.length; i++) {
    if(arrSonando[i].nota==n){
      arrSonando[i].ganancia.gain.cancelAndHoldAtTime(ctx.currentTime+0.0001);
      arrSonando[i].ganancia.gain.setTargetAtTime(0,ctx.currentTime+0.001, 0.001);// release   
      arrSonando.splice(arrSonando.indexOf(arrSonando[i]),1);
    }
  }

}


function initAudio(v){
  let voices=v||numeroDeVoces;
  numeroDeVoces=voices;
  for (var i = 0; i < voices; i++) {
    creaNodo("sine",i);
    }
    console.log("initAudio "+ voices +" voices");
}

////   helpers

function creaNodo(tipo, oct){ //////////////////////////////////   crea osciladores 
  
  let m=tonica*(oct+1);//Math.round(Math.random()*20)+50;
  let f=midiToFreq(m)
  var o=ctx.createOscillator();
    o.frequency.value=f;

  var g=ctx. createGain();
    g.gain.value=0;
  var vol=ctx. createGain();
    vol.gain.value=0.2;

  var obj={};
  obj.tipo=tipo||"sine";
  o.type=tipo;
  obj.ataque=0.02;
  obj.caida=.01;
  obj.sosten=0.4;
  obj.relajo=0.1;

  obj.frecuencia=f;
  obj.nota=m;
  obj.centerNote=m;
  obj.osc=o;
  obj.ganancia=g;
  obj.volumen=vol;
  obj.equis=330;
  obj.igriega=220;
  obj.color=getRandomColor();

  o.connect(g);
  g.connect(vol);
  vol.connect(mainGain);
  
  o.start();
  arr.push(obj)
}


function midiToFreq(mi) {
    return mi === 0 || (mi > 0 && mi < 128) ? Math.pow(2, (mi - 69) / 12) * 440 : 440
}


function volumen(o,v){
  let vu;
  if(v){//pote
    vu=mainGain.gain.value+(o-64)/100;
    if(vu>1){vu=1}else if(vu<0){vu=0}
  }else{//encoder
    vu=mainGain.gain.value+o/127
  }
  mainGain.gain.setTargetAtTime(vu, ctx.currentTime+0.001,0.001);
  console.log("vol: "+vu)
}


function retoma(){
  console.log("retomo")
  ctx.resume()
}


function cambiaSonido(d,v){
  if(d==0){return}
  paratodas();

  if (arr[0].tipo=="sine"){
    arr=[];

    for (var i = 0; i < numeroDeVoces; i++) {
      creaNodo("sawtooth",i);
    }
  }else{
    arr=[];

    for (var i = 0; i < numeroDeVoces; i++) {
     creaNodo("sine",i);
    }
  }
  console.log("change sounnd")
}



function paratodas(a,b){
  //if(a==0){return}else{console.log("sigo");}
 // let eso=(a==0)?console.log("si"):console.log("no")
  for (var i = 0; i < arr.length; i++) {
    //console.log("p:",ob.nota,n==ob.nota)
    arr[i].ganancia.gain.cancelAndHoldAtTime(ctx.currentTime+0.0004);
    arr[i].ganancia.gain.setTargetAtTime(0,ctx.currentTime+0.001, 0.001);// release
  }
  console.log(arr,"paro todas");

}
