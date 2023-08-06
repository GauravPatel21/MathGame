var playing = false;
var action;
var timeremaining;
var correctAnswer;
var score;
var highscore =0;
document.getElementById('startgame').onclick = function () {
    if (playing == true) {
        location.reload();
    }
    else {
        playing = true;
        score = 0;
        document.getElementById('scorepoint').innerHTML = score;
        showdisplay('score');
        hidedisplay('gameOver');
        timeremaining = 60;
        document.getElementById('remainsec').innerHTML = timeremaining;
        showdisplay('timeremaining');
        document.getElementById('startgame').innerHTML = "Reset Game";
        showcountdown();
        generateQA();
    }
}
for(i=1;i<5;i++){
    document.getElementById('option' + i).onclick=function(){
        if(playing==true){
            if(this.innerHTML==correctAnswer){
                score++;
                document.getElementById('scorepoint').innerHTML=score;
                hidedisplay('wrong');
                showdisplay('correct');
                setTimeout(function(){
                    hidedisplay('correct');
                }, 1000);
                generateQA();
            }
            else{
                hidedisplay('correct');
                showdisplay('wrong');
                setTimeout(function(){
                    hidedisplay('wrong');
                }, 1000);
            }
        }
    }
}


//Functions---

function showcountdown() {
    action = setInterval(function () {
        timeremaining--;
        document.getElementById('remainsec').innerHTML = timeremaining;
        if (timeremaining == 0) {
            clearInterval(action);
            showdisplay('gameOver');
            document.getElementById('totalscore').innerHTML = score;
            if( score>highscore){
                highscore=score;
                document.getElementById('highscore').innerHTML = highscore;
            }
            hidedisplay('timeremaining');
            hidedisplay('correct');
            hidedisplay('wrong');
            playing = false;
            document.getElementById('startgame').innerHTML = "Start Game";
        }
    }, 1000)
}

function showdisplay(id) {
    document.getElementById(id).style.display = "block";
}

function hidedisplay(id) {
    document.getElementById(id).style.display = "none";
}

function generateQA() {
    var n1 = 1 + Math.round(Math.random() * 9);
    var n2 = 1 + Math.round(Math.random() * 9);
    correctAnswer = n1 * n2;
    var QA = n1 + "&#215;" + n2;
    document.getElementById('question').innerHTML = QA;
    var correctPosition = 1 + Math.round(Math.random() * 3);
    document.getElementById('option' + correctPosition).innerHTML = correctAnswer;
    var answers = [correctAnswer];
    for (i = 1; i < 5; i++) {
        if(correctPosition != i){
            var wrongAnswers;
            do {
                wrongAnswers = (1 + Math.round(Math.random() * 9))*(1 + Math.round(Math.random() * 9));
            } while (answers.indexOf(wrongAnswers)>-1);
            answers.push(wrongAnswers);
            document.getElementById('option' + i ).innerHTML = wrongAnswers;
        }
    }
}