// grabadora

var grabacion=[];
var principio;
var final=1;
var originalFinal=1;
var lupDuracion=1;//la duracion del timeout
var programadas=[];
var lup;
var grabando=false;
var lupeando=false;





function graba(k,inf){
	if(k==0){return}
	
	if(!grabando){
		principio=ctx.currentTime;
		final=principio+lupDuracion;
		//if (final==0.001){final=1000000}
		//final=ctx.currentTime+final;
		grabando=true;
		console.log("_____________  GRABANDO _____________ "+lupeando);
		console.log(grabacion)
	}else{
		if(final==principio+1){final=ctx.currentTime;originalFinal=final}//si no hay nada grabado
		
		grabando=false;
					console.log("____STOP REC_____ " + grabacion.length , "length")
	}
	programadas=[];

}




function reproduce(k,inf){
	if(k==0){return}
		
	for(let i=0;i<grabacion.length;i++){
		
		 var noti =setTimeout(function(){tocanota(grabacion[i][0][1],grabacion[i][0][2])}, grabacion[i][1]*1000)
		 programadas.push(noti)
	}
	console.log("detengo loop y lo toco solo una vez");// k=1 significa que es un lupea disparado por esta función, no por el botón
	//clearInterval(lup);
	console.log("_reproduzco")
}


function lupea(k,inf){
		if(k==0){"return";return}//ignore note off
	
	
	if(k!=1){//si le he dado al boton: cambio el booleano
		lupeando=!lupeando;	
		console.log("lupeando= "+lupeando)
	}


	if (lupeando==true){// si esta lupeando
		for(let i=0;i<grabacion.length;i++){// schedule notes
			setTimeout(function(){tocanota(grabacion[i][0][1],grabacion[i][0][2])}, grabacion[i][1]*1000)	
		}//switch	
		lupDuracion=final-principio;
		lup=setTimeout(function(){lupea(1,false)},1000*(lupDuracion));
		console.log("lupDuration:",lupDuracion)
	}else{ // si tengo que parar 
		clearInterval(lup);
		console.log("paro lupea")
	}	
}




function borra(k,inf){
	console.log("borro")
	paratodas();
	
	if(lupeando){lupea(2,false)};
	grabacion=[];
	principio=ctx.currentTime;
	final=principio+1;
	lupDuracion=1;;


}


function guarda(){
	console.log("guarda")
	var obj={}
	obj.grabacion=grabacion;
	obj.principio=principio;
	obj.final=final;
	obj.mapaMidi=mapaMidi;
	
	obj.velSpacial=velSpacial;
	obj.radioCircle=radioCircle;
	obj.radioCircleFinal=radioCircleFinal;
	obj.gris=gris;
	obj.grisRandom=grisRandom;
	obj.radioVelo=radioVelo;

	obj.starLoc=starLoc;
	obj.starLocColor=starLocColor;
	obj.starLocRandom=starLocRandom;
	obj.starLocThick=starLocThick;

	obj.grisLine=grisLine
	obj.horizon=horizon;
	obj.vertical=vertical;
	obj.fadeTime=fadeTime;

	//obj.arr=arr;
	//obj.arrSonando=arrSonando;

    var json = JSON.stringify(obj),
    blob = new Blob([json], {type: "octet/stream"});
   	saveAs(blob,'grabacion.json');
   
}



function recarga(event){ // load file


  var file = event.target.files[0];

  var reader = new FileReader();
  reader.onload = function(e) {
    // The file's text will be printed here

    var obj=JSON.parse(e.target.result);
    console.log(obj)
    grabacion=obj.grabacion;
    principio=obj.principio;
    final=obj.final;
    mapaMidi=obj.mapaMidi;

	velSpacial=obj.velSpacial;
	radioCircle=obj.radioCircle;
	radioCircleFinal=obj.radioCircleFinal;
	gris=obj.gris;
	grisRandom=obj.grisRandom;
	radioVelo=obj.radioVelo;

	starLoc=obj.starLoc;
	grisLine=obj.grisLine;
	starLocColor=obj.starLocColor;
	starLocRandom=obj.starLocRandom;
	starLocThick=obj.starLocThick;
	
	horizon=obj.horizon;
	vertical=obj.vertical;
	fadeTime=obj.fadeTime;

	//arr=obj.arr;
	//arrSonando=obj.arrSonando;
	console.log(obj)
  };

  reader.readAsText(file);

}


cuadra = function(a,inf){
	// cuadro
	if(!inf){
		final+=(a-64)/10
	}else {
		final+=(a-64)/60;
			
		
	}
	console.log("a:",a, "cutoff:", originalFinal-final)
}