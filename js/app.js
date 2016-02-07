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
var $bigbox = $('.bigbox');

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
  difficulty: '',


  //move hoop in background


randNum: function(){
    return Math.floor(Math.random() * (1100 - 10 + 1)) + 10;
},

start: function(){
    $('p').hide();
    $($startButton).hide();
    $($bigbox).animate({ left: "20%", width: "60%", height: "8%"}, 700);
    $($bigbox).append('<button class="diff" id="rookie">Rookie</button>');
    $($bigbox).append('<button class="diff" id="pro">Pro</button>');
    $($bigbox).append('<button class="diff" id="allstar">All-Star</button>');
    $($bigbox).append('<button id="manual">How To Play</button>')
    $('.diff').on('click', game.diffLevel);
    $('#manual').on('click', game.showDirections);
// make difficulty not string .. number
 }, // end start


showDirections: function(){
  $($bigbox).animate({ height: "48%"}, 500);
  $('p').show();
  $('.diff').hide();
  $('#manual').hide();
  $('p').on('click', game.start);

},


 diffLevel: function(){
   $('.diff').hide();
   game.difficulty = $(this).text();
   $($bigbox).hide();
   $($powermeter).text("").animate({ left: "10%", bottom: "18%" }, 'slow').animate({
     height: 36, width: 160}, 'fast');
   $($powermeter).append('<div id="innerbox"> Shoot !</div>');
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
 },

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


makeShot: function(){
  if (game.shotsTaken !== 0 && game.shotsTaken%5 === 0){
  $('img[src="' + oldSrc + '"]').attr('src', newSrc);
  game.scoreCount+=2;
  $($makeormiss).text("You're On Fire!");
} else {
  $($makeormiss).text("SWISH!");
  game.scoreCount++
  console.log(game.scoreCount);
};
  game.updateScore();
},

missShotLong: function() {
 $($makeormiss).text("Late Release!");
},

missShotShort: function(){
  $($makeormiss).text("Early Release!");
},

animateMake: function(){
  $($ball).animate({ left: "45%", top: "10%" }, 'slow').animate({
                     left: "53%", top: "37%", opacity: 0 }, 500 ).animate({
                     left: game.randNum(), top: "80%" }, 'fast').animate({ opacity: 1, }, 'fast');
},

animateMissShort: function(){
  $($ball).animate({ left: "70%", top: "30%", opacity: 0 }, 'slow').animate({
                     left: game.randNum(), top: "80%", opacity: 1 }, 'fast');
},

animateMissLong: function(){
  $($ball).animate({ left: "35%", top: "10%", opacity: 0 }, 'fast').animate({
                     left: game.randNum(), top: "80%", opacity: 1 }, 'fast');
},

animatePowerMeter: function(){
    switch (game.difficulty) {
      case "Rookie":
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1700).animate({
                                 backgroundColor: "#b3000"}, 200);
        break;
      case "Pro":
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1500).animate({
                                 backgroundColor: "#b9000"}, 200);
        break;
      case "All-Star":
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1500).animate({
                                 backgroundColor: "#c2000"}, 200);
        break;
      default:
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1700).animate({
                               backgroundColor: "#b3000"}, 200);
    };
},

animateWinner: function(){
  $('#winner').animate({ top: "20%" }, 4000);
},




 addEventToBall: function(){
       var startTime;
       function begin(){
          startTime = new Date();
          game.shotsTaken++
          game.animatePowerMeter();
          $('img[src="' + newSrc + '"]').attr('src', oldSrc); // stack overflow
          if (game.shotsTaken !== 0 && game.shotsTaken%5 === 0){
            $('img[src="' + oldSrc + '"]').attr('src', newSrc); // stack overflow
          };
       }; // end begin function

       function end(){

         $('#innerbox').stop();
         $('#innerbox').animate({
           width: "0%",
           backgroundColor: "ffffff"
         }, 100);

          var now = new Date();
          var downTime = (now -startTime);
          game.randNum();
          switch (game.difficulty) { // make switch case
                case 'Rookie':
                  if (downTime > 1000 && downTime < 2000){
                     game.makeShot();
                     game.animateMake();
                   } else if (downTime < 1000){
                     game.missShotShort();
                     game.animateMissShort();
                   } else if (downTime > 2000) {
                     game.missShotLong();
                     game.animateMissLong();
                   };
                   break;
               case 'Pro':
                  if (downTime > 1200 && downTime < 1800){
                     game.makeShot();
                     game.animateMake();
                   } else if (downTime < 1200){
                     game.missShotShort();
                     game.animateMissShort();
                   } else if (downTime > 1800) {
                     game.missShotLong();
                     game.animateMissLong();
                   };
                   break;
               case 'All-Star':
                  if (downTime > 1400 && downTime < 1600){
                     game.makeShot();
                     game.animateMake();
                   } else if (downTime < 1400){
                     game.missShotShort();
                     game.animateMissShort();
                   } else if (downTime > 1600) {
                     game.missShotLong();
                     game.animateMissLong();
                   };
                  break;
          }; //end switch difficulty
         }; // end end function
    $($ball).mousedown(begin);
    $($ball).mouseup(end) //see above notes
 }, // end addEventToBall function

 endTurn: function(){
       $($timerId).animate({ color: '#ffffff' }, 500);
       $($ball).off();
       $($turnBox).text("Nice Shooting! You got " + game.scoreCount + " points");
       if (game.whosTurn === game.playerTwo) {
         if(game.firstScore > game.secondScore){
           $('#winner').text(game.playerOne + " You Won!")
           game.animateWinner();
           $($container).append('<button id="playagain">Play Again</button>');
           $('#playagain').on('click', function(){
             location.reload();
           });
           return;
         } else if (game.firstScore < game.secondScore) {
           $('#winner').text(game.playerTwo + " You Won!");
           game.animateWinner();
           $($container).append('<button id="playagain">Play Again</button>');
           $('#playagain').on('click', function(){
             location.reload();
           });
           return;
         } else if (game.firstScore === game.secondScore) {
           $('#winner').text("It was a tie!");
           game.animateWinner();
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

 }, // end endTurn function

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
         $($timerId).animate({ color: "#b3000", }, 200);
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

$('p').hide();
$($startButton).on('click', game.start);
$($ball).on('click', game.startTheTimer);



});
