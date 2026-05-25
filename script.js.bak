const canvas = document.getElementById('field');
const ctx = canvas ? canvas.getContext('2d') : null;
let dots = [];
function resize(){
  if (!canvas || !ctx) return;
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  dots = Array.from({length: Math.min(92, Math.floor(innerWidth/16))}, () => ({
    x: Math.random()*innerWidth, y: Math.random()*innerHeight,
    vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22, r:Math.random()*1.8+.4
  }));
}
function draw(){
  if (!canvas || !ctx) return;
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const d of dots){
    d.x+=d.vx; d.y+=d.vy;
    if(d.x<0||d.x>innerWidth) d.vx*=-1;
    if(d.y<0||d.y>innerHeight) d.vy*=-1;
    ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fillStyle='rgba(244,239,231,.55)'; ctx.fill();
  }
  for(let i=0;i<dots.length;i++) for(let j=i+1;j<dots.length;j++){
    const a=dots[i], b=dots[j], dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
    if(dist<125){ ctx.strokeStyle=`rgba(134,167,255,${(1-dist/125)*.16})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
  }
  requestAnimationFrame(draw);
}
if (canvas && ctx) { resize(); draw(); addEventListener('resize', resize, {passive:true}); }

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
