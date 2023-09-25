var timerEl = document.getElementById('time');
var startButton = document.getElementById('btn');
var quizQuestions = document.getElementById('quizQuestions');
var quizQuestions2 = document.getElementById('quizQuestions2');
var preQuiz = document.getElementById('preQuiz');
var correctButton = document.getElementById('correct'); 
var wrongMessage = document.getElementById('wrongMessage')
var correctMessage = document.getElementById('correctMessage')
var wrongButton1 = document.getElementById('wrong1'); 
var wrongButton2 = document.getElementById('wrong2');
var wrongButton3 = document.getElementById('wrong3');
var failureMessage = document.getElementById('failureMessage');

var timeLeft = 60;
var timerInterval;

function countdown() {
    startButton.disabled = true;
    preQuiz.style.display = 'none';
    quizQuestions.style.display = 'block';

    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = 'Time Left: ' + timeLeft + 's';
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timerInterval);
            showFailureMessage(); // Show the failure message when time runs out
        }
    }, 1000);
}

function handleCorrectAnswer() {
    quizQuestions.style.display = 'none';
    quizQuestions2.style.display = 'block';
    correctMessage.style.display = 'block';
}

function handleWrongAnswer() {
    var currentTime = parseInt(timerEl.textContent.split(':')[1]); // Extract remaining seconds
    currentTime -= 15; // Deduct 15 seconds

    if (currentTime < 0) {
        currentTime = 0; // Ensure the timer doesn't go negative
    }

    quizQuestions.style.display = 'none';
    quizQuestions2.style.display = 'block';
    wrongMessage.style.display = 'block';

    timerEl.textContent = 'Time Left: ' + currentTime + 's';
}

function showFailureMessage() {
    failureMessage.style.display = 'block'; // Display the failure message
}

startButton.addEventListener('click', countdown);

correctButton.addEventListener('click', handleCorrectAnswer); // Handle correct answer

wrongButton1.addEventListener('click', handleWrongAnswer);
wrongButton2.addEventListener('click', handleWrongAnswer);
wrongButton3.addEventListener('click', handleWrongAnswer);
