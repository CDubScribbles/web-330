"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-01

      Project to create a timer object
      Author: Clifford Smith
      Date: 3/29/26

      Filename: project08-01.js
*/

/*--------------- Object Code --------------------*/

/* Constructor function for the timer object */
function timer(min, sec) {
   this.minutes = min;
   this.seconds = sec;
   this.timeID = null;
}

/* runPause() method for the timer object class prototype */
timer.prototype.runPause = function(timer, minBox, secBox) {
   /* countdown function that updates the timer every second */
   function countdown() {
      if (timer.seconds > 0) {
         timer.seconds--;
      } else if (timer.minutes > 0) {
         timer.minutes--;
         timer.seconds = 59;
      } else {
         // timer has reached 0:00
         window.clearInterval(timer.timeID);
         timer.timeID = null;
      }

      // Update the display boxes
      minBox.value = timer.minutes;
      secBox.value = timer.seconds;
   }

   if (timer.timeID) {
      // pause the timer
      window.clearInterval(timer.timeID);
      timer.timeID = null;
   } else {
      // start the timer
      timer.timeID = window.setInterval(countdown, 1000);
   }
};

/*---------------Interface Code -----------------*/

window.addEventListener("load", function() {
   /* Interface Objects */
   let minBox = document.getElementById("minutesBox");
   let secBox = document.getElementById("secondsBox");
   let runPauseTimer = document.getElementById("runPauseButton");

   // Create an instance of the timer object
   let myTimer = new timer(parseInt(minBox.value), parseInt(secBox.value));

   // onchange handlers for the input boxes
   minBox.onchange = function() {
      myTimer.minutes = parseInt(minBox.value);
   };

   secBox.onchange = function() {
      myTimer.seconds = parseInt(secBox.value);
   };

   // onclick handler for the Run/Pause button
   runPauseTimer.addEventListener("click", function() {
      myTimer.runPause(myTimer, minBox, secBox);
   });
});