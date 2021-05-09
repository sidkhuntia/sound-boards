
var colors = ["red", "blue", "green", "yellow"];

var pattern = [];
var userpattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userchosencolor = $(this).attr("id");
  userpattern.push(userchosencolor);

  sound(userchosencolor);
  animation(userchosencolor);

  checkans(userpattern.length-1);
});

function checkans(currentLevel) {

    if (pattern[currentLevel] === userpattern[currentLevel]) {
      if (userpattern.length === pattern.length){
        setTimeout(function () {
          sequence();
        }, 1000);
      }
    } else {
      sound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function sequence() {
  userpattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnum = Math.floor(Math.random() * 4);
  var randomchosencolor = colors[randomnum];
  pattern.push(randomchosencolor);

  $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomchosencolor);
}

function animation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function sound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  pattern = [];
  started = false;
}
