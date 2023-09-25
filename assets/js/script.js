const timerEl = document.getElementById('time');
const startButton = document.getElementById('btn');
const quizSections = [
    document.getElementById('quizQuestions'),
    document.getElementById('quizQuestions2'),
    document.getElementById('quizQuestions3'),
    document.getElementById('quizQuestions4'),
];
const preQuiz = document.getElementById('preQuiz');

const correctButtons = [
    document.getElementById('correct1'),
    document.getElementById('correct2'),
    document.getElementById('correct3'),
    document.getElementById('correct4'),
];
const wrongButtons = [
    document.getElementById('wrong1_1'),
    document.getElementById('wrong1_2'),
    document.getElementById('wrong1_3'),
    document.getElementById('wrong2_1'),
    document.getElementById('wrong2_2'),
    document.getElementById('wrong2_3'),
    document.getElementById('wrong3_1'),
    document.getElementById('wrong3_2'),
    document.getElementById('wrong3_3'),
    document.getElementById('wrong4_1'),
    document.getElementById('wrong4_2'),
    document.getElementById('wrong4_3'),
];

const failureMessage = document.getElementById('failureMessage');
const gameOverMessage = document.getElementById('gameOverMessage');

const correctMessage = document.getElementById('correctMessage'); 
const wrongMessage = document.getElementById('wrongMessage'); 

let timeLeft = 60;
let timerInterval;
let score = 0;
let currentQuizIndex = 0; 

function startQuiz() {
    startButton.disabled = true;
    preQuiz.style.display = 'none';

    quizSections[currentQuizIndex].style.display = 'block';

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
    clearInterval(timerInterval); // Clear the timer interval
    correctMessage.style.display = 'none';
    wrongMessage.style.display = 'none';
    quizSections[currentQuizIndex].style.display = 'none';
    currentQuizIndex++;
    if (currentQuizIndex < quizSections.length) {
        quizSections[currentQuizIndex].style.display = 'block';
    } else {
        showGameOverMessage();
    }
    document.getElementById('correctMessage').style.display = 'block'; 
    score += timeLeft;
    displayScore();
}

function handleWrongAnswer() {
    clearInterval(timerInterval); // Clear the timer interval
    correctMessage.style.display = 'none';
    wrongMessage.style.display = 'none';    
    const currentTime = parseInt(timerEl.textContent.split(':')[1]);
    const timeDeduction = 15;
    const newTime = Math.max(currentTime - timeDeduction, 0);

    quizSections[currentQuizIndex].style.display = 'none';
    currentQuizIndex++;
    if (currentQuizIndex < quizSections.length) {
        quizSections[currentQuizIndex].style.display = 'block';
    } else {
        showGameOverMessage();
    }
    document.getElementById('wrongMessage').style.display = 'block'; 
    timerEl.textContent = 'Time Left: ' + newTime + 's';
}

function showFailureMessage() {
    failureMessage.style.display = 'block';
}

function displayScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Your Score: ' + score;
}

function showGameOverMessage() {
    const name = prompt('Enter your name:'); 
    const message = `Game Over! Your score was ${score}`;
    gameOverMessage.textContent = message;
    gameOverMessage.style.display = 'block';
    correctMessage.style.display = 'none';
    wrongMessage.style.display = 'none';

    // Store the user's name and score in local storage
    if (name && name.trim() !== '') {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ name, score });
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
}

startButton.addEventListener('click', startQuiz);

correctButtons.forEach((button) => {
    button.addEventListener('click', handleCorrectAnswer);
});

wrongButtons.forEach((button) => {
    button.addEventListener('click', handleWrongAnswer);
})
