var cMaster;
var analyser1, analyser2, analyser3;
var o1Array = [], o2Array = [], o3Array = [];
var lfo1Array = [], lfo2Array=[], lfo3Array=[];
var lfo1Gain=[], lfo2Gain=[], lfo3Gain=[];
var n = 0;
var f1=10,f2=10,f3=10;      //index of the current grade calcualted by "calculateDeg" function
var atk1=1, atk2=1, atk3=1;
var rel1=1, rel2=1, rel3=1;
var gradi = [];
var selectedGain = [];
var deg=0;
var sel1= document.getElementById("select_box1");
var sel2= document.getElementById("select_box2");
var sel3= document.getElementById("select_box3");
var firstTime=true;
var turnOn1=false, turnOn2=false, turnOn3=false;
var gates1=[], gates2=[], gates3=[];
sel1.disabled=true;
sel2.disabled=true;
sel3.disabled=true;
var clicked= false;
var cMaster = new AudioContext();
var gainMaster= cMaster.createGain();
gainMaster.connect(cMaster.destination);

    
    var lfoFreq=5;

var stepAttack=0.1;       //step between each possible attack level
var stepRelease=0.15;      //step between each possible relase level
var attackArray = [];     //array of attack levels
var releaseArray = [];    //array of release levels




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
      lfo.frequency.value=lfoFreq;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfoGain.gain.value=0.01
  
      lfo1Gain[freq]=lfoGain;
      lfo1Array[freq]=lfo;
      now = cMaster.currentTime;
      lfo1Gain[freq].gain.linearRampToValueAtTime(selGain,now+atkTime);
      
      return lfo;
      
}


function lfoCreate1(g, freq, nOsc, selGain, atkTime){
      
      lfo=cMaster.createOscillator();
      lfoGain=cMaster.createGain();
      lfo.frequency.value=lfoFreq;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfoGain.gain.value=0;
  
      lfo1Gain[freq]=lfoGain;
      
      now = cMaster.currentTime;
      lfo1Gain[freq].gain.linearRampToValueAtTime(selGain,now+atkTime);
      
      return lfo;
      
}

function lfoCreate2(g, freq, nOsc, selGain, atkTime){
      
      lfo=cMaster.createOscillator();
      lfoGain=cMaster.createGain();
      lfo.frequency.value=lfoFreq;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfoGain.gain.value=0.01
  
      lfo2Gain[freq]=lfoGain;
      
      now = cMaster.currentTime;
      lfo2Gain[freq].gain.linearRampToValueAtTime(selGain,now+atkTime);
      
      return lfo;
      
}


function lfoCreate3(g, freq, nOsc, selGain, atkTime){
      
      lfo=cMaster.createOscillator();
      lfoGain=cMaster.createGain();
      lfo.frequency.value=lfoFreq;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfoGain.gain.value=0.1;
  
      lfo3Gain[freq]=lfoGain;
      
      now = cMaster.currentTime;
      lfo3Gain[freq].gain.linearRampToValueAtTime(selGain,now+atkTime);
      
      return lfo;
      
}




function attack1(freq ,selGain, atkTime) {

  
  
  var o1;
  o1 = cMaster.createOscillator();
  g = cMaster.createGain();
  
  lfo1= lfoCreate1(g,freq,0, selGain, atkTime);   //0 è l'indice nell'array lfo
  
  o1.connect(g);
  g.connect(analyser1);
  //analyser1.connect(gainMaster);
  analyser1.connect(analyserF);
  o1.frequency.value = freq;
  g.gain.value = 0;
  
  var now = cMaster.currentTime;
  //g.gain.linearRampToValueAtTime(selGain,now+atkTime);
  gates1[freq] = g;
  
  o1Array[tones.indexOf(freq)] = o1;    //save the value of the actual note (oscillator)
  lfo1Array[tones.indexOf(freq)] = lfo1;  //save the value of the lfo of the actual note (oscillator)
  
  if (sel1.options.selectedIndex=="0") {o1.type='sine'}
  if (sel1.options.selectedIndex=="1") {o1.type='triangle'}
  if (sel1.options.selectedIndex=="2") {o1.type='square'}
   if (sel1.options.selectedIndex=="3") {o1.type='sawtooth'}
 
  lfo1Array[tones.indexOf(freq)].start();
  o1.start();
   
}



function release1(freq, i, relTime) { 
  
  //gates1[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  lfo1Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);   //release of the lfo
  
  o1Array[i].stop(cMaster.currentTime+relTime+0.2);     
  lfo1Array[i].stop(cMaster.currentTime+relTime+0.2);     //delete the current lfo
}



function attack2(freq ,selGain, atkTime) {
  var o2;
  o2 = cMaster.createOscillator();
  g = cMaster.createGain();
  
  lfo2= lfoCreate2(g,freq,0, selGain, atkTime);
  
  o2.connect(g);
  g.connect(analyser2);
  analyser2.connect(analyserF);
  o2.frequency.value = freq;
  g.gain.value = 0;
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+atkTime);
  gates2[freq] = g;
  
  lfo2Array[tones.indexOf(freq)] = lfo2;
  o2Array[tones.indexOf(freq)] = o2;
  
  lfo2Array[tones.indexOf(freq)].start();
  o2.start();
  if (sel2.options.selectedIndex=="0") {o2.type='sine'}
  if (sel2.options.selectedIndex=="1") {o2.type='triangle'}
  if (sel2.options.selectedIndex=="2") {o2.type='square'}
   if (sel2.options.selectedIndex=="3") {o2.type='sawtooth'}
}

function release2(freq, i, relTime) { 
  gates2[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  lfo2Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  
  o2Array[i].stop(cMaster.currentTime+relTime+0.2);
  lfo2Array[i].stop(cMaster.currentTime+relTime+0.2);
}


function attack3(freq ,selGain, atkTime) {
  var o3;
  o3 = cMaster.createOscillator();
  g = cMaster.createGain();
  
  lfo3= lfoCreate3(g,freq,0, selGain, atkTime);
  
  o3.connect(g);
  g.connect(analyser3);
  analyser3.connect(analyserF);
  o3.frequency.value = freq;
  g.gain.value = 0;
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+atkTime);
  gates3[freq] = g;
  
  lfo3Array[tones.indexOf(freq)] = lfo3;
  o3Array[tones.indexOf(freq)] = o3;
  
  lfo3Array[tones.indexOf(freq)].start();
  o3.start();
  if (sel3.options.selectedIndex=="0") {o3.type='sine'}
  if (sel3.options.selectedIndex=="1") {o3.type='triangle'}
  if (sel3.options.selectedIndex=="2") {o3.type='square'}
   if (sel3.options.selectedIndex=="3") {o3.type='sawtooth'}
}

function release3(freq, i, relTime) { 
  gates3[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  lfo3Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  
  
  o3Array[i].stop(cMaster.currentTime+relTime+0.2);
  lfo3Array[i].stop(cMaster.currentTime+relTime+0.2);
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


function drawSamples1(){
  analyser1.getByteTimeDomainData(dataArray);
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
  analyserF = cMaster.createAnalyser();
  analyserF.connect(gainMaster);
  bufferLength = analyserF.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  
  
}

function drawSamplesFreq(){
  analyserF.getByteFrequencyData(dataArray);//spettro di frequenza, mentre se fosse getByteTimeDomainData vedrei invece il segnale nel tempo
  
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






tones = [] //note
steps = [] //tasti
mouseSteps = []; //tasti cliccati col mouse
for(var i=0;i<25;i++) {
  tones[i] = Math.round(262*Math.pow(2,1/12)**i);
  steps[i] = document.querySelector("#s"+i);
  mouseSteps[i] = "s"+i;
  }
//keys = "qwertyuiopasdfghjklzxcvbn";
//keys = "awsedftgyhujkolpòà+ùzxcvb"
keys="q2w3er5t6y7uzsxdcvgbhnjm,"

document.querySelectorAll(".step").forEach(toggleStep)

function toggleStep(step){  
   step.onmousedown= function (step) {
     if(!step.repeat) {
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
    if(!step.repeat){
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
          if(clicked==true) {
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





document.onkeydown = function(e) {  
  if(!e.repeat){
    clickOnKeyBoard(steps[keys.indexOf(e.key)])
    
    if(turnOn1 && !turnOn2 && !turnOn3)
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1], attackArray[atk1])
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2], attackArray[atk2])
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3], attackArray[atk3])
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1], attackArray[atk1])
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2], attackArray[atk2])
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2], attackArray[atk2])
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3], attackArray[atk3])
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1], attackArray[atk1])
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3], attackArray[atk3])
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1], attackArray[atk1])
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2], attackArray[atk2])
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3], attackArray[atk3])
    }
    
  }
}


document.onkeyup = function(e) {   
  clickOnKeyBoard(steps[keys.indexOf(e.key)]);
  
  if(turnOn1 && !turnOn2 && !turnOn3)
        release1(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel1]);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        release2(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel2]);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        release3(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel3]);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel1]);
        release2(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel2]);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel2]);
        release3(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel3]);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel1]);
        release3(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel3]);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel1]);
        release2(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel2]);
        release3(tones[keys.indexOf(e.key)], keys.indexOf(e.key), releaseArray[rel3]);
    }
  
}


function clickOnKeyBoard(step){
  step.classList.toggle("clicked-step")  
}








function calculateDeg(deg,name){
  if(name=='vol1')
    f1= gradi.indexOf(deg);
  if(name=='vol2')
    f2= gradi.indexOf(deg);
   if(name=='vol3')
    f3= gradi.indexOf(deg);
  
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
  
}




moveKnob('vol1');
moveKnob('vol2');
moveKnob('vol3');
moveKnob('att1');
moveKnob('rel1');
moveKnob('att2');
moveKnob('rel2');
moveKnob('att3');
moveKnob('rel3');

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
        //if(indice==0){console.log(indice);
                      //indice++;}
        //calculateCoord(); 
        if(delta<=oldDelta) tryFlag=false;
        else tryFlag=true;
        //console.log(indice);
        
        
      }
      
    
      
    
    spinner.style.transform = `translateY(-50%) rotate(${deg}deg)`
    //feedback.innerHTML = deg;
    
    
    
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
  //console.log(indice);
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