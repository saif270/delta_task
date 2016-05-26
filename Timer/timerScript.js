var days;
var hours;
var minutes;
var seconds;

var daysDisplay = document.getElementById("dayDisplayID");
var hoursDisplay  = document.getElementById("hourDisplayID");
var minutesDisplay  = document.getElementById("minuteDisplayID");
var secondsDisplay = document.getElementById("secondsDisplayID");

var pauseTimerState = false;
var resetTimer = false;
var currentTimerInstance;
var timeoutInstance;

function getTimerValues()
{
  days=document.getElementById("DaysInputId").value;
  hours=document.getElementById("HoursInputId").value;
  minutes=document.getElementById("MinutesInputId").value;
  seconds=document.getElementById("SecondsInputId").value;
  setTimerValues(days,hours,minutes,seconds);

}



function setTimerValues(days,hours,minutes,seconds)
{
  daysDisplay.innerHTML = days;
  hoursDisplay.innerHTML = hours;
  minutesDisplay.innerHTML = minutes;
  secondsDisplay.innerHTML = seconds;
}

function setTimerState(state)
{
  if(state == "start")
  {
    pauseTimerState = false;
    console.log("Timer started");
  }
  else if(state == "pause")
  {
    pauseTimerState = !pauseTimerState;
    console.log("Timer paused");
  }
  else if(state ==  "reset")
  {
    pauseTimerState = true;
    resetTimer = true;

    console.log("Timer reset");
  }

  runTimer(pauseTimerState);
  if(resetTimer)
  resetTheTimer();
}

function runTimer(pauseTimerState)
{
  if(pauseTimerState == false)
  {

    // for safety, because the timer speeds up if multiple clicks are made
    if(currentTimerInstance!=null)
      clearTimeout(currentTimerInstance);



    currentTimerInstance = setInterval(function(){
      console.log(isTimerValid());
      if(isTimerValid()){
        countDown();
        setTimerValues(days,hours,minutes,seconds);
      }
      else{
        clearTimeout(currentTimerInstance);
        document.getElementById("timerCompleteGIF").style.display = "inline-block";
      }
    },1000);
  }
  else
  {
    clearTimeout(currentTimerInstance);
  }
}

function isTimerValid(){

  if(seconds>0 || minutes>0 || hours>0 || days>0){
    return true;
  }
  else if(seconds==0 && minutes==0 && hours==0 && days==0){
    return false;
  }
}


function countDown()
{

  // this function contains the actuall countDown logic
  seconds--;
  if(seconds<=0 && (minutes>0 || hours>0 || days>0))
  {
    seconds = 59;
    minutes--;
    if(minutes<=0 && (hours>0 || days>0))
    {
      minutes = 59;
      hours--;
      if(hours<=0 && days>0)
      {
        hours = 23;
        days--;
        if(days<=0)
        {
          days = 0;
        }
      }
    }
  }
}

function resetTheTimer()
{
  setTimerValues(0,0,0,0);
}




document.getElementById("Set_Timer").addEventListener("click",getTimerValues);
document.getElementById("Start_Timer").addEventListener("click",function(){setTimerState("start");});
document.getElementById("Pause_Timer").addEventListener("click",function(){setTimerState("pause");});
document.getElementById("Reset_Timer").addEventListener("click",function(){setTimerState("reset");});
