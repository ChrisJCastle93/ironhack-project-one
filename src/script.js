window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    addEventListeners();
  };
  function startGame() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("game-rules").style.display = "none";
    document.getElementById("game-title").style.display = "none";
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
  }, 1000);
}

function gameTime() {
  let secondsLeft = 10;
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
    const audio = new Audio('../assets/gameover.mp3');
    audio.play();
  }, 10000);
}

function update() {
  checkout.drawCheckout();
  bag.drawBag();
  itemsArr.forEach((item) => {
    item.draw();
  });
  requestAnimationFrame(update);
}
