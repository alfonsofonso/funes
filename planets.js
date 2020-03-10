//planets

var velSpacial=20000;
var radioCircle=2;
var radioCircleFinal=24;
var radioVelo=false;//la key velociti influye en el radio del planeta

var gris=255;
var grisRandom=true;

var equis, igriega;


function ponEstrella(a,v){// es un circulo
  let vel;
  let ang= Math.random()*360;
  let radius=radio+margen;
  equis=(radius/(2 + Math.random()*20) )* Math.cos(ang) + amp/2;
  igriega=(radius/(2 + Math.random()*20) ) * Math.abs(Math.sin(ang))+alt/2;

  vel=velSpacial;

  let radioVel=radioCircle;
  if(radioVelo){radioVel*v/10}
  if (grisRandom){gris=Math.round(Math.random()*256)}
  var c = new createjs.Shape();
  let micolor="rgb("+gris+","+gris+","+gris+")";
  c.graphics.beginFill(micolor).drawCircle(2, 2, radioVel);
  c.x = equis
  c.y = igriega;


  var tamanyo=Math.random()*radioCircleFinal;

  let nextX=radius * Math.cos(ang)+amp/2;
  let nextY=radius*Math.sin(ang)+alt/2;
  creaDestello(equis,igriega,nextX,nextY);///////////////////////////////// destello.js
  
  stage.addChild(c);

  createjs.Tween.get(c)
    .to({ x:nextX,y:nextY,scaleX:tamanyo, scaleY:tamanyo},vel, createjs.Ease.getPowIn(2))
    .call(handleComplete, [c]);
}


function velocidad(a,i){// velSpacial
  if(!i){//1-127
    velSpacial=a*a*8;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>120000){
      velSpacial=120000;}
  }else{// si es encoder
    let e=a-64;
    velSpacial+=e*100;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>120000){
      velSpacial=120000;}
    }
  console.log("velSp: "+velSpacial+" "+i);
}

function radioPlaneta(a,i){
  if(!i){
    radioCircle=a/4;
  }else{//encoder
    radioCircle+=a-64;
  }
  if (radioCircle<1){radioCircle=1}else if(radioCircle>32){radioCircle=32}//corrector
  console.log("radioPlantet:" +radioCircle)
}//radio planets

function cercaniaPlaneta(a,i){//radio planets when near
  if(!i){
      radioCircleFinal=a*4;
    }else {
      radioCircleFinal+=(a-64);
    }
  if(radioCircleFinal<0){
     radioCircleFinal=0;
  }else if(radioCircleFinal>500){
      radioCircleFinal=500;
  }
  console.log("cercaniaPlaneta:" +radioCircleFinal);
}


function luzPlanetaAlienSWITCH(d,v){
  if(d==0){return}
  if(grisRandom){grisRandom=false}else{grisRandom=true}
  console.log("luzPlanetaAlienSWITCH: "+grisRandom);
}

//////
function clearButtonSWITCH(d,v){

    console.log("clear!");
    stage.removeAllChildren();
//    paratodas();
}

