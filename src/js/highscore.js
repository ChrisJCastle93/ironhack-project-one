if (!localStorage.getItem("highscore")) {
  highScore = 0;
} else {
  highScore = localStorage.getItem("highscore");
}
highScoreDisplay.innerText = `High score: ${highScore}`;
