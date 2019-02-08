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
var midiO1ImproArray=[], midiO2ImproArray=[], midiO3ImproArray=[];
var arpEventsArray=[];
var arpOrderedArray=[];
var notesNamesArray=[];
var improArray=[];
var arpMidiEventsArray=[];
var arpMidiOrderedArray=[];
var improMidiArray=[];
var triggeredScale=[];
var eventKeys=[];
var metronomeGain=[];

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
var metronomeVolStep=10;
var metronomeActVal;
var v11, v12, v13, v14, v15, v16, v17;              //number of time we cover this interval of notes 
var v21, v22, v23, v24, v25, v26, v27;
var v31, v32, v33, v34, v35, v36, v37;
var v41, v42, v43, v44, v45, v46, v47;
var v51, v52, v53, v54, v55, v56, v57;
var v61, v62, v63, v64, v65, v66, v67;
var v71, v72, v73, v74, v75, v76, v77;
var prevNote, actNote;
var d1, d2, d3, d4, d5, d6, d7;     //how many times is played one notes during learning period
var p11, p12, p13, p14, p15, p16, p17;
var p21, p22, p23, p24, p25, p26, p27;
var p31, p32, p33, p34, p35, p36, p37;
var p41, p42, p43, p44, p45, p46, p47;
var p51, p52, p53, p54, p55, p56, p57;
var p61, p62, p63, p64, p65, p66, p67;
var p71, p72, p73, p74, p75, p76, p77;
var lastNote;
var learnIndex;
var learnInterval;
var capsLock;
var secondsPerBeat = 60.0 / 120;
var learnTimeIndex=0;
var prevLearnIndex;
var time=0;
var thisTime;
var indexTonica;
var actualScale;
var numOctaves;
var prevIndexTraslation=0, prevSign=0;
var counterLearnedNotes=0;
var prevTime, actTime;
var accX=0;
var accY=0;
var accZ=0;
var buttA;
var attackTime=0, releaseTime=0, durationTime=0, currentDuration;
var tryEvent;

var t11=[], t12=[], t13=[], t14=[], t15=[], t16=[], t17=[];
var t21=[], t22=[], t23=[], t24=[], t25=[], t26=[], t27=[];
var t31=[], t32=[], t33=[], t34=[], t35=[], t36=[], t37=[];
var t41=[], t42=[], t43=[], t44=[], t45=[], t46=[], t47=[];
var t51=[], t52=[], t53=[], t54=[], t55=[], t56=[], t57=[];
var t61=[], t62=[], t63=[], t64=[], t65=[], t66=[], t67=[];
var t71=[], t72=[], t73=[], t74=[], t75=[], t76=[], t77=[];


var pt11=[], pt12=[], pt13=[], pt14=[], pt15=[], pt16=[], pt17=[];
var pt21=[], pt22=[], pt23=[], pt24=[], pt25=[], pt26=[], pt27=[];
var pt31=[], pt32=[], pt33=[], pt34=[], pt35=[], pt36=[], pt37=[];
var pt41=[], pt42=[], pt43=[], pt44=[], pt45=[], pt46=[], pt47=[];
var pt51=[], pt52=[], pt53=[], pt54=[], pt55=[], pt56=[], pt57=[];
var pt61=[], pt62=[], pt63=[], pt64=[], pt65=[], pt66=[], pt67=[];
var pt71=[], pt72=[], pt73=[], pt74=[], pt75=[], pt76=[], pt77=[];

var wn1, hn1, qn1, en1, sn1;            //numero di volte che la prima è whole, half..
var wn2, hn2, qn2, en2, sn2; 
var wn3, hn3, qn3, en3, sn3; 
var wn4, hn4, qn4, en4, sn4; 
var wn5, hn5, qn5, en5, sn5; 
var wn6, hn6, qn6, en6, sn6; 
var wn7, hn7, qn7, en7, sn7; 

var pwn1, phn1, pqn1, pen1, psn1;       //probabilità che la prima sia whole, half..
var pwn2, phn2, pqn2, pen2, psn2; 
var pwn3, phn3, pqn3, pen3, psn3; 
var pwn4, phn4, pqn4, pen4, psn4; 
var pwn5, phn5, pqn5, pen5, psn5; 
var pwn6, phn6, pqn6, pen6, psn6; 
var pwn7, phn7, pqn7, pen7, psn7; 


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
var modeDisplay; 
var timerDisplay;



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
var fLI=false;
var learnFlag=true;
var changeImproChordFlag=true;

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
var tempo = 120.0;           // tempo (in beats per minute)
var lookahead = 25.0;       // How frequently to call scheduling function 
                            //(in milliseconds)
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps 
                            // with next interval (in case the timer is late)
var nextNoteTime = 0.0;     // when the next note is due.
var noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note (Click)
var noteResolution2 = 0;    // 0 == 16th, 1 == 8th, 2 == quarter note (Arpeggiator)
var noteLength = 0.05;      // length of "beep" (in seconds)
var canvas,                 // the canvas element
    canvasContext;          // canvasContext is the canvas' context 2D
var last16thNoteDrawn = -1; // the last "box" we drew on the screen
var notesInQueue = [];      // the notes that have been put into the web audio,
                            // and may or may not have played yet. {note, time}
var timerWorker = null;     // The Web Worker used to fire timer messages
var metric=0;
var max=28;
var dotClicked1 = document.getElementById("dotClick1");
var dotClicked2 = document.getElementById("dotClick2");
var dotClicked3 = document.getElementById("dotClick3");
var mood = 0;               // The mood of the arpeggiator (Up, Down, ...)
var Up1=true;               // For mood Up&Down 
var Down1=false;            // firstable Up and then Down
var Up2=false;              // For mood Down&Up 
var Down2=true;             // firstable Down and then Up
var octave1=true;
var octave2=false;






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



function attack1(freq ,selGain, atkTime, zeta) {
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
  if(midiFlag && zeta!=1){
  midiO1Array[midiArrayFreq.indexOf(freq)]= o1;
  }
    if(midiFlag && zeta==1)
        midiO1ImproArray[midiArrayFreq.indexOf(freq)]= o1;
  
  
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

function release1(freq, i, relTime, zeta) { 
  
     gates1[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  
  
  if(!midiFlag){
    o1Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  if(midiFlag && zeta!=1){
    midiO1Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  if(midiFlag && zeta==1)
        midiO1ImproArray[i].stop(cMaster.currentTime+relTime+0.2); 
    
    
 
  if(turnOnLfo1){
  lfo1Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime); 
  lfo1Array[i].stop(cMaster.currentTime+relTime+0.2);
  }
     
}


function attack2(freq ,selGain, atkTime, zeta) {
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
  if(midiFlag && zeta!=1){
  midiO2Array[midiArrayFreq.indexOf(freq)]= o2;
  }
    if(midiFlag && zeta==1)
        midiO2ImproArray[midiArrayFreq.indexOf(freq)]= o2;
  
  
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

function release2(freq, i, relTime, zeta) { 
    
  gates2[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
    
  
  if(midiFlag && zeta!=1){
    midiO2Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  if(!midiFlag){
    o2Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
    if(midiFlag && zeta==1)
        midiO2ImproArray[i].stop(cMaster.currentTime+relTime+0.2); 
  
  if(turnOnLfo2){
    lfo2Gain[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime); 
    lfo2Array[i].stop(cMaster.currentTime+relTime+0.2);}
  
}


function attack3(freq ,selGain, atkTime, zeta) {
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
  if(midiFlag && zeta!=1){
  midiO3Array[midiArrayFreq.indexOf(freq)]= o3;
  }
    if(midiFlag && zeta==1)
        midiO3ImproArray[midiArrayFreq.indexOf(freq)]= o3;
  
  
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

function release3(freq, i, relTime, zeta) { 
  
    gates3[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+relTime);
  
    if(midiFlag && zeta!=1){
    midiO3Array[i].stop(cMaster.currentTime+relTime+0.2); 
  }
  if(!midiFlag ){
    o3Array[i].stop(cMaster.currentTime+relTime+0.2); 
  } 
    if(midiFlag && zeta==1)
        midiO3ImproArray[i].stop(cMaster.currentTime+relTime+0.2); 
  
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
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx1.beginPath();
  for (var i=0; i<canvas1.width; i++) {
    ctx1.lineTo(i,dataArray[i]/2-canvas1.height*0.15)
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
    ctx2.lineTo(i,dataArray[i]/2-canvas2.height*0.15)
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
    ctx3.lineTo(i,dataArray[i]/2-canvas3.height*0.15)
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
    ctxF.moveTo(Math.log10(i)*185 -80 ,canvasFreq.height)
    ctxF.lineTo(Math.log10(i)*185 -80 ,canvasFreq.height-dataArray[i])
    ctxF.lineWidth = 27;
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
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1], 0);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2], 0);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3], 0);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1], 0);
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2], 0);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2], 0);
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3], 0);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1], 0);
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3], 0);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f1], attackArray[atk1], 0);
        attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f2], attackArray[atk2], 0);
        attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f3], attackArray[atk3], 0);
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
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
    }
      clicked=false;
      }}
  }
 step.onmouseout= function(step) {
   var index=mouseSteps.indexOf(step.target.id);
          if(clicked==true &&!midiFlag) {
          step.target.classList.toggle("clicked-step");
            if(turnOn1 && !turnOn2 && !turnOn3)
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel1], 0);
        release2(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel2], 0);
        release3(tones[mouseSteps.indexOf(step.target.id)], index, releaseArray[rel3], 0);
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
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " -Δ7");
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
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " -Δ7 aug");
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
    changeDisplayChord(notesNamesArray[primo%notesNamesArray.length] + " -Δ7 (5b)");
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
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " -Δ7 1st inversion");
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
    changeDisplayChordchangeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " -Δ7 aug 1st inversion");
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
    changeDisplayChord(notesNamesArray[quarto%notesNamesArray.length] + " -Δ7 (5b) 1st inversion");
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
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " -Δ7 2nd inversion");
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
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " -Δ7 aug 2nd inversion");
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
    changeDisplayChord(notesNamesArray[terzo%notesNamesArray.length] + " -Δ7 (5b) 2nd  inversion");
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
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " -Δ7 3rd inversion");
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
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " -Δ7 aug 3rd inversion");
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
    changeDisplayChord(notesNamesArray[secondo%notesNamesArray.length] + " -Δ7 dim 3rd inversion");
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
    
    
    if((numNotes==4 || numNotes%4==0) && !chordFlag){
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
  
    indexTonica = index;        //global reference
    
  if(modo=="Maj7"){
    improArray[0]=tonica;
    actualScale = Maj7;
      
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
    actualScale = Seven;
      
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
    actualScale = Delta7;
      
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
    actualScale = SevenMin;
      
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
    actualScale = Maj7Aug;
      
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
    actualScale = SevenAug;
      
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
    actualScale = Delta7Aug;
      
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
    actualScale = SevenMinAug;
      
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
    actualScale = Maj7Bem;
      
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
    actualScale = SevenBem;
      
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
    actualScale = Delta7Bem;
      
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
    actualScale = Semidim;
      
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
    actualScale = Dim;
      
    for(i=1;i<7;i++){
      a += Dim[i-1];
      if(!midiFlag)   
        improArray[i] = new KeyboardEvent("keydown",{key: keys[index + a]})
      
      else if(midiFlag){
        
        improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[index+a],64])});
      }
      
    }   
  }
  
  
  

  
  
}

function findFirstLearnIndex(){
    if (d1>0) learnIndex=0;
    else if (d2>0) learnIndex=1;
    else if (d3>0) learnIndex=2;
    else if (d4>0) learnIndex=3;
    else if (d5>0) learnIndex=4;
    else if (d6>0) learnIndex=5;
    else if (d7>0) learnIndex=6;
}



function changeImproArray(){
    
    var indexTraslation, sign=0;
        
    
    if(accX>=-2023 && accX<-900){
        indexTraslation=6;
        sign=1;
    }
    
    else if(accX>=-900 && accX<-750){
        indexTraslation=5;
        sign=1;
    }
    
    else if(accX>=-750 && accX<-600){
        indexTraslation=4;
        sign=1;
    }
    
    else if(accX>=-600 && accX<-450){
        indexTraslation=3;
        sign=1;
    }
    
    else if(accX>=-450 && accX<-300){
        indexTraslation=2;
        sign=1;
    }
    
    else if(accX>=-300 && accX<-150){
        indexTraslation=1;
        sign=1;
    }
    
    
    
    else if(accX>=-150 && accX<150)    {
        indexTraslation=0;
        sign=0;
    }
    
    else if(accX>=150 && accX<300) {
        indexTraslation=1;
        sign=0;
    }
    
    else if(accX>=300 && accX<450) {
        indexTraslation=2;
        sign=0;
    }
    
    else if(accX>=450 && accX<600) {
        indexTraslation=3;
        sign=0;
    }
    
    else if(accX>=600 && accX<750) {
        indexTraslation=4;
        sign=0;
    }
    
    else if(accX>=750 && accX<900) {
        indexTraslation=5;
        sign=0;
    }
    
    else if(accX>=900 && accX<=2023) {
        indexTraslation=6;
        sign=0;
    }
    
    
    if(indexTraslation!=prevIndexTraslation || sign!=prevSign){
        setNewImproArray(indexTraslation, sign);
        changeModeDisplay(indexTraslation, sign);
        prevIndexTraslation = indexTraslation;
        prevSign = sign;
    }
    
    
    
}



function setNewImproArray(t, sign){
    
    var a=0, k=0, trans=0, actTonica=0, changedScale=[];
    
    removeColorImproScale();
    
    if(sign==1){
        for(i=0;i<t;i++) trans += actualScale[(7-t+i)%actualScale.length];
        
        actTonica = indexTonica - trans;
        
        for(i=0;i<7;i++) changedScale[i] = actualScale[(7-t+i)%actualScale.length];
        
        
    } 
    
    else if(sign==0) {
        actTonica = indexTonica
        changedScale = actualScale;
    }
    
    
    
    
    //load the scale
    for(i=0;i<7;i++){
            
        
        if(sign==0){
            for(j=0;j<t+k;j++){
                a += changedScale[j%7];
                
                }
        }
        
        else{
            for(j=0;j<k;j++)
                a+=changedScale[j%7];
        }
            
            
        
        //if(!midiFlag) improArray[i] = new KeyboardEvent("keydown",{key: keys[(actTonica + a)%keys.length]})
        if(midiFlag) improArray[i] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,midiArray[actTonica+a]%(midiArray.length+24),64])});
        
            k+=1;
            a=0;
        }
    
    
    
    changeColorImproScale();
    
    
}

function changeModeDisplay(index, sign){
    
    modeDisplay = document.getElementById("modeDisp");
    
    var textnode;
    
    if      (index==0 && sign==0)                               textnode = document.createTextNode("MODE IONIAN") ;  
    
    else if ((index==1 && sign==0) || (index==6 && sign==1))    textnode = document.createTextNode("MODE DORIAN") ;
    
    else if ((index==2 && sign==0) || (index==5 && sign==1))    textnode = document.createTextNode("MODE PHRYGIAN") ;
    
    else if ((index==3 && sign==0) || (index==4 && sign==1))    textnode = document.createTextNode("MODE LYDIAN") ;
    
    else if ((index==4 && sign==0) || (index==3 && sign==1))    textnode = document.createTextNode("MODE MIXOLYDIAN") ;
    
    else if ((index==5 && sign==0) || (index==2 && sign==1))    textnode = document.createTextNode("MODE AEOLIAN") ;
    
    else if ((index==6 && sign==0) || (index==1 && sign==1))    textnode = document.createTextNode("MODE LOCRIAN") ;
    
    else if (index==-1 && sign==-1)                             textnode = document.createTextNode(" ") ;
    
        
        modeDisplay.removeChild(modeDisplay.childNodes[0]);   
        modeDisplay.appendChild(textnode);
    
    
}



var lastGlobalNote, lastFlag=true, notesToRelease=[0,0,0,0,0,0,0], actLearnIndex;

var arrayGlob=[];
var iG=0;

async function improSound(){
    var timeRel, durInterval;
    
    if(microBit.connected && midiFlag){
        changeImproArray();
    }
    
  if (!fLI){
      findFirstLearnIndex();
      fLI=!fLI;
      //console.log(fLI,learnIndex);
  }
    
    prevLearnIndex = learnIndex;
    
  if(!midiFlag){
    attackFunction(improArray[learnIndex]);
    notesToRelease[learnIndex]++;
    if(lastFlag==false){
        releaseFunction(improArray[learnIndex]);
        notesToRelease[learnIndex]--;
    }
    
      
    changeDisplayNote(improArray[learnIndex]);
    currentDuration=improvvisatorDurationTime(learnIndex);
    
    if(lastFlag==true){
          
        lastFlag=false;
        lastGlobal = improArray[learnIndex];
        timeRel = convertNumToTime(currentDuration);
        
      
        durInterval = setTimeout(tryRelFunction, timeRel/1.45);  
      
        function tryRelFunction(){
            releaseFunction(lastGlobal);
            notesToRelease[learnIndex]--;
            lastFlag=true;
        }
    }   
    
  }
  
  else if(midiFlag){
      
      
    
        
        
        /*actLearnIndex = learnIndex;
        
        attackMidi(improArray[actLearnIndex].data);
        
        
        notesToRelease[actLearnIndex]++;
      
        if(lastFlag==false)   {
            releaseMidi(improArray[actLearnIndex].data);
            notesToRelease[actLearnIndex]--;
        }
          
        
          
        changeDisplayNote(improArray[actLearnIndex]);
        currentDuration=improvvisatorDurationTime(actLearnIndex);
        
        
          
          
          if(lastFlag==true){
              
            
            notesToRelease[actLearnIndex]--;
            
              
            timeRel = convertNumToTime(currentDuration);
            
          
            setTimeout(function(){tryRelFunctionMidi(actLearnIndex);}, timeRel/2);  
          
            function tryRelFunctionMidi(param1){
                
                    console.log(param1);
                    lastFlag=false;
                    releaseMidi(improArray[param1].data);
                
                
                    //notesToRelease[actLearnIndex]++;
                
                    lastFlag=true;

                
                
            }
        } 
      
        
    }*/  
      
        /*actLearnIndex = learnIndex;
        attackMidi(improArray[actLearnIndex].data);
        changeDisplayNote(improArray[actLearnIndex]);
        currentDuration=improvvisatorDurationTime(actLearnIndex);
        timeRel = convertNumToTime(currentDuration);
        
        if(arrayGlob[iG]==undefined)
            arrayGlob[iG]=actLearnIndex;
        
        
        setTimeout(function(){tryRelFunctionMidi(iG);}, timeRel/1.5);  
          
            function tryRelFunctionMidi(param1){
                    
                    console.log(param1);
                    //lastFlag=false;
                    
                    releaseMidi(improArray[param1].data);
                    arrayGlob.splice(0,param2);
                    //iG--;
                    iG++;
                
                    //notesToRelease[actLearnIndex]++;
                
                    lastFlag=true;

                
                
            }*/
        
      /*else{
          
          attackMidi(improArray[learnIndex].data);
          changeDisplayNote(improArray[learnIndex]);
          releaseMidi(improArray[learnIndex].data);
      }*/
    
     
    attackMidi(improArray[learnIndex].data, 1);
    changeDisplayNote(improArray[learnIndex]);
    currentDuration=improvvisatorDurationTime(learnIndex);
    timeRel = convertNumToTime(currentDuration);
    await sleep(timeRel);
    releaseMidi(improArray[learnIndex].data, 1);
    
    
    //async function demo() {
    //    console.log('Taking a break...');
    //    await sleep(timeRel);
    //    console.log('Two seconds later');
    //}


      
      
    
      
    //if(midiFlag)    releaseAll();  
    
    
  
    
    
    
    
    
    
    learnIndex = improvvisatorLearn()
    learnTimeIndex = improvvisatorLearnTime(prevLearnIndex, learnIndex);
    
  }
    
    
    
    
}

function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

function releaseAll(){
    
    
    
    for(i=0;i<notesToRelease.length;i++){
        
        while(notesToRelease[i]>0){
                notesToRelease[i]--;
                releaseMidi(improArray[i].data, 0);
                k = midiArray.indexOf(improArray[i].data[1]);
                clickOnKeyBoard(steps[k%24])
                
            
            
            
        }
        
    }
    
}



function convertNumToTime(x){
    
    var wholeNote = secondsPerBeat*4;
    var halfNote = secondsPerBeat*2;
    var quarterNote = secondsPerBeat;
    var eighthNote = secondsPerBeat/2;
    var sixteenthNote = secondsPerBeat/4;
    
    if      (x == 16)  return wholeNote*1000;
    else if (x == 8)   return halfNote*1000;
    else if (x == 4)   return quarterNote*1000;
    else if (x == 2)   return eighthNote*1000;
    else if (x == 1)   return 0;
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
          if(mood==0) {
              attackFunction(arpOrderedArray[arpIndex]);
              releaseFunction(arpOrderedArray[arpIndex]);
               arpIndex = (arpIndex+1)%numNotes;
          }
          if(mood==1) {
              attackFunction(arpOrderedArray[numNotes-arpIndex-1]);
              releaseFunction(arpOrderedArray[numNotes-arpIndex-1]);
               arpIndex = (arpIndex+1)%numNotes;
          }  
          
          if(mood==2) {
              if(Up1==true) {
                 
                  attackFunction(arpOrderedArray[arpIndex]);
                  releaseFunction(arpOrderedArray[arpIndex]); 
                  if(arpIndex==numNotes-1){
                      Up1=false;
                      Down1=true;
                      arpIndex=0;
                  }
                  else arpIndex = (arpIndex+1)%numNotes;
              }
             else if(Down1==true) {
                  attackFunction(arpOrderedArray[numNotes-arpIndex-1]);
                  releaseFunction(arpOrderedArray[numNotes-arpIndex-1]); 
                  if(arpIndex==numNotes-1){
                      Up1=true;
                      Down1=false;
                      arpIndex=0;
                  }
                 else arpIndex = (arpIndex+1)%numNotes;
              }  
          }
          
          if(mood==3) {
              
              if(Up2==true) {
                  attackFunction(arpOrderedArray[arpIndex]);
                  releaseFunction(arpOrderedArray[arpIndex]); 
                  if(arpIndex==numNotes-1){
                      Up2=false;
                      Down2=true;
                      arpIndex=0;
                  }
                  else arpIndex = (arpIndex+1)%numNotes;
              } 
              else if(Down2==true) {
                  attackFunction(arpOrderedArray[numNotes-arpIndex-1]);
                  releaseFunction(arpOrderedArray[numNotes-arpIndex-1]); 
                  if(arpIndex==numNotes-1){
                      Up2=true;
                      Down2=false;
                      arpIndex=0;
                  }
                 else arpIndex = (arpIndex+1)%numNotes;
              } 
          }
          
      }
  }
    
  
  if(midiFlag){
    if(arpMidiOrderedArray.length>0){
       if(mood==0) {
        attackMidi(arpMidiOrderedArray[arpIndex].data, 0);
        releaseMidi(arpMidiOrderedArray[arpIndex].data, 0);
        arpIndex = (arpIndex+1)%numNotes;
       }
       if(mood==1) {
        attackMidi(arpMidiOrderedArray[numNotes-arpIndex-1].data, 0);
        releaseMidi(arpMidiOrderedArray[numNotes-arpIndex-1].data, 0);
        arpIndex = (arpIndex+1)%numNotes;
       }
        if(mood==2) {
              if(Up1==true) {
                 
                  attackMidi(arpMidiOrderedArray[arpIndex].data, 0);
                  releaseMidi(arpMidiOrderedArray[arpIndex].data, 0); 
                  if(arpIndex==numNotes-1){
                      Up1=false;
                      Down1=true;
                      arpIndex=0;
                  }
                  else arpIndex = (arpIndex+1)%numNotes;
              }
             else if(Down1==true) {
                  attackMidi(arpMidiOrderedArray[numNotes-arpIndex-1].data, 0);
                  releaseMidi(arpMidiOrderedArray[numNotes-arpIndex-1].data, 0); 
                  if(arpIndex==numNotes-1){
                      Up1=true;
                      Down1=false;
                      arpIndex=0;
                  }
                 else arpIndex = (arpIndex+1)%numNotes;
              }  
          }
          
          if(mood==3) {
              
              if(Up2==true) {
                  attackMidi(arpMidiOrderedArray[arpIndex].data, 0);
                  releaseMidi(arpMidiOrderedArray[arpIndex].data, 0); 
                  if(arpIndex==numNotes-1){
                      Up2=false;
                      Down2=true;
                      arpIndex=0;
                  }
                  else arpIndex = (arpIndex+1)%numNotes;
              } 
              else if(Down2==true) {
                  attackMidi(arpMidiOrderedArray[numNotes-arpIndex-1].data, 0);
                  releaseMidi(arpMidiOrderedArray[numNotes-arpIndex-1].data, 0); 
                  if(arpIndex==numNotes-1){
                      Up2=true;
                      Down2=false;
                      arpIndex=0;
                  }
                 else arpIndex = (arpIndex+1)%numNotes;
              } 
          }
    
      }
  }
      
}

document.onkeydown = function(e) {
  
    
    var capsLock = e.getModifierState("CapsLock");
     
    
    
    if(e.key=="CapsLock")
      capsLockFunction(e);
        
    if(isAKey(e)==true){ 
    
  if(!e.repeat && keysTriggered[keys.indexOf(e.key)]==undefined){
      
      
        
      
      if(!midiFlag &&!arpFlag &&!improFlag && !improLearnFlag){
    attackFunction(e);
      
  }
  
      else if(arpFlag && !improLearnFlag){
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
    
      
      else if(improFlag){
          
          
          
          k=keys.indexOf(e.key);
          arpEventsArray[k]=e; 
          insertNotes();
          improLearnChord();
          if(improArray.length==7 && !isPlaying){
              
              play();
              changeImproChordFlag=false;
              
              
          }
          
          if(isPlaying) {
              attackFunction(e);
              releaseFunction(e);
          }
          
          
      }
   
  }
  
    }
}

function isAKey(e){
    
    for(i=0;i<keys.length;i++){
        if(e.key==keys[i])  return true;
    }
    
    return false;
    
}







function capsLockFunction(e){
    
    if(e.type=="keydown"){
        keys="Q2W3ER5T6Y7UZSXDCVGBHNJM,"
        
    }
        
    if(e.type=="keyup"){
        keys="q2w3er5t6y7uzsxdcvgbhnjm,"
    }
}

function learnAlgorithm(e){
    
    var triggeredKey;
    
    if(keyFound(e)==true){
        
        if(!midiFlag)  triggeredKey = triggeredScale.indexOf(e.key);
        else         triggeredKey = triggeredScale.indexOf(e.data[1])
        
        lastNote=triggeredKey;
        
        attackTime = cMaster.currentTime;           //tempo di attacco (gestito nella release)
        
        if(totNotes==0){
            prevNote = ((triggeredKey)%12)+1;
            prevTime = cMaster.currentTime;
        
        }
    
        else{
        
            actNote = ((triggeredKey)%12)+1;
            actTime= cMaster.currentTime;
            
            setLearnedInterval(prevNote,actNote);
            setLearnedTimeInterval(prevNote,actNote,prevTime, actTime);
            
            prevNote = actNote;
            prevTime = actTime;
        }
        
        totNotes++;
        
        counterScaleDegrees(triggeredKey);
         
        
    }
    
    
        
}


function setLearnedTimeInterval(prevNote, actNote, prevTime, actTime){
    
    var i;
    var diff=actTime-prevTime;
    
    i=approximateTime(diff);
    
    
    if      (prevNote==1 && actNote==1)   t11[i]++;
    else if (prevNote==1 && actNote==2)   t12[i]++;
    else if (prevNote==1 && actNote==3)   t13[i]++;
    else if (prevNote==1 && actNote==4)   t14[i]++;
    else if (prevNote==1 && actNote==5)   t15[i]++;
    else if (prevNote==1 && actNote==6)   t16[i]++;
    else if (prevNote==1 && actNote==7)   t17[i]++;
    
    else if (prevNote==2 && actNote==1)   t21[i]++;
    else if (prevNote==2 && actNote==2)   t22[i]++;
    else if (prevNote==2 && actNote==3)   t23[i]++;
    else if (prevNote==2 && actNote==4)   t24[i]++;
    else if (prevNote==2 && actNote==5)   t25[i]++;
    else if (prevNote==2 && actNote==6)   t26[i]++;
    else if (prevNote==2 && actNote==7)   t27[i]++;
    
    else if (prevNote==3 && actNote==1)   t31[i]++;
    else if (prevNote==3 && actNote==2)   t32[i]++;
    else if (prevNote==3 && actNote==3)   t33[i]++;
    else if (prevNote==3 && actNote==4)   t34[i]++;
    else if (prevNote==3 && actNote==5)   t35[i]++;
    else if (prevNote==3 && actNote==6)   t36[i]++;
    else if (prevNote==3 && actNote==7)   t37[i]++;
    
    else if (prevNote==4 && actNote==1)   t41[i]++;
    else if (prevNote==4 && actNote==2)   t42[i]++;
    else if (prevNote==4 && actNote==3)   t43[i]++;
    else if (prevNote==4 && actNote==4)   t44[i]++;
    else if (prevNote==4 && actNote==5)   t45[i]++;
    else if (prevNote==4 && actNote==6)   t46[i]++;
    else if (prevNote==4 && actNote==7)   t47[i]++;
    
    else if (prevNote==5 && actNote==1)   t51[i]++;
    else if (prevNote==5 && actNote==2)   t52[i]++;
    else if (prevNote==5 && actNote==3)   t53[i]++;
    else if (prevNote==5 && actNote==4)   t54[i]++;
    else if (prevNote==5 && actNote==5)   t55[i]++;
    else if (prevNote==5 && actNote==6)   t56[i]++;
    else if (prevNote==5 && actNote==7)   t57[i]++;
    
    else if (prevNote==6 && actNote==1)   t61[i]++;
    else if (prevNote==6 && actNote==2)   t62[i]++;
    else if (prevNote==6 && actNote==3)   t63[i]++;
    else if (prevNote==6 && actNote==4)   t64[i]++;
    else if (prevNote==6 && actNote==5)   t65[i]++;
    else if (prevNote==6 && actNote==6)   t66[i]++;
    else if (prevNote==6 && actNote==7)   t67[i]++;
    
    else if (prevNote==7 && actNote==1)   t71[i]++;
    else if (prevNote==7 && actNote==2)   t72[i]++;
    else if (prevNote==7 && actNote==3)   t73[i]++;
    else if (prevNote==7 && actNote==4)   t74[i]++;
    else if (prevNote==7 && actNote==5)   t75[i]++;
    else if (prevNote==7 && actNote==6)   t76[i]++;
    else if (prevNote==7 && actNote==7)   t77[i]++;
    
    
}


function approximateTime(diff){
    var min;
    var i;
    
    var wholeNote = secondsPerBeat*4;
    var halfNote = secondsPerBeat*2;
    var quarterNote = secondsPerBeat;
    var eighthNote = secondsPerBeat/2;
    var sixteenthNote = secondsPerBeat/4;
    
    var whole = Math.abs(diff-wholeNote);
    var half = Math.abs(diff-halfNote);
    var quarter = Math.abs(diff-quarterNote);
    var eighth = Math.abs(diff-eighthNote);
    var sixteenth = Math.abs(diff-sixteenthNote);
    
    
    min = Math.min(whole,half,quarter,eighth,sixteenth);
    
    
    if(min==whole){     //semibreve
        i=0;
        
    }
    else if(min==half){     //minima
        i=1;
        
    }
    
    else if(min==quarter){      //semiminima
        i=2;
        
    }                    
    else if(min==eighth){       //croma
        i=3;
        
    }    
    else if(min==sixteenth){        //semicroma
        i=4;
        
    } 
    
    return i;
    
            
    
}

function counterScaleDegrees(keyIndex){
    
    if     (keyIndex==0) d1++;
    else if(keyIndex==1) d2++;
    else if(keyIndex==2) d3++;
    else if(keyIndex==3) d4++;
    else if(keyIndex==4) d5++;
    else if(keyIndex==5) d6++;
    else if(keyIndex==6) d7++;
    
    
        
    
}

function keyFound(e){
    
    if(!midiFlag)
        {
            for(i=0;i<triggeredScale.length;i++){
                if(e.key==triggeredScale[i])
                    return true;
            }
    
            return false;
        }
    
    else{
        
            for(i=0;i<triggeredScale.length;i++){
                if(e.data[1]==triggeredScale[i])
                    return true;
            }
    
            return false;
        
        
        
    }
    
    
    
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
    
    
    if(!midiFlag){
        
        if(arpOrderedArray.length==4 && improLearnFlag && !triggerChord){       //start learn
        chordRecognitionTertian();   //triggero l' accordo appena raggiungo 4 note
        insertImproArray();         //triggero la scala su cui far riferimento
        changeColorImproScale();
        triggerChordFunction();
        }
    
        else if(arpOrderedArray.length==4 && improFlag){
            chordRecognitionTertian();   
            insertImproArray();
            changeImproChordFlag=false;
            }
        }
    
    
    else{
        
        if(arpMidiOrderedArray.length==4 && improLearnFlag && !triggerChord){       //start learn
        chordRecognitionTertian();   //triggero l' accordo appena raggiungo 4 note
        insertImproArray();         //triggero la scala su cui far riferimento
        changeColorImproScale();
        triggerChordFunction();
        }
        
        else if(arpMidiOrderedArray.length==4 && improFlag){
            removeColorImproScale();            //rimuovo la scala che c' era prima del cambio 
            chordRecognitionTertian();   
            insertImproArray();
            changeImproChordFlag=false;
            changeColorImproScale();            //disegno la nuova scala
            }
        }
    
        
}
    
    


function triggerChordFunction(){
    triggerChord=true;
    resetLearnVariables();          //resetta tutte le var prima di reiniziare il counter
    activateClock();
    
    
    for(i=0;i<improArray.length;i++){
        if(midiFlag)    triggeredScale[i]=improArray[i].data[1];
        else            triggeredScale[i]=improArray[i].key;
        
    }
    
    
}
var countActualNotes;
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
            
            countActualNotes=count;
         
        } 
        
        addOctaveNotes();
    }
  
    
        
    
  arpIndex=0;   //everytime we add a note, the arp starts from the beginning
  chordFlag=false;
}



function changeArpOctave(){
    
    var x = document.getElementById("selectOctaveArp").value;
    numOctaves = parseInt(x);
    
}
function addOctaveNotes(){
    
    
    tempOct = numOctaves;
    tempInitialSize = arpMidiOrderedArray.length;
    tempSize = tempInitialSize;
    oct = 1;
    
    while (tempOct>1){
        
        for(i=0; i<tempInitialSize; i++){
            
            newVal=arpMidiOrderedArray[i].data[1]+(12*oct); 
            if(newVal<=midiArray[midiArray.length-1])
                arpMidiOrderedArray[i+tempSize] = new MIDIMessageEvent('eventType', { data: new Uint8Array([144,newVal,64])});
        }
        
        tempSize += tempInitialSize;
        tempOct--;
        oct++;
    }
    
    
    
}

function cleanOrdered(){
    if(!midiFlag){
        arpOrderedArray = arpOrderedArray.splice(0,0)
        //improArray = improArray.splice(0,0)
  }
    
    
    if(midiFlag){
        arpMidiOrderedArray = arpMidiOrderedArray.splice(0,0);   
    }
}



document.onkeyup = function(e) {
    
  if(e.key=="CapsLock")
      capsLockFunction(e);

    if(isAKey(e)==true){
  chordFlag = false;
  
  k=keys.indexOf(e.key);
  
    if(arpFlag && !improLearnFlag){
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
        releaseTime = cMaster.currentTime; 
        durationTime = Math.abs(releaseTime - attackTime);
        approxDurationNote(e, durationTime);
    }
        
   
    
    else if(improFlag){
        
        arpEventsArray[k] = -1;
        
        deleteNotes(e);
        changeDisplayChord("-");
        
         
        
    }
  
  
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
        if(!arpFlag){
            
            for(i=0;i<arpMidiOrderedArray.length;i++){
                if(arpMidiOrderedArray[i].data[1]==e.data[1]){
                    arpMidiOrderedArray.splice(i,1);
                
                }
            }
        }
        
        else{
            
            for(i=0;i<(arpMidiOrderedArray.length)/numOctaves;i++){
                
                
                if(arpMidiOrderedArray[i].data[1]==e.data[1]){
                    
                    actData = e.data[1];
                    arpMidiOrderedArray.splice(i,1);
                    
                    for(j=0;j<arpMidiOrderedArray.length;j++){
                        
                        if(arpMidiOrderedArray[j].data[1] == actData+12)
                            arpMidiOrderedArray.splice(j,1);   
                        
                    }
                    
                    for(j=0;j<arpMidiOrderedArray.length;j++){
                        
                        if(arpMidiOrderedArray[j].data[1] == actData+24)
                            arpMidiOrderedArray.splice(j,1);   
                        
                    }
                    
                    for(j=0;j<arpMidiOrderedArray.length;j++){
                        
                        if(arpMidiOrderedArray[j].data[1] == actData+36)
                            arpMidiOrderedArray.splice(j,1);   
                        
                    }
                    
                    
                }
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
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1], 0)
        flagsTriggered[k] ='100';
    }
    
    if(!turnOn1 && turnOn2 && !turnOn3){
      
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2], 0)
         flagsTriggered[k]= '010';
    }
    
    if(!turnOn1 && !turnOn2 && turnOn3){
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3], 0)
        flagsTriggered[k] ='001';
    }
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1], 0)
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2], 0)
        flagsTriggered[k] ='110';
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2], 0)
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3], 0)
        flagsTriggered[k] ='011';
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1], 0)
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3], 0)
        flagsTriggered[k] ='101';
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f1], attackArray[atk1], 0)
        attack2(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f2], attackArray[atk2], 0)
        attack3(tones[keys.indexOf(keysTriggered[k].key)], selectedGain[f3], attackArray[atk3], 0)
       flagsTriggered[k] ='111';
    }
    
    
    
}

function releaseFunction(e){
  if(!midiFlag){
  k=keys.indexOf(e.key);
  
    if(!arpFlag)
        clickOnKeyBoard(steps[keys.indexOf(e.key)]);
  
  if(flagsTriggered[k] == '100'){
                   
    release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1], 0);
     
  }
    
    if(flagsTriggered[k] == '010'){
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2], 0);
      
    }
    
    if(flagsTriggered[k] == '001')
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3], 0);
    
    if(flagsTriggered[k] == '110'){
        release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1], 0);
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2], 0);
    }
    
    if(flagsTriggered[k] == '011'){
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2], 0);
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3], 0);
    }
    
    if(flagsTriggered[k] == '101'){
        release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1], 0);
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3], 0);
    }
    
    if(flagsTriggered[k] == '111'){
        release1(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel1], 0);
        release2(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel2], 0);
        release3(tones[keys.indexOf(keysTriggered[k].key)], keys.indexOf(keysTriggered[k].key), releaseArray[rel3], 0);
    }
  
  keysTriggered[k]=undefined;
  }
}


function clickOnKeyBoard(step){
    if(step!=undefined)
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
    
    if(name=='clickVol'){
        metronomeVolStep = gradi.indexOf(deg);
        metronomeActValue = metronomeGain[metronomeVolStep];
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
     metGain=1/(gradi.length*2);
     j = 0;
     jk=0;
     for(i=0;i<=20;i++){
       selectedGain[i] = j;
       j+=numGain;
     }
    
    for(i=0;i<gradi.length;i++){
        metronomeGain[i] = jk;
        jk+=metGain;
    }
     
     metronomeActValue = metronomeGain[metronomeVolStep];
     
     
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
    
    
    
    
    
  
  Maj7=[2, 2, 1, 2, 2, 2, 1];
  Seven=[2,2,1,2,2,1, 2];
  Delta7=[2,1,2,2,2,2, 1];
  SevenMin=[2,1,2,2,2,1, 2];
  
  Maj7Aug=[2,2,1,3,1,3, 1];
  SevenAug=[2,2,1,3,1,1, 2];
  Delta7Aug=[2,1,2,3,1,2, 1];
  SevenMinAug=[2,1,2,3,1,1, 2];
  
  Maj7Bem = [2,2,1,1,3,2,1];
  SevenBem = [2,2,1,1,3,1,2];
  Delta7Bem = [2,1,2,1,3,2,1];
  Semidim = [2,1,2,1,3,1,2];
  
  Dim=[2,1,2,1,1,2,3];
  
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
  
  numOctaves = 1;
    
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
  moveKnob("clickVol");
    
}



function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;
    }

function getMIDIMessage(midiMessage) {

    if(midiFlag){
    
     if(midiMessage.data[0]==144){
         
       k = midiArray.indexOf(midiMessage.data[1])
       if(!arpFlag && !improFlag && !improLearnFlag){
           
         attackMidi(midiMessage.data, 0);
         clickOnKeyBoard(steps[k%24])
       }
       
       else if(arpFlag && !improLearnFlag){
          
            arpMidiEventsArray[k] = midiMessage;
         
         
            clickOnKeyBoard(steps[k%24])
            changeDisplayChord("-");
            insertNotes();
         
         
       }
         
         
         
         
         else if(improLearnFlag && !startLearn){
          
          noteToReleaseCount++;
             
          if(!triggerChord){
            k=midiArray.indexOf(midiMessage.data[1])
            
            arpMidiEventsArray[k] = midiMessage;
            insertNotes();
              
            improLearnChord();
            
          }
        
      }
      
        else if(improLearnFlag && startLearn){
            attackMidi(midiMessage.data, 0);
            learnAlgorithm(midiMessage);
                
        }
         
         else if(improFlag){
             k=midiArray.indexOf(midiMessage.data[1])
             arpMidiEventsArray[k]= midiMessage;
             insertNotes();
             improLearnChord();
             if(improArray.length==7 && !isPlaying){
                 play();
                 changeImproChordFlag=false;
             }
             if(isPlaying){
                 attackMidi(midiMessage.data, 0);
                 
             }
             
         } 
         
        
     }
   
  
    if(midiMessage.data[0]==128){
       k = midiArray.indexOf(midiMessage.data[1])
      if(!arpFlag && !improFlag && !improLearnFlag){
        releaseMidi(midiMessage.data);
        clickOnKeyBoard(steps[k%24])
      }
      
      else if(arpFlag && !improLearnFlag){
        
        
            
            clickOnKeyBoard(steps[k%24])
            arpMidiEventsArray[k] = -1;
            
            deleteNotes(midiMessage);
            changeDisplayChord("-");
            arpIndex=0;   //everytime we delete a note, the arp starts from the beginning
            improIndex=0;
       
      }
        
        else if(improLearnFlag && noteToReleaseCount>0){
            noteToReleaseCount--;
            arpMidiEventsArray[k] = -1;
            deleteNotes(midiMessage);
              
      }
    
    else if(improLearnFlag && noteToReleaseCount==0){
        releaseMidi(midiMessage.data, 0);
        releaseTime = cMaster.currentTime; 
        durationTime = Math.abs(releaseTime - attackTime);
        approxDurationNote(midiMessage, durationTime);
        }
        
        else if(improFlag){
            
            arpMidiEventsArray[k]=-1;
            deleteNotes(midiMessage);
            changeDisplayChord("-");
            
            if(isPlaying)
                {
                    releaseMidi(midiMessage.data, 0);
                }
            
        }
        
    }
      
    
    
      
    }
      
  
}


navigator.requestMIDIAccess()
    .then(onMIDISuccess);


function approxDurationNote(e, duration){
    
    if(keyFound(e)==true){
        var note;
        
        i=approximateTime(duration);
        if(!midiFlag)  triggeredKey = triggeredScale.indexOf(e.key);
        else         triggeredKey = triggeredScale.indexOf(e.data[1]);
        
        note = ((triggeredKey)%12)+1;
        
        setDurationNote(note, i);
    }
}

function setDurationNote(note,i){
    
    if(note==1){
        if     (i==0)    wn1++;
        else if(i==1)    hn1++;
        else if(i==2)    qn1++;
        else if(i==3)    en1++;
        else if(i==4)    sn1++;
        
    }
    
    else if(note==2){
        if     (i==0)    wn2++;
        else if(i==1)    hn2++;
        else if(i==2)    qn2++;
        else if(i==3)    en2++;
        else if(i==4)    sn2++;
        
    }
    
    else if(note==3){
        if     (i==0)    wn3++;
        else if(i==1)    hn3++;
        else if(i==2)    qn3++;
        else if(i==3)    en3++;
        else if(i==4)    sn3++;
        
    }
    
    else if(note==4){
        if     (i==0)    wn4++;
        else if(i==1)    hn4++;
        else if(i==2)    qn4++;
        else if(i==3)    en4++;
        else if(i==4)    sn4++;
        
    }
    
    else if(note==5){
        if     (i==0)    wn5++;
        else if(i==1)    hn5++;
        else if(i==2)    qn5++;
        else if(i==3)    en5++;
        else if(i==4)    sn5++;
        
    }
    
    else if(note==6){
        if     (i==0)    wn6++;
        else if(i==1)    hn6++;
        else if(i==2)    qn6++;
        else if(i==3)    en6++;
        else if(i==4)    sn6++;
        
    }
    
    else if(note==7){
        if     (i==0)    wn7++;
        else if(i==1)    hn7++;
        else if(i==2)    qn7++;
        else if(i==3)    en7++;
        else if(i==4)    sn7++;
        
    }
    
}

function attackMidi(data, zeta){           //zeta==1 roba suonata durante l' impro del pc
    k=data[1];
    
    if((improFlag && isPlaying) || improLearnFlag){
        j = midiArray.indexOf(k);
        clickOnKeyBoard(steps[j%24]);
    }
    
    
    if(octave2==true) freqM = midiArrayFreq[midiArray.indexOf(k)+12];
    else freqM = midiArrayFreq[midiArray.indexOf(k)];
  
    if(turnOn1 && !turnOn2 && !turnOn3){
      
        attack1(freqM, selectedGain[f1], attackArray[atk1], zeta)
        
    }
    
    if(!turnOn1 && turnOn2 && !turnOn3){
      
        attack2(freqM, selectedGain[f2], attackArray[atk2], zeta)
         
    }
    
    if(!turnOn1 && !turnOn2 && turnOn3){
        attack3(freqM, selectedGain[f3], attackArray[atk3], zeta)
        
    }
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(freqM, selectedGain[f1], attackArray[atk1], zeta)
        attack2(freqM, selectedGain[f2], attackArray[atk2], zeta)
        
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(freqM, selectedGain[f2], attackArray[atk2], zeta)
        attack3(freqM, selectedGain[f3], attackArray[atk3], zeta)
        
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(freqM, selectedGain[f1], attackArray[atk1], zeta)
        attack3(freqM, selectedGain[f3], attackArray[atk3], zeta)
        
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(freqM, selectedGain[f1], attackArray[atk1], zeta)
        attack2(freqM, selectedGain[f2], attackArray[atk2], zeta)
        attack3(freqM, selectedGain[f3], attackArray[atk3], zeta)
       
    }
    
   
   
  
  
}

function releaseMidi(data, zeta){

  k=data[1];
    
    if((improFlag && isPlaying) || improLearnFlag){
        j = midiArray.indexOf(k);
        clickOnKeyBoard(steps[j%24]);
    }
    
  if(octave2==true) freqM = midiArrayFreq[midiArray.indexOf(k)+12];
    else freqM = midiArrayFreq[midiArray.indexOf(k)];
  index = midiArrayFreq.indexOf(freqM);
  
  
 
  
  if(turnOn1 && !turnOn2 && !turnOn3){
        release1(freqM, index, releaseArray[rel1], zeta);
    }
    
    if(!turnOn1 && turnOn2 && !turnOn3){
        release2(freqM, index, releaseArray[rel2], zeta);
    }
    
    if(!turnOn1 && !turnOn2 && turnOn3){
        release3(freqM, index, releaseArray[rel3], zeta);
        
    }
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(freqM, index, releaseArray[rel1], zeta);
        release2(freqM, index, releaseArray[rel2], zeta);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(freqM, index, releaseArray[rel2], zeta);
        release3(freqM, index, releaseArray[rel3], zeta);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(freqM, index, releaseArray[rel1], zeta);
        release3(freqM, index, releaseArray[rel3], zeta);
        
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(freqM, index, releaseArray[rel1], zeta);
        release2(freqM, index, releaseArray[rel2], zeta);
        release3(freqM, index, releaseArray[rel3], zeta);
       
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
  
    if(!isPlaying)
        play();
    
    if(isPlaying && !arpFlag)
        play();
    
    if(!arpFlag){
        document.getElementById("selectOctaveArp").value = 1;
        numOctaves = parseInt(1);
    }
        
}

function changeColorArp(){
  arpButton.classList.toggle("arpActive");
}

function activateImpro(){
    if(improFlag && isPlaying)   play();    //se è acceso spengo pure il metronomo
    
    improFlag=!improFlag;
    
   
    
  if(improFlag && arpFlag){
    activateArp();          //se è accesso l' impro, è spento l' arpeggiatore
  }
    
    if(improFlag && improLearnFlag){
    activateImproLearn();          //se è accesso l' impro, è spento l' arpeggiatore
  }
  
  changeColorImpro();
  changeModeDisplay(-1,-1);
    changeDisplayNote("-");
    
    notesToRelease=[0,0,0,0,0,0,0];
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
    
    
    changeModeDisplay(-1,-1);
    
    if(!improLearnFlag){
        endLearningTime();
        changeDisplayTimer();
    }
    
    if(improFlag && improLearnFlag){
        activateImpro();          //se è accesso l' impro, è spento l' arpeggiatore
  }
}

function changeColorImproLearn(){
    improLearnButton.classList.toggle("improLearnActive")
    
}


function activateClock(){
    startLearn=true;
    time=0
    
    timeInterval = setInterval(timeFunction, 1000)
    
}



function timeFunction(){
    thisTime=59-time;
    if(time<=59){
        changeDisplayTimer();
        time++;
    }
    
    if(time==60){
        
        endLearningTime();
        activateImproLearn()
    }
        
}

function endLearningTime(){
        clearInterval(timeInterval);            
        startLearn=false;
        triggerChord=false;
        
        calculateProbabilities();
        
        
        removeColorImproScale();
        
        changeDisplayChord("-");
        
    
        cleanOrdered();     //cancella l'improArray;
    
}

function changeDisplayTimer(){
    timerDisplay= document.getElementById("timerDisplay");
    
   timerDisplay.removeChild(timerDisplay.childNodes[0]);
   
    if(!improLearnFlag){
        var textnode = document.createTextNode("-") ; 
    }
    else{
        var textnode = document.createTextNode(String(thisTime)) ; 
    }
   timerDisplay.appendChild(textnode);
    
    
  
    
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
    
    
     calculateTimeProbabilities()   
   
    
    
}

function calculateTimeProbabilities(){
    
    for(i=0;i<5;i++){
        if(v11>0)   pt11[i]=Math.round((t11[i]/v11) *100);
        
        if(i>0)     pt11[i]=pt11[i-1]+pt11[i];    
    }
    for(i=0;i<5;i++){
        
        if(v12>0)   pt12[i]=Math.round((t12[i]/v12) *100);
        
        if(i>0)     pt12[i]=pt12[i-1]+pt12[i];    
    }   
    for(i=0;i<5;i++){
        
        if(v13>0)   pt13[i]=Math.round((t13[i]/v13) *100);
        
        if(i>0)     pt13[i]=pt13[i-1]+pt13[i];    
    }
    for(i=0;i<5;i++){
        
        if(v14>0)   pt14[i]=Math.round((t14[i]/v14) *100);
        
        if(i>0)     pt14[i]=pt14[i-1]+pt14[i];    
    }
    for(i=0;i<5;i++){
        
        if(v15>0)   pt15[i]=Math.round((t15[i]/v15) *100);
        
        if(i>0)     pt15[i]=pt15[i-1]+pt15[i];    
    }
    for(i=0;i<5;i++){
        
        if(v16>0)   pt16[i]=Math.round((t16[i]/v16) *100);
        
        if(i>0)     pt16[i]=pt16[i-1]+pt16[i];    
    }
    for(i=0;i<5;i++){
        
        if(v17>0)   pt17[i]=Math.round((t17[i]/v17) *100);
        
        if(i>0)     pt17[i]=pt17[i-1]+pt17[i];    
    }
    
    
    for(i=0;i<5;i++){
        
        if(v21>0)   pt21[i]=Math.round((t21[i]/v21) *100);
        
        if(i>0)     pt21[i]=pt21[i-1]+pt21[i];    
    }
    for(i=0;i<5;i++){
        
        if(v22>0)   pt22[i]=Math.round((t22[i]/v22) *100);
            
        if(i>0)     pt22[i]=pt22[i-1]+pt22[i];    
    }
    for(i=0;i<5;i++){
        
        if(v23>0)   pt23[i]=Math.round((t23[i]/v23) *100);
        
        if(i>0)     pt23[i]=pt23[i-1]+pt23[i];    
    }
    for(i=0;i<5;i++){
        
        if(v24>0)   pt24[i]=Math.round((t24[i]/v24) *100);
        
        if(i>0)     pt24[i]=pt24[i-1]+pt24[i];    
    }
    for(i=0;i<5;i++){
        
        if(v25>0)   pt25[i]=Math.round((t25[i]/v25) *100);
        
        if(i>0)     pt25[i]=pt25[i-1]+pt25[i];    
    }
    for(i=0;i<5;i++){
        
        if(v26>0)   pt26[i]=Math.round((t26[i]/v26) *100);
        
        if(i>0)     pt26[i]=pt26[i-1]+pt26[i];    
    }
    for(i=0;i<5;i++){
        
        if(v27>0)   pt27[i]=Math.round((t27[i]/v27) *100);
        
        if(i>0)     pt27[i]=pt27[i-1]+pt27[i];    
    }
    
    
    for(i=0;i<5;i++){
        
        if(v31>0)   pt31[i]=Math.round((t31[i]/v31) *100);
        
        if(i>0)     pt31[i]=pt31[i-1]+pt31[i];    
    }
    for(i=0;i<5;i++){
        
        if(v32>0)   pt32[i]=Math.round((t32[i]/v32) *100);
        
        if(i>0)     pt32[i]=pt32[i-1]+pt32[i];    
    }
    for(i=0;i<5;i++){
        
        if(v33>0)   pt33[i]=Math.round((t33[i]/v33) *100);
        
        if(i>0) pt33[i]=pt33[i-1]+pt33[i];    
    }
    for(i=0;i<5;i++){
        
        if(v34>0)   pt34[i]=Math.round((t34[i]/v34) *100);
        
        if(i>0) pt34[i]=pt34[i-1]+pt34[i];    
    }
    for(i=0;i<5;i++){
        
        if(v35>0)   pt35[i]=Math.round((t35[i]/v35) *100);
        
        if(i>0) pt35[i]=pt35[i-1]+pt35[i];    
    }
    for(i=0;i<5;i++){
        
        if(v36>0)   pt36[i]=Math.round((t36[i]/v36) *100);
        
        if(i>0)     pt36[i]=pt36[i-1]+pt36[i];    
    }
    for(i=0;i<5;i++){
        
        if(v37>0)   pt37[i]=Math.round((t37[i]/v37) *100);
        
        if(i>0)     pt37[i]=pt37[i-1]+pt37[i];    
    }
    
    
    
    for(i=0;i<5;i++){
        
        if(v41>0)   pt41[i]=Math.round((t41[i]/v41) *100);
        
        if(i>0)     pt41[i]=pt41[i-1]+pt41[i];    
    }
    for(i=0;i<5;i++){
        
        if(v42>0)   pt42[i]=Math.round((t42[i]/v42) *100);
        
        if(i>0)     pt42[i]=pt42[i-1]+pt42[i];    
    }
    for(i=0;i<5;i++){
        
        if(v43>0)   pt43[i]=Math.round((t43[i]/v43) *100);
        
        if(i>0)     pt43[i]=pt43[i-1]+pt43[i];    
    }
    for(i=0;i<5;i++){
        
        if(v44>0)   pt44[i]=Math.round((t44[i]/v44) *100);
        
        if(i>0)     pt44[i]=pt44[i-1]+pt44[i];    
    }
    for(i=0;i<5;i++){
        
        if(v45>0)   pt45[i]=Math.round((t45[i]/v45) *100);
        
        if(i>0)     pt45[i]=pt45[i-1]+pt45[i];    
    }
    for(i=0;i<5;i++){
        
        if(v46>0)   pt46[i]=Math.round((t46[i]/v46) *100);
        
        if(i>0)     pt46[i]=pt46[i-1]+pt46[i]
    }
    for(i=0;i<5;i++){
        
        if(v47>0)   pt47[i]=Math.round((t47[i]/v47) *100);
        
        if(i>0)     pt47[i]=pt47[i-1]+pt47[i];    
    }
    

    
    
    for(i=0;i<5;i++){
        
        if(v51>0)   pt51[i]=Math.round((t51[i]/v51) *100);
        
        if(i>0)     pt51[i]=pt51[i-1]+pt51[i];    
    }
    for(i=0;i<5;i++){
        
        if(v52>0)   pt52[i]=Math.round((t52[i]/v52) *100);
        
        if(i>0)     pt52[i]=pt52[i-1]+pt52[i];    
    }
    for(i=0;i<5;i++){
        
        if(v53>0)   pt53[i]=Math.round((t53[i]/v53) *100);
        
        if(i>0)     pt53[i]=pt53[i-1]+pt53[i];    
    }
    for(i=0;i<5;i++){
        
        if(v54>0)   pt54[i]=Math.round((t54[i]/v54) *100);
        
        if(i>0)     pt54[i]=pt54[i-1]+pt54[i];    
    }
    for(i=0;i<5;i++){
        
        if(v55>0)   pt55[i]=Math.round((t55[i]/v55) *100);
        
        if(i>0)     pt55[i]=pt55[i-1]+pt55[i];    
    }
    for(i=0;i<5;i++){
        
        if(v56>0)   pt56[i]=Math.round((t56[i]/v56) *100);
        
        if(i>0)     pt56[i]=pt56[i-1]+pt56[i];    
    }
    for(i=0;i<5;i++){
        
        if(v57>0)   pt57[i]=Math.round((t57[i]/v57) *100);
        
        if(i>0)     pt57[i]=pt57[i-1]+pt57[i];    
    }
    
    
    
    for(i=0;i<5;i++){
        
        if(v61>0)   pt61[i]=Math.round((t61[i]/v61) *100);
        
        if(i>0)     pt61[i]=pt61[i-1]+pt61[i];    
    }
    for(i=0;i<5;i++){
        
        if(v62>0)   pt62[i]=Math.round((t62[i]/v62) *100);
        
        if(i>0) pt62[i]=pt62[i-1]+pt62[i];    
    }
    for(i=0;i<5;i++){
        
        if(v63>0)   pt63[i]=Math.round((t63[i]/v63) *100);
        
        if(i>0) pt63[i]=pt63[i-1]+pt63[i];    
    }
    for(i=0;i<5;i++){
        
        if(v64>0)   pt64[i]=Math.round((t64[i]/v64) *100);
        
        if(i>0)     pt64[i]=pt64[i-1]+pt64[i];    
    }
    for(i=0;i<5;i++){
        
        if(v65>0)   pt65[i]=Math.round((t65[i]/v65) *100);
        
        if(i>0)     pt65[i]=pt65[i-1]+pt65[i];    
    }
    for(i=0;i<5;i++){
        
        if(v66>0)   pt66[i]=Math.round((t66[i]/v66) *100);
        
        if(i>0) pt66[i]=pt66[i-1]+pt66[i];    
    }
    for(i=0;i<5;i++){
        
        if(v67>0)   pt67[i]=Math.round((t67[i]/v67) *100);
        
        if(i>0) pt67[i]=pt67[i-1]+pt67[i];    
    }
    
    
    for(i=0;i<5;i++){
        
        if(v71>0)   pt71[i]=Math.round((t71[i]/v71) *100);
        
        if(i>0) pt71[i]=pt71[i-1]+pt71[i];    
    }
    for(i=0;i<5;i++){
        
        if(v72>0)   pt72[i]=Math.round((t72[i]/v72) *100);
        
        if(i>0) pt72[i]=pt72[i-1]+pt72[i];    
    }
    for(i=0;i<5;i++){
        
        if(v73>0)   pt73[i]=Math.round((t73[i]/v73) *100);
        
        if(i>0)     pt73[i]=pt73[i-1]+pt73[i];    
    }
    for(i=0;i<5;i++){
        
        if(v74>0)   pt74[i]=Math.round((t74[i]/v74) *100);
        
        if(i>0)     pt74[i]=pt74[i-1]+pt74[i];    
    }
    for(i=0;i<5;i++){
        
        if(v75>0)   pt75[i]=Math.round((t75[i]/v75) *100);
        
        if(i>0)     pt75[i]=pt75[i-1]+pt75[i];    
    }
    for(i=0;i<5;i++){
        
        if(v76>0)   pt76[i]=Math.round((t76[i]/v76) *100);
        
        if(i>0)     pt76[i]=pt76[i-1]+pt76[i];    
    }
    for(i=0;i<5;i++){
        
        if(v77>0)   pt77[i]=Math.round((t77[i]/v77) *100);
        
        if(i>0) pt77[i]=pt77[i-1]+pt77[i];    
    }
    
    
    
    
    calculateDurationProbabilities();
    
    
}


function calculateDurationProbabilities(){
    
    
    if(d1>0){
        
        if(lastNote==0 && d1>1)   d1++;
        
        pwn1 = Math.round((wn1/d1) *100);
        phn1 = Math.round((hn1/d1) *100);    phn1=pwn1+phn1;      
        pqn1 = Math.round((qn1/d1) *100);    pqn1=phn1+pqn1;
        pen1 = Math.round((en1/d1) *100);    pen1=pqn1+pen1;
        psn1 = Math.round((sn1/d1) *100);    psn1=pen1+psn1;
    }
    
    if(d2>0){
         if(lastNote==1 && d2>1)   d2++;
        pwn2 = Math.round((wn2/d2) *100);
        phn2 = Math.round((hn2/d2) *100);    phn2=pwn2+phn2;      
        pqn2 = Math.round((qn2/d2) *100);    pqn2=phn2+pqn2;
        pen2 = Math.round((en2/d2) *100);    pen2=pqn2+pen2;
        psn2 = Math.round((sn2/d2) *100);    psn2=pen2+psn2;
    }
    
    if(d3>0){
         if(lastNote==2 && d3>1)   d3++;
        pwn3 = Math.round((wn3/d3) *100);
        phn3 = Math.round((hn3/d3) *100);    phn3=pwn3+phn3;      
        pqn3 = Math.round((qn3/d3) *100);    pqn3=phn3+pqn3;
        pen3 = Math.round((en3/d3) *100);    pen3=pqn3+pen3;
        psn3 = Math.round((sn3/d3) *100);    psn3=pen3+psn3;
    }
    
    if(d4>0){
        if(lastNote==3 && d4>1)   d4++;
        pwn4 = Math.round((wn4/d4) *100);
        phn4 = Math.round((hn4/d4) *100);    phn4=pwn4+phn4;      
        pqn4 = Math.round((qn4/d4) *100);    pqn4=phn4+pqn4;
        pen4 = Math.round((en4/d4) *100);    pen4=pqn4+pen4;
        psn4 = Math.round((sn4/d4) *100);    psn4=pen4+psn4;
    }
    
    if(d5>0){
        if(lastNote==4 && d5>1)   d5++;
        pwn5 = Math.round((wn5/d5) *100);
        phn5 = Math.round((hn5/d5) *100);    phn5=pwn5+phn5;      
        pqn5 = Math.round((qn5/d5) *100);    pqn5=phn5+pqn5;
        pen5 = Math.round((en5/d5) *100);    pen5=pqn5+pen5;
        psn5 = Math.round((sn5/d5) *100);    psn5=pen5+psn5;
    }
    
    if(d6>0){
        if(lastNote==5 && d6>1)   d6++;
        pwn6 = Math.round((wn6/d6) *100);
        phn6 = Math.round((hn6/d6) *100);    phn6=pwn6+phn6;      
        pqn6 = Math.round((qn6/d6) *100);    pqn6=phn6+pqn6;
        pen6 = Math.round((en6/d6) *100);    pen6=pqn6+pen6;
        psn6 = Math.round((sn6/d6) *100);    psn6=pen6+psn6;
    }
    
    if(d7>0){
        if(lastNote==6 && d7>1)   d7++;
        pwn7 = Math.round((wn7/d7) *100);
        phn7 = Math.round((hn7/d7) *100);    phn7=pwn7+phn7;      
        pqn7 = Math.round((qn7/d7) *100);    pqn7=phn7+pqn7;
        pen7 = Math.round((en7/d7) *100);    pen7=pqn7+pen7;
        psn7 = Math.round((sn7/d7) *100);    psn7=pen7+psn7;
    }
        
       
    
}


function improvvisatorDurationTime(index){
    
    if(index==0){
        
        randomTime = Math.floor(Math.random() * psn1); 
        
        if      (randomTime>=0       &&     randomTime<=pwn1)     return 16;
        else if (randomTime>pwn1     &&     randomTime<=phn1)     return 8;
        else if (randomTime>phn1     &&     randomTime<=pqn1)     return 4;
        else if (randomTime>pqn1     &&     randomTime<=pen1)     return 2;
        else if (randomTime>pen1     &&     randomTime<=psn1)     return 1;
    }
    
    else if(index==1){
        
        randomTime = Math.floor(Math.random() * psn2); 
        
        if      (randomTime>=0      &&      randomTime<=pwn2)     return 16;
        else if (randomTime>pwn2    &&      randomTime<=phn2)     return 8;
        else if (randomTime>phn2    &&      randomTime<=pqn2)     return 4;
        else if (randomTime>pqn2    &&      randomTime<=pen2)     return 2;
        else if (randomTime>pen2    &&      randomTime<=psn2)     return 1;
    }
    
    else if(index==2){
        
        randomTime = Math.floor(Math.random() * psn3); 
        
        if      (randomTime>=0      &&      randomTime<=pwn3)     return 16;
        else if (randomTime>pwn3    &&      randomTime<=phn3)     return 8;
        else if (randomTime>phn3    &&      randomTime<=pqn3)     return 4;
        else if (randomTime>pqn3    &&      randomTime<=pen3)     return 2;
        else if (randomTime>pen3    &&      randomTime<=psn3)     return 1;
    }
    
    else if(index==3){
        
        randomTime = Math.floor(Math.random() * psn4); 
        
        if      (randomTime>=0      &&      randomTime<=pwn4)     return 16;
        else if (randomTime>pwn4    &&      randomTime<=phn4)     return 8;
        else if (randomTime>phn4    &&      randomTime<=pqn4)     return 4;
        else if (randomTime>pqn4    &&      randomTime<=pen4)     return 2;
        else if (randomTime>pen4    &&      randomTime<=psn4)     return 1;
    }
    
    else if(index==4){
        
        randomTime = Math.floor(Math.random() * psn5); 
        
        if      (randomTime>=0      &&      randomTime<=pwn5)     return 16;
        else if (randomTime>pwn5    &&      randomTime<=phn5)     return 8;
        else if (randomTime>phn5    &&      randomTime<=pqn5)     return 4;
        else if (randomTime>pqn5    &&      randomTime<=pen5)     return 2;
        else if (randomTime>pen5    &&      randomTime<=psn5)     return 1;
    }
    
    else if(index==5){
        
        randomTime = Math.floor(Math.random() * psn6); 
        
        if      (randomTime>=0      &&      randomTime<=pwn6)     return 16;
        else if (randomTime>pwn6    &&      randomTime<=phn6)     return 8;
        else if (randomTime>phn6    &&      randomTime<=pqn6)     return 4;
        else if (randomTime>pqn6    &&      randomTime<=pen6)     return 2;
        else if (randomTime>pen6    &&      randomTime<=psn6)     return 1;
    }
    
    else if(index==6){
        
        randomTime = Math.floor(Math.random() * psn2); 
        
        if      (randomTime>=0      &&      randomTime<=pwn7)     return 16;
        else if (randomTime>pwn7    &&      randomTime<=phn7)     return 8;
        else if (randomTime>phn7    &&      randomTime<=pqn7)     return 4;
        else if (randomTime>pqn7    &&      randomTime<=pen7)     return 2;
        else if (randomTime>pen7    &&      randomTime<=psn7)     return 1;
    }
    
}       //funzione che riguarda la durata tra attacco e release



function improvvisatorLearnTime(prev, act){         //funzione che riguarda la durata delle pause tra nota e altr
    var randomTime;
    
    if      (prev==0 && act ==0){
        randomTime = Math.floor(Math.random() * pt11[4]); 
        
        if      (randomTime>=0       && randomTime<=pt11[0])    return 15;
        else if (randomTime>pt11[0] && randomTime<=pt11[1])     return 7;
        else if (randomTime>pt11[1] && randomTime<=pt11[2])     return 3;
        else if (randomTime>pt11[2] && randomTime<=pt11[3])     return 1;
        else if (randomTime>pt11[3] && randomTime<=pt11[4])     return 0;
        
    }
    
    else if (prev==0 && act ==1){
        randomTime = Math.floor(Math.random() * pt12[4]); 
        
        if      (randomTime>=0       && randomTime<=pt12[0])    return 15;
        else if (randomTime>pt12[0] && randomTime<=pt12[1])     return 7;
        else if (randomTime>pt12[1] && randomTime<=pt12[2])     return 3;
        else if (randomTime>pt12[2] && randomTime<=pt12[3])     return 1;
        else if (randomTime>pt12[3] && randomTime<=pt12[4])     return 0;
        
    }
    
    else if (prev==0 && act ==2){
        randomTime = Math.floor(Math.random() * pt13[4]); 
        
        if      (randomTime>=0       && randomTime<=pt13[0])    return 15;
        else if (randomTime>pt13[0] && randomTime<=pt13[1])     return 7;
        else if (randomTime>pt13[1] && randomTime<=pt13[2])     return 3;
        else if (randomTime>pt13[2] && randomTime<=pt13[3])     return 1;
        else if (randomTime>pt13[3] && randomTime<=pt13[4])     return 0;
        
    }
    
    else if (prev==0 && act ==3){
        randomTime = Math.floor(Math.random() * pt14[4]); 
        
        if      (randomTime>=0       && randomTime<=pt14[0])    return 15;
        else if (randomTime>pt14[0] && randomTime<=pt14[1])     return 7;
        else if (randomTime>pt14[1] && randomTime<=pt14[2])     return 3;
        else if (randomTime>pt14[2] && randomTime<=pt14[3])     return 1;
        else if (randomTime>pt14[3] && randomTime<=pt14[4])     return 0;
        
    }
    
    else if (prev==0 && act ==4){
        randomTime = Math.floor(Math.random() * pt15[4]); 
        
        if      (randomTime>=0       && randomTime<=pt15[0])    return 15;
        else if (randomTime>pt15[0] && randomTime<=pt15[1])     return 7;
        else if (randomTime>pt15[1] && randomTime<=pt15[2])     return 3;
        else if (randomTime>pt15[2] && randomTime<=pt15[3])     return 1;
        else if (randomTime>pt15[3] && randomTime<=pt15[4])     return 0;
        
    }
    
    else if (prev==0 && act ==5){
        randomTime = Math.floor(Math.random() * pt16[4]); 
        
        if      (randomTime>=0       && randomTime<=pt16[0])    return 15;
        else if (randomTime>pt16[0] && randomTime<=pt16[1])     return 7;
        else if (randomTime>pt16[1] && randomTime<=pt16[2])     return 3;
        else if (randomTime>pt16[2] && randomTime<=pt16[3])     return 1;
        else if (randomTime>pt16[3] && randomTime<=pt16[4])     return 0;
        
    }
    
    else if (prev==0 && act ==6){
        randomTime = Math.floor(Math.random() * pt17[4]); 
        
        if      (randomTime>=0       && randomTime<=pt17[0])    return 15;
        else if (randomTime>pt17[0] && randomTime<=pt17[1])     return 7;
        else if (randomTime>pt17[1] && randomTime<=pt17[2])     return 3;
        else if (randomTime>pt17[2] && randomTime<=pt17[3])     return 1;
        else if (randomTime>pt17[3] && randomTime<=pt17[4])     return 0;
        
    }
    
    
    
    
    
    else if (prev==1 && act ==0){
        randomTime = Math.floor(Math.random() * pt21[4]); 
        
        if      (randomTime>=0       && randomTime<=pt21[0])    return 15;
        else if (randomTime>pt21[0] && randomTime<=pt21[1])     return 7;
        else if (randomTime>pt21[1] && randomTime<=pt21[2])     return 3;
        else if (randomTime>pt21[2] && randomTime<=pt21[3])     return 1;
        else if (randomTime>pt21[3] && randomTime<=pt21[4])     return 0;
        
    }
    
    else if (prev==1 && act ==1){
        randomTime = Math.floor(Math.random() * pt22[4]); 
        
        if      (randomTime>=0       && randomTime<=pt22[0])    return 15;
        else if (randomTime>pt22[0] && randomTime<=pt22[1])     return 7;
        else if (randomTime>pt22[1] && randomTime<=pt22[2])     return 3;
        else if (randomTime>pt22[2] && randomTime<=pt22[3])     return 1;
        else if (randomTime>pt22[3] && randomTime<=pt22[4])     return 0;
        
    }
    
    else if (prev==1 && act ==2){
        randomTime = Math.floor(Math.random() * pt23[4]); 
        
        if      (randomTime>=0       && randomTime<=pt23[0])     return 15;
        else if (randomTime>pt23[0] && randomTime<=pt23[1])     return 8;
        else if (randomTime>pt23[1] && randomTime<=pt23[2])     return 4;
        else if (randomTime>pt23[2] && randomTime<=pt23[3])     return 2;
        else if (randomTime>pt23[3] && randomTime<=pt23[4])     return 1;
        
    }
    
    else if (prev==1 && act ==3){
        randomTime = Math.floor(Math.random() * pt24[4]); 
        
        if      (randomTime>=0       && randomTime<=pt24[0])    return 15;
        else if (randomTime>pt24[0] && randomTime<=pt24[1])     return 7;
        else if (randomTime>pt24[1] && randomTime<=pt24[2])     return 3;
        else if (randomTime>pt24[2] && randomTime<=pt24[3])     return 1;
        else if (randomTime>pt24[3] && randomTime<=pt24[4])     return 0;
        
    }
    
    else if (prev==1 && act ==4){
        randomTime = Math.floor(Math.random() * pt25[4]); 
        
        if      (randomTime>=0       && randomTime<=pt25[0])    return 15;
        else if (randomTime>pt25[0] && randomTime<=pt25[1])     return 7;
        else if (randomTime>pt25[1] && randomTime<=pt25[2])     return 3;
        else if (randomTime>pt25[2] && randomTime<=pt25[3])     return 1;
        else if (randomTime>pt25[3] && randomTime<=pt25[4])     return 0;
        
    }
    
    else if (prev==1 && act ==5){
        randomTime = Math.floor(Math.random() * pt26[4]); 
        
        if      (randomTime>=0       && randomTime<=pt26[0])    return 15;
        else if (randomTime>pt26[0] && randomTime<=pt26[1])     return 7;
        else if (randomTime>pt26[1] && randomTime<=pt26[2])     return 3;
        else if (randomTime>pt26[2] && randomTime<=pt26[3])     return 1;
        else if (randomTime>pt26[3] && randomTime<=pt26[4])     return 0;
        
    }
    
    else if (prev==1 && act ==6){
        randomTime = Math.floor(Math.random() * pt27[4]); 
        
        if      (randomTime>=0       && randomTime<=pt27[0])    return 15;
        else if (randomTime>pt27[0] && randomTime<=pt27[1])     return 7;
        else if (randomTime>pt27[1] && randomTime<=pt27[2])     return 3;
        else if (randomTime>pt27[2] && randomTime<=pt27[3])     return 1;
        else if (randomTime>pt27[3] && randomTime<=pt27[4])     return 0;
        
    }
    
    
    
    else if (prev==2 && act ==0){
        randomTime = Math.floor(Math.random() * pt31[4]); 
        
        if      (randomTime>=0       && randomTime<=pt31[0])    return 15;
        else if (randomTime>pt31[0] && randomTime<=pt31[1])     return 7;
        else if (randomTime>pt31[1] && randomTime<=pt31[2])     return 3;
        else if (randomTime>pt31[2] && randomTime<=pt31[3])     return 1;
        else if (randomTime>pt31[3] && randomTime<=pt31[4])     return 0;
        
    }
    
    else if (prev==2 && act ==1){
        randomTime = Math.floor(Math.random() * pt32[4]); 
        
        if      (randomTime>=0       && randomTime<=pt32[0])     return 15;
        else if (randomTime>pt32[0] && randomTime<=pt32[1])      return 7;
        else if (randomTime>pt32[1] && randomTime<=pt32[2])      return 3;
        else if (randomTime>pt32[2] && randomTime<=pt32[3])      return 1;
        else if (randomTime>pt32[3] && randomTime<=pt32[4])      return 0;
        
    }
    
    else if (prev==2 && act ==2){
        randomTime = Math.floor(Math.random() * pt33[4]); 
        
        if      (randomTime>=0       && randomTime<=pt33[0])     return 15;
        else if (randomTime>pt33[0] && randomTime<=pt33[1])      return 7;
        else if (randomTime>pt33[1] && randomTime<=pt33[2])      return 3;
        else if (randomTime>pt33[2] && randomTime<=pt33[3])      return 1;
        else if (randomTime>pt33[3] && randomTime<=pt33[4])      return 0;
        
    }
    
    else if (prev==2 && act ==3){
        randomTime = Math.floor(Math.random() * pt34[4]); 
        
        if      (randomTime>=0       && randomTime<=pt34[0])     return 15;
        else if (randomTime>pt34[0] && randomTime<=pt34[1])      return 7;
        else if (randomTime>pt34[1] && randomTime<=pt34[2])      return 3;
        else if (randomTime>pt34[2] && randomTime<=pt34[3])      return 1;
        else if (randomTime>pt34[3] && randomTime<=pt34[4])      return 0;
        
    }
    
    else if (prev==2 && act ==4){
        randomTime = Math.floor(Math.random() * pt35[4]); 
        
        if      (randomTime>=0       && randomTime<=pt35[0])    return 15;
        else if (randomTime>pt35[0] && randomTime<=pt35[1])     return 7;
        else if (randomTime>pt35[1] && randomTime<=pt35[2])     return 3;
        else if (randomTime>pt35[2] && randomTime<=pt35[3])     return 1;
        else if (randomTime>pt35[3] && randomTime<=pt35[4])     return 0;
        
    }
    
    else if (prev==2 && act ==5){
        randomTime = Math.floor(Math.random() * pt36[4]); 
        
        if      (randomTime>=0       && randomTime<=pt36[0])    return 15;
        else if (randomTime>pt36[0] && randomTime<=pt36[1])     return 7;
        else if (randomTime>pt36[1] && randomTime<=pt36[2])     return 3;
        else if (randomTime>pt36[2] && randomTime<=pt36[3])     return 1;
        else if (randomTime>pt36[3] && randomTime<=pt36[4])     return 0;
        
    }
    
    else if (prev==2 && act ==6){
        randomTime = Math.floor(Math.random() * pt37[4]); 
        
        if      (randomTime>=0       && randomTime<=pt37[0])    return 15;
        else if (randomTime>pt37[0] && randomTime<=pt37[1])     return 7;
        else if (randomTime>pt37[1] && randomTime<=pt37[2])     return 3;
        else if (randomTime>pt37[2] && randomTime<=pt37[3])     return 1;
        else if (randomTime>pt37[3] && randomTime<=pt37[4])     return 0;
        
    }
    
    
    
    
    else if (prev==3 && act ==0){
        randomTime = Math.floor(Math.random() * pt41[4]); 
        
        if      (randomTime>=0       && randomTime<=pt41[0])    return 15;
        else if (randomTime>pt41[0] && randomTime<=pt41[1])     return 7;
        else if (randomTime>pt41[1] && randomTime<=pt41[2])     return 3;
        else if (randomTime>pt41[2] && randomTime<=pt41[3])     return 1;
        else if (randomTime>pt41[3] && randomTime<=pt41[4])     return 0;
        
    }
    
    else if (prev==3 && act ==1){
        randomTime = Math.floor(Math.random() * pt42[4]); 
        
        if      (randomTime>=0       && randomTime<=pt42[0])    return 15;
        else if (randomTime>pt42[0] && randomTime<=pt42[1])     return 7;
        else if (randomTime>pt42[1] && randomTime<=pt42[2])     return 3;
        else if (randomTime>pt42[2] && randomTime<=pt42[3])     return 1;
        else if (randomTime>pt42[3] && randomTime<=pt42[4])     return 0;
        
    }
    
    else if (prev==3 && act ==2){
        randomTime = Math.floor(Math.random() * pt43[4]); 
        
        if      (randomTime>=0       && randomTime<=pt43[0])    return 15;
        else if (randomTime>pt43[0] && randomTime<=pt43[1])     return 7;
        else if (randomTime>pt43[1] && randomTime<=pt43[2])     return 3;
        else if (randomTime>pt43[2] && randomTime<=pt43[3])     return 1;
        else if (randomTime>pt43[3] && randomTime<=pt43[4])     return 0;
        
    }
    
    else if (prev==3 && act ==3){
        randomTime = Math.floor(Math.random() * pt44[4]); 
        
        if      (randomTime>=0       && randomTime<=pt44[0])    return 15;
        else if (randomTime>pt44[0] && randomTime<=pt44[1])     return 7;
        else if (randomTime>pt44[1] && randomTime<=pt44[2])     return 3;
        else if (randomTime>pt44[2] && randomTime<=pt44[3])     return 1;
        else if (randomTime>pt44[3] && randomTime<=pt44[4])     return 0;
        
    }
    
    else if (prev==3 && act ==4){
        randomTime = Math.floor(Math.random() * pt45[4]); 
        
        if      (randomTime>=0       && randomTime<=pt45[0])    return 15;
        else if (randomTime>pt45[0] && randomTime<=pt45[1])     return 7;
        else if (randomTime>pt45[1] && randomTime<=pt45[2])     return 3;
        else if (randomTime>pt45[2] && randomTime<=pt45[3])     return 1;
        else if (randomTime>pt45[3] && randomTime<=pt45[4])     return 0;
        
    }
    
    else if (prev==3 && act ==5){
        randomTime = Math.floor(Math.random() * pt46[4]); 
        
        if      (randomTime>=0       && randomTime<=pt46[0])    return 15;
        else if (randomTime>pt46[0] && randomTime<=pt46[1])     return 7;
        else if (randomTime>pt46[1] && randomTime<=pt46[2])     return 3;
        else if (randomTime>pt46[2] && randomTime<=pt46[3])     return 1;
        else if (randomTime>pt46[3] && randomTime<=pt46[4])     return 0;
        
    }
    
    else if (prev==3 && act ==6){
        randomTime = Math.floor(Math.random() * pt47[4]); 
        
        if      (randomTime>=0       && randomTime<=pt47[0])    return 15;
        else if (randomTime>pt47[0] && randomTime<=pt47[1])     return 7;
        else if (randomTime>pt47[1] && randomTime<=pt47[2])     return 3;
        else if (randomTime>pt47[2] && randomTime<=pt47[3])     return 1;
        else if (randomTime>pt47[3] && randomTime<=pt47[4])     return 0;
        
    }
    
    
    else if (prev==4 && act ==0){
        randomTime = Math.floor(Math.random() * pt51[4]); 
        
        if      (randomTime>=0       && randomTime<=pt51[0])    return 15;
        else if (randomTime>pt51[0] && randomTime<=pt51[1])     return 7;
        else if (randomTime>pt51[1] && randomTime<=pt51[2])     return 3;
        else if (randomTime>pt51[2] && randomTime<=pt51[3])     return 1;
        else if (randomTime>pt51[3] && randomTime<=pt51[4])     return 0;
        
    }
    
    else if (prev==4 && act ==1){
        randomTime = Math.floor(Math.random() * pt52[4]); 
        
        if      (randomTime>=0       && randomTime<=pt52[0])    return 15;
        else if (randomTime>pt52[0] && randomTime<=pt52[1])     return 7;
        else if (randomTime>pt52[1] && randomTime<=pt52[2])     return 3;
        else if (randomTime>pt52[2] && randomTime<=pt52[3])     return 1;
        else if (randomTime>pt52[3] && randomTime<=pt52[4])     return 0;
        
    }
    
    else if (prev==4 && act ==2){
        randomTime = Math.floor(Math.random() * pt53[4]); 
        
        if      (randomTime>=0       && randomTime<=pt53[0])    return 15;
        else if (randomTime>pt53[0] && randomTime<=pt53[1])     return 7;
        else if (randomTime>pt53[1] && randomTime<=pt53[2])     return 3;
        else if (randomTime>pt53[2] && randomTime<=pt53[3])     return 1;
        else if (randomTime>pt53[3] && randomTime<=pt53[4])     return 0;
        
    }
    
    else if (prev==4 && act ==3){
        randomTime = Math.floor(Math.random() * pt54[4]); 
        
        if      (randomTime>=0       && randomTime<=pt54[0])    return 15;
        else if (randomTime>pt54[0] && randomTime<=pt54[1])     return 7;
        else if (randomTime>pt54[1] && randomTime<=pt54[2])     return 3;
        else if (randomTime>pt54[2] && randomTime<=pt54[3])     return 1;
        else if (randomTime>pt54[3] && randomTime<=pt54[4])     return 0;
        
    }
    
    else if (prev==4 && act ==4){
        randomTime = Math.floor(Math.random() * pt55[4]); 
        
        if      (randomTime>=0       && randomTime<=pt55[0])    return 15;
        else if (randomTime>pt55[0] && randomTime<=pt55[1])     return 7;
        else if (randomTime>pt55[1] && randomTime<=pt55[2])     return 3;
        else if (randomTime>pt55[2] && randomTime<=pt55[3])     return 1;
        else if (randomTime>pt55[3] && randomTime<=pt55[4])     return 0;
        
    }
    
    else if (prev==4 && act ==5){
        randomTime = Math.floor(Math.random() * pt56[4]); 
        
        if      (randomTime>=0       && randomTime<=pt56[0])    return 15;
        else if (randomTime>pt56[0] && randomTime<=pt56[1])     return 7;
        else if (randomTime>pt56[1] && randomTime<=pt56[2])     return 3;
        else if (randomTime>pt56[2] && randomTime<=pt56[3])     return 1;
        else if (randomTime>pt56[3] && randomTime<=pt56[4])     return 0;
        
    }
    
    else if (prev==4 && act ==6){
        randomTime = Math.floor(Math.random() * pt57[4]); 
        
        if      (randomTime>=0       && randomTime<=pt57[0])    return 15;
        else if (randomTime>pt57[0] && randomTime<=pt57[1])     return 7;
        else if (randomTime>pt57[1] && randomTime<=pt57[2])     return 3;
        else if (randomTime>pt57[2] && randomTime<=pt57[3])     return 1;
        else if (randomTime>pt57[3] && randomTime<=pt57[4])     return 0;
        
    }
    
    
    
    else if (prev==5 && act ==0){
        randomTime = Math.floor(Math.random() * pt61[4]); 
        
        if      (randomTime>=0       && randomTime<=pt61[0])    return 15;
        else if (randomTime>pt61[0] && randomTime<=pt61[1])     return 7;
        else if (randomTime>pt61[1] && randomTime<=pt61[2])     return 3;
        else if (randomTime>pt61[2] && randomTime<=pt61[3])     return 1;
        else if (randomTime>pt61[3] && randomTime<=pt61[4])     return 0;
        
    }
    
    else if (prev==5 && act ==1){
        randomTime = Math.floor(Math.random() * pt62[4]); 
        
        if      (randomTime>=0       && randomTime<=pt62[0])    return 15;
        else if (randomTime>pt62[0] && randomTime<=pt62[1])     return 7;
        else if (randomTime>pt62[1] && randomTime<=pt62[2])     return 3;
        else if (randomTime>pt62[2] && randomTime<=pt62[3])     return 1;
        else if (randomTime>pt62[3] && randomTime<=pt62[4])     return 0;
        
    }
    
    else if (prev==5 && act ==2){
        randomTime = Math.floor(Math.random() * pt63[4]); 
        
        if      (randomTime>=0       && randomTime<=pt63[0])    return 15;
        else if (randomTime>pt63[0] && randomTime<=pt63[1])     return 7;
        else if (randomTime>pt63[1] && randomTime<=pt63[2])     return 3;
        else if (randomTime>pt63[2] && randomTime<=pt63[3])     return 1;
        else if (randomTime>pt63[3] && randomTime<=pt63[4])     return 0;
        
    }
    
    else if (prev==5 && act ==3){
        randomTime = Math.floor(Math.random() * pt64[4]); 
        
        if      (randomTime>=0       && randomTime<=pt64[0])    return 15;
        else if (randomTime>pt64[0] && randomTime<=pt64[1])     return 7;
        else if (randomTime>pt64[1] && randomTime<=pt64[2])     return 3;
        else if (randomTime>pt64[2] && randomTime<=pt64[3])     return 1;
        else if (randomTime>pt64[3] && randomTime<=pt64[4])     return 0;
        
    }
    
    else if (prev==5 && act ==4){
        randomTime = Math.floor(Math.random() * pt65[4]); 
        
        if      (randomTime>=0       && randomTime<=pt65[0])    return 15;
        else if (randomTime>pt65[0] && randomTime<=pt65[1])     return 7;
        else if (randomTime>pt65[1] && randomTime<=pt65[2])     return 3;
        else if (randomTime>pt65[2] && randomTime<=pt65[3])     return 1;
        else if (randomTime>pt65[3] && randomTime<=pt65[4])     return 0;
        
    }
    
    else if (prev==5 && act ==5){
        randomTime = Math.floor(Math.random() * pt66[4]); 
        
        if      (randomTime>=0       && randomTime<=pt66[0])    return 15;
        else if (randomTime>pt66[0] && randomTime<=pt66[1])     return 7;
        else if (randomTime>pt66[1] && randomTime<=pt66[2])     return 3;
        else if (randomTime>pt66[2] && randomTime<=pt66[3])     return 1;
        else if (randomTime>pt66[3] && randomTime<=pt66[4])     return 0;
        
    }
    
    else if (prev==5 && act ==6){
        randomTime = Math.floor(Math.random() * pt67[4]); 
        
        if      (randomTime>=0       && randomTime<=pt67[0])    return 15;
        else if (randomTime>pt67[0] && randomTime<=pt67[1])     return 7;
        else if (randomTime>pt67[1] && randomTime<=pt67[2])     return 3;
        else if (randomTime>pt67[2] && randomTime<=pt67[3])     return 1;
        else if (randomTime>pt67[3] && randomTime<=pt67[4])     return 0;
        
    }
    
    
    
    else if (prev==6 && act ==0){
        randomTime = Math.floor(Math.random() * pt71[4]); 
        
        if      (randomTime>=0       && randomTime<=pt71[0])    return 15;
        else if (randomTime>pt71[0] && randomTime<=pt71[1])     return 7;
        else if (randomTime>pt71[1] && randomTime<=pt71[2])     return 3;
        else if (randomTime>pt71[2] && randomTime<=pt71[3])     return 1;
        else if (randomTime>pt71[3] && randomTime<=pt71[4])     return 0;
        
    }
    
    else if (prev==6 && act ==1){
        randomTime = Math.floor(Math.random() * pt72[4]); 
        
        if      (randomTime>=0       && randomTime<=pt72[0])    return 15;
        else if (randomTime>pt72[0] && randomTime<=pt72[1])     return 7;
        else if (randomTime>pt72[1] && randomTime<=pt72[2])     return 3;
        else if (randomTime>pt72[2] && randomTime<=pt72[3])     return 1;
        else if (randomTime>pt72[3] && randomTime<=pt72[4])     return 0;
        
    }
    
    else if (prev==6 && act ==2){
        randomTime = Math.floor(Math.random() * pt73[4]); 
        
        if      (randomTime>=0       && randomTime<=pt73[0])    return 15;
        else if (randomTime>pt73[0] && randomTime<=pt73[1])     return 7;
        else if (randomTime>pt73[1] && randomTime<=pt73[2])     return 3;
        else if (randomTime>pt73[2] && randomTime<=pt73[3])     return 1;
        else if (randomTime>pt73[3] && randomTime<=pt73[4])     return 0;
        
    }
    
    else if (prev==6 && act ==3){
        randomTime = Math.floor(Math.random() * pt74[4]); 
        
        if      (randomTime>=0       && randomTime<=pt74[0])    return 15;
        else if (randomTime>pt74[0] && randomTime<=pt74[1])     return 7;
        else if (randomTime>pt74[1] && randomTime<=pt74[2])     return 3;
        else if (randomTime>pt74[2] && randomTime<=pt74[3])     return 1;
        else if (randomTime>pt74[3] && randomTime<=pt74[4])     return 0;
        
    }
    
    else if (prev==6 && act ==4){
        randomTime = Math.floor(Math.random() * pt75[4]); 
        
        if      (randomTime>=0       && randomTime<=pt75[0])    return 15;
        else if (randomTime>pt75[0] && randomTime<=pt75[1])     return 7;
        else if (randomTime>pt75[1] && randomTime<=pt75[2])     return 3;
        else if (randomTime>pt75[2] && randomTime<=pt75[3])     return 1;
        else if (randomTime>pt75[3] && randomTime<=pt75[4])     return 0;
        
    }
    
    else if (prev==6 && act ==5){
        randomTime = Math.floor(Math.random() * pt76[4]); 
        
        if      (randomTime>=0       && randomTime<=pt76[0])    return 15;
        else if (randomTime>pt76[0] && randomTime<=pt76[1])     return 7;
        else if (randomTime>pt76[1] && randomTime<=pt76[2])     return 3;
        else if (randomTime>pt76[2] && randomTime<=pt76[3])     return 1;
        else if (randomTime>pt76[3] && randomTime<=pt76[4])     return 0;
        
    }
    
    else if (prev==6 && act ==6){
        randomTime = Math.floor(Math.random() * pt77[4]); 
        
        if      (randomTime>=0       && randomTime<=pt77[0])    return 15;
        else if (randomTime>pt77[0] && randomTime<=pt77[1])     return 7;
        else if (randomTime>pt77[1] && randomTime<=pt77[2])     return 3;
        else if (randomTime>pt77[2] && randomTime<=pt77[3])     return 1;
        else if (randomTime>pt77[3] && randomTime<=pt77[4])     return 0;
        
    }
    
    
    
}



function improvvisatorLearn(){
    

    
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
    
    
    
    t11=[0,0,0,0,0], t12=[0,0,0,0,0], t13=[0,0,0,0,0], t14=[0,0,0,0,0], t15=[0,0,0,0,0], t16=[0,0,0,0,0], t17=[0,0,0,0,0];
    t21=[0,0,0,0,0], t22=[0,0,0,0,0], t23=[0,0,0,0,0], t24=[0,0,0,0,0], t25=[0,0,0,0,0], t26=[0,0,0,0,0], t27=[0,0,0,0,0];
    t31=[0,0,0,0,0], t32=[0,0,0,0,0], t33=[0,0,0,0,0], t34=[0,0,0,0,0], t35=[0,0,0,0,0], t36=[0,0,0,0,0], t37=[0,0,0,0,0];
    t41=[0,0,0,0,0], t42=[0,0,0,0,0], t43=[0,0,0,0,0], t44=[0,0,0,0,0], t45=[0,0,0,0,0], t46=[0,0,0,0,0], t47=[0,0,0,0,0];
    t51=[0,0,0,0,0], t52=[0,0,0,0,0], t53=[0,0,0,0,0], t54=[0,0,0,0,0], t55=[0,0,0,0,0], t56=[0,0,0,0,0], t57=[0,0,0,0,0];
    t61=[0,0,0,0,0], t62=[0,0,0,0,0], t63=[0,0,0,0,0], t64=[0,0,0,0,0], t65=[0,0,0,0,0], t66=[0,0,0,0,0], t67=[0,0,0,0,0];
    t71=[0,0,0,0,0], t72=[0,0,0,0,0], t73=[0,0,0,0,0], t74=[0,0,0,0,0], t75=[0,0,0,0,0], t76=[0,0,0,0,0], t77=[0,0,0,0,0];
    
    pt11=[0,0,0,0,0], pt12=[0,0,0,0,0], pt13=[0,0,0,0,0], pt14=[0,0,0,0,0], pt15=[0,0,0,0,0], pt16=[0,0,0,0,0], pt17=[0,0,0,0,0];
    pt21=[0,0,0,0,0], pt22=[0,0,0,0,0], pt23=[0,0,0,0,0], pt24=[0,0,0,0,0], pt25=[0,0,0,0,0], pt26=[0,0,0,0,0], pt27=[0,0,0,0,0];
    pt31=[0,0,0,0,0], pt32=[0,0,0,0,0], pt33=[0,0,0,0,0], pt34=[0,0,0,0,0], pt35=[0,0,0,0,0], pt36=[0,0,0,0,0], pt37=[0,0,0,0,0];
    pt41=[0,0,0,0,0], pt42=[0,0,0,0,0], pt43=[0,0,0,0,0], pt44=[0,0,0,0,0], pt45=[0,0,0,0,0], pt46=[0,0,0,0,0], pt47=[0,0,0,0,0];
    pt51=[0,0,0,0,0], pt52=[0,0,0,0,0], pt53=[0,0,0,0,0], pt54=[0,0,0,0,0], pt55=[0,0,0,0,0], pt56=[0,0,0,0,0], pt57=[0,0,0,0,0];
    pt61=[0,0,0,0,0], pt62=[0,0,0,0,0], pt63=[0,0,0,0,0], pt64=[0,0,0,0,0], pt65=[0,0,0,0,0], pt66=[0,0,0,0,0], pt67=[0,0,0,0,0];
    pt71=[0,0,0,0,0], pt72=[0,0,0,0,0], pt73=[0,0,0,0,0], pt74=[0,0,0,0,0], pt75=[0,0,0,0,0], pt76=[0,0,0,0,0], pt77=[0,0,0,0,0];
    
    wn1=0, hn1=0, qn1=0, en1=0, sn1=0;            
    wn2=0, hn2=0, qn2=0, en2=0, sn2=0; 
    wn3=0, hn3=0, qn3=0, en3=0, sn3=0; 
    wn4=0, hn4=0, qn4=0, en4=0, sn4=0; 
    wn5=0, hn5=0, qn5=0, en5=0, sn5=0; 
    wn6=0, hn6=0, qn6=0, en6=0, sn6=0; 
    wn7=0, hn7=0, qn7=0, en7=0, sn7=0; 

    pwn1=0, phn1=0, pqn1=0, pen1=0, psn1=0;       
    pwn2=0, phn2=0, pqn2=0, pen2=0, psn2=0; 
    pwn3=0, phn3=0, pqn3=0, pen3=0, psn3=0; 
    pwn4=0, phn4=0, pqn4=0, pen4=0, psn4=0; 
    pwn5=0, phn5=0, pqn5=0, pen5=0, psn5=0; 
    pwn6=0, phn6=0, pqn6=0, pen6=0, psn6=0; 
    pwn7=0, phn7=0, pqn7=0, pen7=0, psn7=0; 
    
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
    secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    current16thNote++;    // Advance the beat number, wrap to zero
    
}





function scheduleNote( beatNumber, time ) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );
    
     if ( (noteResolution==1) && (beatNumber%2))
        return; // we're not playing non-8th 16th notes
    if ( (noteResolution==2) && (beatNumber%4))
        return; // we're not playing non-quarter 8th notes

    // create an oscillator
    var osc = audioContext.createOscillator();
    var metronomeGain = audioContext.createGain();
    osc.connect( metronomeGain );
    metronomeGain.connect(audioContext.destination);
    metronomeGain.gain.value=metronomeActValue;
    
    if (noteResolution2==0 || (noteResolution2==1 && beatNumber%2==0) || (noteResolution2==2 && beatNumber%4==0)) arpPlay();
    
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
    if(metric==4){                      //4/4 QUI DEVO CREARE LA FUNZIONE CHE PLAYA
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

    if(muteFlag1==false && !improFlag &&!arpFlag){
        osc.start( time );
        osc.stop( time + noteLength );
    }
    
    
    
    if(improFlag && improArray.length>0){
        
        
        if(learnTimeIndex == 0) learnFlag=true;
    
        if(learnFlag && learnTimeIndex==0){
            improSound();
            learnFlag=false;
        }
    
        learnTimeIndex--;
    }
    
        
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
        else{
        //console.log("message: " + e.data);
        }
    };
    timerWorker.postMessage({"interval":lookahead});
}

window.addEventListener("load", init );






microBit=new uBit();

microBit.onConnect(function(){
  console.log("connected");



  microBit.setButtonACallback(function(){
    console.log("buttonA pressed");
  });

  microBit.setButtonBCallback(function(){
    console.log("buttonB pressed");
  });
});

microBit.onDisconnect(function(){
  console.log("disconnected");
  
});

function searchDevice(){
  microBit.searchDevice();
}


microBit.onBleNotify(function(){
  //document.getElementById("buttonA").innerHTML=microBit.getButtonA();
  //document.getElementById("buttonB").innerHTML=microBit.getButtonB();
  //
  //document.getElementById("acc_X").innerHTML=microBit.getAccelerometer().x;
  //document.getElementById("acc_Y").innerHTML=microBit.getAccelerometer().y;
  //document.getElementById("acc_Z").innerHTML=microBit.getAccelerometer().z;
  //
  //document.getElementById("temp").innerHTML=microBit.getTemperature();
  //document.getElementById("bearing").innerHTML=microBit.getBearing();
    
    accX = microBit.getAccelerometer().x;
    accY = microBit.getAccelerometer().y;
    accZ = microBit.getAccelerometer().z;
})




function changeColorImproScale()
{
    for(i=0;i<improArray.length;i++){
        if(!midiFlag)
            k = keys.indexOf(improArray[i].key);
        else
            k = (midiArray.indexOf(improArray[i].data[1]))%24;
        
            console.log(k)
            onColorImpro(steps[k%24]);
        
        
            
    
    }
    
}

function removeColorImproScale()
{
    for(i=0;i<improArray.length;i++){
        if(!midiFlag)
            k = keys.indexOf(improArray[i].key);
        else
            k = (midiArray.indexOf(improArray[i].data[1]))%24;
        
            
            offColorImpro(steps[k%24]);
        
        
            
    
    }
    
}

function onColorImpro(step){
    element = document.createElement("div");
    element.classList.add("impro-step")
    step.appendChild(element);
    
}

function offColorImpro(step){
    if(step.hasChildNodes()==true)
        step.removeChild(step.childNodes[0]);
}