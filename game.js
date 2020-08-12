const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText=document.getElementById('ProgressText');
const scoreText=document.getElementById('score');
const ProgressBarFull = document.getElementById('ProgressBarFull');
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
fetch("questions.json")
.then(res=>{
    console.log(res);
 
    return res.json();
})
.then(loadedQuestions =>{
    questions=loadedQuestions;
    startGame();
})
.catch(err=>{
    console.error(err);
})
const correct_bonus = 10;
const incorrect_penalty=-5
const max_questions = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= max_questions) {
        //SavingScore to local 
        localStorage.setItem('mostRecentScore',score);


        // end of the page
        return window.location.assign("end.html");

    }
     //Updating the Progress Bar 
     ProgressBarFull.style.width  = `${(questionCounter / max_questions) * 100}%`;
     progressText.innerText="Question Done"+questionCounter+"/"+max_questions;

    questionCounter++;
    console.log((questionCounter / max_questions) * 100)
    //Other way to to it 
    //questionCounterText.innerText=`${questionCounter}/${max-questions}`;

   

    //I am creating a random number for choose random question
    const QuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[QuestionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(QuestionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        else{
            choices[currentQuestion.answer-1].parentElement.classList.add("correct");
        }
        // Other Way to Do That 
        //const classToApply= selectedAnswer==currentQuestion?'correct':'incorrect';
        if(classToApply=='correct'){
            incrementScore(correct_bonus)
        }
        else {
            incrementScore(incorrect_penalty)
        }
        


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            choices[currentQuestion.answer-1].parentElement.classList.remove("correct");
            getNewQuestion();

        },1500);
    

    });
});
incrementScore = num =>{
    score+=num;
    scoreText.innerText=score
}
