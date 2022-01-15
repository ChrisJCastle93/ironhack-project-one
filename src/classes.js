class Scene {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "../images/scene.png";
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
    checkout.ctx.drawImage(this.image, this.x, this.y, bagSize, bagSize);
    this.y += this.speedY;
    if (this.y < 250 + sceneHeight * 0.1) {
      this.speedY = 0;
      this.y = 250 + sceneHeight * 0.11;
    }
    if (this.y > 250 + sceneHeight * 0.81) {
      this.speedY = 0;
      this.y = 250 + sceneHeight * 0.8;
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

class Item {
  constructor() {
    this.id = Math.random() * 1000000;
    this.x = 0;
    this.y = 250 + sceneHeight * 0.4;
    this.width = sceneWidth / 50;
    this.height = this.width;
    this.speedX = 4;
    this.throwSpeed = Math.floor(Math.random() * maxSpeed);
    this.image = new Image();
    this.image.src = itemImgArray[Math.floor(Math.random() * itemImgArray.length)];
    this.angleUp = Math.random() * (this.throwSpeed * -0.23389);
    this.angleDown = Math.random() * (this.throwSpeed * 0.2670349);
    this.angle = Math.random() < 0.5 ? this.angleUp : this.angleDown;
  }
  draw() {
    checkout.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    if (this.x > sceneWidth * 0.317406) {
      this.x += this.throwSpeed;
      this.y += this.angle;
    }
    if (this.x > bagPositionX + 50) {
      this.x = sceneWidth + 100;
      var index = itemsArr
        .map(function (item) {
          return item.id;
        })
        .indexOf(this.id);
      itemsArr.splice(index, 1);
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

const checkout = new Scene();
const bag = new Bag();
const message = new Message();
