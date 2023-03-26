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
