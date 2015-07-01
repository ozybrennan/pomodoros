var timer;
var totalSeconds;
var workLength;
var shortBreakLength;
var longBreakLength
var currentMode;
var timesLooped;
var maxLoop;
var alarmSound;
var pauseButton;
var handle;
var alertStatus;

function createTimer(){
  timer = document.getElementById("timer");
  alarmSound = document.getElementById("audio");
  pauseButton = document.getElementById("pause");
  pauseButton.value = "Pause";
  alertStatus = false;
}

function start() {
  workLength = document.getElementById("workPeriod").value * 60;
  shortBreakLength = document.getElementById("breakPeriod").value * 60;
  longBreakLength = document.getElementById("longBreakPeriod").value * 60;
  totalSeconds = workLength;
  currentMode = "work";
  timesLooped = 0;
  changeMax();
  updateTimer();
  if (handle) {
    clearInterval(handle);
  }
  handle = setInterval("tick()", 1000)
}

function tick() {
  if (totalSeconds <= 0) {
    alternateTimer();
  } else {
    totalSeconds -= 1;
    updateTimer();
  }
}

function updateTimer() {
  var seconds = totalSeconds;

  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * (60);

  var timeString = leadingZero(minutes) + " : " + leadingZero(seconds)

  timer.innerHTML = timeString;
}

function leadingZero(time) {
  return (time < 10) ? "0" + time : time;
}

function alternateTimer(){
  if (currentMode === "break") {
    totalSeconds = workLength;
    currentMode = "work";
  } else {
    currentMode = "break";
    timesLooped++
    if (maxLoop && timesLooped >= maxLoop) {
      totalSeconds = longBreakLength;
      timesLooped = 0;
    } else {
      totalSeconds = shortBreakLength;
    }
  }
  alarmSound.play();
  if (alertStatus) {
    if (currentMode === "work") {
      alert("Break's over! Get to work!")
    } else {
      alert("Work's over! Time to play!")
    }
  }
  clearInterval(handle);
  window.setTimeout("startLoop()", 800)
}

function startLoop () {
  updateTimer();
  handle = window.setInterval("tick()", 1000)
}

function pause () {
  if (handle === 0) {
    pauseButton.value = "Pause";
    handle = window.setInterval("tick()", 1000)
  } else if (handle !== undefined) {
    pauseButton.value = "Unpause";
    window.clearInterval(handle);
    handle = 0;
  }
}

function changeMax () {
  maxLoop = parseInt(document.getElementById('selectMax').value);
}

function testSound() {
  alarmSound.play();
}

function swapAlert(){
  alertStatus = alertStatus ? false : true;
}

function changeLength(id){
  var value = document.getElementById(id)
  if (id === "workPeriod") {
    workLength = value;
  } else if (id === "breakPeriod") {
    shortBreakLength = value;
  } else {
    longBreakLength = value; 
  }
}
