var ans1btn = document.querySelector("#ans1");
var ans2btn = document.querySelector("#ans2");
var ans3btn = document.querySelector("#ans3");
var ans4btn = document.querySelector("#ans4");
var quizQuestions = document.querySelector("#quiz-questions");
var answerBtns = document.querySelector("#answers");
var startBtn = document.querySelector("#start-btn");
var timerEl = document.querySelector(".timer-count");

var quizArraySelect = 0;
var timer;
var timerCount;

// Array of objects with each object being a question and giving its possible answers
var quizArray = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      {answerText: "strings", answerResult: false},
      {answerText: "booleans", answerResult: false},
      {answerText: "alerts", answerResult: true},
      {answerText: "numbers", answerResult: false}
    ]
  },
  {
    question: "The condition in an if/else statement is enclosed within ___.",
    answers: [
      {answerText: "quotes", answerResult: false},
      {answerText: "curly brackets", answerResult: false},
      {answerText: "parentheses", answerResult: true},
      {answerText: "square brackets", answerResult: false}
    ]
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      {answerText: "numbers and strings", answerResult: false},
      {answerText: "other arrays", answerResult: false},
      {answerText: "booleans", answerResult: false},
      {answerText: "all of the above", answerResult: true}
    ]
  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables.",
    answers: [
      {answerText: "commas", answerResult: false},
      {answerText: "curly brackets", answerResult: false},
      {answerText: "quotes", answerResult: true},
      {answerText: "parentheses", answerResult: false}
    ]
  },
  {
    question: "A very useful too used during development and debugging for printing content to the debugger is:",
    answers: [
      {answerText: "JavaScript", answerResult: false},
      {answerText: "terminal/bash", answerResult: false},
      {answerText: "for loops", answerResult: true},
      {answerText: "console.log", answerResult: false}
    ]
  }
];

function init() {
  getScores();
}

function startQuiz() {
  timerCount = 75;
  // renderQuestions();
  startTimer();
  startBtn.setAttribute("class", "hidden");
  answerBtns.setAttribute("class", "buttons");
  setQuestions();
}

function setQuestions() {
  renderQuestions(quizArray[quizArraySelect]);
}

function renderQuestions(question) {
  quizQuestions.textContent = question.question;
  ans1btn.textContent = question.answers[0].answerText;
  ans2btn.textContent = question.answers[1].answerText;
  ans3btn.textContent = question.answers[2].answerText;
  ans4btn.textContent = question.answers[3].answerText;
}

function selectAnswer() {

}

function startTimer(){
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    // Create condition for if questions are answered within timelimit
    // Test for if time runs out
    if (timerCount === 0) {
      clearInterval(timer);
    }
  }, 1000);
};

function getScores() {

};

// Event listner to start the quiz when the start button is clicked
startBtn.addEventListener("click", startQuiz);

// Initializes the page and retrieves past scores
init();
