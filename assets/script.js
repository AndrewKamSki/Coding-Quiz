var ans1btn = document.querySelector("#ans1");
var ans2btn = document.querySelector("#ans2");
var ans3btn = document.querySelector("#ans3");
var ans4btn = document.querySelector("#ans4");
var quizQuestions = document.querySelector("#quiz-questions");
var answerBtns = document.querySelector("#answers");
var startBtn = document.querySelector("#start-btn");
var timerEl = document.querySelector(".timer-count");
var scoreSubmitEl = document.querySelector("#submit-entry");
var scoresEl = document.querySelector(".scores");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit")
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-highscores");

var quizArraySelect = 0;
var timer;
var timerCount;
var finalTime;
var initials;

var pastScores = [];

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
  quizQuestions.setAttribute("class", "center");
  startBtn.setAttribute("class", "btn");
  goBackBtn.setAttribute("class", "hidden");
  clearScoresBtn.setAttribute("class", "hidden");
}

function startQuiz() {
  timerCount = 75;
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

function checkAnswer(e) {
  // evaluation of if clicked button was correct
  var clickedBtn = e.target.textContent;
  for (var i=0;i<quizArray[quizArraySelect].answers.length;i++) {
    if(clickedBtn == quizArray[quizArraySelect].answers[i].answerText) {
      var answerBool = quizArray[quizArraySelect].answers[i].answerResult;
    }
  }
  if (!answerBool){
    timerCount = timerCount - 10;
  }
  // Adds to the selector of the quiz array to prep the next question
  quizArraySelect++;
  // Checks to see if all questions asked
  if(quizArraySelect === quizArray.length) {
    // If true, stops and records time, and initiates score entry function 
    clearInterval(timer);
    finalTime = timerCount;
    enterScore();
  } else {
    // If false, populates next question
    setQuestions();
  }
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

function enterScore() {
  timerEl.textContent = " ";
  answerBtns.setAttribute("class", "hidden");
  quizQuestions.textContent = "All Done! You scored a " + finalTime + "!";
  scoreSubmitEl.setAttribute("class", "submit-score center");
}

function setScores() {
  var entry = {
    initials: initialsEl.value,
    score: finalTime
  }
  if (pastScores !== null) {
    pastScores.push(entry);
  } else {
    pastScores.append(entry);
  }
  localStorage.setItem("pastScores", JSON.stringify(pastScores));
  getScores();
}

function getScores() {
  scoreSubmitEl.setAttribute("class", "hidden");
  goBackBtn.setAttribute("class", "btn");
  clearScoresBtn.setAttribute("class", "btn");
  startBtn.setAttribute("class","hidden");
  quizQuestions.setAttribute("class","hidden");
  answerBtns.setAttribute("class", "hidden");
  var storedScores = JSON.parse(localStorage.getItem("pastScores"));
  if (storedScores !== null) {
    document.getElementsByClassName("ans-result").textContent = storedScores.initials + ": " + storedScores.score;
  } else {
    return;
  }
};

// Event listener for when go back button is submitted
goBackBtn.addEventListener("click", init);

// Event listner for when a score is submitted
submitBtn.addEventListener("click", setScores);

// Event listener for when an answer is selected
answerBtns.addEventListener("click", checkAnswer);

// Event listener to start the quiz when the start button is clicked
startBtn.addEventListener("click", startQuiz);

// Event listener to retrieve past scores
scoresEl.addEventListener("click", getScores);

// Initializes the page and retrieves past scores
init();
