
var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keydown(function() {
    
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");

        var wrong = new Audio("sounds/wrong.mp3");

        wrong.play();

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over")

        setTimeout (function(){

            $("body").removeClass("game-over")

        }, 200);

        startOver();
  
      }

}

function startOver(){

    level = 0;

    gamePattern = [];

    started = false;

}

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    var colorID = "#" + randomChosenColour;

    $(colorID).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function playSound(name){

    var audioFile = "sounds/" + name + ".mp3";
        
    var audio = new Audio(audioFile);

    audio.play();

}

function animatePress(currentColour){

    $("#"+ currentColour).addClass("pressed");

    setTimeout(function(){

        $("#"+ currentColour).removeClass("pressed");

    }, 100);

}
