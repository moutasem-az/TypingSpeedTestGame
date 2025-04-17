// selected all element
let levels = document.querySelectorAll(".container .levels .level");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let lvlSecondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let choose = document.querySelector(".choose");
let allScore = document.querySelector(".allScore");
// Array of Words 
const arrayHard = ["MOUTASEM", "Tammam", "Hello", "CODE", "Town", "Github", "Javascript", "Cute", "Book", "About",
    "Testing", "Twitter", "Leetcode", "Internet", "Programming", "Playing", "TEST", "Roles", "Working", "Background",
    "Funny", "Task", "Class", "Username", "Destructuring", "RUST", "Window", "Dependencies", "Documentation", "Runner"
];
const arrayNormal = ["moutasem", "tmmam", "Hello", "catch", "code", "town", "github", "javascript", "Cute", "book", "about",
    "main", "color", "else", "father", "body","locale", "four", "speed","cout"
];
const arrayEasy = ["meme", "toto", "main", "color", "else", "father", "body", "four", "speed","cout"];
// catch Selectors
let arrayOfScore = [];
// push score from LocalStorage to tasksArray if it has tasks
if (localStorage.getItem("allScore")) {
    arrayOfScore = JSON.parse(localStorage.getItem("allScore"));
    // add tasks from LocalStorage to page if it has tasks
    addAllScoreToPage (arrayOfScore);
}
// delete div from local
allScore.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        // delete task from local Storage
        deleteScore(e.target.parentElement.getAttribute("data-id"));
        // delete task from page
        e.target.parentElement.remove();
    }
});
// choose level 
scoreTotal.innerHTML = arrayNormal.length;
levels.forEach((ele) => {
    ele.addEventListener("click",removeActive);
});
// Disable paste event 
input.onpaste = function () {
    return false;
}   
// start Game 
startButton.onclick = function () {
    choose.remove();
    this.remove();
    input.focus();
    // Generate word function
    if(lvlNameSpan.innerHTML == "Easy") {
        GenerateWord(arrayEasy);     
    }
    else if(lvlNameSpan.innerHTML == "Normal") {
        GenerateWord(arrayNormal) 
    }
    else if(lvlNameSpan.innerHTML == "Hard") {
        GenerateWord(arrayHard);      
    }
};
// all function
function removeActive() {
    levels.forEach((el) => {
        el.classList.remove("active");
        this.classList.add("active");
        lvlNameSpan.innerHTML = this.innerHTML; 
        if(this.innerHTML == "Easy") {
            lvlSecondsSpan.innerHTML = 5;  
            timeLeftSpan.innerHTML = 5; 
            scoreTotal.innerHTML = arrayEasy.length;      
        }
        else if(this.innerHTML == "Normal") {
            lvlSecondsSpan.innerHTML = 3; 
            timeLeftSpan.innerHTML = 3;  
            scoreTotal.innerHTML = arrayNormal.length;     
        }
        else {
            lvlSecondsSpan.innerHTML = 2;
            timeLeftSpan.innerHTML = 2;  
            scoreTotal.innerHTML = arrayHard.length;   
        }
    });
}
function GenerateWord(arr) {
    // get random word from Array words
    let randomWord = arr[Math.floor(Math.random() * arr.length)];
    // get word index to remove from Array
    let indexWord = arr.indexOf(randomWord);
    arr.splice(indexWord, 1);
    // show random word
    theWord.innerHTML = randomWord;
    // empty upcoming Words
    upcomingWords.innerHTML = "";
    // Generate words
    for (let i = 0; i < arr.length; i++) {
        // create div element
        let div = document.createElement("div");
        let txt = document.createTextNode(arr[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // call start play function
    startPlay();
}
function startPlay() {
    choose.remove();
    allScore.remove();
    timeLeftSpan.innerHTML = lvlSecondsSpan.innerHTML;
    let start = setInterval( () => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML == "0") {
            // stop time
            clearInterval(start);
            // comper words
            if (lvlNameSpan.innerHTML == "Hard") {
                if (theWord.innerHTML === input.value){
                    inPlaying();    
                } else {
                    gameOver();   
                }
            } else {
                if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                   inPlaying();
                } else {
                    gameOver();  
                }
            }
        }
    },1000);
    addScore(scoreGot.innerHTML);
}
function inPlaying() {
    // empty input
    input.value = "";
    scoreGot.innerHTML++;
    if(words.length > 0) {
        // call Generate word function
        GenerateWord();
    } else {
        let span = document.createElement("span");
        span.className = 'good';
        let spanText = document.createTextNode("Congratz");
        span.appendChild(spanText);
        finishMessage.appendChild(span); 
        // remove upcoming Words  
        upcomingWords.remove();
    }
}
function gameOver() {
    let span = document.createElement("span");
    span.className = "bad";
    let spanText = document.createTextNode("Game Over");
    span.appendChild(spanText);
    finishMessage.appendChild(span); 
}
function addScore(score) {
    let theScore = {
        id: Date.now(),
        date: new Date(),
        title: score
    };
    arrayOfScore.push(theScore);
    addScoreToLocalStorage(arrayOfScore);
    arrayOfScore.pop(theScore);
}
function addScoreToLocalStorage(arrayOfScore) {
    window.localStorage.setItem("allScore", JSON.stringify(arrayOfScore));
}
function addAllScoreToPage (arrayOfScore) {
    // allScore.innerHTML = "";
    arrayOfScore.forEach( (ele) => {
        let box = document.createElement ("div");
        box.className = "box"; 
        box.setAttribute("data-id", ele.id);
        let score = document.createElement ("div");
        score.className = "score";
        let delet = document.createElement ("div");
        delet.className = "del";
        delet.appendChild(document.createTextNode("X"));
        let date = document.createElement ("span");
        date.className = "date";
        date.appendChild(document.createTextNode(`Date : ${ele.date}`));
        let sco = document.createElement ("span");
        sco.className = "sco";
        sco.appendChild(document.createTextNode(`Score : ${ele.title}`));
        score.appendChild(date);
        score.appendChild(sco);
        box.appendChild(score);
        box.appendChild(delet);
        allScore.appendChild(box);
    });
}
function deleteScore (scoreId) {
        arrayOfScore = JSON.parse(localStorage.getItem("allScore"));
        arrayOfScore = arrayOfScore.filter((ele) => ele.id != scoreId);
        localStorage.removeItem("allScore");
        addScoreToLocalStorage (arrayOfScore);
        arrayOfScore = [];
}
// localStorage.removeItem("allScore");