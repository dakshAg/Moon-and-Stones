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


// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;

    var audio = new Audio('scream.mp3');
    audio.play();

    redirectAfterWait();
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));
const redirectAfterWait = async () => {
  await delay(6000);
  console.log("Waited 6s");
  window.location.href = "inspect_painting_1.html";
};