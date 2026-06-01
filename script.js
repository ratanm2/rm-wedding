function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');}
function openCurtain(){document.querySelectorAll('.curtain').forEach(c=>c.classList.add('open'));}
const t=new Date('2026-06-19T12:28:00').getTime();
setInterval(()=>{let d=t-Date.now();let el=document.getElementById('cd'); if(el) el.innerHTML=Math.floor(d/86400000)+' Days';},1000);
