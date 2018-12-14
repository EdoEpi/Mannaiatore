var cMaster;
var analyser1, analyser2, analyser3;
var o1Array = [], o2Array = [], o3Array = [];
var lfo1Array = [], lfo2Array=[], lfo3Array=[];
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
var filterQArray=[];
var distortionDriveArray=[];
var filterFreqArray=[];
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
var f1=10,f2=10,f3=10;      //index of the current grade calcualted by "calculateDeg" function
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
var freqFiltIndex=10;
var qFiltIndex=10;
var driveIndex=10;
var periodLfo1;
var periodLfo2;
var periodLfo3;              
var flagEffect='000';
var freqFilt;
var qFilt;
var drive;
var counterMute=0;
var arpIndex=0;
var tonica;
var modo;
var improIndex=0;
var octaveIndex=2;
    
var sel1= document.getElementById("select_box1");
var sel2= document.getElementById("select_box2");
var sel3= document.getElementById("select_box3");
var selLfo1 = document.getElementById("selLfo1");
var selLfo2 = document.getElementById("selLfo2");
var selLfo3 = document.getElementById("selLfo3");
var dispLfo1=document.getElementById("dispLfo1");
var muteButton=document.getElementById("muteBut");
var midiButton=document.getElementById("midiButt");
var arpButton=document.getElementById("arpButton");
var chordDisplay=document.getElementById("chordDisp");
var improviserButton=document.getElementById("improviserButton");
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
var muteFlag=false;
var midiFlag=false;
var arpFlag=false;
var chordFlag=false;
var improFlag=false;


var cMaster = new AudioContext();
var gainMaster= cMaster.createGain();
var delay = cMaster.createDelay(4);
var delayGain = cMaster.createGain();
var distortion = cMaster.createWaveShaper();
var filter = cMaster.createBiquadFilter();
var dryGain=cMaster.createGain();
var analyserF = cMaster.createAnalyser();
dryGain.connect(gainMaster);
gainMaster.connect(analyserF);
analyserF.connect(cMaster.destination);


setInterval(arpPlay, 200)
setInterval(improPlay, 200)


initializeVariables();



function insertEffect(){
  
  disconnectEffect();
  
  if (!effectDelay && !effectFilter && !effectDistortion){
    dryGain.connect(gainMaster);
    flagEffect='000';
  }
  
  if (effectDelay && !effectFilter && !effectDistortion){
    dryGain.connect(gainMaster);
    dryGain.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    delay.connect(gainMaster);
    flagEffect='100';
  }
  
  if (!effectDelay && effectFilter && !effectDistortion){
    dryGain.connect(filter);
    filter.connect(gainMaster);
    flagEffect='010';
  }
  
  if (!effectDelay && !effectFilter && effectDistortion){
    dryGain.connect(distortion);
    distortion.connect(gainMaster);
    flagEffect='001';
  }
  
  if (effectDelay && effectFilter && !effectDistortion){
    dryGain.connect(filter);
    dryGain.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    delay.connect(filter);
    filter.connect(gainMaster);
    flagEffect='110';
  }
  
  if (effectDelay && !effectFilter && effectDistortion){
    dryGain.connect(distortion);
    dryGain.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    delay.connect(distortion);
    distortion.connect(gainMaster);
    flagEffect='101';
  }
  
  if (!effectDelay && effectFilter && effectDistortion){
    dryGain.connect(filter);
    filter.connect(distortion);
    distortion.connect(gainMaster);
    flagEffect='011';
  }
  
  if (effectDelay && effectFilter && effectDistortion){
    dryGain.connect(filter);
    dryGain.connect(delay);
    delayGain.connect(delay);
    delay.connect(delayGain);
    delay.connect(filter);
    filter.connect(distortion);
    distortion.connect(gainMaster);
    flagEffect='111';
  }
  
}


function disconnectEffect(){
  
  if (flagEffect=='000'){
    dryGain.disconnect(gainMaster);
  }
    
  
  if (flagEffect=='100'){
    dryGain.disconnect(gainMaster);
    dryGain.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    delay.disconnect(gainMaster);
    
    
  }
  
  if (flagEffect=='010'){
    dryGain.disconnect(filter);
    filter.disconnect(gainMaster);
    
  }
 
  
  if (flagEffect=='001'){
    dryGain.disconnect(distortion);
    distortion.disconnect(gainMaster);
    
  }
  
  if (flagEffect=='110'){
    dryGain.disconnect(filter);
    dryGain.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    delay.disconnect(filter);
    filter.disconnect(gainMaster);
    
  }
 
  
  if (flagEffect=='101'){
    dryGain.disconnect(distortion);
    dryGain.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    delay.disconnect(distortion);
    distortion.disconnect(gainMaster);
  }
  
  if (flagEffect=='011'){
    dryGain.disconnect(filter);
    filter.disconnect(distortion);
    distortion.disconnect(gainMaster);
  }
  
  if (flagEffect=='111'){
    dryGain.disconnect(filter);
    dryGain.disconnect(delay);
    delayGain.disconnect(delay);
    delay.disconnect(delayGain);
    delay.disconnect(filter);
    filter.disconnect(distortion);
    distortion.disconnect(gainMaster);
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

function activateMute(){
  if(!(muteFlag && masterGainIndex==0)){
  muteFlag=!muteFlag;
  changeColorMute();
  
  if(muteFlag){
    gainMaster.gain.value = 0;
  }
  else{
    gainMaster.gain.value = selectedGain[masterGainIndex];
  }
    
  }
}

function changeColorMute(){
  muteButton.classList.toggle("muteActive");
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
    var primo = keys.indexOf(arpOrderedArray[0].key);
    var secondo = keys.indexOf(arpOrderedArray[1].key);
    var terzo = keys.indexOf(arpOrderedArray[2].key);
  
    third = keys.indexOf(arpOrderedArray[1].key) - keys.indexOf(arpOrderedArray[0].key);
    fifth = keys.indexOf(arpOrderedArray[2].key) - keys.indexOf(arpOrderedArray[1].key);
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
        var primo = keys.indexOf(arpMidiOrderedArray[0].key);
        var secondo = keys.indexOf(arpMidiOrderedArray[1].key);
        var terzo = keys.indexOf(arpMidiOrderedArray[2].key);
        var quarto = keys.indexOf(arpMidiOrderedArray[3].key);
    }   
  
 
  
  third = secondo - primo;
  fifth = terzo - secondo;
  seventh = quarto - terzo;
  
  
  if (third==4 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Maj7");
    tonica=arpOrderedArray[0];
    modo="Maj7";
    
  }
  
  else if (third==4 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7");
    tonica=arpOrderedArray[0];
    modo="Seven";
  }
  
  else if (third==3 && fifth==4 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Δ7");
    tonica=arpOrderedArray[0];
    modo="Delta7";
  }
  
  else if (third==3 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7-");
    tonica=arpOrderedArray[0];
    modo="SevenMin";
  }
  
  else if (third==4 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Maj7 aug");
    tonica=arpOrderedArray[0];
    modo="Maj7Aug";
  }
  
  else if (third==4 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7 aug");
    tonica=arpOrderedArray[0];
    modo="SevenAug";
  }
  
  else if (third==3 && fifth==5 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Δ7 aug");
    tonica=arpOrderedArray[0];
    modo="Delta7Aug";
  }
  
  else if (third==3 && fifth==5 && seventh==2){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7- aug");
    tonica=arpOrderedArray[0];
    modo="SevenMinAug";
  }
  
  else if (third==4 && fifth==2 && seventh==5){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Maj7 (5b)");
    tonica=arpOrderedArray[0];
    modo="Maj7Bem";
  }
  
  else if (third==4 && fifth==2 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " 7 (5b)" + "/" + notesNamesArray[terzo%notesNamesArray.length] + " 7 (5b) 2nd  inversion");
    tonica=arpOrderedArray[0];
    modo="SevenBem";
  }
  
  else if (third==3 && fifth==3 && seventh==5){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " Δ7 (5b)");
    tonica=arpOrderedArray[0];
    modo="Delta7Bem";
  }
  
  else if (third==3 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " ø");
    tonica=arpOrderedArray[0];
    modo="Semidim";
  }
  
  ////PRIMO RIVOLTO
  
  
  if (third==3 && fifth==4 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Maj7 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Maj7";
  }
  
  else if (third==3 && fifth==3 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Seven";
  }
  
  else if (third==4 && fifth==4 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Δ7 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Delta7";
  }
  
  else if (third==4 && fifth==3 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7- 1st inversion");
    tonica=arpOrderedArray[3];
    modo="SevenMin";
  }
  
  else if (third==4 && fifth==3 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Maj7 aug 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Maj7Aug";
  }
  
  else if (third==4 && fifth==2 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7 aug 1st inversion");
    tonica=arpOrderedArray[3];
    modo="SevenAug";
  }
  
  else if (third==5 && fifth==3 && seventh==1){
    changeDisplayChordchangeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Δ7 aug 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Delta7Aug";
  }
  
  else if (third==5 && fifth==2 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7- aug 1st inversion");
    tonica=arpOrderedArray[3];
    modo="SevenMinAug";
  }
  
  else if (third==2 && fifth==5 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Maj7 (5b) 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Maj7Bem";
  }
  
  else if (third==2 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " 7 (5b) 1st inversion" + "/" + notesNamesArray[secondo%notesNamesArray.length] + " 7 (5b) 3rd inversion");
    tonica=arpOrderedArray[3];
    modo="SevenBem";
  }
  
  else if (third==3 && fifth==5 && seventh==1){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " Δ7 (5b) 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Delta7Bem";
  }
  
  else if (third==3 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " ø 1st inversion");
    tonica=arpOrderedArray[3];
    modo="Semidim";
  }
  
  
  
  //////// SECONDO RIVOLTO
  
  
  if (third==4 && fifth==1 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Maj7 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="Maj7";
  }
  
  else if (third==3 && fifth==2 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="Seven";
  }
  
  else if (third==4 && fifth==1 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Δ7 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="Delta7";
  }
  
  else if (third==3 && fifth==2 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7- 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="SevenMin";
  }
  
  else if (third==3 && fifth==1 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Maj7 aug 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="Maj7Aug";
  }
  
  else if (third==2 && fifth==2 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7 aug 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="SevenAug";
  }
  
  else if (third==3 && fifth==1 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Δ7 aug 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="Delta7Aug";
  }
  
  else if (third==2 && fifth==2 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7- aug 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="SevenMinAug";
  }
  
  else if (third==5 && fifth==1 && seventh==4){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Maj7 (5b) 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="Maj7Bem";
  }
  
  else if (third==4 && fifth==2 && seventh==4){
    //changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " 7 (5b) 2nd  inversion");
  }
  
  else if (third==5 && fifth==1 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " Δ7 (5b) 2nd  inversion");
    tonica=arpOrderedArray[2];
    modo="Delta7Bem";
  }
  
  else if (third==4 && fifth==2 && seventh==3){
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " ø 2nd inversion");
    tonica=arpOrderedArray[2];
    modo="Semidim";
  }
  
  
  //////// TERZO RIVOLTO
  
  
  if (third==1 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Maj7 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Maj7";
  }
  
  else if (third==2 && fifth==4 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Seven";
  }
  
  else if (third==1 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Δ7 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Delta7";
  }
  
  else if (third==2 && fifth==3 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7- 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="SevenMin";
  }
  
  else if (third==1 && fifth==4 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Maj7 aug 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Maj7Aug";
  }
  
  else if (third==2 && fifth==4 && seventh==4){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7 aug 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="SevenAug";
  }
  
  else if (third==1 && fifth==3 && seventh==5){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Δ7 aug 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Delta7Aug";
  }
  
  else if (third==2 && fifth==3 && seventh==5){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7- aug 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="SevenMinAug";
  }
  
  else if (third==1 && fifth==4 && seventh==2){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Maj7 dim 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Maj7Bem";
  }
  
  else if (third==2 && fifth==4 && seventh==2){
    //changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " 7 (5b) 3rd inversion");
  }
  
  else if (third==1 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " Δ7 dim 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Delta7Bem";
  }
  
  else if (third==2 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " ø 3rd inversion");
    tonica=arpOrderedArray[1];
    modo="Semidim";
  }
  
   else if (third==3 && fifth==3 && seventh==3){
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " °");
     tonica=arpOrderedArray[0];
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
    //chordRecognitionTertian();
    
  }
  
  if(numNotes==3 && !chordFlag){
    //chordRecognitionTriad();
    
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
  
  if(numNotes==4){
    insertImproArray();
  }
  
  
  
}

function insertImproArray(){
  var a =0;
  var index = keys.indexOf(tonica.key);
  if(modo=="Maj7"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Maj7[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="Seven"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Seven[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[(index + a)%(keys.length)]})
      
    }   
  }
  
  else if(modo=="Delta7"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Delta7[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="SevenMin"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenMin[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="Maj7Aug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Maj7Aug[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="SevenAug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenAug[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="Delta7Aug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Delta7Aug[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="SevenMinAug"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenMinAug[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="Maj7Bem"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Maj7Bem[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="SevenBem"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += SevenBem[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="Delta7Bem"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Delta7Bem[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="Semidim"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Semidim[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  else if(modo=="Dim"){
    improArray[0]=tonica;
    
    for(i=1;i<7;i++){
      a += Dim[i-1];
      improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
    }   
  }
  
  
  
  
  improSound();
  
}

function improSound(){
  
  attackFunction(improArray[improIndex]);
  
  changeDisplayNote(improArray[improIndex]);
  
  
  releaseFunction(improArray[improIndex]);
  improIndex = improvvisator();
}

function changeDisplayNote(event){
  var note = (keys.indexOf(event.key))%notesNamesArray.length;
  noteDisplay.removeChild(noteDisplay.childNodes[0]);
   var textnode =document.createTextNode(String(notesNamesArrayBis[note])) ;         
   noteDisplay.appendChild(textnode);
  
}

function improPlay(){
  if(improFlag){
    numNotes=arpOrderedArray.length;
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
  if(!midiFlag &&!arpFlag &&!improFlag){
    attackFunction(e);
  }
  
  if(arpFlag || improFlag ){
    k=keys.indexOf(e.key);
    arpEventsArray[k] = e;
    clickOnKeyBoard(steps[k])
    changeDisplayChord("-");
    insertNotes();
    
 
    
  }
   
  }
  
  
}




function insertNotes(){
  cleanOrdered();   //delete everything from the notesArray everytime we change the array of the events
  var count=0;
  
  //console.log(arpEventsArray);
  
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
  
  if(arpFlag || improFlag){
    clickOnKeyBoard(steps[k])
  arpEventsArray[k] = -1;
    //console.log(arpEventsArray);
  deleteNotes(e);
    changeDisplayChord("-");
  arpIndex=0;   //everytime we delete a note, the arp starts from the beginning
  improIndex=0;
  }
  
  if(!arpFlag && !improFlag){
    releaseFunction(e);
  }
  
  
  
  
  
}

function deleteNotes(e){
    console.log(e);
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
  
  
  for(i=0;i<88;i++){
    midiArray[i]=21+i;
    midiArrayFreq[i] = Math.round(27.5*Math.pow(2,1/12)**i);
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
  
  filter.type = "lowpass";
  filter.frequency.value = filterFreqArray[10];
  filter.Q.value = 20;
  
  changeParametDistortion(drive);
  
  
 
  
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
  moveKnob('mKnob');
}



function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;
    }

function getMIDIMessage(midiMessage) {

    if(midiFlag){
    
     if(midiMessage.data[0]==144){
       if(!arpFlag && !improFlag){
         attackMidi(midiMessage.data);
       }
       
       else if(arpFlag){
          k = midiArray.indexOf(midiMessage.data[1])
            arpMidiEventsArray[k] = midiMessage;
         //console.log(arpMidiEventsArray);
         
            //clickOnKeyBoard(steps[k])
            //changeDisplayChord("-");
            insertNotes();
         //console.log(arpMidiOrderedArray)
         
       }
        
     }
   
  
    if(midiMessage.data[0]==128){
      if(!arpFlag && !improFlag){
        releaseMidi(midiMessage.data);
      }
      
      else if(arpFlag){
        
        //clickOnKeyBoard(steps[k])
            k = midiArray.indexOf(midiMessage.data[1])
            arpMidiEventsArray[k] = -1;
            //console.log(arpEventsArray);
            deleteNotes(midiMessage);
            changeDisplayChord("-");
            arpIndex=0;   //everytime we delete a note, the arp starts from the beginning
            //improIndex=0;
        console.log(arpMidiOrderedArray);
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