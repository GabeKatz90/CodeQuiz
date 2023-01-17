var questions = [
    {
        prompt: "In 1811, nearly a quarter of all women in England had what name?",
        options: ["Chartlotte", "Mary", "Violet", "Lucy"],
        answer: "Mary"
    },
  
    {
        prompt: "What was the official language of England from 1066 to 1362?",
        options: ["English", "Dutch", "French", "Belgian"],
        answer: "French"
    },
  
    {
    prompt: "Name the second largest lake in the Lake District?",
    options: ["Windermere", "Ullswater", "Derwentwater", "Bassenthwaite"],
    answer: "Bassenthwaite"
  },
  
  
    {
        prompt: "What is the highest mountain in England??",
        options: ["Skiddaw", "Great Gable", "The Calf", "Scafell Pike"],
        answer: "Scafell Pike" 
    },
  
    {
        prompt: "The Suffolk Punch is a breed of which animal?",
        options: ["Dog", "Cat", "Horse", "Duck"],
        answer: "Horse"
    },
  
  ]
    ;


// Gets Doms
var questionsEl = document.querySelector("#questions");
var nameEl = document.querySelector("#name");
var startBtn = document.querySelector("#start");
var reStartBtn = document.querySelector("#restart");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var feedbackEl = document.querySelector("#feedback");


// Current State

var currentQuestionIndex = 0;
var time = questions.length * 11;
var timerId;

// Starts quiz & hides front page

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loops through the questions and answers 

function getQuestion() {
var currentQuestion = questions[currentQuestionIndex];
var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Checks for the right answers & deducts if the the amount if it wrong


function questionClick() {
if (this.value !== questions[currentQuestionIndex].answer) {
time -= 10;
if (time <= 0) {
time = 0;
}
timerEl.textContent = time;
feedbackEl.textContent = "";
feedbackEl.style.color = "";
    } else {
feedbackEl.textContent = "";
feedbackEl.style.color = "";
}
feedbackEl.setAttribute("class", "feedback");
setTimeout(function() {
feedbackEl.setAttribute("class", "feedback hide");
}, 2000);
currentQuestionIndex++;
if (currentQuestionIndex === questions.length) {
quizEnd();
} else {
getQuestion();
}
}

// Ends quiz & shows final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// Ends quiz if time reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
    quizEnd();
    }
}

// Saves score & name in local storage 

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
    var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
        score: time,
        name: name
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Saves score upon pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save scores upon pressing submit

submitBtn.onclick = saveHighscore;

// Starts quiz upon pressing start quiz

startBtn.onclick = quizStart;