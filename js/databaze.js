var config = {
   apiKey: "AIzaSyCOrL33Mb-OoPR2vw56P4f55NQx5ViO3Bo",
    authDomain: "mannaiator-prova.firebaseapp.com",
    databaseURL: "https://mannaiator-prova.firebaseio.com",
    projectId: "mannaiator-prova",
    storageBucket: "mannaiator-prova.appspot.com",
    messagingSenderId: "16935603610"
};

firebase.initializeApp(config);
var db = firebase.database();

var presetVol1 = document.getElementById("vol1"); 
var presetVol2 = document.getElementById("vol2"); 
var presetVol3 = document.getElementById("vol3"); 
var presetAtk1 = document.getElementById("att1"); 
var presetAtk2 = document.getElementById("att2"); 
var presetAtk3 = document.getElementById("att3"); 
var presetRel1 = document.getElementById("rel1"); 
var presetRel2 = document.getElementById("rel2"); 
var presetRel3 = document.getElementById("rel3"); 
var presetLfoKn1 = document.getElementById("lfoKnob1"); 
var presetLfoKn2 = document.getElementById("lfoKnob2"); 
var presetLfoKn3 = document.getElementById("lfoKnob3"); 
var presetDTime = document.getElementById("dTimeKnob"); 
var presetDGain = document.getElementById("dGainKnob"); 
var presetFilterKnob = document.getElementById("filtFreqKnob");
var presetDistortionKnob = document.getElementById("distDriveKnob");
var selectListItems = document.getElementById('presetListID');
var presetMasterKnob = document.getElementById ('mKnob'); 
var presetReverbKnob = document.getElementById ('reverbDWKnob'); 

var PresetTurnOn1; 
var PresetTurnOn2; 
var PresetTurnOn3; 
var PresetTurnOnLfo1; 
var PresetTurnOnLfo2; 
var PresetTurnOnLfo3; 
var PresetTurnOnDly; 
var PresetTurnOnDist; 
var PresetTurnOnReverb;
var PresetTurnOnFilter; 
var PresetMuteFlag;

var presetName = "Default Preset"
var presetsArray = []; 
var listFull=0; 

db.ref('/presets').on('value', function(snapshot) {presetsArray = snapshotToArray(snapshot);});

function deletePreset (presetName){
    
    var refDelete = db.ref("presets/"+ presetName);
    
    if (presetName=="Default Preset") alert("Cannot Delete Default Preset");
    
    else {
    
    if (confirm("Are you sure?") == true) {
        refDelete.remove();     
        alert("DELETED");  
     } 
    }
     
}

function checkBeforeSaving(){
    
    var txt;
    var presetName = prompt("PRESET NAME:");
    if (presetName == null || presetName == "") { txt = "User cancelled the prompt.";} 
    
    var refTest = db.ref("presets/");
    refTest.once("value", function(snapshot) {
    if (snapshot.hasChild(presetName)) alert("Preset Already Exists, Choose Another Name"); else (savePreset(presetName));  
    })
} 

function savePreset(presetName){


    var refSave = db.ref("presets/"+ presetName);
      
    refSave.update({ Osc1: turnOn1 });
    refSave.update({ Osc1Type: sel1.options.selectedIndex });
    refSave.update({ Osc1Vol: f1 });
    refSave.update({ Osc1Att: atk1 });
    refSave.update({ Osc1Rel: rel1 });  
    refSave.update({ Lfo1Type: selLfo1.options.selectedIndex });
    refSave.update({ Lfo1: turnOnLfo1 });
    refSave.update({ Lfo1Freq: lfoFreq1 });
    
    refSave.update({ Osc2: turnOn2 });
    refSave.update({ Osc2Type: sel2.options.selectedIndex });    
    refSave.update({ Osc2Vol: f2 });
    refSave.update({ Osc2Att: atk2 });
    refSave.update({ Osc2Rel: rel2 });
    refSave.update({ Lfo2Type: selLfo2.options.selectedIndex });
    refSave.update({ Lfo2: turnOnLfo2 });
    refSave.update({ Lfo2Freq: lfoFreq2 });
    
    refSave.update({ Osc3: turnOn3 });
    refSave.update({ Osc3Type: sel3.options.selectedIndex });
    refSave.update({ Osc3Vol: f3 });
    refSave.update({ Osc3Att: atk3 });
    refSave.update({ Osc3Rel: rel3 }); 
    refSave.update({ Lfo3Type: selLfo3.options.selectedIndex });
    refSave.update({ Lfo3: turnOnLfo3 });
    refSave.update({ Lfo3Freq: lfoFreq3 });
   
    refSave.update({ DlyOn: effectDelay });
    refSave.update({ DlyTime: dTime });
    refSave.update({ DlyGain: dGain });
  
    refSave.update({ FilterOn: effectFilter });
    refSave.update({ FilterFreq: freqFiltIndex });
    refSave.update({ FilterType: selFilt.options.selectedIndex });
  
    refSave.update({ DistOn: effectDistortion });    
    refSave.update({ DistGain: driveIndex });
    
    refSave.update ({ReverbOn: effectReverb })
    refSave.update ({ReverbVal: reverbDWIndex })

    refSave.update({ MuteOn: muteFlag });
    refSave.update({ MasterVol: masterGainIndex });
   
    txt = "Saved" + presetName + "! YAAY";   
      
}

function loadPreset(presetName){
 

  //OSC1 
  
  var ref = db.ref("presets/"+ presetName +"/Osc1");
  ref.on("value", function(snapshot) {
    PresetTurnOn1 = snapshot.val();
    if (PresetTurnOn1) {activateAudio(1); }} ) 
      
  var ref = db.ref("presets/"+ presetName +"/Osc1Type");
  ref.on("value", function(snapshot) {
    sel1.options.selectedIndex = snapshot.val(); })   
 
  
  var ref = db.ref("presets/"+ presetName +"/Osc1Vol");  
  ref.on("value", function(snapshot) {
    f1 = snapshot.val(); 
    presetVol1.style.transform = 'translateY(-50%)rotate('+gradi[f1]+'deg)'}) 

    
  var ref = db.ref("presets/"+ presetName + "/Osc1Att");
  ref.on("value", function(snapshot) {
    atk1 = snapshot.val(); 
    presetAtk1.style.transform = `translateY(-50%)rotate(${gradi[atk1]}deg)`})
  
  var ref = db.ref("presets/"+ presetName + "/Osc1Rel");
  ref.on("value", function(snapshot) {
    rel1 = snapshot.val(); 
    presetRel1.style.transform = `translateY(-50%)rotate(${gradi[rel1]}deg)`})
  
  var ref = db.ref("presets/"+ presetName + "/Lfo1Freq");
  ref.on("value", function(snapshot) {
    lfoFreq1 = snapshot.val(); 
    presetLfoKn1.style.transform = `translateY(-50%)rotate(${gradi[lfoFreq1]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Lfo1");
  ref.on("value", function(snapshot) {
    PresetTurnOnLfo1 = snapshot.val();
    if (PresetTurnOnLfo1) {activateLfo(1); 
                           dispLfo1.removeChild(dispLfo1.childNodes[0]);
                           var n1 = Number((lfoFreqArray[lfoFreq1]).toFixed(2));
                           var textnode =document.createTextNode(String(n1)+ " Hz") ;
                           dispLfo1.appendChild(textnode);   }}) ;  
  
  var ref = db.ref("presets/"+ presetName +"/Lfo1Type");
  ref.on("value", function(snapshot) {
   selLfo1.options.selectedIndex = snapshot.val(); })
    
  
  //OSC2
  var ref = db.ref("presets/"+ presetName +"/Osc2");
  ref.on("value", function(snapshot) {
    PresetTurnOn2 = snapshot.val();
    if (PresetTurnOn2) {activateAudio(2); }})
  
   var ref = db.ref("presets/"+ presetName +"/Osc2Type");
  ref.on("value", function(snapshot) {
    sel2.options.selectedIndex = snapshot.val(); })  
  
  var ref = db.ref("presets/"+ presetName + "/Osc2Vol");
  ref.on("value", function(snapshot) {
    f2 = snapshot.val(); 
    presetVol2.style.transform = `translateY(-50%)rotate(${gradi[f2]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Osc2Att");
  ref.on("value", function(snapshot) {
    atk2 = snapshot.val(); 
    presetAtk2.style.transform = `translateY(-50%)rotate(${gradi[atk2]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Osc2Rel");
  ref.on("value", function(snapshot) {
    rel2 = snapshot.val(); 
    presetRel2.style.transform = `translateY(-50%)rotate(${gradi[rel2]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Lfo2Freq");
  ref.on("value", function(snapshot) {
    lfoFreq2 = snapshot.val(); 
    presetLfoKn2.style.transform = `translateY(-50%)rotate(${gradi[lfoFreq2]}deg)`})
  
    
  var ref = db.ref("presets/"+ presetName +"/Lfo2");
  ref.on("value", function(snapshot) {
    PresetTurnOnLfo2 = snapshot.val();
    if (PresetTurnOnLfo2) {activateLfo(2); 
                           dispLfo2.removeChild(dispLfo2.childNodes[0]);
                           var n2 = Number((lfoFreqArray[lfoFreq2]).toFixed(2));
                           var textnode =document.createTextNode(String(n2)+ " Hz") ;
                           dispLfo2.appendChild(textnode);   }}) ;  
   
  
  var ref = db.ref("presets/"+ presetName +"/Lfo2Type");
  ref.on("value", function(snapshot) {
    selLfo2.options.selectedIndex = snapshot.val(); })
  
  //OSC3
  var ref = db.ref("presets/"+ presetName +"/Osc3");
  ref.on("value", function(snapshot) {
    PresetTurnOn3 = snapshot.val();
    if (PresetTurnOn3) {activateAudio(3); }})
  
  var ref = db.ref("presets/"+ presetName +"/Osc3Type");
  ref.on("value", function(snapshot) {
    sel3.options.selectedIndex = snapshot.val(); })
   
  var ref = db.ref("presets/"+ presetName + "/Osc3Vol");
  ref.on("value", function(snapshot) {
    f3 = snapshot.val(); 
    presetVol3.style.transform = `translateY(-50%)rotate(${gradi[f3]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Osc3Att");
  ref.on("value", function(snapshot) {
    atk3 = snapshot.val(); 
    presetAtk3.style.transform = `translateY(-50%)rotate(${gradi[atk3]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Osc3Rel");
  ref.on("value", function(snapshot) {
    rel3 = snapshot.val(); 
    presetRel3.style.transform = `translateY(-50%)rotate(${gradi[rel3]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Lfo3Freq");
  ref.on("value", function(snapshot) {
    lfoFreq3 = snapshot.val(); 
    presetLfoKn3.style.transform = `translateY(-50%)rotate(${gradi[lfoFreq3]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/Lfo3");
  ref.on("value", function(snapshot) {
    PresetTurnOnLfo3 = snapshot.val();
    if (PresetTurnOnLfo3) {activateLfo(3); 
                           dispLfo3.removeChild(dispLfo3.childNodes[0]);
                           var n3 = Number((lfoFreqArray[lfoFreq3]).toFixed(2));
                           var textnode =document.createTextNode(String(n3)+ " Hz") ;
                           dispLfo3.appendChild(textnode);   }}) ;
  
  var ref = db.ref("presets/"+ presetName +"/Lfo3Type");
  ref.on("value", function(snapshot) {
    selLfo3.options.selectedIndex = snapshot.val(); })
  
  //DLY
  var ref = db.ref("presets/"+ presetName +"/DlyOn");
  ref.on("value", function(snapshot) {
    PresetTurnOnDly = snapshot.val();
    if (PresetTurnOnDly) {activateDelay(); }} )  
  
  var ref = db.ref("presets/"+ presetName +"/DlyTime");
  ref.on("value", function(snapshot) {
    dTime = snapshot.val(); 
    presetDTime.style.transform = `translateY(-50%)rotate(${gradi[dTime]}deg)`})
  
  var ref = db.ref("presets/"+ presetName +"/DlyGain");
  ref.on("value", function(snapshot) {
    dGain = snapshot.val(); 
    presetDGain.style.transform = `translateY(-50%)rotate(${gradi[dGain]}deg)`})
  
  
  //FILTER
  var ref = db.ref("presets/"+ presetName +"/FilterOn");
  ref.on("value", function(snapshot) {
    PresetTurnOnFilter = snapshot.val();
    if (PresetTurnOnFilter) {activateFilter(); }} )  
  
  var ref = db.ref("presets/"+ presetName +"/FilterFreq");
  ref.on("value", function(snapshot) {
    freqFiltIndex = snapshot.val(); 
    presetFilterKnob.style.transform = `translateY(-50%)rotate(${gradi[freqFiltIndex]}deg)`})
  

  
  var ref = db.ref("presets/"+ presetName +"/FilterType");
  ref.on("value", function(snapshot) {
  selFilt.options.selectedIndex = snapshot.val(); })
  
  
  //DIST
  var ref = db.ref("presets/"+ presetName +"/DistOn");
  ref.on("value", function(snapshot) {
    PresetTurnOnDist = snapshot.val();
    if (PresetTurnOnDist) {activateDistortion(); }} )  
  
  var ref = db.ref("presets/"+ presetName +"/DistGain");
  ref.on("value", function(snapshot) {
    driveIndex = snapshot.val(); 
    presetDistortionKnob.style.transform = `translateY(-50%)rotate(${gradi[driveIndex]}deg)`})
    
    
    var ref = db.ref("presets/"+ presetName +"/ReverbOn");
    ref.on("value", function(snapshot) {
    PresetTurnOnReverb = snapshot.val();
    if (PresetTurnOnReverb) {activateReverb(); }} ) 
    
     var ref = db.ref("presets/"+ presetName +"/ReverbVal");
  ref.on("value", function(snapshot) {
    reverbDWIndex = snapshot.val(); 
    presetReverbKnob.style.transform = `translateY(-50%)rotate(${gradi[reverbDWIndex]}deg)`})
    
    
  
    
      //MASTER


  var ref = db.ref("presets/"+ presetName +"/MasterVol");
  ref.on("value", function(snapshot) {
    masterGainIndex = snapshot.val(); 
    presetMasterKnob.style.transform = `translateY(-50%)rotate(${gradi[masterGainIndex]}deg)`})



  var ref = db.ref("presets/"+ presetName +"/MuteOn");
  ref.on("value", function(snapshot) {
      PresetMuteFlag = snapshot.val();
      if(PresetMuteFlag) {activateMute(); }} )  
    
    
}
  
function snapshotToArray(snapshot) {
    
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

function addItemstoList() {
    
  if (listFull==0){
      for(i = 0; i < presetsArray.length; i = i + 1) {
          var opt = document.createElement('option');
          opt.value = presetsArray[i].key;
          opt.innerHTML = presetsArray[i].key;
          selectListItems.appendChild(opt);
      }
      
      listFull=1; 
  }
    
    else {
        for (var i=selectListItems.length-1; i >= 0; i--){
            selectListItems.remove(i);
        }
        
        for(i = 0; i < presetsArray.length; i = i + 1) {
            var opt = document.createElement('option');
            opt.value = presetsArray[i].key;
            opt.innerHTML = presetsArray[i].key;
            selectListItems.appendChild(opt);
            
        }
            
        listFull =1; 
    }
    

    
}

function loadSelectedPreset(){
  
  var e = document.getElementById ("presetListID");
  loadPreset(e.options [e.selectedIndex].text);

}

function DeleteSelectedPreset(){
  
  var e = document.getElementById ("presetListID");
  deletePreset(e.options [e.selectedIndex].text);

}

