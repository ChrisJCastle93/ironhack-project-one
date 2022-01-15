const sceneWidth = window.innerWidth;
const sceneHeight = sceneWidth / 2.8317;
const bagPositionX = sceneWidth - sceneWidth * 0.141;
const bagSize = sceneHeight / 5;
const bagSpeed = 20;
const maxSpeedSlider = document.getElementById("myRange");
const gameTimer = document.getElementById("timer");
const highScoreDisplay = document.getElementById("highscore");

let maxSpeed = maxSpeedSlider.value;
let playerPoints = 0;
let highScore;

const itemsArr = [];

const itemImgArray = [
    "../images/cherry.png",
    "../images/banana.png",
    "../images/cherry.png",
    "../images/pear.png",
    "../images/pineapple.png",
    "../images/bakedbeans.png",
    "../images/strawberry.png",
  ];