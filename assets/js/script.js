// HTML elements
var highscoreTXT = $(".highscoreTXT");
var highscoreList = $(".highscore-list");
var hs1 = $(".hs1");
var hs2 = $(".hs2");
var hs3 = $(".hs3");
var hs4 = $(".hs4");
var hs5 = $(".hs5");
var startBtn = $(".start-btn");
var timer = $(".timer");
var timeLeft = $(".time-left");
var questionCard = $(".question-card");
var question = $(".question");
var options = $(".options");
var option1 = $(".option1");
var option2 = $(".option2");
var option3 = $(".option3");
var option4 = $(".option4");
var scoreCard = $(".score-card");
var score = $(".score");
var initialBox = $(".initial-box");
var submitBtn = $(".submit-btn");
var timeOutCard = $(".time-out-card");
var timeOutBtn = $(".time-out-btn");

// JS global variables
var highscoreVisible = false;
var questionTime = 10;
var gameDone = false;
var questionArray = [
    q1 = {q: "What does 'var' stand for?", answers: ["Variable", "Variance", "Vertical Abstract Reporter", "Varsity"], correct: "Variable"},
    q2 = {q: "What command would you use to log to the console?", answers: ["console.log()", "print()", "logger.Log()", "writeToConsole()"], correct: "console.log()"},
    q3 = {q: "Which method could you use to hide an HTML element?", answers: ["style.display = 'none'", "style.display = hide", "setDisplay(hide)", "visibility = 'none'"], correct: "style.display = 'none'"},
    q4 = {q: "Which of the following would you use to rotate an HTML element?", answers: [".transform", ".rotate", ".spin", ".adjust"], correct: ".transform"}
];
var questionCount = 0;
var userCorrect = 0;
var userWrong = 0;
var userScore = 0;
var userInitials = "";
var savedHighscores = JSON.parse(localStorage.getItem("saved-highscores")) || [];




// Initializing function
function init(){
    highscoreList.hide();
    questionCard.hide();
    scoreCard.hide();
    timeOutCard.hide();
    timeLeft.text(questionTime);
    if(savedHighscores.length>0){
        hs1.text(savedHighscores[0].initials+" --- Score: "+savedHighscores[0].score);
    }
    if(savedHighscores.length>1){
        hs2.text(savedHighscores[1].initials+" --- Score: "+savedHighscores[1].score);
    }
    if(savedHighscores.length>2){
        hs3.text(savedHighscores[2].initials+" --- Score: "+savedHighscores[2].score);
    }
    if(savedHighscores.length>3){
        hs4.text(savedHighscores[3].initials+" --- Score: "+savedHighscores[3].score);
    }
    if(savedHighscores.length>4){
        hs5.text(savedHighscores[4].initials+" --- Score: "+savedHighscores[4].score);
    }
}
init();

// These functions show and hide the highscore card respectively
function displayHighscore(){
    if(highscoreVisible == false){
        highscoreList.show();
        highscoreVisible = true;
        console.log(highscoreVisible);
    } else if (highscoreVisible == true){
        highscoreList.hide();
        highscoreVisible = false;
        console.log(highscoreVisible);
    }
}

// This function initiates all other operations necessary to start the game
function startGame(){
    randomizer();
    startBtn.hide();
    fillQuestion();
    questionCard.show();
    setTime();
}

// This function shuffles the order of questions and answers randomly
function randomizer(){
// The shuffler
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

// Shuffled the order of questionArray and then the answer arrays in each question
    questionArray = shuffle(questionArray);;
    for(i=0;i<questionArray[0].answers.length;i++){
        questionArray[i].answers = shuffle(questionArray[i].answers); 
    }
}

// This function sets a timer for the duration of the game
function setTime() {
    var timerInterval = setInterval(function() {
      questionTime--;
      timeLeft.text(questionTime);
  
      if(questionTime <= 0 || gameDone == true) {
        clearInterval(timerInterval);
      }
      if(questionTime <= 0 && gameDone == false) {
        timeOutMsg();
      }
    }, 1000);
  }

// This function updates the question card with each question's data
function fillQuestion(){
    question.text(questionArray[questionCount].q);
    option1.text(questionArray[questionCount].answers[0]);
    option2.text(questionArray[questionCount].answers[1]);
    option3.text(questionArray[questionCount].answers[2]);
    option4.text(questionArray[questionCount].answers[3]);
}

// This function checks to see if the user answer was correct or wrong
function userAnswer(event){
    if(event.target.textContent == questionArray[questionCount].correct){
        userCorrect++;
        questionTime+=2;
    } else {
        userWrong++;
        questionTime-=2;
    }
    timeLeft.text(questionTime);
    questionCount++;
// When there are no more questions left, the function ends the game and displays the score card
    if(questionCount < questionArray.length){
        fillQuestion();
    } else {
        gameDone = true;
        showScore();
    }
}

// This function displays the score card
function showScore(){
    userScore = (userCorrect/(questionArray.length)*100);
    score.text(userScore);
    questionCard.hide();
    scoreCard.show();
}

// This function logs the player score and records their data in the high score sheet
function logScore(){
    userInitials = initialBox.val().toUpperCase();
    var score = {
        score: userScore,
        initials: userInitials
    }
    savedHighscores.push(score);
    savedHighscores.sort((a, b) => b.score - a.score);
    savedHighscores.splice(5);
    localStorage.setItem("saved-highscores", JSON.stringify(savedHighscores));
    if(savedHighscores.length>0){
        hs1.text(savedHighscores[0].initials+" --- Score: "+savedHighscores[0].score);
    }
    if(savedHighscores.length>1){
        hs2.text(savedHighscores[1].initials+" --- Score: "+savedHighscores[1].score);
    }
    if(savedHighscores.length>2){
        hs3.text(savedHighscores[2].initials+" --- Score: "+savedHighscores[2].score);
    }
    if(savedHighscores.length>3){
        hs4.text(savedHighscores[3].initials+" --- Score: "+savedHighscores[3].score);
    }
    if(savedHighscores.length>4){
        hs5.text(savedHighscores[4].initials+" --- Score: "+savedHighscores[4].score);
    }
    reset();
}

// This function shows the time out message
function timeOutMsg(){
    questionCard.hide();
    timeOutCard.show();
}

// This function resets the game to starting values
function reset(){
// Reset to starting state
    scoreCard.hide();
    timeOutCard.hide();
    startBtn.show();

// Reset global variables
    questionTime = 10;
    timeLeft.text(questionTime);
    gameDone = false;
    questionCount = 0;
    userCorrect = 0;
    userWrong = 0;
    userScore = 0;
    userInitials = "";
}

// These are the event listeners for the page
highscoreTXT.on("click", displayHighscore);

startBtn.on("click", startGame);

options.on("click", ".option-btn", userAnswer);

submitBtn.on("click", logScore);

timeOutBtn.on("click", reset);