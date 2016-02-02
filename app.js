var $timerId = $('#timer');
var seconds = 45;





var game = {
  start: function(){
    var mytimer = setInterval(updateTime, 1000);

    function updateTime(){
      seconds--;
      $($timerId).text("Shot Clock: " + seconds);
      console.log(mytimer);
      if(seconds === 0) {
        clearInterval(mytimer);
      }; // end if clearInterval
    }; // end updateTime
 } // end start




};





$( function() {
//  alert("jquery loaded");


game.start()



});
