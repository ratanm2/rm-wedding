const screens = {
welcome: document.getElementById("welcome"),
scratch: document.getElementById("scratch"),
curtain: document.getElementById("curtainScreen"),
invite: document.getElementById("invitation")
};

function showScreen(screen){

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

function initScratch(){

if(initialized) return;
initialized = true;

document
.querySelectorAll("canvas")
.forEach(canvas => {

const ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;

ctx.fillStyle = "#C6A664";

ctx.beginPath();
ctx.arc(50,50,50,0,Math.PI * 2);
ctx.fill();

let scratchCount = 0;
let revealed = false;

function scratch(x,y){

if(revealed) return;

ctx.globalCompositeOperation = "destination-out";

ctx.beginPath();
ctx.arc(x,y,12,0,Math.PI * 2);
ctx.arc(x,y,25,0,Math.PI * 2);
ctx.fill();

scratchCount++;

if(scratchCount > 60){
if(scratchCount > 15){

revealed = true;

canvas.style.transition = "all .5s ease";
canvas.style.opacity = "0";
canvas.style.transform = "scale(.8)";

setTimeout(()=>{
canvas.style.display = "none";
},500);

completed++;

console.log("Completed:", completed);

if(completed === 3){

setTimeout(()=>{

openCurtains();

},1000);

}
}
}

canvas.addEventListener("mousemove",e=>{

if(e.buttons !== 1) return;

const rect = canvas.getBoundingClientRect();

scratch(
e.clientX - rect.left,
e.clientY - rect.top
);

});

canvas.addEventListener("touchmove",e=>{

e.preventDefault();

const t = e.touches[0];

const rect = canvas.getBoundingClientRect();

scratch(
t.clientX - rect.left,
t.clientY - rect.top
);

},{passive:false});

});

}

function openCurtains(){

showScreen(screens.curtain);

const left =
document.querySelector(".left");

const right =
document.querySelector(".right");

left.animate(
[
{transform:"translateX(0)"},
{transform:"translateX(-100%)"}
],
{
duration:2000,
fill:"forwards",
easing:"ease-in-out"
}
);

right.animate(
[
{transform:"translateX(0)"},
{transform:"translateX(100%)"}
],
{
duration:2000,
fill:"forwards",
easing:"ease-in-out"
}
);

setTimeout(()=>{

showScreen(screens.invite);

},3000);
}
