const sceneWidth = window.innerWidth;
const sceneHeight = sceneWidth / 2.8317;
const bagPositionX = sceneWidth - sceneWidth * 0.141;
const bagSize = sceneHeight / 5;
const bagSpeed = 20;
const maxSpeed = document.getElementById("myRange").value;
const gameTimer = document.getElementById("timer");
const highScoreDisplay = document.getElementById("highscore");
let playerPoints = 0;
let highScore;
const itemsArr = [];

function noScroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noScroll);

if (!localStorage.getItem("highscore")) {
  highScore = 0;
} else {
  highScore = localStorage.getItem("highscore");
}
highScoreDisplay.innerText = `High score: ${highScore}`;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    addEventListeners();
  };
  function startGame() {
    document.getElementById("start-button").style.display = "none";
    document.getElementsByTagName("h1")[0].style.display = "none";
    document.getElementsByClassName("slidecontainer")[0].style.display = "none";
    document.getElementById("game-score").style.display = "block";
    document.getElementById("game-timer").style.display = "block";
    createItems();
    gameTime();
    update();
  }
};

function createItems() {
  setInterval(function () {
    itemsArr.push(new Item());
    console.log(itemsArr);
  }, 1000);
  // setInterval(function() {itemsArr.pop()}, 5000);
}

function gameTime() {
  let secondsLeft = 30;
  setInterval(function () {
    secondsLeft--;
    gameTimer.innerText = secondsLeft;
  }, 1000);
  setTimeout(function () {
    let highScore = localStorage.getItem("highscore");
    if (!highScore || (highScore && playerPoints > highScore)) {
      localStorage.setItem("highscore", playerPoints);
      highScore = playerPoints;
    }
    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = `<br><br><br><h1><br><br><br><br>YOU SCORED ${playerPoints}<br><br><br><br>Your high score is ${highScore}</h1>`;
  }, 30000);
}

class Scene {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "/images/scene.png";
  }
  drawCheckout() {
    this.ctx.drawImage(
      this.backgroundImage,
      (this.canvas.width - sceneWidth) / 2,
      250,
      sceneWidth,
      sceneHeight
    );
  }
}

class Bag {
  constructor() {
    this.x = bagPositionX;
    this.y = 250 + sceneHeight * 0.2;
    this.speedY = 0;
    this.image = new Image();
    this.image.src = "../images/lidl-bag-rot.png";
  }
  drawBag() {
    console.log(this.y)
    checkout.ctx.drawImage(this.image, this.x, this.y, bagSize, bagSize);
    this.y += this.speedY;
    if (this.y < 250 + sceneHeight * 0.1) {
      this.speedY = 0;
      this.y = 250 + sceneHeight * 0.11
    }
    if (this.y > 250 + sceneHeight * 0.81) {
      this.speedY = 0;
      this.y = 250 + sceneHeight * 0.80
    }
  }
  moveUp() {
    this.speedY = -bagSpeed;
  }
  moveDown() {
    this.speedY = +bagSpeed;
  }
  stop() {
    this.speedY = 0;
  }
}

class Message {
  constructor() {
    this.x = Math.random(sceneWidth);
    this.y = Math.random(sceneHeight);
  }
  show() {
    checkout.ctx.fillStyle = "black";
    checkout.ctx.font = "30px Arial";
    checkout.ctx.fillText("Hello world", this.x, this.y);
  }
}

const itemImgArray = [
  "../images/cherry.png",
  "../images/banana.png",
  "../images/cherry.png",
  "../images/pear.png",
  "../images/pineapple.png",
  "../images/bakedbeans.png",
  "../images/strawberry.png",
];

class Item {
  constructor() {
    this.x = 0;
    this.y = 250 + sceneHeight * 0.4;
    this.width = sceneWidth/50;
    this.height = this.width;
    this.speedX = 4;
    this.image = new Image();
    this.image.src =
      itemImgArray[Math.floor(Math.random() * itemImgArray.length)];
    this.angleUp = Math.random() * -2;
    this.angleDown = Math.random() * 5;
    this.angle = Math.random() < 0.5 ? this.angleUp : this.angleDown;
  }
  draw() {
    checkout.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (this.x > sceneWidth * 0.317406) {
      this.x += Math.random() * maxSpeed;
      this.y += this.angle;
    }
    if (this.x > bagPositionX + 50) {
      this.x = sceneWidth + 100;
      itemsArr.shift();
    }
    if (this.x > bagPositionX && this.y > bag.y && this.y < bag.y + bagSize) {
      playerPoints++;
      document.getElementById("score").innerText = playerPoints;
      // message.show();
      this.x = 100000000;
      this.y = 100000000;
    }
    this.x += this.speedX;
  }
}

function addEventListeners() {
  document.addEventListener("keydown", (event) => {
    const pressedKey = event.key;
    switch (pressedKey) {
      case "ArrowUp":
        bag.moveUp();
        break;
      case "ArrowDown":
        bag.moveDown();
        break;
    }
  });
  document.addEventListener("keyup", (event) => {
    const pressedKey = event.key;
    switch (pressedKey) {
      case "ArrowUp":
        bag.stop();
        break;
      case "ArrowDown":
        bag.stop();
        break;
    }
  });
}

const checkout = new Scene();
const bag = new Bag();
const message = new Message();

function update() {
  checkout.drawCheckout();
  bag.drawBag();
  itemsArr.forEach((item) => {
    item.draw();
  });
  requestAnimationFrame(update);
}

