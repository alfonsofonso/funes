// request MIDI access
var entradas=[];
var salidas=[];
var MIDIkeyChannel=144;
var MIDIKnobChannel=176;
var MIDIButtonChannel=137;//153;
var encoders=false;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
}else{ alert("No MIDI support in your browser.")}

function onMIDISuccess(midiAccess) {// when we get a succesful response, run this code

  if(midiAccess.inputs.size==0){return}
  midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
  inputs = midi.inputs.values();
  outputs= midi.outputs.values();

  // loop over all available inputs and listen for any MIDI input
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      entradas.push(input); // each time there is a midi message call the onMIDIMessage function
  }
  for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
    salidas.push(output);// each time there is a midi message call the onMIDIMessage function
  }

  for (let i = 0; i < entradas.length; i++) {
    if(entradas[i].value.name=="IAC Driver IAC Bus 1"){
      entradas[i].value.onmidimessage = bus1message;
    }else{
      entradas[i].value.onmidimessage = onMIDIMessage
    }
  }
  console.log("entradas midi= "+entradas.length)
}

function onMIDIFailure(e) {// when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function bus1message(m){// IAC message
  var data = m.data;

  if(data[0]==144){
    if(data[2]==64||data[2]==0){return}

    var v=Math.round((data[2]/256+0.5)*1000)/1000;
    ponVisual(data[1],data[2]);
  }
}

function onMIDIMessage(m){ /// midi keyboard message

  data = m.data;

  if(mapping){
    mapea(m);///// MAPEANDO
        return
  }

  if(data[0]==MIDIkeyChannel){// toco teclas
    //if(data[2]==64){return}
      tocanota(data[1],data[2])
     
      if(grabando){ 
         let d=ctx.currentTime-principio;    
          grabacion.push([data,d]);///////             GRABAR 
      //   console.log("time: "+d);
       }

  }else if(data[0]==MIDIKnobChannel){// toco otras cosas

    mueveknob(m);////////////////////   MUEVE KNOB  /////////
  }else if(data[0]==128){
    tocanota(data[1],0)  /// not sure
     if(grabando){ 
         let d=ctx.currentTime-principio;
        
          grabacion.push([data,d]);///////             GRABAR 
         console.log("time: "+d);
       }
  }else if(data[0]==MIDIButtonChannel){
      mueveknob(m)
        //console.log("muevo knob")
  }else {
      //console.log("unIdentified midi data: "+data);   NYAPAA!!
        //m.data[0]=MIDIButtonChannel;  // not sure            
      mueveknob(m)
  }
     //  console.log(" data: "+data)
}