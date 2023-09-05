let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 2;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
//food = {x:6,y:7};
let food = { x: 6, y: 7 };
//gamefunction
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

upButton.addEventListener("click", () => {
  if (inputDir.y !== 1) {
    inputDir = { x: 0, y: -1 };
    moveSound.play();
  }
});

downButton.addEventListener("click", () => {
  if (inputDir.y !== -1) {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
  }
});

leftButton.addEventListener("click", () => {
  if (inputDir.x !== 1) {
    inputDir = { x: -1, y: 0 };
    moveSound.play();
  }
});

rightButton.addEventListener("click", () => {
  if (inputDir.x !== -1) {
    inputDir = { x: 1, y: 0 };
    moveSound.play();
  }
});



function isCollide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    return true;
  }
  return false;
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
  }
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElememt = document.createElement('div');
    snakeElememt.style.gridRowStart = e.y;
    snakeElememt.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElememt.classList.add('head');
    } else {
      snakeElememt.classList.add('snake');
    }
    board.appendChild(snakeElememt);
  });

  foodElememt = document.createElement('div');
  foodElememt.style.gridRowStart = food.y;
  foodElememt.style.gridColumnStart = food.x;
  foodElememt.classList.add('food');
  board.appendChild(foodElememt);
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HighScore: " + hiscore;
}

window.requestAnimationFrame(main);
function play(e) {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
}

window.addEventListener('keydown', e => { play(e) });
/*
window.addEventListener('keydown', e =>{
    inputDir = {x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;

        break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
        break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
        break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
        break;

        default:break;
    }

});
*/

