const progressBar = document.querySelector("#progress");
const timeLabel = document.querySelector("#time");
const slider = document.querySelector("#duration");
const resetBtn = document.querySelector("#reset");

let timer = null;
let elapsed = 0;

function startTimer(initialTime, duration) {
  if (duration <= 0) return;
  elapsed = initialTime;
  progressBar.max = duration;
  progressBar.value = elapsed;

  timer = setInterval(() => {
    elapsed++;
    if (elapsed >= duration) {
      clearInterval(timer);
      elapsed = 0;
      progressBar.value = 0;
      timeLabel.textContent = "Timer Complete!";
      return;
    }
    progressBar.value = elapsed;
    timeLabel.textContent = `${elapsed}s`;
  }, 1000);
}

function updateTimer() {
  const duration = Number(slider.value);
  clearInterval(timer);
  startTimer(elapsed, duration);
}

function resetTimer() {
  clearInterval(timer);
  elapsed = 0;
  const duration = Number(slider.value);
  startTimer(0, duration);
}

slider.addEventListener("input", updateTimer);
resetBtn.addEventListener("click", resetTimer);

resetTimer();
