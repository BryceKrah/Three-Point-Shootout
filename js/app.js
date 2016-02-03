var $timerId = $('#timer');
var seconds = 25;
var $playerOneScore = $('#first-score');
var $playerTwoScore = $('#second-score');
var $startButton = $('#btn');
var $ball = $('#ball');


// http://stackoverflow.com/questions/1038677/how-can-i-measure-the-time-between-click-and-release-in-javascript
// the begin function starts counting when the mouse is clicked logging its time down in miliseconds
// the end function then subtracts the start time from the current time giving you the time down held down in miliseconds
//
// var startTime;
// function begin(){
//   startTime = new Date();
// };
// function end(){
//   var now = new Date();
//   //console.log(now-startTime);
//   console.log(now -startTime);
// };


var ball = {
  made: false,
  missed: false,

};



var game = {
  playerOne: 0,
  playerTwo: 0,
  scoreCount: 0,


  start: function(){
    $($playerOneScore).text("Player One Score: " + game.playerOne);
    $($playerTwoScore).text("Player Two Score: " + game.playerTwo);
    $($ball).append('<img class="basketball" src="http://icons.iconseeker.com/png/fullsize/nx10/basketball.png">');
    $($timerId).text("Shot Clock: " + seconds);
    // var mytimer = setInterval(updateTime, 1000);
    //
    // function updateTime(){
    //   seconds--;
    //   $($timerId).text("Shot Clock: " + seconds);
    //   if(seconds === 0) {
    //     clearInterval(mytimer);
    //   }; // end if clearInterval
    // }; // end updateTime
    // game.addEventToBall();
 }, // end start


 updateScore: function(){
   if (seconds !== 0) {
   $($playerOneScore).text("Player One Score: " + game.playerOne);
  };
 },

 addEventToBall: function(){
   var startTime;
   function begin(){
     startTime = new Date();
   };
   function end(){
     var now = new Date();
     //console.log(now-startTime);
     var downTime = (now -startTime);
     if (downTime > 1000 && downTime < 2000){
       console.log("you made the shot");
       game.scoreCount++
       console.log(game.scoreCount);
       game.playerOne = game.scoreCount;
       game.updateScore();
     } else {
       console.log("you missed");
     };
   };
   $($ball).mousedown(begin);
   $($ball).mouseup(end) //see above notes

 },

 startTheTimer: function(){
   $($ball).off('click');
   var mytimer = setInterval(updateTime, 1000);
   function updateTime(){
     seconds--;
     $($timerId).text("Shot Clock: " + seconds);
     if(seconds === 0) {
       clearInterval(mytimer);
     }; // end if clearInterval
   }; // end updateTime
   game.addEventToBall();
 },


 shoot: function(){

 }


};





$( function() {
//  alert("jquery loaded");


$($startButton).on('click', game.start);
$($ball).on('click', game.startTheTimer);


});
