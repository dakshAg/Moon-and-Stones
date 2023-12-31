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
  for (let i = 0; i < stepsPerFrame; i++) {
    stroke(0, 255 - i * 255 / stepsPerFrame);
    drawLine();
  }
}

function reset() {
  background("#ff3d00");
  resetPoints();
}

function resetPoints() {
  points = [];
  for (let i = 0; i < windowWidth; i++) {
    points.push([i, 0]);
  }
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
    //reset();
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const redirectAfterWait = async () => {
      await delay(2000);
      console.log("Waited 2s");
      window.location.href = "end.html";
    };
    redirectAfterWait();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
