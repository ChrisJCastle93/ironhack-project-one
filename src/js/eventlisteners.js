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
  window.addEventListener("scroll", () => {
    window.scrollTo(0, 0);
  });
  maxSpeedSlider.addEventListener("change", () => {
    maxSpeed = this.value;
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
