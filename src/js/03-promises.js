const form = document.querySelector('.form');

form.addEventListener('submit', handleSendForm);

function handleSendForm(event) {
  event.preventDefault();
  let { firstDelay, step, amount } = {
    firstDelay: event.currentTarget.delay.value,
    step: event.currentTarget.step.value,
    amount: event.currentTarget.amount.value,
  };

  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      logPromises(i, firstDelay);
    } else {
      firstDelay = Number(step) + Number(firstDelay);
      logPromises(i, firstDelay);
    }
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function logPromises(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
