const timerEl = document.getElementById('time');
const startButton = document.getElementById('btn');
const quizQuestions = document.getElementById('quizQuestions');
const preQuiz = document.getElementById('preQuiz');
const correctButton = document.getElementById('correct'); 
const wrongButtons = [document.getElementById('wrong1'), document.getElementById('wrong2'), document.getElementById('wrong3')];
const failureMessage = document.getElementById('failureMessage');

let timeLeft = 60;
let timerInterval;
let score = 0;

function startQuiz() {
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
            showFailureMessage();
            score = 0;
            displayScore();
        }
    }, 1000);
}

function handleCorrectAnswer() {
    quizQuestions.style.display = 'none';
    quizQuestions2.style.display = 'block';
    correctMessage.style.display = 'block';
    score += timeLeft;
    displayScore();
}

function handleWrongAnswer() {
    const currentTime = parseInt(timerEl.textContent.split(':')[1]);
    const timeDeduction = 15;
    const newTime = Math.max(currentTime - timeDeduction, 0);

    quizQuestions.style.display = 'none';
    quizQuestions2.style.display = 'block';
    wrongMessage.style.display = 'block';

    timerEl.textContent = 'Time Left: ' + newTime + 's';
}

function showFailureMessage() {
    failureMessage.style.display = 'block';
}

function displayScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Your Score: ' + score;
}

startButton.addEventListener('click', startQuiz);

correctButton.addEventListener('click', handleCorrectAnswer);

wrongButtons.forEach((button) => {
    button.addEventListener('click', handleWrongAnswer);
});
