var Timer;
var TotalSeconds;
var CurrentMode;
var AlarmSound;
var PauseButton;
var Handle;

function CreateTimer(Time) {
  Timer = document.getElementById("timer");
  AlarmSound = document.getElementById("audio");
  PauseButton = document.getElementById("pause");
  PauseButton.value = "Pause";
  TotalSeconds = Time;
  CurrentMode = Time;
  UpdateTimer();
  Handle = setInterval("Tick()", 1000)
}

function Tick() {
  if (TotalSeconds <= 0) {
    AlternateTimer();
  } else {
    TotalSeconds -= 1;
    UpdateTimer();
  }
}

function UpdateTimer() {
  var Seconds = TotalSeconds;

  var Minutes = Math.floor(Seconds / 60);
  Seconds -= Minutes * (60);

  var TimeString = LeadingZero(Minutes) + " : " + LeadingZero(Seconds)

  Timer.innerHTML = TimeString;
}

function LeadingZero(Time) {
  return (Time < 10) ? "0" + Time : Time;
}

function AlternateTimer(){
  if (CurrentMode === 1500) {
    TotalSeconds = 300;
    CurrentMode = 300;
  } else {
    TotalSeconds = 1500;
    CurrentMode = 1500;
  }
  AlarmSound.play();
  clearInterval(Handle);
  window.setTimeout("StartLoop()", 8000)
}

function StartLoop () {
  UpdateTimer();
  Handle = window.setInterval("Tick()", 1000)
}

function Pause () {
  if (Handle === 0) {
    PauseButton.value = "Pause";
    Handle = window.setInterval("Tick()", 1000)
  } else if (Handle !== undefined) {
    PauseButton.value = "Unpause";
    window.clearInterval(Handle);
    Handle = 0;
  }
}
