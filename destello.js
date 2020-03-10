//
var starLoc=true;//lineas
var grisLine=256;
var starLocColor="rgb("+grisLine+","+grisLine+","+grisLine+")";
var starLocRandom=false;
var starLocThick=1;

var horizon=alt/2;
let vertical=true;
let fadeTime=100;



function creaDestello(x,y,nX,nY){  //call from planets
  	if(!starLoc){return}
  	if(starLocRandom){
  		starLocThick=Math.round(Math.random()*starLocThick);
  		starLocColor=getRandomColor()
  	}

  	var destello=new createjs.Shape();
 	destello.graphics.beginFill(starLocColor);
	destello.graphics.moveTo(x, y).lineTo(nX, nY).lineTo(nX+starLocThick, nY+starLocThick).lineTo(x, y);
  
  	stage.addChild(destello);

  	createjs.Tween.get(destello).to({alpha:0 }, fadeTime).call(handleComplete, [destello]);
}


function starLocLight(a,i){
  if(!i){
    grisLine=a*2;
  }else {
      grisLine+=a-64;
  }
  if(grisLine<0){grisLine=0}else if(grisLine>256){grisLine=256}

  starLocColor="rgb("+grisLine+","+grisLine+","+grisLine+")";
  console.log("#" +grisLine)
}

function starLocThickness(d,inf){
  if(!inf){
    starLocThick=Math.random()*d*100+1;
  }else{
    starLocThick+=d-64;
  }
  if(starLocThick>3000){starLocThick=3000}else if(starLocThick<1){starLocThick=1};
    console.log("thickness:"+starLocThick)
}

function lineFadeTime(d,inf){
  if(!inf){
    fadeTime=d*500;
  }else{
    fadeTime+=(d-64)*10;
  }
  console.log("fadeTime: "+fadeTime)
}


function locationSWITCH(d,v){
  if(d==0){return}
  if(starLoc){starLoc=false}else{starLoc=true}
    console.log("locationSWITCH: "+starLoc);
}