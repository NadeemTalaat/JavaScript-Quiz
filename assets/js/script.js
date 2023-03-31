// Landing Page
var body = document.body;

var topBar = document.createElement("section");
var highscore = document.createElement("a");
var timer = document.createElement("div");
var main = document.createElement("section");
var answers = document.createElement("section");
var h1El = document.createElement("h1");
var sub = document.createElement("div");
var result = document.createElement("div");
var start = document.createElement("button");
var finalScore = document.createElement("div");
var form = document.createElement("form");
var label = document.createElement("label");
var input = document.createElement("input");
var submitBtn = document.createElement("input");
var button = document.createElement("button");
var table = document.createElement("table");
var timeLeft = 0;
var score = 0;
var questionIndex = 0;

topBar.setAttribute("id", "top-bar");
highscore.textContent = "View Highscores";
highscore.setAttribute("href", "#");
highscore.addEventListener("click", showScores);

main.setAttribute("id", "main-container");

timer.textContent = `Time left: ${timeLeft}s`;
h1El.textContent = "Coding Quiz Challenge";
sub.textContent =
  "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score / time by ten seconds";
start.textContent = "Start Quiz";
start.setAttribute("id", "start-quiz-button");

body.appendChild(topBar);
topBar.appendChild(highscore);
topBar.appendChild(timer);
body.appendChild(main);
main.appendChild(h1El);
main.appendChild(sub);
main.appendChild(start);

function homePage() {
  main = document.createElement("section");
  main.setAttribute("id", "main-container");
  h1El.textContent = "Coding Quiz Challenge";
  sub.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score / time by ten seconds";
  start.textContent = "Start Quiz";
  start.setAttribute("id", "start-quiz-button");
  body.appendChild(main);
  main.appendChild(h1El);
  main.appendChild(sub);
  main.appendChild(start);
}
// Declare function to run startQuiz function when start quiz button is clicked
start.addEventListener("click", startQuiz);

// Add function to start timer countdown
function startTimer() {
  timeLeft = 75;
  interval = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(interval);
      timer.innerHTML = "Time's up!";
      showEndPage();
    } else {
      timer.innerHTML = "Time Left: " + timeLeft + "s";
    }
    timeLeft -= 1;
  }, 1000);
}

// Create list of questions to be asked
var quizQuestions = [
  {
    question: "What is 5+5?",
    answers: {
      option1: "8",
      option2: "10",
      option3: "4",
      option4: "9",
    },
    correctAnswer: "10",
  },
  {
    question: "What is 9x2?",
    answers: {
      option1: "18",
      option2: "11",
      option3: "24",
      option4: "13",
    },
    correctAnswer: "18",
  },
  {
    question: "What color is an apple?",
    answers: {
      option1: "Green",
      option2: "Blue",
      option3: "Red",
      option4: "Orange",
    },
    correctAnswer: "Red",
  },
  {
    question: "What province is Toronto in?",
    answers: {
      option1: "Quebec",
      option2: "British Columbia",
      option3: "Alberta",
      option4: "Ontario",
    },
    correctAnswer: "Ontario",
  },
];

function showQuestion(questionIndex) {
  main.setAttribute("id", "question-card");

  h1El.textContent = quizQuestions[questionIndex].question;
  main.appendChild(h1El);
}

function showAnswers(questionIndex) {
  answers.setAttribute("id", "answers");
  main.appendChild(answers);

  answers.innerHTML = "";

  for (key in quizQuestions[questionIndex].answers) {
    var ans = document.createElement("button");
    ans.textContent = quizQuestions[questionIndex].answers[key];
    answers.appendChild(ans);

    ans.addEventListener("click", function (event) {
      var isCorrect = undefined;

      if (
        event.target.textContent == quizQuestions[questionIndex].correctAnswer
      ) {
        isCorrect = true;
        score = score + 1;
      } else {
        isCorrect = false;
        timeLeft = timeLeft - 10;
      }

      if (questionIndex < quizQuestions.length - 1) {
        questionIndex++;
        showQuestion(questionIndex);
        showAnswers(questionIndex);
        showResult(isCorrect);
      } else if (timeLeft == 0 || questionIndex == quizQuestions.length - 1) {
        showEndPage();
      }
    });
  }
}

function showResult(isCorrect) {
  if (isCorrect) {
    result.textContent = "Correct Answer!";
    main.appendChild(result);
  } else {
    result.textContent = "Incorrect Answer!";
    main.appendChild(result);
  }
}

function showEndPage() {
  main.innerHTML = "";

  timeLeft = 0;
  timer.innerHTML = "";
  main.setAttribute("id", "end-page");
  h1El.textContent = "All done!";

  main.appendChild(h1El);

  finalScore.textContent = `Your final score is ${score}.`;
  main.appendChild(finalScore);

  main.appendChild(form);

  label.setAttribute("for", "initial");
  label.textContent = "Enter initials: ";
  form.appendChild(label);

  input.setAttribute("type", "text");
  input.setAttribute("id", "initial");
  input.setAttribute("name", "initial");
  input.setAttribute("placeholder", "Enter initials here");
  form.appendChild(input);

  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");
  submitBtn.setAttribute("id", "submit");
  form.appendChild(submitBtn);

  submitBtn.addEventListener("click", submitForm);
}

function submitForm(event) {
  event.preventDefault();

  var initial = document.querySelector("#initial").value;

  var usersJSON = localStorage.getItem("users") || "[]";
  var users = JSON.parse(usersJSON);

  var newUser = {
    initial: initial,
    score: score,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  showScores();
}

function showScores() {
  main.innerHTML = "";
  main.setAttribute = "score-page";
  h1El.textContent = "Scores";
  console.log(h1El);
  main.appendChild(h1El);

  table.setAttribute("id", "score-table");
  main.appendChild(table);

  userScores = JSON.parse(localStorage.getItem("users"));
  console.log(userScores);

  for (var user of userScores) {
    var row = document.createElement("tr");
    var initCell = document.createElement("td");
    var scoreCell = document.createElement("td");

    table.appendChild(row);

    initCell.textContent = user.initial;
    scoreCell.textContent = user.score;

    row.appendChild(initCell);
    row.appendChild(scoreCell);
  }

  button.textContent = "Restart Quiz";
  button.setAttribute("id", "restart");
  main.appendChild(button);
  button.addEventListener("click", function () {
    location.reload();
  });
}

// Add function to start quiz
function startQuiz() {
  score = 0;
  questionIndex = 0;
  startTimer();

  main.innerHTML = "";

  showQuestion(questionIndex);
  showAnswers(questionIndex);
}
