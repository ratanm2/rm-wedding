
const target=new Date('2026-06-19T12:28:00').getTime();
setInterval(()=>{
const x=target-Date.now();
document.getElementById('d').innerText=Math.floor(x/86400000);
document.getElementById('h').innerText=Math.floor((x%86400000)/3600000);
document.getElementById('m').innerText=Math.floor((x%3600000)/60000);
document.getElementById('s').innerText=Math.floor((x%60000)/1000);
},1000);

const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active');});
},{threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
