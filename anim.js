document.addEventListener("DOMContentLoaded", function (event) {
    document.addEventListener("scroll", function (event) {
        const animatedBoxes = document.getElementsByClassName("ghosty");
        const windowOffsetTop = window.innerHeight + window.scrollY;

        Array.prototype.forEach.call(animatedBoxes, (animatedBox) => {
            const animatedBoxOffsetTop = animatedBox.offsetTop;

            if (windowOffsetTop >= animatedBoxOffsetTop) {
                addClass(animatedBox, "fade-in");
            }
        });
    });
});

function addClass(element, className) {
    const arrayClasses = element.className.split(" ");
    if (arrayClasses.indexOf(className) === -1) {
        element.className += " " + className;
    }
}

document.body.addEventListener("mousemove", function () {
    var audio = new Audio('audio/start_music.mp3');
    audio.play();
})