Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality:90
})

Webcam.attach("#webcam");

function Take_Snapshot(){
    Webcam.snap(
        function(data_uri){
            document.getElementById("snapshot").innerHTML='<img id="pic" src="'+data_uri+'">'
        }
    );
}

console.log(ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RaT_1I26a/model.json', model_ready);

function model_ready(){
    console.log("Model is loaded");
}

function check(){
    img= document.getElementById("pic");
    classifier.classify(img, gotResults);
}

function gotResults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);


    document.getElementById("prediction1").innerHTML= results[0].label;
    document.getElementById("prediction2").innerHTML= results[1].label;
    
    prediction1= results[0].label;
    prediction2= results[1].label;
    speak();

    if(results[0].label== "Thumbs Up"){
        document.getElementById("gesture1").innerHTML= "&#128077;";	
    }
    if(results[0].label== "Cool"){
        document.getElementById("gesture1").innerHTML= "&#128076;";	
    }
    if(results[0].label== "Peace"){
        document.getElementById("gesture1").innerHTML= "&#9996;";	
    }
    if(results[1].label== "Thumbs Up"){
        document.getElementById("gesture2").innerHTML= "&#128077;";
    }
    if(results[1].label== "Cool"){
        document.getElementById("gesture2").innerHTML= "&#128076;";
    }
    if(results[1].label== "Peace"){
        document.getElementById("gesture2").innerHTML= "&#9996;";
    }
}
}

function speak(){
var synth= window.speechSynthesis;
var SpeakData1= "The first prediction is"+prediction1;
var SpeakData2= "And the second prediction is"+prediction2;
var UtterThis= new SpeechSynthesisUtterance(SpeakData1+SpeakData2);
synth.speak(UtterThis);
}