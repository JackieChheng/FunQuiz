var timerEl = document.getElementById('time');
var startButton = document.querySelector('.btn');

function countdown() {
    var timeLeft = 60;
    startButton.disabled = true; 

    var timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = 'Time Left: ' + timeLeft + 's';
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timerInterval);
            // displaymessage(); // You may want to call your function here if needed
        }
    }, 1000);
}

startButton.addEventListener('click', countdown); // Start the countdown when the button is clicked
