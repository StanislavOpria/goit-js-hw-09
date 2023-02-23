function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', handleChangeBgd);
stopBtn.addEventListener('click', handleStopChangeBgd);

function handleChangeBgd() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', 'true');
}

function handleStopChangeBgd() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'true');
}
