const screens = {
welcome: document.getElementById("welcome"),
scratch: document.getElementById("scratch"),
curtain: document.getElementById("curtainScreen"),
invite: document.getElementById("invitation")
};

function showScreen(screen){

document
.querySelectorAll(".screen")
.forEach(s=>s.classList.remove("active"));

screen.classList.add("active");
}

document
.getElementById("openBtn")
.addEventListener("click",()=>{

showScreen(screens.scratch);

initScratch();
});

let completed = 0;

function initScratch(){

document
.querySelectorAll("canvas")
.forEach(canvas=>{

const ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;

ctx.fillStyle = "#C6A664";
ctx.beginPath();
ctx.arc(50,50,50,0,Math.PI*2);
ctx.fill();

let scratchCount=0;

function scratch(x,y){

ctx.globalCompositeOperation =
"destination-out";

ctx.beginPath();
ctx.arc(x,y,12,0,Math.PI*2);
ctx.fill();

scratchCount++;

if(scratchCount>40){

canvas.style.display="none";

completed++;

if(completed===3){

setTimeout(openCurtains,1000);
}
}
}

canvas.addEventListener("mousemove",e=>{

if(e.buttons!==1)return;

const rect=canvas.getBoundingClientRect();

scratch(
e.clientX-rect.left,
e.clientY-rect.top
);

});

canvas.addEventListener("touchmove",e=>{

e.preventDefault();

const t=e.touches[0];

const rect=canvas.getBoundingClientRect();

scratch(
t.clientX-rect.left,
t.clientY-rect.top
);

});
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
fill:"forwards"
}
);

right.animate(
[
{transform:"translateX(0)"},
{transform:"translateX(100%)"}
],
{
duration:2000,
fill:"forwards"
}
);

setTimeout(()=>{

showScreen(screens.invite);

},3000);
}
