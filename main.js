x = 0;
y = 0;
screenWidth = 0;
screenHeight  = 0;
draw_apple = "apple.png";  
to_number = 0;


var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  img = loadImage(draw_apple);
}

function setup() {
  
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight - 150;
  canvas = createCanvas(screenWidth,screenHeight);
}

function draw() {
  if(draw_apple == "set")
  {
    for(var i = 0; i < to_number; i++){
    x = Math.floor(Math.random()*screenWidth);
    y = Math.floor(Math.random()*screenHeight);
    image(img,x,y,50,50);
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    }
  }
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  console.log(event); 
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized : " + content; 
  to_number = Number(content);

  if(Number.isInteger(to_number)){

    document.getElementById("status").innerHTML = "Started Drawing Apples"; 
    draw_apple = "set";

  }else{

    document.getElementById("status").innerHTML = "The speech has not recognized a number ";

  }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = to_number + " Apple drawn";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
