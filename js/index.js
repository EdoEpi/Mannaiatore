var cMaster;
var analyser1, analyser2, analyser3;
var o1Array = [], o2Array = [], o3Array = [];
var lfo1Array = [], lfo2Array=[], lfo3Array=[];
var lfo1Gain = [], lfo2Gain = [], lfo3Gain = [];
var tones = [] //note
var steps = [] //tasti
var mouseSteps = []; //tasti cliccati col mouse
var gradi = [];
var selectedGain = [];
var gates1=[], gates2=[], gates3=[];
var lfoFreqArray=[];
var attackArray = [];     //array of attack levels
var releaseArray = [];    //array of release levels
var delayTimeArray=[];
var delayGainArray=[];
var distortionDriveArray=[];
var filterFreqArray=[];
var filterQArray = [];
var reverbDWArray = [];
var keysTriggered = [];
var flagsTriggered=[];
var midiArray=[];
var midiArrayFreq=[];
var midiO1Array=[], midiO2Array=[], midiO3Array=[];
var arpEventsArray=[];
var arpOrderedArray=[];
var notesNamesArray=[];
var improArray=[];
var arpMidiEventsArray=[];
var arpMidiOrderedArray=[];
var improMidiArray=[];
var triggeredScale=[];
var eventKeys=[];

var Maj7 = [];
var Seven = [];
var Delta7 = [];
var SevenMin = [];

var Maj7Aug=[];
var SevenAug=[];
var Delta7Aug=[];
var SevenMinAug=[];

var Maj7Bem = [];
var SevenBem = [];
var Delta7Bem = [];
var Semidim = [];
var Dim=[];

var n = 0;
var f1 = 10,f2 = 10,f3 = 10;      //index of the current grade calcualted by "calculateDeg" function
var atk1=1, atk2=1, atk3=1;
var rel1=1, rel2=1, rel3=1;
var deg=0;
var lfoStep=0.5;
var lfoFreq1=0, lfoFreq2=0, lfoFreq3=0;       //default value of the index of the lfo frequencies
var stepLfo=0.5;
var stepAttack=0.1;       //step between each possible attack level
var stepRelease=0.15;      //step between each possible relase level
var dTime=10;
var dGain=10;
var masterGainIndex=10;
var stepTimeDelay=0.1;
var stepGainDelay=0.05;
var stepDriveDistortion=50;
var stepQFilter=52.63157368421053;
var stepDW = 0.05263157894736842105263157894737;
var freqFiltIndex=10;
var qFiltIndex=10;
var driveIndex=10;
var reverbDWIndex=10;
var periodLfo1;
var periodLfo2;
var periodLfo3;              
var flagEffect='0000';
var freqFilt;
var qFilt;
var drive;
var DW;
var counterMute=0;
var arpIndex=0;
var tonica;
var modo;
var improIndex=0;
var octaveIndex=2;
var timeInterval;
var totNotes=0;
var noteToReleaseCount=0;
var v11, v12, v13, v14, v15, v16, v17;
var v21, v22, v23, v24, v25, v26, v27;
var v31, v32, v33, v34, v35, v36, v37;
var v41, v42, v43, v44, v45, v46, v47;
var v51, v52, v53, v54, v55, v56, v57;
var v61, v62, v63, v64, v65, v66, v67;
var v71, v72, v73, v74, v75, v76, v77;
var prevNote, actNote;
var d1, d2, d3, d4, d5, d6, d7;
var p11, p12, p13, p14, p15, p16, p17;
var p21, p22, p23, p24, p25, p26, p27;
var p31, p32, p33, p34, p35, p36, p37;
var p41, p42, p43, p44, p45, p46, p47;
var p51, p52, p53, p54, p55, p56, p57;
var p61, p62, p63, p64, p65, p66, p67;
var p71, p72, p73, p74, p75, p76, p77;
var lastNote;
var learnIndex=0;
var learnInterval;

var sel1= document.getElementById("select_box1");
var sel2= document.getElementById("select_box2");
var sel3= document.getElementById("select_box3");
var selLfo1 = document.getElementById("selLfo1");
var selLfo2 = document.getElementById("selLfo2");
var selLfo3 = document.getElementById("selLfo3");
var dispLfo1=document.getElementById("dispLfo1");
var muteButton1=document.getElementById("muteBut1");
var muteButton2=document.getElementById("muteBut2");
var midiButton=document.getElementById("midiButt");
var arpButton=document.getElementById("arpButton");
var chordDisplay=document.getElementById("chordDisp");
var improviserButton=document.getElementById("improviserButton");
var improLearnButton=document.getElementById("improLearn");
var noteDisplay = document.getElementById("noteDisp");
var octaveDisplay = document.getElementById("octaveDisp");

var firstTime=true;
var turnOn1=false, turnOn2=false, turnOn3=false;
var turnOnLfo1=false, turnOnLfo2=false, turnOnLfo3=false;
sel1.disabled=true;
sel2.disabled=true;
sel3.disabled=true;
var clicked= false;
var effectDelay=false;
var effectFilter=false;
var effectDistortion=false;
var effectReverb=false;
var muteFlag=false;
var muteFlag1=false;
var midiFlag=false;
var arpFlag=false;
var chordFlag=false;
var improFlag=false;
var improLearnFlag=false;
var triggerChord = false;
var startLearn=false;

var cMaster = new AudioContext();
var gainMaster= cMaster.createGain();
var delay = cMaster.createDelay(4);
var delayGain = cMaster.createGain();
var distortion = cMaster.createWaveShaper();
var filter = cMaster.createBiquadFilter();
var dryGain=cMaster.createGain();
var reverb = cMaster.createConvolver();
var dry = cMaster.createGain();
var wet = cMaster.createGain();
var gainRev= cMaster.createGain();
var analyserF = cMaster.createAnalyser();
dryGain.connect(gainMaster);
gainMaster.connect(analyserF);
analyserF.connect(cMaster.destination);

var audioContext = null;
var unlocked = false;
var isPlaying = false;      // Are we currently playing?
var startTime;              // The start time of the entire sequence.
var current16thNote;        // What note is currently last scheduled?
var tempo = 120.0;          // tempo (in beats per minute)
var lookahead = 25.0;       // How frequently to call scheduling function 
                            //(in milliseconds)
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps 
                            // with next interval (in case the timer is late)
var nextNoteTime = 0.0;     // when the next note is due.
var noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
var noteLength = 0.05;      // length of "beep" (in seconds)
var canvas,                 // the canvas element
    canvasContext;          // canvasContext is the canvas' context 2D
var last16thNoteDrawn = -1; // the last "box" we drew on the screen
var notesInQueue = [];      // the notes that have been put into the web audio,
                            // and may or may not have played yet. {note, time}
var timerWorker = null;     // The Web Worker used to fire timer messages
var metric=0;
var noteResolution=0;
var max=28;
var dotClicked1 = document.getElementById("dotClick1");
var dotClicked2 = document.getElementById("dotClick2");
var dotClicked3 = document.getElementById("dotClick3");



setInterval(arpPlay, 200)
setInterval(improPlay, 500)


initializeVariables();



function insertEffect(){
  
  disconnectEffect();
  
  if (!effectDelay && !effectFilter && !effectDistortion && !effectReverb){
    dryGain.connect(gainMaster);
    flagEffect='0000';
  }
  
  if (effectDelay && !effectFilter && !effectDistortion && !effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(gainMaster);
    dryGain.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    delay.connect(gainMaster);
    flagEffect='1000';
  }
  
  if (!effectDelay && effectFilter && !effectDistortion && !effectReverb){
    dryGain.connect(filter);
    filter.connect(gainMaster);
    flagEffect='0100';
  }
  
  if (!effectDelay && !effectFilter && effectDistortion && !effectReverb){
    dryGain.connect(distortion);
    distortion.connect(gainMaster);
    flagEffect='0010';
  }
  
  if (!effectDelay && !effectFilter && !effectDistortion && effectReverb){
    dryGain.connect(reverb);
    dryGain.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(gainMaster);
    flagEffect='0001';
  }
  
  if (effectDelay && effectFilter && !effectDistortion && !effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(filter);
    filter.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    filter.connect(gainMaster);
    delay.connect(gainMaster);
    flagEffect='1100';
  }
  
  if (effectDelay && !effectFilter && effectDistortion && !effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(distortion);
    distortion.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    distortion.connect(gainMaster);
    delay.connect(gainMaster);
    flagEffect='1010';
  }
  
  if (effectDelay && !effectFilter && !effectDistortion && effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(reverb);
    dryGain.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    gainRev.connect(gainMaster);
    delay.connect(gainMaster);
    flagEffect='1001';
  }
    
  if (!effectDelay && effectFilter && effectDistortion && !effectReverb){
    dryGain.connect(filter);
    filter.connect(distortion);
    distortion.connect(gainMaster);
    flagEffect='0110';
  }
    
  if (!effectDelay && effectFilter && !effectDistortion && effectReverb){
    dryGain.connect(filter);
    filter.connect(reverb);
    filter.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(gainMaster);
    flagEffect='0101';
  }
  
  if (!effectDelay && !effectFilter && effectDistortion && effectReverb){
    dryGain.connect(distortion);
    distortion.connect(reverb);
    distortion.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(gainMaster);
    flagEffect='0011';
  }
    
  if (effectDelay && effectFilter && effectDistortion && !effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(filter);
    filter.connect(distortion);
    distortion.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    filter.connect(gainMaster);
    delay.connect(gainMaster);
    flagEffect='1110';
  }
    
  if (effectDelay && effectFilter && !effectDistortion && effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(filter);
    filter.connect(reverb);
    filter.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    gainRev.connect(gainMaster);
    delay.connect(gainMaster);
    flagEffect='1101';
  }
    
  if (effectDelay && !effectFilter && effectDistortion && effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(distortion);
    distortion.connect(reverb);
    distortion.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    gainRev.connect(gainMaster);
    delay.connect(gainMaster);
    flagEffect='1011';
  }
    
  if (!effectDelay && effectFilter && effectDistortion && effectReverb){
    dryGain.connect(filter);
    filter.connect(distortion);
    distortion.connect(reverb);
    distortion.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(gainMaster);
    flagEffect='0111';
  }
  
  if (effectDelay && effectFilter && effectDistortion && effectReverb){
    delay.delayTime.value=delayTimeArray[dTime];
      
    dryGain.connect(filter);
    filter.connect(distortion);
    distortion.connect(reverb);
    distortion.connect(dry);
    reverb.connect(wet);
    dry.connect(gainRev);
    wet.connect(gainRev);
    gainRev.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    gainRev.connect(gainMaster);
    delay.connect(gainMaster);
    flagEffect='1111';
  }
  
}


function disconnectEffect(){
  
  if (flagEffect=='0000'){
    dryGain.disconnect(gainMaster);
  }
    
  
  if (flagEffect=='1000'){
    dryGain.disconnect(gainMaster);
    dryGain.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
    
  }
  
  if (flagEffect=='0100'){
    dryGain.disconnect(filter);
    filter.disconnect(gainMaster);
    
  }
 
  
  if (flagEffect=='0010'){
    dryGain.disconnect(distortion);
    distortion.disconnect(gainMaster);
    
  }
    
  if (flagEffect=='0001'){
    dryGain.disconnect(reverb);
    dryGain.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(gainMaster); 
    
  }
  
  if (flagEffect=='1100'){
    dryGain.disconnect(filter);
    filter.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    filter.disconnect(gainMaster);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
  }
 
  
  if (flagEffect=='1010'){
    dryGain.disconnect(distortion);
    distortion.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    distortion.disconnect(gainMaster);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
  }
  
  if (flagEffect=='1001'){
    dryGain.disconnect(reverb);
    dryGain.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    gainRev.disconnect(gainMaster);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
  }
    
  if (flagEffect=='0110'){
    dryGain.disconnect(filter);
    filter.disconnect(distortion);
    distortion.disconnect(gainMaster);
  }
    
  if (flagEffect=='0101'){
    dryGain.disconnect(filter);
    filter.disconnect(reverb);
    filter.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(gainMaster);
  }
    
  if (flagEffect=='0011'){
    dryGain.disconnect(distortion);
    distortion.disconnect(reverb);
    distortion.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(gainMaster);
  }
  
  if (flagEffect=='1110'){
    dryGain.disconnect(filter);
    filter.disconnect(distortion);
    distortion.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    filter.disconnect(gainMaster);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
  }
    
  if (flagEffect=='1101'){
    dryGain.disconnect(filter);
    filter.disconnect(reverb);
    filter.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    gainRev.disconnect(gainMaster);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
  }
    
  if (flagEffect=='1011'){
    dryGain.disconnect(distortion);
    distortion.disconnect(reverb);
    distortion.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    gainRev.disconnect(gainMaster);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
  }
    
  if (flagEffect=='0111'){
    dryGain.disconnect(filter);
    filter.disconnect(distortion);
    distortion.disconnect(reverb);
    distortion.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(gainMaster);
  }
    
  if (flagEffect=='1111'){
    dryGain.disconnect(filter);
    filter.disconnect(distortion);
    distortion.disconnect(reverb);
    distortion.disconnect(dry);
    reverb.disconnect(wet);
    dry.disconnect(gainRev);
    wet.disconnect(gainRev);
    gainRev.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    gainRev.disconnect(gainMaster);
    delay.disconnect(gainMaster);
      
    delay=cMaster.createDelay(4);
  }
}





function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}


function changeParametDistortion(drive){
  distortion.curve = makeDistortionCurve(drive);   //from 0 to 1000
  distortion.oversample = '4x';
}

function changeParametFilter(){
  if (selFilt.options.selectedIndex=="0") {filter.type = "lowpass"}
  if (selFilt.options.selectedIndex=="1") {filter.type = "highpass"}
  if (selFilt.options.selectedIndex=="2") {filter.type = "bandpass"}
  
}

function createReverb(){
  
  
  function base64ToArrayBuffer(base64) {
      var binaryString = window.atob(base64);
      var len = binaryString.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++)        {
          bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
  }     
  var reverbSoundArrayBuffer = base64ToArrayBuffer(impulseResponse);
    cMaster.decodeAudioData(reverbSoundArrayBuffer, 
      function(buffer) {
        reverb.buffer = buffer;
      },
      function(e) {
        alert("Error when decoding audio data" + e.err);
      }
    );
  
}

function mixDW( value ) {
	dry.gain.value = ( 1.0 - value );
	wet.gain.value = value;
}

function createAudio1(){
  canvas1 = document.querySelector("#canv1");
  ctx1 = canvas1.getContext("2d");
  analyser1 = cMaster.createAnalyser();
  bufferLength = analyser1.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function createAudio2(){
  canvas2 = document.querySelector("#canv2");
  ctx2 = canvas2.getContext("2d");
  analyser2 = cMaster.createAnalyser();
  bufferLength = analyser2.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function createAudio3(){
  canvas3 = document.querySelector("#canv3");
  ctx3 = canvas3.getContext("2d");
  analyser3 = cMaster.createAnalyser();
  bufferLength = analyser3.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}




function lfoCreate1(g, freq, nOsc, selGain, atkTime){
      
      lfo=cMaster.createOscillator();
      lfoGain=cMaster.createGain();
      lfo.frequency.value=lfoFreqArray[lfoFreq1];
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfoGain.gain.value=0;
      lfo1Gain[freq]=lfoGain;
  
      now = cMaster.currentTime;
      lfo1Gain[freq].gain.linearRampToValueAtTime(selGain,now+atkTime);
      if (selLfo1.options.selectedIndex=="0") {lfo.type='sine'}
      if (selLfo1.options.selectedIndex=="1") {lfo.type='triangle'}
      if (selLfo1.options.selectedIndex=="2") {lfo.type='square'}
      if (selLfo1.options.selectedIndex=="3") {lfo.type='sawtooth'}
  
  if(!midiFlag){
      lfo1Array[tones.indexOf(freq)] = lfo;
      lfo1Array[tones.indexOf(freq)].start();  
  }
  if(midiFlag){
      lfo1Array[midiArrayFreq.indexOf(freq)] = lfo;
      lfo1Array[midiArrayFreq.indexOf(freq)].start();  
  }
}

function lfoCreate2(g, freq, nOsc, selGain, atkTime){
      
      lfo=cMaster.createOscillator();
      lfoGain=cMaster.createGain();
      lfo.frequency.value=lfoFreqArray[lfoFreq2];
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfoGain.gain.value=0;
  
      lfo2Gain[freq]=lfoGain;
      
      now = cMaster.currentTime;
      lfo2Gain[freq].gain.linearRampToValueAtTime(selGain,now+atkTime);
      
      if (selLfo2.options.selectedIndex=="0") {lfo.type='sine'}
      if (selLfo2.options.selectedIndex=="1") {lfo.type='triangle'}
      if (selLfo2.options.selectedIndex=="2") {lfo.type='square'}
      if (selLfo2.options.selectedIndex=="3") {lfo.type='sawtooth'}
  
      if(!midiFlag){
      lfo2Array[tones.indexOf(freq)] = lfo;
      lfo2Array[tones.indexOf(freq)].start();  
  }
  if(midiFlag){
      lfo2Array[midiArrayFreq.indexOf(freq)] = lfo;
      lfo2Array[midiArrayFreq.indexOf(freq)].start();  
  }
      
}

function lfoCreate3(g, freq, nOsc, selGain, atkTime){
      
      lfo=cMaster.createOscillator();
      lfoGain=cMaster.createGain();
      lfo.frequency.value=lfoFreqArray[lfoFreq3];
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfoGain.gain.value=0;
  
      lfo3Gain[freq]=lfoGain;
      
      now = cMaster.currentTime;
      lfo3Gain[freq].gain.linearRampToValueAtTime(selGain,now+atkTime);
      
      if (selLfo3.options.selectedIndex=="0") {lfo.type='sine'}
      if (selLfo3.options.selectedIndex=="1") {lfo.type='triangle'}
      if (selLfo3.options.selectedIndex=="2") {lfo.type='square'}
      if (selLfo3.options.selectedIndex=="3") {lfo.type='sawtooth'}
  
      if(!midiFlag){
      lfo3Array[tones.indexOf(freq)] = lfo;
      lfo3Array[tones.indexOf(freq)].start();  
  }
  if(midiFlag){
      lfo3Array[midiArrayFreq.indexOf(freq)] = lfo;
      lfo3Array[midiArrayFreq.indexOf(freq)].start();  
  }
      
}




function attack1(freq ,selGain, atkTime) {
  var o1;
  o1 = cMaster.createOscillator();
  g = cMaster.createGain();
  
     //0 è l'indice nell'array lfo
  
  o1.connect(g);
  
  g.connect(analyser1);
  analyser1.connect(dryGain);   
  o1.frequency.value = freq;
  g.gain.value = 0;
  
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+atkTime);
  gates1[freq] = g;
  
     //save the value of the actual note (oscillator)
  
  if(!midiFlag){
    o1Array[tones.indexOf(freq)] = o1; 
  }
  if(midiFlag){
  midiO1Array[midiArrayFreq.indexOf(freq)]= o1;
  }
  
  
  if (sel1.options.selectedIndex=="0") {o1.type='sine'}
  if (sel1.options.selectedIndex=="1") {o1.type='triangle'}
  if (sel1.options.selectedIndex=="2") {o1.type='square'}
   if (sel1.options.selectedIndex=="3") {o1.type='sawtooth'}
 
  if(turnOnLfo1){
    
  lfoCreate1(gates1[freq],freq,0, selGain, atkTime);
  }
  
  if(effectFilter) changeParametFilter();
  
  o1.start();
   
}


function release1(freq, i, relTime) { 
  
     gates1[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  
  
  if(!midiFlag){
    o1Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  if(midiFlag){
    midiO1Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  
    
    
 
  if(turnOnLfo1){
  lfo1Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime); 
  lfo1Array[i].stop(cMaster.currentTime+relTime+0.2);
  }
     
}



function attack2(freq ,selGain, atkTime) {
  var o2;
  o2 = cMaster.createOscillator();
  g = cMaster.createGain();
  
  o2.connect(g);
  
  g.connect(analyser2);
  analyser2.connect(dryGain);
  o2.frequency.value = freq;
  g.gain.value = 0;
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+atkTime);
  gates2[freq] = g;
  
  if(!midiFlag){
    o2Array[tones.indexOf(freq)] = o2;
  }
  else{
  midiO2Array[midiArrayFreq.indexOf(freq)]= o2;
  }
  
  
  if (sel2.options.selectedIndex=="0") {o2.type='sine'}
  if (sel2.options.selectedIndex=="1") {o2.type='triangle'}
  if (sel2.options.selectedIndex=="2") {o2.type='square'}
   if (sel2.options.selectedIndex=="3") {o2.type='sawtooth'}
  
  if(turnOnLfo2){
  lfoCreate2(gates2[freq],freq,0, selGain, atkTime);
 
  }
  
  if(effectFilter) changeParametFilter();
  
  o2.start();
  
}

function release2(freq, i, relTime) { 
    
  gates2[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
    
  
  if(midiFlag){
    midiO2Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  else{
    o2Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  
  if(turnOnLfo2){
    lfo2Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime); 
    lfo2Array[i].stop(cMaster.currentTime+relTime+0.2);}
  
}


function attack3(freq ,selGain, atkTime) {
  var o3;
  o3 = cMaster.createOscillator();
  g = cMaster.createGain();
  
  o3.connect(g);
  
  g.connect(analyser3);
  analyser3.connect(dryGain);
  o3.frequency.value = freq;
  g.gain.value = 0;
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+atkTime);
  gates3[freq] = g;
  
  if(!midiFlag){
    o3Array[tones.indexOf(freq)] = o3;
  }
  else{
  midiO3Array[midiArrayFreq.indexOf(freq)]= o3;
  }
  
  
  if (sel3.options.selectedIndex=="0") {o3.type='sine'}
  if (sel3.options.selectedIndex=="1") {o3.type='triangle'}
  if (sel3.options.selectedIndex=="2") {o3.type='square'}
   if (sel3.options.selectedIndex=="3") {o3.type='sawtooth'}
 
   if(turnOnLfo3){
  lfoCreate3(gates3[freq],freq,0, selGain, atkTime);
 
  }
  
  if(effectFilter) changeParametFilter();

  
  o3.start();
  
}

function release3(freq, i, relTime) { 
  
    gates3[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  
    if(midiFlag){
    midiO3Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  else{
    o3Array[i].stop(cMaster.currentTime+relTime+0.2); 
  } 
  
 if(turnOnLfo3){
    lfo3Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime); 
    lfo3Array[i].stop(cMaster.currentTime+relTime+0.2);}
}



function deleteAudio(){
  if(turnOn1 && !turnOn2 && !turnOn3) {
    for(i=0;i<o1Array.length;i++)
      {if(o1Array[i]!=undefined)
        o1Array[i].stop();
      }
  }
  if(!turnOn1 && turnOn2 && !turnOn3) {
    for(i=0;i<o2Array.length;i++)
      {if(o2Array[i]!=undefined)
        o2Array[i].stop();
      }
  } 
  
  if(!turnOn1 && !turnOn2 && turnOn3) {
    for(i=0;i<o3Array.length;i++)
      {if(o3Array[i]!=undefined)
        o3Array[i].stop();
      }
  } 
 
}


function activateAudio(x){
  
  changeColorDot(x);
  if(x==1){
   
    if (!turnOn1) {
          createAudio1();
          drawSamples1();
          createAudioFreq();
          drawSamplesFreq();
          sel1.disabled = false;     
    }
    else {
      
      analyser1 = cMaster.createAnalyser();
      deleteAudio();
      sel1.disabled = true
    }
  
    turnOn1=!turnOn1;  
  }
  
  
  if(x==2){
    if (!turnOn2) {
          createAudio2();
          drawSamples2();
          createAudioFreq();
          drawSamplesFreq();
          sel2.disabled = false;
          
      
    }
    else {
      analyser2 = cMaster.createAnalyser();
      deleteAudio();
      sel2.disabled = true
    }
  
    turnOn2=!turnOn2;  
  }
  
  if(x==3){
    if (!turnOn3) {
          createAudio3();
          drawSamples3();
          createAudioFreq();
          drawSamplesFreq();
          sel3.disabled = false;
          
      
    }
    else {
      analyser3 = cMaster.createAnalyser();
      deleteAudio();
      sel3.disabled = true
    }
  
    turnOn3=!turnOn3;  
  }
  
}


function changeColorDot(x){
  
  var y = "dot" + x;
  var z = "osc" + x;
  document.getElementById(y).classList.toggle("clicked");
  document.getElementById(z).classList.toggle("selectedOsc") 
}

function changeColorDotLfo(x){
  var z = "lfoButton" + x;
  document.getElementById(z).classList.toggle("clickedLfo");
}


function drawSamples1(){
  analyser1.getByteTimeDomainData(dataArray);
  analyser1.maxDecibels=50;
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx1.beginPath();
  for (var i=0; i<canvas1.width; i++) {
    ctx1.lineTo(i,dataArray[i]-canvas1.height*0.8)
  }
  ctx1.strokeStyle = "#00FF00";
  ctx1.stroke();
  requestAnimationFrame(drawSamples1)
}

function drawSamples2(){
  analyser2.getByteTimeDomainData(dataArray);
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  ctx2.beginPath();
  for (var i=0; i<canvas2.width; i++) {
    ctx2.lineTo(i,dataArray[i]-canvas2.height*0.8)
  }
  ctx2.strokeStyle = "#00FF00";
  ctx2.stroke();
  requestAnimationFrame(drawSamples2)
}

function drawSamples3(){
  analyser3.getByteTimeDomainData(dataArray);
  ctx3.clearRect(0,0,canvas3.width,canvas3.height);
  ctx3.beginPath();
  for (var i=0; i<canvas3.width; i++) {
    ctx3.lineTo(i,dataArray[i]-canvas3.height*0.8)
  }
  ctx3.strokeStyle = "#00FF00";
  ctx3.stroke();
  requestAnimationFrame(drawSamples3)
}

function createAudioFreq(){
  canvasFreq = document.querySelector("#canvFreq");
  ctxF = canvasFreq.getContext("2d");
  bufferLength = analyserF.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
    
}


function activateLfo(x){
  if(x==1){   
    turnOnLfo1=!turnOnLfo1;
  if(!turnOnLfo1) 
    lfoButton1.style.animation= "";
  if(turnOnLfo1){
    lfoButton1.style.animation= "neon "+ periodLfo1 + "s ease-in-out infinite";
  }
  }
  
  if(x==2){    
    turnOnLfo2=!turnOnLfo2;
  if(!turnOnLfo2)
    lfoButton2.style.animation= "";
  if(turnOnLfo2){
    lfoButton2.style.animation= "neon "+ periodLfo2 + "s ease-in-out infinite";
  }
  }
  
  if(x==3){    
    turnOnLfo3=!turnOnLfo3;
  if(!turnOnLfo3) 
    lfoButton3.style.animation= "";
  if(turnOnLfo3){
    lfoButton3.style.animation= "neon "+ periodLfo3 + "s ease-in-out infinite";
  }
  }
  
  changeColorDotLfo(x);  
}

function drawSamplesFreq(){
  analyserF.getByteFrequencyData(dataArray);//spettro di frequenza, mentre se fosse getByteTimeDomainData vedrei invece il segnale nel tempo
  analyserF.maxDecibels=0;
  ctxF.clearRect(0,0,canvasFreq.width,canvasFreq.height);
  ctxF.beginPath();
  var gradient= ctxF.createLinearGradient(0,0,canvasFreq.width,0);
  for (var i=0; i<canvasFreq.width; i++) {
    ctxF.moveTo(i,canvasFreq.height)
    ctxF.lineTo(i,canvasFreq.height-dataArray[i])
    ctxF.lineWidth = 1;
    ctxF.strokeStyle=gradient;
    gradient.addColorStop("0","white");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","grey");
  }
  ctxF.stroke();
  requestAnimationFrame(drawSamplesFreq);
}


function changeColorDelay(){
  document.getElementById("delayOnOff").classList.toggle("delayActive");
}

function activateDelay(){
  effectDelay=!effectDelay;
  insertEffect();
  changeColorDelay();
}

function activateFilter(){
  effectFilter=!effectFilter;
  insertEffect();
  document.getElementById("filterOnOff").classList.toggle("filterActive");
  
}


function activateDistortion(){
  effectDistortion=!effectDistortion;
  insertEffect();
  document.getElementById("distortionOnOff").classList.toggle("distortionActive");
}

function activateReverb(){
  effectReverb=!effectReverb;
  insertEffect();
  if(effectReverb){
    createReverb();
  }
  document.getElementById("reverbOnOff").classList.toggle("reverbActive");
}

function activateMute(){
  if(!(muteFlag && masterGainIndex==0)){
  muteFlag=!muteFlag;
  changeColorMute(2);
  
  if(muteFlag){
    gainMaster.gain.value = 0;
  }
  else{
    gainMaster.gain.value = selectedGain[masterGainIndex];
  }
    
  }
}


function changeColorMute(x){
    
    if(x==1) muteButton1.classList.toggle("muteActive");
    else if (x==2)  muteButton2.classList.toggle("muteActive");
}


document.querySelectorAll(".step").forEach(toggleStep)


function toggleStep(step){  
  
    
   step.onmousedown= function (step) {
     if(!step.repeat &&!midiFlag) {
        step.target.classList.toggle("clicked-step");
        
     if(turnOn1 && !turnOn2 && !turnOn3)
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1]);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2]);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3]);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1]);
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2]);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2]);
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3]);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1]);
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3]);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1]);
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2]);
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3]);
    }
       
       clicked=true;
    }
  }
   step.onmouseup= function (step) {
     var index=mouseSteps.indexOf(step.target.id);
     if(clicked==true){
    if(!step.repeat && !midiFlag){
       step.target.classList.toggle("clicked-step")
      
      if(turnOn1 && !turnOn2 && !turnOn3)
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    }
      clicked=false;
      }}
  }
 step.onmouseout= function(step) {
   var index=mouseSteps.indexOf(step.target.id);
          if(clicked==true &&!midiFlag) {
          step.target.classList.toggle("clicked-step");
            if(turnOn1 && !turnOn2 && !turnOn3)
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1]);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2]);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3]);
    }
          clicked=false;
          }
 }
    

}


function chordRecognitionTriad(){
  var third=0, fifth=0;
  
  if(!midiFlag){
     var primo = keys.indexOf(arpOrderedArray[0].key);
    var secondo = keys.indexOf(arpOrderedArray[1].key);
    var terzo = keys.indexOf(arpOrderedArray[2].key);
  
    third = keys.indexOf(arpOrderedArray[1].key) - keys.indexOf(arpOrderedArray[0].key);
    fifth = keys.indexOf(arpOrderedArray[2].key) - keys.indexOf(arpOrderedArray[1].key);
  }
  
  else if(midiFlag){
    var primo = midiArray.indexOf(arpMidiOrderedArray[0].data[1]);
        var secondo = midiArray.indexOf(arpMidiOrderedArray[1].data[1]);
        var terzo = midiArray.indexOf(arpMidiOrderedArray[2].data[1]);
  
    third = secondo-primo
    fifth = terzo-secondo;
  }
 
  
  if(third == 4 && fifth == 3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] +"+")
  }
  
  else if(third == 3 && fifth == 4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length]+"-")
  }
  
  else if(third == 4 && fifth == 4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length]+"+ aug")
  }
  
  else if(third == 4 && fifth == 2){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length]+"+ dim")
  }
  
  /*else if(third == 3 && fifth == 5){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length]+"- aug")
  }*/
  
  else if(third == 3 && fifth == 3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length]+"- dim")
  }
  
  
  
  else if(third == 3 && fifth == 5){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length]+"+ 1st invertion")
  }
  
  /*else if(third == 4 && fifth == 4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length]+"+ aug 1st invertion")
  }*/
  
  else if(third == 2 && fifth == 6){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length]+"+ dim 1st invertion")
  }
  
  else if(third == 4 && fifth == 5){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length]+"- 1st invertion")
  }
  
  /*else if(third == 5 && fifth == 4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length]+"- aug 1st invertion")
  }*/
  
  else if(third == 3 && fifth == 6){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length]+"- dim 1st invertion")
  }
  
  else if(third == 5 && fifth == 4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length]+"+ 2nd invertion")
  }
  
  /*else if(third == 4 && fifth == 4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length]+"+ aug 2nd invertion")
  }*/
  
  else if(third == 6 && fifth == 4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length]+"+ dim 2nd invertion")
  }
  else if(third == 5 && fifth == 3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length]+"- 2nd invertion")
  }
  
  /*else if(third == 4 && fifth == 3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length]+"- aug 2nd invertion")
  }*/
  
  else if(third == 6 && fifth == 3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length]+"- dim 2nd invertion")
  }
  
  
  
  chordFlag=true;
  
}

function chordRecognitionTertian(){
  
   var third=0, fifth=0, seventh=0;
  
    if(!midiFlag){
        var primo = keys.indexOf(arpOrderedArray[0].key);
        var secondo = keys.indexOf(arpOrderedArray[1].key);
        var terzo = keys.indexOf(arpOrderedArray[2].key);
        var quarto = keys.indexOf(arpOrderedArray[3].key);
    }   
    

    
    if(midiFlag){
        var primo = midiArray.indexOf(arpMidiOrderedArray[0].data[1]);
        var secondo = midiArray.indexOf(arpMidiOrderedArray[1].data[1]);
        var terzo = midiArray.indexOf(arpMidiOrderedArray[2].data[1]);
        var quarto = midiArray.indexOf(arpMidiOrderedArray[3].data[1]);
    }   
  
 
  
  third = secondo - primo;
  fifth = terzo - secondo;
  seventh = quarto - terzo;
  
  
  if (third==4 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Maj7");
    if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Maj7";
    
  }
  

  
  else if (third==4 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Seven";
  }
  
  else if (third==3 && fifth==4 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Δ7");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Delta7";
  }
  
  else if (third==3 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7-");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="SevenMin";
  }
  
  else if (third==4 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Maj7 aug");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Maj7Aug";
  }
  
  else if (third==4 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7 aug");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="SevenAug";
  }
  
  else if (third==3 && fifth==5 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Δ7 aug");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Delta7Aug";
  }
  
  else if (third==3 && fifth==5 && seventh==2){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7- aug");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="SevenMinAug";
  }
  
  else if (third==4 && fifth==2 && seventh==5){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Maj7 (5b)");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Maj7Bem";
  }
  
  else if (third==4 && fifth==2 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7 (5b)" + "/" + notesNamesArray[terzo%notesNamesArray.length] + " 7 (5b) 2nd  inversion");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="SevenBem";
  }
  
  else if (third==3 && fifth==3 && seventh==5){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Δ7 (5b)");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Delta7Bem";
  }
  
  else if (third==3 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " ø");
     if(!midiFlag) tonica=arpOrderedArray[0];
    else if(midiFlag)  tonica=arpMidiOrderedArray[0];
    modo="Semidim";
  }
  
  ////PRIMO RIVOLTO
  
  
  if (third==3 && fifth==4 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Maj7 1st inversion");
     if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Maj7";
  }
  
  else if (third==3 && fifth==3 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Seven";
  }
  
  else if (third==4 && fifth==4 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Δ7 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Delta7";
  }
  
  else if (third==4 && fifth==3 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7- 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="SevenMin";
  }
  
  else if (third==4 && fifth==3 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Maj7 aug 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Maj7Aug";
  }
  
  else if (third==4 && fifth==2 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7 aug 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="SevenAug";
  }
  
  else if (third==5 && fifth==3 && seventh==1){
    changeDisplayChordchangeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Δ7 aug 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Delta7Aug";
  }
  
  else if (third==5 && fifth==2 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7- aug 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="SevenMinAug";
  }
  
  else if (third==2 && fifth==5 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Maj7 (5b) 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Maj7Bem";
  }
  
  else if (third==2 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7 (5b) 1st inversion" + "/" + notesNamesArray[secondo%notesNamesArray.length] + " 7 (5b) 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="SevenBem";
  }
  
  else if (third==3 && fifth==5 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Δ7 (5b) 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Delta7Bem";
  }
  
  else if (third==3 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " ø 1st inversion");
    if(!midiFlag) tonica=arpOrderedArray[3];
    else if(midiFlag)  tonica=arpMidiOrderedArray[3];
    modo="Semidim";
  }
  
  
  
  //////// SECONDO RIVOLTO
  
  
  if (third==4 && fifth==1 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Maj7 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Maj7";
  }
  
  else if (third==3 && fifth==2 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Seven";
  }
  
  else if (third==4 && fifth==1 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Δ7 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Delta7";
  }
  
  else if (third==3 && fifth==2 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7- 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="SevenMin";
  }
  
  else if (third==3 && fifth==1 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Maj7 aug 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Maj7Aug";
  }
  
  else if (third==2 && fifth==2 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7 aug 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="SevenAug";
  }
  
  else if (third==3 && fifth==1 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Δ7 aug 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Delta7Aug";
  }
  
  else if (third==2 && fifth==2 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7- aug 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="SevenMinAug";
  }
  
  else if (third==5 && fifth==1 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Maj7 (5b) 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Maj7Bem";
  }
  
  else if (third==4 && fifth==2 && seventh==4){
    //changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7 (5b) 2nd  inversion");
  }
  
  else if (third==5 && fifth==1 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Δ7 (5b) 2nd  inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Delta7Bem";
  }
  
  else if (third==4 && fifth==2 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " ø 2nd inversion");
    if(!midiFlag) tonica=arpOrderedArray[2];
    else if(midiFlag)  tonica=arpMidiOrderedArray[2];
    modo="Semidim";
  }
  
  
  //////// TERZO RIVOLTO
  
  
  if (third==1 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Maj7 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Maj7";
  }
  
  else if (third==2 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Seven";
  }
  
  else if (third==1 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Δ7 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Delta7";
  }
  
  else if (third==2 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7- 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="SevenMin";
  }
  
  else if (third==1 && fifth==4 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Maj7 aug 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Maj7Aug";
  }
  
  else if (third==2 && fifth==4 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7 aug 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="SevenAug";
  }
  
  else if (third==1 && fifth==3 && seventh==5){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Δ7 aug 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Delta7Aug";
  }
  
  else if (third==2 && fifth==3 && seventh==5){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7- aug 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="SevenMinAug";
  }
  
  else if (third==1 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Maj7 dim 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Maj7Bem";
  }
  
  else if (third==2 && fifth==4 && seventh==2){
    //changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7 (5b) 3rd inversion");
  }
  
  else if (third==1 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Δ7 dim 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Delta7Bem";
  }
  
  else if (third==2 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " ø 3rd inversion");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
    modo="Semidim";
  }
  
   else if (third==3 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " °");
    if(!midiFlag) tonica=arpOrderedArray[1];
    else if(midiFlag)  tonica=arpMidiOrderedArray[1];
      modo="Dim";
  }
  
  chordFlag=true;

}

function changeDisplayChord(nameChord){
  
   chordDisplay.removeChild(chordDisplay.childNodes[0]);
   var textnode =document.createTextNode(String(nameChord)) ;         
   chordDisplay.appendChild(textnode); 
  
}


function arpPlay(){
   
  var numNotes;
  
  
  if(arpFlag){
    
    if(!midiFlag)
    numNotes=arpOrderedArray.length;
  
  else if(midiFlag)
     numNotes=arpMidiOrderedArray.length;
    
    
    if(numNotes==4 && !chordFlag){
    chordRecognitionTertian();
    
  }
  
  if(numNotes==3 && !chordFlag){
    chordRecognitionTriad();
    
  }
    
    arpeggiatorPlay(numNotes);  
  }
  
}



function improSetting(numNotes){
  if(numNotes==4 && !chordFlag){
    chordRecognitionTertian();
    
  }
  
  if(numNotes==3 && !chordFlag){
    chordRecognitionTriad();
    
  }
  
  if(numNotes==4 && !improLearnFlag){
    insertImproArray();
  }
    
  
  if(numNotes!=4){
    changeDisplayNote("-");
  }
  
  
  
}

function insertImproArray(){
  var a =0, index;
  
  if(!midiFlag)
      index = keys.indexOf(tonica.key);
  else if(midiFlag)
      index = midiArray.indexOf(tonica.data[1]);
  
  if(modo=="Maj7"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Maj7[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
        
      
    }   
  }
  
  else if(modo=="Seven"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Seven[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="Delta7"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Delta7[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="SevenMin"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenMin[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="Maj7Aug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Maj7Aug[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="SevenAug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenAug[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="Delta7Aug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Delta7Aug[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="SevenMinAug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenMinAug[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="Maj7Bem"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Maj7Bem[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="SevenBem"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenBem[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
       
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="Delta7Bem"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Delta7Bem[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="Semidim"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Semidim[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  else if(modo=="Dim"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Dim[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  
  
  //if (!(improLearnFlag && !startLearn))
    if(!improLearnFlag)
        improSound();
  
}

function improSound(){
  
  if(!midiFlag){
    attackFunction(improArray[learnIndex]);
    changeDisplayNote(improArray[learnIndex]);
    releaseFunction(improArray[learnIndex]);
    
  }
  
  else if(midiFlag){
    attackMidi(improArray[improIndex].data);
    changeDisplayNote(improArray[improIndex]);
    releaseMidi(improArray[improIndex].data);
    
  }
    
  //improIndex = improvvisator();
    learnIndex = improvvisatorLearn()
}

function changeDisplayNote(event){
  var note;
  if(event!="-"){
    if(!midiFlag) note = (keys.indexOf(event.key))%notesNamesArray.length;
  if(midiFlag) note = (midiArray.indexOf(event.data[1]))%notesNamesArray.length;
  noteDisplay.removeChild(noteDisplay.childNodes[0]);
   var textnode =document.createTextNode(String(notesNamesArrayBis[note])) ;         
   noteDisplay.appendChild(textnode);
  }
  else{
    noteDisplay.removeChild(noteDisplay.childNodes[0]);
   var textnode =document.createTextNode("-") ;         
   noteDisplay.appendChild(textnode);
  }
  
  
}

function improPlay(){
    
   
    
  if(improFlag && !midiFlag){
      
    numNotes=arpOrderedArray.length;
    improSetting(numNotes);
      
  }
  
  if(improFlag && midiFlag){
    numNotes=arpMidiOrderedArray.length;
    
    improSetting(numNotes);
  }
  
}

function arpeggiatorPlay(numNotes){
  
  if(!midiFlag){
    
      if(arpOrderedArray.length>0){
        attackFunction(arpOrderedArray[arpIndex]);
        releaseFunction(arpOrderedArray[arpIndex]);
      }
  }
  
  if(midiFlag){
    if(arpMidiOrderedArray.length>0){
      
        attackMidi(arpMidiOrderedArray[arpIndex].data);
        releaseMidi(arpMidiOrderedArray[arpIndex].data); 
      }
  }
      
    
    arpIndex = (arpIndex+1)%numNotes;
  

}

document.onkeydown = function(e) {
  
  if(!e.repeat){
      
  if(!midiFlag &&!arpFlag &&!improFlag && !improLearnFlag){
    attackFunction(e);
      
  }
  
  else if((arpFlag || improFlag) && !improLearnFlag){
    k=keys.indexOf(e.key);
    arpEventsArray[k] = e;
    clickOnKeyBoard(steps[k])
    changeDisplayChord("-");
    insertNotes();
    
    
    
  }
      
      else if(improLearnFlag && !startLearn){
          
          noteToReleaseCount++;
          if(!triggerChord){
            k=keys.indexOf(e.key);
            //clickOnKeyBoard(steps[k])
            arpEventsArray[k] = e;
            insertNotes();
            improLearnChord();
            
          }
        
      }
      
      else if(improLearnFlag && startLearn){
          attackFunction(e);
        
          learnAlgorithm(e);
          
      }
   
  }
  
  
}


function learnAlgorithm(e){
    
    
    
    if(keyFound(e)==true){
        
        var triggeredKey = triggeredScale.indexOf(e.key);
        
        lastNote=triggeredKey;
        
        if(totNotes==0){
            prevNote = ((triggeredKey)%12)+1;
        
        }
    
        else{
        
            actNote = ((triggeredKey)%12)+1;
            
            setLearnedInterval(prevNote,actNote);
            
            prevNote = actNote;
        }
        
        totNotes++;
        
        counterScaleDegrees(triggeredKey);
         
        
    }
    
    
        
}

function counterScaleDegrees(keyIndex){
    
    if     (keyIndex==0) d1++;
    else if(keyIndex==1) d2++;
    else if(keyIndex==2) d3++;
    else if(keyIndex==3) d4++;
    else if(keyIndex==4) d5++;
    else if(keyIndex==5) d6++;
    else if(keyIndex==6) d7++;
    
    console.log(d4);
        
    
}

function keyFound(e){
    
    for(i=0;i<triggeredScale.length;i++){
        if(e.key==triggeredScale[i])
            return true;
    }
    
    return false;
    
    
}

function setLearnedInterval(prev, act){
    if     (prev==1 && act==1)   v11++;
    else if(prev==1 && act==2)   v12++;
    else if(prev==1 && act==3)   v13++;
    else if(prev==1 && act==4)   v14++;
    else if(prev==1 && act==5)   v15++;
    else if(prev==1 && act==6)   v16++;
    else if(prev==1 && act==7)   v17++;
    
    else if(prev==2 && act==1)   v21++;
    else if(prev==2 && act==2)   v22++;
    else if(prev==2 && act==3)   v23++;
    else if(prev==2 && act==4)   v24++;
    else if(prev==2 && act==5)   v25++;
    else if(prev==2 && act==6)   v26++;
    else if(prev==2 && act==7)   v27++;
    
    else if(prev==3 && act==1)   v31++;
    else if(prev==3 && act==2)   v32++;
    else if(prev==3 && act==3)   v33++;
    else if(prev==3 && act==4)   v34++;
    else if(prev==3 && act==5)   v35++;
    else if(prev==3 && act==6)   v36++;
    else if(prev==3 && act==7)   v37++;
    
    else if(prev==4 && act==1)   v41++;
    else if(prev==4 && act==2)   v42++;
    else if(prev==4 && act==3)   v43++;
    else if(prev==4 && act==4)   v44++;
    else if(prev==4 && act==5)   v45++;
    else if(prev==4 && act==6)   v46++;
    else if(prev==4 && act==7)   v47++;
    
    else if(prev==5 && act==1)   v51++;
    else if(prev==5 && act==2)   v52++;
    else if(prev==5 && act==3)   v53++;
    else if(prev==5 && act==4)   v54++;
    else if(prev==5 && act==5)   v55++;
    else if(prev==5 && act==6)   v56++;
    else if(prev==5 && act==7)   v57++;
    
    else if(prev==6 && act==1)   v61++;
    else if(prev==6 && act==2)   v62++;
    else if(prev==6 && act==3)   v63++;
    else if(prev==6 && act==4)   v64++;
    else if(prev==6 && act==5)   v65++;
    else if(prev==6 && act==6)   v66++;
    else if(prev==6 && act==7)   v67++;
    
    else if(prev==7 && act==1)   v71++;
    else if(prev==7 && act==2)   v72++;
    else if(prev==7 && act==3)   v73++;
    else if(prev==7 && act==4)   v74++;
    else if(prev==7 && act==5)   v75++;
    else if(prev==7 && act==6)   v76++;
    else if(prev==7 && act==7)   v77++;
    
    
    
    
}



function improLearnChord(){
    
    if(arpOrderedArray.length==4 && improLearnFlag && !triggerChord){
        chordRecognitionTertian();   //triggero l' accordo appena raggiungo 4 note
        insertImproArray();         //triggero la scala su cui far riferimento
        triggerChordFunction();
  }
    
}

function triggerChordFunction(){
    triggerChord=true;
    resetLearnVariables();          //resetta tutte le var prima di reiniziare il counter
    activateClock();
    
    
    for(i=0;i<improArray.length;i++){
        triggeredScale[i]=improArray[i].key;
    }
    
    
}

function insertNotes(){
  cleanOrdered();   //delete everything from the notesArray everytime we change the array of the events
  var count=0;
  
  
  
  if(!midiFlag){
    for(i=0;i<arpEventsArray.length;i++){
        if(arpEventsArray[i]!=-1){
            arpOrderedArray[count]=arpEventsArray[i];
            count++;
        }
    
    }
  }
  
  
  
    
    if(midiFlag){
        
     for(i=0;i<arpMidiEventsArray.length;i++){
        if(arpMidiEventsArray[i]!=-1){
            arpMidiOrderedArray[count]=arpMidiEventsArray[i];
            count++;
            }
    
        }   
    }
  
    
  arpIndex=0;   //everytime we add a note, the arp starts from the beginning
  chordFlag=false;
}

function cleanOrdered(){
    if(!midiFlag){
        arpOrderedArray = arpOrderedArray.splice(0,0)
        improArray = improArray.splice(0,0)
  }
    
    
    if(midiFlag){
        arpMidiOrderedArray = arpOrderedArray.splice(0,0);   
    }
}



document.onkeyup = function(e) {
   
  chordFlag = false;
  
  k=keys.indexOf(e.key);
  
  if((arpFlag || improFlag) && !improLearnFlag){
    clickOnKeyBoard(steps[k])
    arpEventsArray[k] = -1;
   
    deleteNotes(e);
    changeDisplayChord("-");
    arpIndex=0;   //everytime we delete a note, the arp starts from the beginning
    improIndex=0;
  }
  
  else if(!arpFlag && !improFlag && !improLearnFlag){
    releaseFunction(e);
      
     
  }
    
    else if(improLearnFlag && noteToReleaseCount>0){
            noteToReleaseCount--;
            arpEventsArray[k] = -1;
            deleteNotes(e);
              
      }
    
    else if(improLearnFlag && noteToReleaseCount==0){
        releaseFunction(e);
    }
  
  
  
  
  
}

function deleteNotes(e){
   
    if(!midiFlag){
        for(i=0;i<arpOrderedArray.length;i++){
            if(arpOrderedArray[i].key==e.key){
                arpOrderedArray.splice(i,1);
      
            }
        }
    }
    
    else if(midiFlag){
        for(i=0;i<arpMidiOrderedArray.length;i++){
            if(arpMidiOrderedArray[i].data[1]==e.data[1]){
                arpMidiOrderedArray.splice(i,1);
      
            }
        }
    }
  
  
  
  
  
}



function attackFunction(e){
  k=keys.indexOf(e.key);
    keysTriggered[k] = e;
  
    if(!arpFlag)  
      clickOnKeyBoard(steps[k])
    
    if(turnOn1 && !turnOn2 && !turnOn3){
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1])
        flagsTriggered[k] ='100';
    }
    
    if(!turnOn1 && turnOn2 && !turnOn3){
      
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2])
         flagsTriggered[k]= '010';
    }
    
    if(!turnOn1 && !turnOn2 && turnOn3){
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3])
        flagsTriggered[k] ='001';
    }
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1])
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2])
        flagsTriggered[k] ='110';
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2])
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3])
        flagsTriggered[k] ='011';
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1])
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3])
        flagsTriggered[k] ='101';
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1])
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2])
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3])
       flagsTriggered[k] ='111';
    }
    
}

function releaseFunction(e){
  if(!midiFlag){
  k=keys.indexOf(e.key);
  
    if(!arpFlag)
        clickOnKeyBoard(steps[keys.indexOf(e.key)]);
  
  if(flagsTriggered[k] == '100'){
                   
    release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1]);
     
  }
    
    if(flagsTriggered[k] == '010'){
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2]);
      
    }
    
    if(flagsTriggered[k] == '001')
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3]);
    
    if(flagsTriggered[k] == '110'){
        release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1]);
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2]);
    }
    
    if(flagsTriggered[k] == '011'){
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2]);
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3]);
    }
    
    if(flagsTriggered[k] == '101'){
        release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1]);
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3]);
    }
    
    if(flagsTriggered[k] == '111'){
        release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1]);
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2]);
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3]);
    }
  
  keysTriggered[k]=undefined;
  }
}


function clickOnKeyBoard(step){
  step.classList.toggle("clicked-step")  
}



function calculateDeg(deg,name){
  
  if(name=='vol1'){
    f1= gradi.indexOf(deg);
    
    for(i=0;i<gates1.length;i++){
     if(gates1[i]!=undefined)
            gates1[i].gain.linearRampToValueAtTime(selectedGain[f1],cMaster.currentTime+attackArray[atk1]);
    }
    
    if(turnOnLfo1){
      
      for(i=0;i<lfo1Gain.length;i++){
     if(lfo1Gain[i]!=undefined)
            lfo1Gain[i].gain.linearRampToValueAtTime(selectedGain[f1],cMaster.currentTime+attackArray[atk1]);
    }
      
    }
      
    
  }
    
  if(name=='vol2'){
    
    f2= gradi.indexOf(deg);
    
    for(i=0;i<gates2.length;i++){
     if(gates2[i]!=undefined)
            gates2[i].gain.linearRampToValueAtTime(selectedGain[f2],cMaster.currentTime+attackArray[atk2]);
    }
    
    if(turnOnLfo2){
      
      for(i=0;i<lfo2Gain.length;i++){
     if(lfo2Gain[i]!=undefined)
            lfo2Gain[i].gain.linearRampToValueAtTime(selectedGain[f2],cMaster.currentTime+attackArray[atk2]);
    }
      
    }
  }
    
   if(name=='vol3'){
     
     f3= gradi.indexOf(deg);
     
     for(i=0;i<gates3.length;i++){
     if(gates3[i]!=undefined)
            gates3[i].gain.linearRampToValueAtTime(selectedGain[f3],cMaster.currentTime+attackArray[atk3]);
    }
    
    if(turnOnLfo3){
      
      for(i=0;i<lfo3Gain.length;i++){
     if(lfo3Gain[i]!=undefined)
            lfo3Gain[i].gain.linearRampToValueAtTime(selectedGain[f3],cMaster.currentTime+attackArray[atk3]);
    }
      
    }
   }
    
  
   if(name=='att1')
     atk1=gradi.indexOf(deg);
   if(name=='rel1')
     rel1=gradi.indexOf(deg);
  
  if(name=='att2')
     atk2=gradi.indexOf(deg);
   if(name=='rel2')
     rel2=gradi.indexOf(deg);
  
  if(name=='att3')
     atk3=gradi.indexOf(deg);
   if(name=='rel3')
     rel3=gradi.indexOf(deg);
  
  if(name=='lfoKnob1')
    
    {
      dispLfo1.removeChild(dispLfo1.childNodes[0]);
      lfoFreq1=gradi.indexOf(deg);
      var n1 = Number((lfoFreqArray[lfoFreq1]).toFixed(2));
      //var n = lfoFreqArray[lfoFreq1];
      var textnode =document.createTextNode(String(n1)+ " Hz") ;         
      dispLfo1.appendChild(textnode); 
      
      for(i=0;i< lfo1Array.length;i++){
        if(lfo1Array[i]!=undefined)
          lfo1Array[i].frequency.value=lfoFreqArray[lfoFreq1];
      }
      periodLfo1=1/n1;
      if(turnOnLfo1){
        
        lfoButton1.style.animation= "neon "+ periodLfo1 + "s ease-in-out infinite";
      }
    }
  
  if(name=='lfoKnob2')
    
    {
      dispLfo2.removeChild(dispLfo2.childNodes[0]);
      lfoFreq2=gradi.indexOf(deg);
      var n2 = Number((lfoFreqArray[lfoFreq2]).toFixed(2));
      var textnode =document.createTextNode(String(n2)+ " Hz") ;         
      dispLfo2.appendChild(textnode); 
      
      for(i=0;i< lfo2Array.length;i++){
        if(lfo2Array[i]!=undefined)
          lfo2Array[i].frequency.value=lfoFreqArray[lfoFreq2];
      }
      periodLfo2=1/n2;
      if(turnOnLfo2){
        lfoButton2.style.animation= "neon "+ periodLfo2 + "s ease-in-out infinite";
      }
    }
  
  if(name=='lfoKnob3')
    
    {
      dispLfo3.removeChild(dispLfo3.childNodes[0]);
      lfoFreq3=gradi.indexOf(deg);
      var n3 = Number((lfoFreqArray[lfoFreq3]).toFixed(2));
      var textnode =document.createTextNode(String(n3)+ " Hz") ;         
      dispLfo3.appendChild(textnode); 
      
      for(i=0;i< lfo3Array.length;i++){
        if(lfo3Array[i]!=undefined)
          lfo3Array[i].frequency.value=lfoFreqArray[lfoFreq3];
      }
      periodLfo3=1/n3;
      if(turnOnLfo3){
        lfoButton3.style.animation= "neon "+ periodLfo3 + "s ease-in-out infinite";
      }
    }
  
  if(name=='dTimeKnob'){
    
     dTime=gradi.indexOf(deg);
      delay.delayTime.value = delayTimeArray[dTime];
  }
   
  
  if(name=='dGainKnob'){
    dGain=gradi.indexOf(deg);
    delayGain.gain.value=delayGainArray[dGain];
  }
  
  
  if(name=='mKnob'){
    masterGainIndex = gradi.indexOf(deg);
    gainMaster.gain.value = selectedGain[masterGainIndex];
     
    if( masterGainIndex==0 && counterMute=='0') {
      activateMute();
      counterMute++;
    }
    if( masterGainIndex!=0 && counterMute!='0'){
      activateMute();
      counterMute=0;
     
    }
  }
    
  if(name=='filtFreqKnob'){
    freqFiltIndex=gradi.indexOf(deg);
    filter.frequency.value=filterFreqArray[freqFiltIndex];
    
    
  }
  
  /*if(name=='filtQKnob'){
    qFiltIndex=gradi.indexOf(deg);
    filter.Q.value=filterQArray[qFiltIndex];
    
    
  }*/
  
  if(name=='distDriveKnob'){
    driveIndex=gradi.indexOf(deg);
    drive=distortionDriveArray[driveIndex];
    changeParametDistortion(drive);
  }
  
  if(name=='reverbDWKnob'){
    reverbDWIndex=gradi.indexOf(deg);
    DW=reverbDWArray[reverbDWIndex];
    mixDW(DW);
  }
}




function moveKnob(name){

let spinner = document.getElementById(name);
    //feedback = document.getElementById('feedback')
let x,
    y,
    saveX=0,
    saveY=0,
    startX,
    startY,
    diffX,
    diffY,
    calculate=false,
    tryFlag=true,
    firstDeg,
    oldDelta,
    delta,
    hold = false,
    indice=0
spinner.addEventListener('mousedown',function(e){
  hold = true;
  calculate=true;
  startX = e.clientX;
  startY = e.clientY;
  indice=0;
  
})
window.addEventListener('mouseup',function(e){
  if (hold){
    
    if(tryFlag){
    saveX=diffX;
    saveY=diffY;}
    hold = false;
    delta=oldDelta;
    
  }
  
})
window.addEventListener('mousemove',function(e){
  diffX=0;
  diffY=0;
  if (hold){
     diffX= e.clientX - startX + saveX;
     diffY= e.clientY - startY + saveY;
    
    delta = Math.abs(diffX) > Math.abs(diffY) ? -diffX : diffY;
    if(tryFlag){
  
    firstDeg = (Math.round(-delta/15) * 15);
    firstDeg=firstDeg%360;
    if(firstDeg<0)
      firstDeg=360-Math.abs(firstDeg);
    oldDelta=delta;
    }
    
    if((firstDeg>=0 && firstDeg<=135) || (firstDeg>=225 && firstDeg<=360)){
      deg=firstDeg;
      
      calculateDeg(deg, name);
      
      
      if(deg==225){ 
        calculateCoord();
        if(delta>=oldDelta) tryFlag=false;
        else tryFlag=true;
      }
      
      if(deg==135){
        
        calculateMax();
        
        if(delta<=oldDelta) tryFlag=false;
        else tryFlag=true;
        
        
        
      }
      
    
      
    
    spinner.style.transform = `translateY(-50%) rotate(${deg}deg)`
    
    
    
    
    }
  
  }
  
  
})


function calculateMax(){
  if(indice==0)
    {
      saveX=diffX;
      saveY=diffY;
      
    }
  indice++;
  
}

function calculateCoord(){
  if(calculate){
  saveX=diffX;
  saveY=diffY;}
  calculate=false;
}

}

function expandSelect(id){
    var select_flag = document.getElementById('select_flag1').value;
        if(select_flag==1){
            var select_box = document.getElementById(id);
            if(id.selectedIndex=="2") {o1.type= 'square'}
            document.getElementById('select_flag1').value = 0;
        }else{
            var select_box = document.getElementById(id);
            select_box.size = select_box.options.length; 
            document.getElementById('select_flag1').value = 1;
        }
   }


function initializeVariables(){
  
        for(var i=0;i<25;i++) {
        tones[i] = Math.round(262*Math.pow(2,1/12)**i);
        steps[i] = document.querySelector("#s"+i);
        mouseSteps[i] = "s"+i;
        }
      keys="q2w3er5t6y7uzsxdcvgbhnjm,"
  
  
       for(i=0;i<10;i++){
       gradi[i] = 225+i*15;
     }
     k=10;
     for(i=0;i<10;i++){
       gradi[k] = 0+i*15;
       k++;
     }
     
     numGain=1/gradi.length;
     j = 0;
     for(i=0;i<=20;i++){
       selectedGain[i] = j;
       j+=numGain;
     }
     
     
     
     
     for(i=0; i<gradi.length; i++){
       attackArray[i] = stepAttack*i;  
     }
     
     for(i=0; i<gradi.length; i++){
       releaseArray[i] = stepRelease*i;  
     }
     
     for(i=0; i<gradi.length; i++){
       lfoFreqArray[i] = stepLfo*(i+1);
     }
     
     for(i=0; i<gradi.length;i++){
       delayTimeArray[i] = stepTimeDelay*i;
     }
     
     for(i=0; i<gradi.length;i++){
       delayGainArray[i] = stepGainDelay*i;
     }
     
     
     filterFreqArray =[20,28.7690,41.3828,59.5270,85.6266,123.1696,177.1734,254.855,366.5961,527.3302,758.538,1091.1189,1569.5199,2257.6757,3247.5534,4671.4429,6719.6365,9665.8604,13904.8559,20000];
     
     
     /*for(i=0; i<gradi.length;i++){
       filterQArray[i] = stepQFilter*i+0.0001;
     }*/
     
     for(i=0; i<gradi.length;i++){
       distortionDriveArray[i] = stepDriveDistortion *i;
     }
    
    for(i=0; i<gradi.length;i++){
       reverbDWArray[i] = stepDW *i;
     }
  
  
  for(i=0;i<88;i++){
    midiArray[i]=24+i;
    midiArrayFreq[i] = Math.round(32.7*Math.pow(2,1/12)**i);
    arpMidiEventsArray[i]=-1;
  }
  
  for(i=0; i<tones.length;i++){
    arpEventsArray[i]=-1;
  }
  
  notesNamesArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];  
  
   notesNamesArrayBis = ["C", "Db/C#", "D", "Eb/D#", "E", "F", "Gb/F#", "G", "Ab/G#", "A", "Bb/A#", "B"]; 
    
    
    
    
    
  
  Maj7=[2, 2, 1, 2, 2, 2];
  Seven=[2,2,1,2,2,1];
  Delta7=[2,1,2,2,2,2];
  SevenMin=[2,1,2,2,2,1];
  
  Maj7Aug=[2,2,1,3,1,3];
  SevenAug=[2,2,1,3,1,1];
  Delta7Aug=[2,1,2,3,1,2];
  SevenMinAug=[2,1,2,3,1,1];
  
  Maj7Bem = [2,2,1,1,3,2];
  SevenBem = [2,2,1,1,3,1];
  Delta7Bem = [2,1,2,1,3,2];
  Semidim = [2,1,2,1,3,1];
  
  Dim=[2,1,2,1,1,2];
  
  delayGain.gain.value=delayGainArray[dGain];
  delay.delayTime.value = delayTimeArray[dTime];
  gainMaster.gain.value = selectedGain[masterGainIndex];
  periodLfo1=lfoFreqArray[lfoFreq1];
  periodLfo2=lfoFreqArray[lfoFreq2];
  periodLfo3=lfoFreqArray[lfoFreq3];
  drive=distortionDriveArray[driveIndex];
  freqFilt=filterFreqArray[freqFiltIndex];
  qFilt=filterQArray[qFiltIndex];
  DW=reverbDWArray[reverbDWIndex];
  
  filter.type = "lowpass";
  filter.frequency.value = filterFreqArray[10];
  filter.Q.value = 20;
  
  changeParametDistortion(drive);
  
  resetLearnVariables();
 
  
  moveKnob('vol1');
  moveKnob('vol2');
  moveKnob('vol3');
  moveKnob('att1');
  moveKnob('rel1');
  moveKnob('att2');
  moveKnob('rel2');
  moveKnob('att3');
  moveKnob('rel3');
  moveKnob('lfoKnob1');
  moveKnob('lfoKnob2');
  moveKnob('lfoKnob3');
  moveKnob('dTimeKnob');
  moveKnob('dGainKnob');
  moveKnob('filtFreqKnob');
  //moveKnob('filtQKnob');
  moveKnob('distDriveKnob');
  moveKnob('reverbDWKnob');
  moveKnob('mKnob');
    
}



function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;
    }

function getMIDIMessage(midiMessage) {

    if(midiFlag){
    
     if(midiMessage.data[0]==144){
       k = midiArray.indexOf(midiMessage.data[1])
       if(!arpFlag && !improFlag){
         attackMidi(midiMessage.data);
         clickOnKeyBoard(steps[k%24])
       }
       
       else if(arpFlag || improFlag){
          
            arpMidiEventsArray[k] = midiMessage;
         
         
            clickOnKeyBoard(steps[k%24])
            changeDisplayChord("-");
            insertNotes();
         
         
       }
        
     }
   
  
    if(midiMessage.data[0]==128){
       k = midiArray.indexOf(midiMessage.data[1])
      if(!arpFlag && !improFlag){
        releaseMidi(midiMessage.data);
        clickOnKeyBoard(steps[k%24])
      }
      
      else if(arpFlag || improFlag){
        
        
            
            clickOnKeyBoard(steps[k%24])
            arpMidiEventsArray[k] = -1;
            
            deleteNotes(midiMessage);
            changeDisplayChord("-");
            arpIndex=0;   //everytime we delete a note, the arp starts from the beginning
            improIndex=0;
       
      }
        
    }
      
    
    
      
    }
      
  
}


navigator.requestMIDIAccess()
    .then(onMIDISuccess);



function attackMidi(data){
  
    
    
    k=data[1];
  
    freqM = midiArrayFreq[midiArray.indexOf(k)];
  
    if(turnOn1 && !turnOn2 && !turnOn3){
      
        attack1(freqM, selectedGain[f1], attackArray[atk1])
        
    }
    
    if(!turnOn1 && turnOn2 && !turnOn3){
      
        attack2(freqM, selectedGain[f2], attackArray[atk2])
         
    }
    
    if(!turnOn1 && !turnOn2 && turnOn3){
        attack3(freqM, selectedGain[f3], attackArray[atk3])
        
    }
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(freqM, selectedGain[f1], attackArray[atk1])
        attack2(freqM, selectedGain[f2], attackArray[atk2])
        
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(freqM, selectedGain[f2], attackArray[atk2])
        attack3(freqM, selectedGain[f3], attackArray[atk3])
        
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(freqM, selectedGain[f1], attackArray[atk1])
        attack3(freqM, selectedGain[f3], attackArray[atk3])
        
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(freqM, selectedGain[f1], attackArray[atk1])
        attack2(freqM, selectedGain[f2], attackArray[atk2])
        attack3(freqM, selectedGain[f3], attackArray[atk3])
       
    }
    
   
   
  
  
}

function releaseMidi(data){

  k=data[1];
  freqM=midiArrayFreq[midiArray.indexOf(k)];
  index = midiArrayFreq.indexOf(freqM);
  
  
  release1(freqM, index, releaseArray[rel1]);
  
  if(turnOn1 && !turnOn2 && !turnOn3){
        release1(freqM, index, releaseArray[rel1]);
    }
    
    if(!turnOn1 && turnOn2 && !turnOn3){
        release2(freqM, index, releaseArray[rel2]);
    }
    
    if(!turnOn1 && !turnOn2 && turnOn3){
        release3(freqM, index, releaseArray[rel3]);
        
    }
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(freqM, index, releaseArray[rel1]);
        release2(freqM, index, releaseArray[rel2]);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(freqM, index, releaseArray[rel2]);
        release3(freqM, index, releaseArray[rel3]);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(freqM, index, releaseArray[rel1]);
        release3(freqM, index, releaseArray[rel3]);
        
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(freqM, index, releaseArray[rel1]);
        release2(freqM, index, releaseArray[rel2]);
        release3(freqM, index, releaseArray[rel3]);
       
    }
  
}

function activateMidi(){
  
  midiFlag=!midiFlag;
  changeColorMidi();
  
}

function changeColorMidi(){
  midiButton.classList.toggle("midiActive");
}


function activateArp(){
  arpFlag=!arpFlag;
  if(arpFlag && improFlag){
    activateImpro();
  }
  changeColorArp();
  
}

function changeColorArp(){
  arpButton.classList.toggle("arpActive");
}

function activateImpro(){
  improFlag=!improFlag;
  if(improFlag && arpFlag){
    activateArp();
  }
  
  changeColorImpro();
  
}

function changeColorImpro(){
  improviserButton.classList.toggle("improActive");
  
}


function improvvisator(){
  random=Math.floor(Math.random() * 100); //integer from 0 to 100
  if(improIndex==0){    //dalla prima nota a..
    if (random>=0  && random<10){
    return 0
  }
  else if (random>=10  && random<20){
    return 1
  }
  else if (random>=20  && random<30){
    return 2
  }
  else if (random>=30  && random<40){
    return 3
  }
  else if (random>=40  && random<70){
    return 4
  }
  else if (random>=70  && random<80){
    return 5
  }
  else if (random>=80  && random<100){
    return 6
  }  
  }
  
  
  else if(improIndex==1){    //dalla seconda nota a..
    if (random>=0  && random<5){
    return 0
  }
  else if (random>=5  && random<10){
    return 1
  }
  else if (random>=10  && random<20){
    return 2
  }
  else if (random>=20  && random<45){
    return 3
  }
  else if (random>=45  && random<70){
    return 4
  }
  else if (random>=70  && random<80){
    return 5
  }
  else if (random>=80  && random<100){
    return 6
  }  
  }
  
  else if(improIndex==2){    //dalla terza nota a..
    if (random>=0  && random<25){
    return 0
  }
  else if (random>=25  && random<30){
    return 1
  }
  else if (random>=30  && random<45){
    return 2
  }
  else if (random>=45  && random<50){
    return 3
  }
  else if (random>=50  && random<80){
    return 4
  }
  else if (random>=80  && random<85){
    return 5
  }
  else if (random>=85  && random<100){
    return 6
  }  
  }
  
  else if(improIndex==3){    //dalla quarta nota a..
    if (random>=0  && random<15){
    return 0
  }
  else if (random>=15  && random<25){
    return 1
  }
  else if (random>=25  && random<35){
    return 2
  }
  else if (random>=35  && random<55){
    return 3
  }
  else if (random>=55  && random<65){
    return 4
  }
  else if (random>=65  && random<90){
    return 5
  }
  else if (random>=90  && random<100){
    return 6
  }  
  }
  
  else if(improIndex==4){    //dalla quinta nota a..
    if (random>=0  && random<35){
    return 0
  }
  else if (random>=35  && random<40){
    return 1
  }
  else if (random>=40  && random<60){
    return 2
  }
  else if (random>=60  && random<65){
    return 3
  }
  else if (random>=65  && random<75){
    return 4
  }
  else if (random>=75  && random<80){
    return 5
  }
  else if (random>=80  && random<100){
    return 6
  }  
  }
  
  else if(improIndex==5){    //dalla sesta nota a..
    if (random>=0  && random<50){
    return 0
  }
  else if (random>=50  && random<60){
    return 1
  }
  else if (random>=60  && random<65){
    return 2
  }
  else if (random>=65  && random<70){
    return 3
  }
  else if (random>=70  && random<90){
    return 4
  }
  else if (random>=90  && random<95){
    return 5
  }
  else if (random>=95  && random<100){
    return 6
  }  
  }
  
  else if(improIndex==6){    //dalla settima nota a..
    if (random>=0  && random<40){
    return 0
  }
  else if (random>=40  && random<55){
    return 1
  }
  else if (random>=55  && random<65){
    return 2
  }
  else if (random>=65  && random<70){
    return 3
  }
  else if (random>=70  && random<90){
    return 4
  }
  else if (random>=90  && random<95){
    return 5
  }
  else if (random>=95  && random<100){
    return 6
  }  
  }
  
  
}




function changeOctave(x){
  
  if(x=='+'){
    if(octaveIndex<5){
      octaveIndex++;
      changeOctaveTones();
    }
  }
  
  if(x=='-'){
    if(octaveIndex>0){
      octaveIndex--;
      changeOctaveTones();
    }
  }
  changeOctaveDisplay()
}

function changeOctaveDisplay(){
  text=String(octaveIndex)
   octaveDisplay.removeChild(octaveDisplay.childNodes[0]);
   var textnode =document.createTextNode(text) ;  
   octaveDisplay.appendChild(textnode); 
  
}

function changeOctaveTones(){
  var firstFreq;
  
  if(octaveIndex==0) firstFreq=66;
  else if(octaveIndex==1) firstFreq=131;
  else if(octaveIndex==2) firstFreq=262;
  else if(octaveIndex==3) firstFreq=523;
  else if(octaveIndex==4) firstFreq=1046;
  else if(octaveIndex==5) firstFreq=2093;
  
  for(var i=0;i<tones.length;i++) {
        tones[i] = Math.round(firstFreq*Math.pow(2,1/12)**i);
        
        }
}

function activateImproLearn(){
   improLearnFlag = !improLearnFlag; 
    changeColorImproLearn();

}

function changeColorImproLearn(){
    improLearnButton.classList.toggle("improLearnActive")
    
}

var time=0;
function activateClock(){
    startLearn=true;
    time=0
    
    timeInterval = setInterval(timeFunction, 1000)
    
}

function timeFunction(){
    thisTime=60-time;
    if(time<=10){
        console.log(thisTime);
        time++;
    }
    
    if(time==11){
        
        clearInterval(timeInterval);            
        startLearn=false;
        triggerChord=false;
        
        calculateProbabilities();
        
        //learnInterval = setInterval(improLearnPlay,200);
        
    
    }
        
}

function calculateProbabilities(){
    
    
    
    if (d1>0){
        
        if(lastNote==0 && d1>1)   d1--;
        
        
        p11 = Math.round((v11/d1) *100);
        p12 = Math.round((v12/d1) *100);    p12=p11+p12;      
        p13 = Math.round((v13/d1) *100);    p13=p12+p13;
        p14 = Math.round((v14/d1) *100);    p14=p13+p14;
        p15 = Math.round((v15/d1) *100);    p15=p14+p15;
        p16 = Math.round((v16/d1) *100);    p16=p15+p16;
        p17 = Math.round((v17/d1) *100);    p17=p16+p17;
        
        
    }  
    if (d2>0){
        
        if(lastNote==1 && d2>1)   d2--;
        
        
        p21 = Math.round((v21/d2) *100);    
        p22 = Math.round((v22/d2) *100);   p22=p21+p22; 
        p23 = Math.round((v23/d2) *100);   p23=p22+p23; 
        p24 = Math.round((v24/d2) *100);   p24=p23+p24; 
        p25 = Math.round((v25/d2) *100);   p25=p24+p25; 
        p26 = Math.round((v26/d2) *100);   p26=p25+p26; 
        p27 = Math.round((v27/d2) *100);   p27=p26+p27;
        
    }        
    if (d3>0){
        
        if(lastNote==2 && d3>1)   d3--;
        
        
        p31 = Math.round((v31/d3) *100);    
        p32 = Math.round((v32/d3) *100);    p32=p31+p32;
        p33 = Math.round((v33/d3) *100);    p33=p32+p33;
        p34 = Math.round((v34/d3) *100);    p34=p33+p34;
        p35 = Math.round((v35/d3) *100);    p35=p34+p35;
        p36 = Math.round((v36/d3) *100);    p36=p35+p36;
        p37 = Math.round((v37/d3) *100);    p37=p36+p37;
        
        
        
    }        
    if (d4>0){
        
        if(lastNote==3 && d4>1)   d4--;
        
        
        p41 = Math.round((v41/d4) *100);
        p42 = Math.round((v42/d4) *100);    p42=p41+p42;
        p43 = Math.round((v43/d4) *100);    p43=p42+p43;
        p44 = Math.round((v44/d4) *100);    p44=p43+p44;
        p45 = Math.round((v45/d4) *100);    p45=p44+p45;
        p46 = Math.round((v46/d4) *100);    p46=p45+p46;
        p47 = Math.round((v47/d4) *100);    p47=p46+p47;
        
        
        
        
    }       
    if (d5>0){
        
        if(lastNote==4 && d5>1)   d5--;
        
        
        p51 = Math.round((v51/d5) *100);
        p52 = Math.round((v52/d5) *100);    p52=p51+p52;
        p53 = Math.round((v53/d5) *100);    p53=p52+p53;
        p54 = Math.round((v54/d5) *100);    p54=p53+p54;
        p55 = Math.round((v55/d5) *100);    p55=p54+p55;
        p56 = Math.round((v56/d5) *100);    p56=p55+p56;
        p57 = Math.round((v57/d5) *100);    p57=p56+p57;
        
    }        
    if (d6>0){
        
        if(lastNote==5 && d6>1)   d6--;
        
        
        p61 = Math.round((v61/d6) *100);
        p62 = Math.round((v62/d6) *100);    p62=p61+p62;
        p63 = Math.round((v63/d6) *100);    p63=p62+p63;
        p64 = Math.round((v64/d6) *100);    p64=p63+p64;
        p65 = Math.round((v65/d6) *100);    p65=p64+p65;
        p66 = Math.round((v66/d6) *100);    p66=p65+p66;
        p67 = Math.round((v67/d6) *100);    p67=p66+p67;
        
        
    }        
    if (d7>0){
        
        if(lastNote==6 && d7>1)   d7--;
        
        
        p71 = Math.round((v71/d7) *100);
        p72 = Math.round((v72/d7) *100);    p72=p71+p72;
        p73 = Math.round((v73/d7) *100);    p73=p72+p73;
        p74 = Math.round((v74/d7) *100);    p74=p73+p74;
        p75 = Math.round((v75/d7) *100);    p75=p74+p75;
        p76 = Math.round((v76/d7) *100);    p76=p75+p76;
        p77 = Math.round((v77/d7) *100);    p77=p76+p77;
        
       
    } 
    
    
        
   
    
    
}


function improLearnPlay(){
    
    
    attackFunction(improArray[learnIndex]);
    changeDisplayNote(improArray[learnIndex]);
    releaseFunction(improArray[learnIndex]);
   
  
  
    learnIndex = improvvisatorLearn()
    
}



function improvvisatorLearn(){
    
    console.log(learnIndex);
    
    
    if(learnIndex==0){    
      random=Math.floor(Math.random() * p17); 
      
    if (random>=0  && random<p11){
    return 0
  }
  else if (random>=p11  && random<p12){
    return 1
  }
  else if (random>=p12  && random<p13){
    return 2
  }
  else if (random>=p13  && random<p14){
    return 3
  }
  else if (random>=p14  && random<p15){
    return 4
  }
  else if (random>=p15  && random<p16){
    return 5
  }
  else if (random>=p16  && random<p17){
    return 6
  }  
  }
    
    if(learnIndex==1){    
      random=Math.floor(Math.random() * p27); 
      
    if (random>=0  && random<p21){
    return 0
  }
  else if (random>=p21  && random<p22){
    return 1
  }
  else if (random>=p22  && random<p23){
    return 2
  }
  else if (random>=p23  && random<p24){
    return 3
  }
  else if (random>=p24  && random<p25){
    return 4
  }
  else if (random>=p25  && random<p26){
    return 5
  }
  else if (random>=p26  && random<p27){
    return 6
  }  
  }
    
    if(learnIndex==2){    
      random=Math.floor(Math.random() * p37); 
      
    if (random>=0  && random<p31){
    return 0
  }
  else if (random>=p31  && random<p32){
    return 1
  }
  else if (random>=p32  && random<p33){
    return 2
  }
  else if (random>=p33  && random<p34){
    return 3
  }
  else if (random>=p34  && random<p35){
    return 4
  }
  else if (random>=p35  && random<p36){
    return 5
  }
  else if (random>=p36  && random<p37){
    return 6
  }  
  }
    
    if(learnIndex==3){    
      random=Math.floor(Math.random() * p47); 
      
    if (random>=0  && random<p41){
    return 0
  }
  else if (random>=p41  && random<p42){
    return 1
  }
  else if (random>=p42  && random<p43){
    return 2
  }
  else if (random>=p43  && random<p44){
    return 3
  }
  else if (random>=p44  && random<p45){
    return 4
  }
  else if (random>=p45  && random<p46){
    return 5
  }
  else if (random>=p46  && random<p47){
    return 6
  }  
  }
    
    if(learnIndex==4){    
      random=Math.floor(Math.random() * p57); 
      
    if (random>=0  && random<p51){
    return 0
  }
  else if (random>=p51  && random<p52){
    return 1
  }
  else if (random>=p52  && random<p53){
    return 2
  }
  else if (random>=p53  && random<p54){
    return 3
  }
  else if (random>=p54  && random<p55){
    return 4
  }
  else if (random>=p55  && random<p56){
    return 5
  }
  else if (random>=p56  && random<p57){
    return 6
  }  
  }
    
    if(learnIndex==5){    
      random=Math.floor(Math.random() * p67); 
      
    if (random>=0  && random<p61){
    return 0
  }
  else if (random>=p61  && random<p62){
    return 1
  }
  else if (random>=p62  && random<p63){
    return 2
  }
  else if (random>=p63  && random<p64){
    return 3
  }
  else if (random>=p64  && random<p65){
    return 4
  }
  else if (random>=p65  && random<p66){
    return 5
  }
  else if (random>=p66  && random<p67){
    return 6
  }  
  }
    
    if(learnIndex==6){    
      random=Math.floor(Math.random() * p77); 
      
    if (random>=0  && random<p71){
    return 0
  }
  else if (random>=p71  && random<p72){
    return 1
  }
  else if (random>=p72  && random<p73){
    return 2
  }
  else if (random>=p73  && random<p74){
    return 3
  }
  else if (random>=p74  && random<p75){
    return 4
  }
  else if (random>=p75  && random<p76){
    return 5
  }
  else if (random>=p76  && random<p77){
    return 6
  }  
  }
    
    
    
}


function resetLearnVariables(){

   
    
    v11=0, v12=0, v13=0, v14=0, v15=0, v16=0, v17=0;
    v21=0, v22=0, v23=0, v24=0, v25=0, v26=0, v27=0;
    v31=0, v32=0, v33=0, v34=0, v35=0, v36=0, v37=0;
    v41=0, v42=0, v43=0, v44=0, v45=0, v46=0, v47=0;
    v51=0, v52=0, v53=0, v54=0, v55=0, v56=0, v57=0;
    v61=0, v62=0, v63=0, v64=0, v65=0, v66=0, v67=0;
    v71=0, v72=0, v73=0, v74=0, v75=0, v76=0, v77=0;
    
    
    d1=0, d2=0, d3=0, d4=0, d5=0, d6=0, d7=0;
    
    totNotes=0;
    
    
    p11=0, p12=0, p13=0, p14=0, p15=0, p16=0, p17=0;
    p21=0, p22=0, p23=0, p24=0, p25=0, p26=0, p27=0;
    p31=0, p32=0, p33=0, p34=0, p35=0, p36=0, p37=0;
    p41=0, p42=0, p43=0, p44=0, p45=0, p46=0, p47=0;
    p51=0, p52=0, p53=0, p54=0, p55=0, p56=0, p57=0;
    p61=0, p62=0, p63=0, p64=0, p65=0, p66=0, p67=0;
    p71=0, p72=0, p73=0, p74=0, p75=0, p76=0, p77=0;
    
}


// First, let's shim the requestAnimationFrame API, with a setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();

function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    current16thNote++;    // Advance the beat number, wrap to zero
    
}


/*function changeColorClickDot(x) {
    if(x==1) 
    else if(x==2) dotClicked2.classList.toggle("clicked");
}*/


function scheduleNote( beatNumber, time ) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );
    
     if ( (noteResolution==1) && (beatNumber%2))
        return; // we're not playing non-8th 16th notes
    if ( (noteResolution==2) && (beatNumber%4))
        return; // we're not playing non-quarter 8th notes

    // create an oscillator
    var osc = audioContext.createOscillator();
    osc.connect( audioContext.destination );
            
    
    if(metric==0){
         osc.frequency.value = 880.0;
         dotClicked1.classList.toggle("selected");
         setTimeout(function() {dotClicked1.classList.toggle("selected")},70);
    }
    
    if(metric==1){
        max=4;
        if (beatNumber % 4 === 0) {   // beat 0 == high pitch
            osc.frequency.value = 880.0;
            dotClicked1.classList.toggle("selected");
            setTimeout(function() {dotClicked1.classList.toggle("selected")},70);
        }
        else {
            osc.frequency.value = 220.0;
            dotClicked3.classList.toggle("clicked");
            setTimeout(function() {dotClicked3.classList.toggle("clicked")},70);
        }
    }
    
    if(metric==2){
         max=8;
        if (beatNumber ==0) {   // beat 0 == high pitch
            osc.frequency.value = 880.0;
            dotClicked1.classList.toggle("selected");
            setTimeout(function() {dotClicked1.classList.toggle("selected")},70);
        }
    else if (beatNumber % 4 === 0 ){    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
            dotClicked2.classList.toggle("selected1");
            setTimeout(function() {dotClicked2.classList.toggle("selected1")},70);
        }
    else {                       // other 16th notes = low pitch
        osc.frequency.value = 220.0;
        dotClicked3.classList.toggle("clicked");
        setTimeout(function() {dotClicked3.classList.toggle("clicked")},70);
        }
    }
    
    if(metric==3){
        max=12;
        if (beatNumber== 0){   // beat 0 == high pitch
            osc.frequency.value = 880.0;
            dotClicked1.classList.toggle("selected");
            setTimeout(function() {dotClicked1.classList.toggle("selected")},70);
        }
    else if (beatNumber % 4 === 0 ) {    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
            dotClicked2.classList.toggle("selected1");
            setTimeout(function() {dotClicked2.classList.toggle("selected1")},70);
        }
    else{                       // other 16th notes = low pitch
        osc.frequency.value = 220.0;
        dotClicked3.classList.toggle("clicked");
        setTimeout(function() {dotClicked3.classList.toggle("clicked")},70);
        }
        
   }
    if(metric==4){
        max=16;
        if (beatNumber== 0){   // beat 0 == high pitch
            osc.frequency.value = 880.0;
            dotClicked1.classList.toggle("selected");
            setTimeout(function() {dotClicked1.classList.toggle("selected")},70);
        }
    else if (beatNumber % 4 === 0 ) {    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
            dotClicked2.classList.toggle("selected1");
            setTimeout(function() {dotClicked2.classList.toggle("selected1")},70);
        }
    else{                       // other 16th notes = low pitch
        osc.frequency.value = 220.0;
        dotClicked3.classList.toggle("clicked");
        setTimeout(function() {dotClicked3.classList.toggle("clicked")},70);
        }
    }
     if(metric==5){
         max=20;
         if (beatNumber== 0){   // beat 0 == high pitch
            osc.frequency.value = 880.0;
            dotClicked1.classList.toggle("selected");
            setTimeout(function() {dotClicked1.classList.toggle("selected")},70);
        }
    else if (beatNumber % 4 === 0 ) {    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
            dotClicked2.classList.toggle("selected1");
            setTimeout(function() {dotClicked2.classList.toggle("selected1")},70);
        }
    else{                       // other 16th notes = low pitch
        osc.frequency.value = 220.0;
        dotClicked3.classList.toggle("clicked");
        setTimeout(function() {dotClicked3.classList.toggle("clicked")},70);
        }
   }
     if(metric==6){
         max=28;
         if (beatNumber== 0){   // beat 0 == high pitch
            osc.frequency.value = 880.0;
            dotClicked1.classList.toggle("selected");
            setTimeout(function() {dotClicked1.classList.toggle("selected")},70);
        }
    else if (beatNumber % 4 === 0 ) {    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
            dotClicked2.classList.toggle("selected1");
            setTimeout(function() {dotClicked2.classList.toggle("selected1")},70);
        }
    else{                       // other 16th notes = low pitch
        osc.frequency.value = 220.0;
        dotClicked3.classList.toggle("clicked");
        setTimeout(function() {dotClicked3.classList.toggle("clicked")},70);
        }
     }

if(muteFlag1==false){
    osc.start( time );
    osc.stop( time + noteLength );}
}



function scheduler() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
        scheduleNote(current16thNote%max, nextNoteTime );
        nextNote();
    }
}

function play() {
    if (!unlocked) {
      // play silent buffer to unlock the audio
      var buffer = audioContext.createBuffer(1, 1, 22050);
      var node = audioContext.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      unlocked = true;
    }

    isPlaying = !isPlaying;

    if (isPlaying) { // start playing
        current16thNote = 0;
        nextNoteTime = audioContext.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        timerWorker.postMessage("stop");
        return "play";
    }
}



function init(){

    audioContext = new AudioContext();

    timerWorker = new Worker("js/metroworker.js");

    timerWorker.onmessage = function(e) {
        if (e.data == "tick") {
            scheduler();
        }
        else
            console.log("message: " + e.data);
    };
    timerWorker.postMessage({"interval":lookahead});
}

window.addEventListener("load", init );







































{
  var impulseResponse = "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";}