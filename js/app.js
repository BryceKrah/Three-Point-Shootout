var $timerId = $('#timer');
var seconds = 35;
var $playerOneScore = $('#first-score');
var $playerTwoScore = $('#second-score');
var $startButton = $('#btn');
var $ball = $('#ball');
var $turnBox = $('#turn');
var $container = $('#container');
var $powermeter = $('#powermeter');
var oldSrc = 'http://icons.iconseeker.com/png/fullsize/nx10/basketball.png';
var newSrc = 'http://www.primetimeshootout.net/images/ball.png';
var $makeormiss = $('#makeormiss');

// http://stackoverflow.com/questions/1038677/how-can-i-measure-the-time-between-click-and-release-in-javascript
// the begin function starts counting when the mouse is clicked logging its time down in miliseconds
// the end function then subtracts the start time from the current time giving you the time down held down in miliseconds

var game = {
  playerOne: 'Player One',
  playerTwo: 'Player Two',
  scoreCount: 0,
  whosTurn: '',
  firstScore: 0,
  secondScore: 0,
  shotsTaken: 0,


  start: function(){
    $($startButton).hide();
    $($powermeter).text("Swish-O-Meter").animate({
      left: "10%",
      bottom: "10%"
    }, 'slow');
    $($playerOneScore).text("Player One Score: " + game.scoreCount);
    $($playerTwoScore).text("Player Two Score: " + game.scoreCount);
    $($ball).append('<img class="basketball" src="http://icons.iconseeker.com/png/fullsize/nx10/basketball.png">');
    $($timerId).text("Shot Clock: " + seconds);
    $($turnBox).text("Player One, You're Up! Click the Ball to start shooting!");
    if (game.whosTurn === '') {
      game.whosTurn = game.playerOne;
    } else if (game.whosTurn === game.playerOne) {
      game.whosTurn = game.playerTwo;
    };

 }, // end start


 updateScore: function(){
   if (seconds !== 0) {
     if(game.whosTurn === game.playerOne){
       $($playerOneScore).text("Player One Score: " + game.scoreCount);
       game.firstScore = game.scoreCount;
     } else if (game.whosTurn === game.playerTwo){
       $($playerTwoScore).text("Player Two Score: " + game.scoreCount);
       game.secondScore = game.scoreCount;
     }
  };
 },

 addEventToBall: function(){
   var startTime;
   function begin(){
     startTime = new Date();
    game.shotsTaken++
     $($powermeter).animate({
       backgroundColor: "#b2000"
     }, 100 ).animate({
       backgroundColor: "#00cc00"
     }, 1900).animate({
       backgroundColor: "#b2000"
     }, 100);

      $('img[src="' + newSrc + '"]').attr('src', oldSrc); // stack overflow
      if (game.shotsTaken !== 0 && game.shotsTaken%5 === 0){
      $('img[src="' + oldSrc + '"]').attr('src', newSrc); // stack overflow
    };
   };

   function end(){
     $($powermeter).animate({
       backgroundColor: "#b2000"
     }, 100);
     var now = new Date();
     //console.log(now-startTime);
     var downTime = (now -startTime);
     if (downTime > 1000 && downTime < 2000){
       if (game.shotsTaken !== 0 && game.shotsTaken%5 === 0){
       $('img[src="' + oldSrc + '"]').attr('src', newSrc);
       game.scoreCount++
       $($makeormiss).text("KOBE!");
     }
       $($makeormiss).text("SWISH!");
       game.scoreCount++
       console.log(game.scoreCount);
       $($ball).animate({
         left: "45%",
         top: "10%"
       }, 'slow').animate({
         left: "53%",
         top: "37%",
         opacity: 0
       }, 500 ).animate({
         left: "30%",
         top: "80%"
       }, 'fast').animate({
         opacity: 1,
       }, 'fast');
      // game.playerOne = game.scoreCount;
       game.updateScore();
     } else if (downTime < 1000){
       $($ball).animate({
         left: "70%",
         top: "30%",
         opacity: 0
       }, 'slow').animate({
         left: "30%",
         top: "80%",
         opacity: 1
       }, 'fast');
       $($makeormiss).text("BRICK!");
     } else if (downTime > 2000) {
       $($ball).animate({
         left: "35%",
         top: "10%",
         opacity: 0
      }, 'fast').animate({
        left: "30%",
        top: "80%",
        opacity: 1
      }, 'fast');
      $($makeormiss).text("AIRBALL!");
     };
   };
   $($ball).mousedown(begin);
   $($ball).mouseup(end) //see above notes
 },

 endTurn: function(){
   $($timerId).animate({
     color: '#ffffff'
   }, 500);
   $($ball).off();
   $($turnBox).text("Nice Shooting! You got " + game.scoreCount + " points");
   if (game.whosTurn === game.playerTwo) {
     if(game.firstScore > game.secondScore){
       $('#winner').text(game.playerOne + " You Won!")
       $($container).append('<button id="playagain">Play Again</button>');
       $('#playagain').on('click', function(){
         location.reload();
       });
       return;
     } else if (game.firstScore < game.secondScore) {
       $('#winner').text(game.playerTwo + " You Won!");
       $($container).append('<button id="playagain">Play Again</button>');
       $('#playagain').on('click', function(){
         location.reload();
       });
       return;
     } else if (game.firstScore === game.secondScore) {
       $('#winner').text("It was a tie!");
       $($container).append('<button id="playagain">Play Again</button>');
       $('#playagain').on('click', function(){
         location.reload();
       });
       return;
     };
   } else {
     $($container).append('<button id="next">Next</button>');
     $('#next').on('click', game.startNextRound);
   };
 },

 startNextRound: function(){
   $('#next').hide();
   var seconds = 35;
   game.shotsTaken = 0;
   game.scoreCount = 0;
   $($timerId).text("Shot Clock: " + seconds);
   $($turnBox).text("Player Two, You're Up! Click the Ball to start shooting!");
   if (game.whosTurn === '') {
     game.whosTurn = game.playerOne;
   } else if (game.whosTurn === game.playerOne) {
     game.whosTurn = game.playerTwo;
   };
   $($ball).on('click', game.startTheTimer);
 },


 startTheTimer: function(){
   seconds = 35;
   $($ball).off('click');
   $($turnBox).text('');
   var mytimer = setInterval(updateTime, 1000);
   function updateTime(){
     seconds--;
     $($timerId).text("Shot Clock: " + seconds);
     if(seconds < 11){
       $($timerId).animate({
         color: "#b3000",
       }, 200);
       $($timerId).fadeOut(500);
       $($timerId).fadeIn(500);
     }; if(seconds === 0) {
       clearInterval(mytimer);
       game.endTurn();
     }; // end if clearInterval
   }; // end updateTime
   game.addEventToBall();
 },

};


$( function() {
//  alert("jquery loaded");


$($startButton).on('click', game.start);
$($ball).on('click', game.startTheTimer);



});
