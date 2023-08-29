/* CAR */
//Move the brush and 'paint' with scroll
let brush = document.getElementById("brush"),
    paint = document.getElementById("paint"),
    height = document.body.scrollHeight;

window.addEventListener('scroll', function () {
    var value = window.scrollY;
    if (value <= height) {
        //Multiply value by a factor that increases/decreases speed
        brush.style.left = value * 0.58 + 50 + 'px';
        brush.style.top = value * 1.58 + 50 + 'px';
        //paint.style.height = value * 1.18 + 'px';
    }
});

//Flip the brush around based on scroll direction
let previousScrollPosition = 0;

const isScrollingDown = () => {
    let goingDown = false;

    let scrollPosition = window.pageYOffset;

    if (scrollPosition > previousScrollPosition) {
        goingDown = true;
    }

    previousScrollPosition = scrollPosition;

    return goingDown;
};

const handleScroll = () => {
    if (isScrollingDown() || window.scrollY == 0) {
        //brush.style.transform = 'rotate(180deg) translate(50%, 0)';
    } else {
        //brush.style.transform = 'translate(-50%, -110px)';
    }
};

window.addEventListener("scroll", handleScroll);

/* LIGHTENING */

const width = 1300;
const h = 600;

const maxTimeBetweenLightning = 5;
const maxLightningPaths = 200;
const maxLightningThickness = 5;
const startingDistance = 30;
const maxBranches = 7;

function makeLightning(ctx, startingX, startingY, branches) {
    ctx.beginPath();
    const amntOfPaths = getRandomInt(maxLightningPaths);
    let lightningThickness = maxLightningThickness;
    let distance = startingDistance;
    let timeout = 80;
    let speed = timeout;
    let totalTime = 0;
    for (let i = 0; i < amntOfPaths; i++) {
        ctx.strokeStyle = `rgb(255,255,255)`;
        ctx.lineWidth = getRandomInt(lightningThickness);
        lightningThickness /= 1.2;
        setTimeout(() => {
            ctx.moveTo(startingX, startingY);
            let endingX = getRandomInt(distance) * negOrPos() + startingX;
            let endingY = startingY + getRandomInt(distance * 2);
            distance /= 1.1;
            ctx.lineTo(endingX, endingY);
            startingX = endingX;
            startingY = endingY;
            ctx.stroke();
            if (branches < maxBranches && getRandomInt(maxLightningPaths / 6) == 1) {
                let time = makeLightning(ctx, startingX, startingY, branches + 1);
                totalTime += time;
            }
        }, timeout);
        speed /= 1.4;
        timeout += speed;
    }
    return timeout + totalTime;
}

function negOrPos() {
    return Math.round(Math.random()) == 0 ? -1 : 1;
}

function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

let prevHighestId = 0;

function createCanvasAndLightning() {
    const canvas = document.createElement('canvas');
    const body = document.getElementById("weatherAnimation");
    canvas.setAttribute('width', '1450px');
    canvas.setAttribute('height', '800px');
    canvas.className = 'myCanvas';
    ctx = canvas.getContext("2d");
    body.appendChild(canvas);
    const time = makeLightning(ctx, getRandomInt(width), getRandomInt(h / 3), 0);
    canvas.style.animationName = 'flash';
    canvas.style.animationDuration = time + "ms";
    setTimeout(() => {
        canvas.style.animationName = 'fadeOut';
    }, time);
    setTimeout(() => {
        canvas.remove();
        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= prevHighestId; i--) {
                window.clearTimeout(i);
            }
            prevHighestId = highestId;
            setTimeout(createCanvasAndLightning, 1000);
        }, 0);
    }, time);
}

createCanvasAndLightning();

// number of drops created.
var nbDrop = 858;

// function to generate a random number range.
function randRange(minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

var makeItRain = function () {
    //clear out everything
    $('.rain').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
}

$('.splat-toggle.toggle').on('click', function () {
    $('body').toggleClass('splat-toggle');
    $('.splat-toggle.toggle').toggleClass('active');
    makeItRain();
});

$('.back-row-toggle.toggle').on('click', function () {
    $('body').toggleClass('back-row-toggle');
    $('.back-row-toggle.toggle').toggleClass('active');
    makeItRain();
});

$('.single-toggle.toggle').on('click', function () {
    $('body').toggleClass('single-toggle');
    $('.single-toggle.toggle').toggleClass('active');
    makeItRain();
});

makeItRain();

