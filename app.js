var $timerId = $('#timer');
var seconds = 45;
var $playerOneScore = $('#first-score');
var $playerTwoScore = $('#second-score');
var $startButton = $('#btn');
var $ball = $('#ball');

var ball = {
  made: false,
  missed: false,
  checkforMake: function(){

  }
}



var game = {
  playerOne: 0,
  playerTwo: 0,


  start: function(){
    $($playerOneScore).text("Player One Score: " + game.playerOne);
    $($playerTwoScore).text("Player Two Score: " + game.playerTwo);
    $($ball).append('<img class="basketball" src="http://icons.iconseeker.com/png/fullsize/nx10/basketball.png">')

    var mytimer = setInterval(updateTime, 1000);

    function updateTime(){
      seconds--;
      $($timerId).text("Shot Clock: " + seconds);
      if(seconds === 0) {
        clearInterval(mytimer);
      }; // end if clearInterval
    }; // end updateTime



 } // end start




};





$( function() {
//  alert("jquery loaded");


$($startButton).on('click', game.start);



});
