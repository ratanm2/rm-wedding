const screens = {
welcome: document.getElementById("welcome"),
scratch: document.getElementById("scratch"),
curtain: document.getElementById("curtainScreen"),
invite: document.getElementById("invitation")
};

function showScreen(screen) {

document
.querySelectorAll(".screen")
.forEach(s => s.classList.remove("active"));

screen.classList.add("active");
}

document
.getElementById("openBtn")
.addEventListener("click", () => {

showScreen(screens.scratch);

initScratch();
});

let completed = 0;
let initialized = false;

function initScratch() {

if (initialized) return;
initialized = true;

document
.querySelectorAll("canvas")
.forEach(canvas => {

const ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;

ctx.fillStyle = "#C6A664";

ctx.beginPath();
ctx.arc(50, 50, 50, 0, Math.PI * 2);
ctx.fill();

let revealed = false;

function revealCircle() {

if (revealed) return;

revealed = true;

canvas.style.transition =
"all .6s ease";

canvas.style.opacity = "0";

canvas.style.transform =
"scale(.8)";

setTimeout(() => {
canvas.style.display = "none";
}, 600);

completed++;

console.log(
"Completed Circles:",
completed
);

if (completed === 3) {

setTimeout(() => {

openCurtains();

}, 1000);

}
}

function checkReveal() {

const pixels = ctx.getImageData(
0,
0,
canvas.width,
canvas.height
);

let transparent = 0;

for (
let i = 3;
i < pixels.data.length;
i += 4
) {

if (pixels.data[i] === 0) {
transparent++;
}

}

const percent =
transparent /
(canvas.width * canvas.height);

if (percent > 0.35) {

revealCircle();

}
}

function scratch(x, y) {

if (revealed) return;

ctx.globalCompositeOperation =
"destination-out";

ctx.beginPath();

ctx.arc(
x,
y,
30,
0,
Math.PI * 2
);

ctx.fill();

checkReveal();
}

canvas.addEventListener(
"mousemove",
e => {

if (e.buttons !== 1) return;

const rect =
canvas.getBoundingClientRect();

scratch(
e.clientX - rect.left,
e.clientY - rect.top
);

}
);

canvas.addEventListener(
"touchmove",
e => {

e.preventDefault();

const touch =
e.touches[0];

const rect =
canvas.getBoundingClientRect();

scratch(
touch.clientX - rect.left,
touch.clientY - rect.top
);

},
{ passive: false }
);

});
}

function openCurtains() {

showScreen(screens.curtain);

const left =
document.querySelector(".left");

const right =
document.querySelector(".right");

left.animate(
[
{
transform: "translateX(0)"
},
{
transform: "translateX(-100%)"
}
],
{
duration: 2200,
fill: "forwards",
easing: "ease-in-out"
}
);

right.animate(
[
{
transform: "translateX(0)"
},
{
transform: "translateX(100%)"
}
],
{
duration: 2200,
fill: "forwards",
easing: "ease-in-out"
}
);

setTimeout(() => {

showScreen(screens.invite);

}, 3200);
}
