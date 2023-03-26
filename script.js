// Landing Page
var body = document.body;

var topBar = document.createElement("section");
var highscore = document.createElement("a");
var timer = document.createElement("div");
var main = document.createElement("section");
var h1El = document.createElement("h1");
var sub = document.createElement("div");
var start = document.createElement("button");
var timeLeft = 0;

topBar.setAttribute("id", "top-bar");
highscore.textContent = "View Highscores";
highscore.setAttribute("href", "highscores.html");

main.setAttribute("id", "main-container");

timer.textContent = `Time left: ${timeLeft}s`;
h1El.textContent = "Coding Quiz Challenge";
sub.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score / time by ten seconds";
start.textContent = "Start Quiz";
start.setAttribute("id", "start-quiz-button");

body.appendChild(topBar);
topBar.appendChild(highscore);
topBar.appendChild(timer);
body.appendChild(main);
main.appendChild(h1El);
main.appendChild(sub);
main.appendChild(start);

// Declare function to run startQuiz function when start quiz button is clicked
start.addEventListener('click', startQuiz);

// Add function to start timer countdown
function startTimer(){
  timeLeft = 75;
  setInterval (function(){
    if (timeLeft < 0) {
      clearInterval();
      timer.innerHTML = "Time's up!"
    }
    else {
      timer.innerHTML = "Time Left: " + timeLeft + "s"
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
    correctAnswer: "10"
  },
  {
    question: "What is 9x2?",
    answers: {
      option1: "18",
      option2: "11",
      option3: "24",
      option4: "13",

    },
    correctAnswer: "18"
  },
  {
    question: "What color is an apple?",
    answers: {
      option1: "Green",
      option2: "Blue",
      option3: "Red",
      option4: "Orange",

    },
    correctAnswer: "Red"
  },
  {
    question: "What province is Toronto in?",
    answers: {
      option1: "Quebec",
      option2: "British Columbia",
      option3: "Alberta",
      option4: "Ontario",

    },
    correctAnswer: "Ontario"
  },
]

function showQuestions() {
  var questionIndex = 0; 
  main.setAttribute("id", "question-card");

  h1El.textContent = quizQuestions[questionIndex].question;
  main.appendChild(h1El);

  var answers = document.createElement("section");
  answers.setAttribute("id", "answers");
  main.appendChild(answers);

  for (key in quizQuestions[questionIndex].answers) {
    var ans = document.createElement("button");
    ans.textContent = quizQuestions[questionIndex].answers[key];
    answers.appendChild(ans);
  }

  var result = document.createElement("div");
  result.textContent = "";
  main.appendChild(result);

  var score=0;
  
  for (i=0; i<document.getElementById("answers").children.length; i++) {
    ans.addEventListener("click", function(event) {
      var buttonText = event.target.textContent;

      if (buttonText == quizQuestions[questionIndex].correctAnswer) {
        score = score + 1;
        result.textContent = "Correct!";
      } else {
        result.textContent = "Incorrect!";
      }

      questionIndex++;
  })
  }
}

// Add function to start quiz
function startQuiz() {
  startTimer();
  main.innerHTML = "";
  showQuestions();
}