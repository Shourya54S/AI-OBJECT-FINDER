song = "";
objects = [];
status = ""; 
function preload(){
song = loadSound("song.mp3");
} 
function setup(){
canvas = createCanvas(380 , 380);
canvas.center(); 
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
canvas.position(570,245);
}
function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded)
document.getElementById("status").innerHTML = "Status : Detecting Object";
object_name = document.getElementById("object_name").value;
}
function modelLoaded(){
console.log("Model Loaded!");
status = true;    
}
function gotResult(error, results){
if (error){
console.log(error);
}
console.log(results);
objects = results
}
function play(){ 
song.play(); 
song.setVolume(0.2);
}
function draw(){
image(video , 0 , 0 , 380 , 380);
if (status != ""){
objectDetector.detect(video, gotResult)
for (i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML = "Status : Object Detected";
r = random(255);
g = random(255);
b = random(255);
fill(r , g , b);
percent = floor(objects[i].confidence*100);
text(objects[i].label + " " + percent + "%" , objects[i].x +15 , objects[i].y - 35);
noFill();
stroke(r , g , b);
rect(objects[i].x + 10 , objects[i].y - 30 , objects[i].width - 200 , objects[i].height - 100);
if(objects[i].label == object_name){
video.stop();
objectDetector.detect(gotResult);
document.getElementById("n_o_b").innerHTML = object_name + " Found!";
synth = window.speechSynthesis;
utterThis = new SpeechSynthesisUtterance(object_name + " Found!");
synth.speak(utterThis);    
}
else{
document.getElementById("n_o_b").innerHTML = object_name + " Not Found!";
synth = window.speechSynthesis();
utterThis = new SpeechSynthesisUtterance(object_name + " Not Found!");
synth.speak(utterThis);        
}
}    
}
}