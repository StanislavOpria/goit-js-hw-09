import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date().getTime() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};
const calendar = flatpickr('#datetime-picker', options);

startBtn.setAttribute('disabled', 'true');

function getLessTime() {
  startBtn.setAttribute('disabled', 'true');
  setInterval(() => {
    const lessTime = calendar.selectedDates[0].getTime() - new Date().getTime();
    if (lessTime >= 0) {
      convertMs(lessTime);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  days.textContent = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  hours.textContent = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  minutes.textContent = addLeadingZero(
    Math.floor(((ms % day) % hour) / minute)
  );
  // Remaining seconds
  seconds.textContent = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', getLessTime);
