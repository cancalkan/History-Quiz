const username = document.getElementById('username');
const saveScoreButton=document.getElementById('saveScoreButton');
const mostRecentScore =localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
const highScores=JSON.parse(localStorage.getItem('highScores')) || [];
const maxHighScores=5;
finalScore.innerText=mostRecentScore;

username.addEventListener('keyup',() =>{
saveScoreButton.disabled = !username.value;

})
saveScore =(event) =>{
    
    event.preventDefault();
    const score={
        
        score:mostRecentScore,
        name:username.value
    };
    highScores.push(score);
    highScores.sort((a,b)=> b.score-a.score);
    highScores.splice(maxHighScores);
    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign('index.html');

}

