// HTML elements
var startBtn = $(".start-btn");
var questionCard = $(".question-card");
var question = $(".question");
var options = $(".options");
var option1 = $(".option1");
var option2 = $(".option2");
var option3 = $(".option3");
var option4 = $(".option4");
var scoreCard = $(".score-card");
var initialBox = $(".initial-box");
var submitBtn = $(".submit-btn");

// JS global variables
var questionArray = [
    q1 = {q: "What does 'var' stand for?", answers: ["Variable", "Variance", "Vertical Abstract Reporter", "Varsity"], correct: "Variable"},
    q2 = {q: "What command would you use to log to the console?", answers: ["console.log()", "print()", "logger.Log()", "writeToConsole()"], correct: "console.log()"},
    q3 = {q: "Which method could you use to hide an HTML element?", answers: ["style.display = 'none'", "style.display = hide", "setDisplay(hide)", "visibility = 'none'"], correct: "style.display = 'none'"},
    q4 = {q: "Which of the following would you use to rotate an HTML element?", answers: [".transform", ".rotate", ".spin", ".adjust"], correct: ".transform"}
];
var questionCount = 0;

// Initializing function
function init(){
    questionCard.hide();
    scoreCard.hide();
}
init();

// This function initiates all other operations necessary to start the game
function startGame(){
    startBtn.hide();
    fillQuestion();
    questionCard.show();
}

// This function updates the question card with each subsequent question's data
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
        console.log("Correct!");
        questionCount++;
    } else {
        console.log("Wrong!");
        questionCount++;
    }
// When there are no more questions left, the function ends the game and displays the score card
    if(questionCount < questionArray.length){
        fillQuestion();
    } else {
        showScore();
        questionCount = 0;
    }
}

// This function displays the score card
function showScore(){
    questionCard.hide();
    scoreCard.show();
}

// This function logs the player score and records their data in the high score sheet
function logScore(){
        scoreCard.hide();
        startBtn.show();
}

// These are the event listeners for the page
startBtn.on("click", startGame);

options.on("click", ".option-btn", userAnswer);

submitBtn.on("click", logScore);






/* const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    } 
    return array; 
};

var shuffledArray = shuffle(questionArray);
for(i=0;i<shuffledArray.length;i++){
    for(j=0;j<shuffledArray[i].answers.length;j++){
        shuffle(shuffledArray[i].answers[j]);
    }
}
console.log(shuffledArray); */