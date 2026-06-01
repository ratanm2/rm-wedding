
const target=new Date('2026-06-19T12:28:00').getTime();
setInterval(()=>{
const diff=target-Date.now();
document.getElementById('d').innerText=Math.max(0,Math.floor(diff/86400000));
document.getElementById('h').innerText=Math.max(0,Math.floor(diff%86400000/3600000));
document.getElementById('m').innerText=Math.max(0,Math.floor(diff%3600000/60000));
document.getElementById('s').innerText=Math.max(0,Math.floor(diff%60000/1000));
},1000);
