// Particle field (only on pages with #field canvas)
const canvas = document.getElementById('field');
let ctx, dots = [];
function initField(){
  if(!canvas || !(ctx = canvas.getContext('2d'))) return;
  resize(); draw();
  addEventListener('resize', resize, {passive:true});
}
function resize(){
  if(!canvas||!ctx) return;
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  dots = Array.from({length: Math.min(70, Math.floor(innerWidth/18))}, () => ({
    x: Math.random()*innerWidth, y: Math.random()*innerHeight,
    vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25, r:Math.random()*1.6+.3
  }));
}
function draw(){
  if(!canvas||!ctx) return;
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const d of dots){
    d.x+=d.vx; d.y+=d.vy;
    if(d.x<0||d.x>innerWidth) d.vx*=-1;
    if(d.y<0||d.y>innerHeight) d.vy*=-1;
    ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fillStyle='rgba(244,239,231,.5)'; ctx.fill();
  }
  for(let i=0;i<dots.length;i++) for(let j=i+1;j<dots.length;j++){
    const a=dots[i],b=dots[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
    if(dist<120){ ctx.strokeStyle=`rgba(137,171,255,${(1-dist/120)*.14})`; ctx.lineWidth=.8; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
  }
  requestAnimationFrame(draw);
}
initField();

// Intersection observer for reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Scroll snap fix: keep topbar visible on hash navigation
const topbar = document.querySelector('.topbar');
let lastHash = location.hash;
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if(id && (document.getElementById(id) || document.querySelector(`[name="${id}"]`))) lastHash = id;
});
