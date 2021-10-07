document.addEventListener('DOMContentLoaded', () => {
const cardArray = [
    {
        name: 'butterfly',
        img: 'images/butterfly.png'
    },
    {
        name: 'butterfly',
        img: 'images/butterfly.png'
    },
    {
        name: 'cat',
        img: 'images/cat.png'
    },
    {
        name: 'cat',
        img: 'images/cat.png'
    },
    {
        name: 'chicken',
        img: 'images/chicken.png'
    },
    {
        name: 'chicken',
        img: 'images/chicken.png'
    },
    {
        name: 'cow',
        img: 'images/cow.png'
    },
    {
        name: 'cow',
        img: 'images/cow.png'
    },
    {
        name: 'dog',
        img: 'images/dog.png'
    },
    {
        name: 'dog',
        img: 'images/dog.png'
    },
    {
        name: 'pelican',
        img: 'images/pelican.png'
    },
    {
        name: 'pelican',
        img: 'images/pelican.png'
    },
    {
        name: 'pig',
        img: 'images/pig.png'
    },
    {
        name: 'pig',
        img: 'images/pig.png'
    },
    {
        name: 'unicorn',
        img: 'images/unicorn.png'
    },
    {
        name: 'unicorn',
        img: 'images/unicorn.png'
    }  
]



const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
const triesDisplay = document.querySelector('#tries');
const newGameBtn = document.querySelector('#newGame');
const timerDisplay = document.querySelector('#timer');
const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#highScore');
const previousScoreDisplay = document.querySelector('#previousScore');
const resetScoreBtn = document.querySelector('#resetScore');
const overlayStartDisplay = document.querySelector('#startText');
const overlayGameWonDisplay = document.querySelector('#gameWonText');
const darkThemeBtn = document.querySelector('#dark-theme-btn');
const lightThemeBtn = document.querySelector('#light-theme-btn');


overlayStartDisplay.addEventListener('click', () => {
    overlayStartDisplay.classList.remove('visible');
})

function clearWonDisplay () {
    overlayGameWonDisplay.addEventListener('click', () => {
    overlayGameWonDisplay.classList.remove('visible');
})}
clearWonDisplay();

darkThemeBtn.addEventListener('click', () => {
    document.documentElement.style.setProperty('--elem-color', 'hsl(36, 13%, 53%)');
    document.documentElement.style.setProperty('--nav-btn-color', 'hsl(0, 0%, 20%)');
    document.documentElement.style.setProperty('--text-color', 'hsl(35, 36%, 70%)');
    
})
lightThemeBtn.addEventListener('click', () => {
    document.documentElement.style.setProperty('--elem-color', 'hsl(36, 100%, 89%)');
    document.documentElement.style.setProperty('--nav-btn-color', 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty('--text-color', 'hsl(209, 92%, 40%)');
})
newGameBtn.addEventListener('click', resetGame);
resetScoreBtn.addEventListener('click', resetScore);

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let numberOfTries = 0;
let score = 0;
let highScore = 0;

let milliseconds = 0;
let seconds = 0;
let minutes = 0;

let displayMs = 0;
let displayS = 0;
let displayM = 0;

let interval = null;

let gameTimer = 'OFF';

function timer() {
    milliseconds++
    if(milliseconds === 100) {
        milliseconds = 0;
        seconds++;

        if(seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    if(milliseconds < 10) {
        displayMs = '0' + milliseconds.toString();
    } else {
        displayMs = milliseconds;
    }
    if(seconds < 10) {
        displayS = '0' + seconds.toString();
    } else displayS = seconds;
    if(minutes < 10) {
        displayM = '0' + minutes.toString();
    } else displayM = minutes;

    timerDisplay.innerHTML = displayM + ':' + displayS + ':' + displayMs;
}


function createBoard() {
    cardArray.sort(() => 0.5 - Math.random());
    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', 'images/confetti.png');
        card.setAttribute('data-id', i);
        card.setAttribute('isClicked', '0');
        card.addEventListener('click', flipCard);
        card.style.cursor = 'pointer';
        card.onmouseover = function () {
            if(card.getAttribute('isClicked') == 0) {
                card.src = 'images/confetti-hover.png';
            }
        }
        card.onmouseout = function () {    
            if(card.getAttribute('isClicked') == 0) {
                card.src = 'images/confetti.png'; 
            }
        }
        grid.appendChild(card);
    }
}
createBoard();


function checkForMatch () {
    numberOfTries++;
    triesDisplay.textContent = numberOfTries;
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].style.visibility ='hidden';
        cards[optionTwoId].style.visibility ='hidden';
        cards[optionOneId].style.cursor = 'initial';
        cards[optionTwoId].style.cursor = 'initial';
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'images/confetti.png');
        cards[optionTwoId].setAttribute('src', 'images/confetti.png');
        cards[optionOneId].setAttribute('isClicked', '0');
        cards[optionTwoId].setAttribute('isClicked', '0');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length/2) {
        window.clearInterval(interval);
        gameTimer = 'OFF';
        overlayGameWonDisplay.classList.add('visible');
        score = (340 - (numberOfTries*3 + Math.round((minutes*60000+seconds*1000+milliseconds*10)/1000)));
        if (score >= 0) {
            scoreDisplay.innerHTML = score;
        } else {
            scoreDisplay.innerHTML = 0;
        }
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.innerHTML = highScore;
        }
    }
}

function flipCard() {
    if (gameTimer === 'OFF') {
        interval = window.setInterval(timer, 10);
        gameTimer = 'ON';
    }
        if(this.getAttribute('isClicked') == 0 && cardsChosen.length < 2) {
            let cardId = this.getAttribute('data-id');
            this.setAttribute('isClicked', '1');
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            
        } else return;
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
            }
}

function resetGame() {
    window.clearInterval(interval);
    overlayGameWonDisplay.classList.remove('visible');
    gameTimer = 'OFF';
    interval = null;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    previousScoreDisplay.innerHTML = score;
    score = 0;
    scoreDisplay.innerHTML = 0;
    timerDisplay.innerHTML = '00:00:00';
    grid.innerHTML = '';
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    numberOfTries = 0;
    triesDisplay.textContent = numberOfTries;
    resultDisplay.textContent = cardsWon.length;
    createBoard();

}

function resetScore() {
    previousScoreDisplay.innerHTML = 0;
    highScoreDisplay.innerHTML = 0;
    highScore = 0;
    score = 0;
    scoreDisplay.innerHTML = 0
}
})