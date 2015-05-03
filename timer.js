var Timer;
var TotalSeconds;
var CurrentMode;
var TimesLooped;
var MaxLoop;
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
  TimesLooped = 0;
  ChangeMax();
  UpdateTimer();
  if (Handle) {
    clearInterval(Handle);
  }
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
  if (CurrentMode === 300 || CurrentMode === 900) {
    TotalSeconds = 1500;
    CurrentMode = 1500;
  } else {
    TimesLooped++
    if (MaxLoop && TimesLooped >= MaxLoop) {
      TotalSeconds = 900;
      CurrentMode = 900;
      TimesLooped = 0;
    } else {
      TotalSeconds = 300;
      CurrentMode = 300;
    }
  }
  AlarmSound.play();
  if (Alert) {
    if (CurrentMODE === 1500) {
      alert("Break's over! Get to work!")
    } else {
      alert("Work's over! Time to play!")
    }
  }
  clearInterval(Handle);
  window.setTimeout("StartLoop()", 800)
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

function ChangeMax () {
  MaxLoop = parseInt(document.getElementById('selectMax').value);
}

function TestSound() {
  AlarmSound.play();
}
