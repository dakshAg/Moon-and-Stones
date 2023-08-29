function update(e) {
    var x = e.clientX || e.touches[0].clientX
    var y = e.clientY || e.touches[0].clientY

    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y + 'px')
}

document.addEventListener('mousemove', update)
document.addEventListener('touchmove', update)

/*
  Johan Karlsson (DonKarlssonSan)
*/
let points;
let stepsPerFrame;

function setup() {
  stepsPerFrame = 5;
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(3);
  reset();
}

function draw() {
  for (let i = 0; i < stepsPerFrame; i++) {if (window.CP.shouldStopExecution(0)) break;
    stroke(0, 255 - i * 255 / stepsPerFrame);
    drawLine();
  }window.CP.exitedLoop(0);
}

function reset() {
  background("white");
  resetPoints();
}

function resetPoints() {
  points = [];
  for (let i = 0; i < windowWidth; i++) {if (window.CP.shouldStopExecution(1)) break;
    points.push([i, 0]);
  }window.CP.exitedLoop(1);
}

function drawLine() {
  beginShape();
  let atLeastOneOnScreen = false;
  points.forEach(p => {
    vertex(p[0], p[1]);
    p[1] += noise(frameCount / 100 + p[0] / 25);
    if (p[1] < windowHeight * 1.1) {
      atLeastOneOnScreen = true;
    }
  });
  endShape();

  if (!atLeastOneOnScreen) {
    reset();
  }
}