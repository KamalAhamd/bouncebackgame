const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");

const blockWidth = 100;
const blockHeight = 20;
const borderWidth = 560;
const boardHeight = 300;

let timerId;
let ballDiameter = 20;

let xDirection = -2;
let yDirection = 2;

let score = 0;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// create Block

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// all my blocks

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),

  // new Block(10, 180),
  // new Block(120, 180),
  // new Block(230, 180),
  // new Block(340, 180),
  // new Block(450, 180),
];

//draw my block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

//=================Starat SEction --------------

const StartButton = document.querySelector(".btnStart");

const gamee = document.querySelector(".game");

const input = document.querySelector("input");

const nameSection = document.querySelector("#nameSection");

StartButton.addEventListener("click", function () {
  const front = document.querySelector(".front");
  front.style.display = "none";
  grid.style.visibility = "visible";
  gamee.style.visibility = "visible";

  if (input.value === "")
    nameSection.textContent = ` Welocme in Bounce  Back Game !  `;
  else {
    nameSection.innerHTML = `Welocme  : ${input.value}  in Bounce  Back Game ! `;
  }

  addBlocks();
  document.addEventListener("keydown", moveUser);
  timerId = setInterval(moveBall, 30);
});

// add user

const user = document.createElement("div");
user.classList.add("user");
user.style.left = currentPosition[0] + "px";
user.style.bottom = currentPosition[1] + "px";
grid.appendChild(user);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//move User

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;

    case "ArrowRight":
      if (currentPosition[0] < borderWidth - blockWidth + 10) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

// document.addEventListener("keydown", moveUser);

//draw the  ball

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

//move Ball

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

// timerId = setInterval(moveBall, 35);

//chekck for collisions
function checkForCollisions() {
  // check for  block collisions

  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      var audio = new Audio("music.wav");
      audio.play();

      console.log("kamal Ahmad");
      changeDirection();
      score++;
      scoreDisplay.innerHTML = ` <h4> Score : ${score} </h4>`;

      // check for win
      if (blocks.length === 0) {
        nameSection.innerHTML = `<h5> Well Done Keep it  up </h5>`;
        scoreDisplay.innerHTML = `  <h5> Congats YOU WON ✌✔</h5>
        <button class="btn" onclick="location.reload()">Play Again</button> `;
        clearInterval(timerId);
        var audio = new Audio("music.wav");
        audio.play();

        document.removeEventListener("keydown", moveUser);
        // document.removeEventListener("keydown", moveBall);
      }
    }
  }

  // check for  wall collisuons

  if (
    ballCurrentPosition[0] >= borderWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  //chek for  game  over

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    var audio = new Audio("music.wav");
    audio.play();
    nameSection.innerHTML = ` <h3>Try Again :   ${input.value}   </h3>`;
    scoreDisplay.innerHTML = `<h3> Score : ${score}  ,  YOU LOSE  🤦‍♂️</h3>
   
    <button class="btn" onclick="location.reload()">Play Again</button>
   
        `;
    document.removeEventListener("keydown", moveUser);
    // document.removeEventListener("keydown", moveBall);
  }
  // check for userCollisions

  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
