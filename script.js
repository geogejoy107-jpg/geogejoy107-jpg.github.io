// Soft ambient field. Deliberately organic: no node-network lines, no “AI dashboard” look.
const canvas = document.getElementById('field');
let ctx, flecks = [];

function initField(){
  if(!canvas || !(ctx = canvas.getContext('2d'))) return;
  resize();
  draw();
  addEventListener('resize', resize, {passive:true});
}

function resize(){
  if(!canvas || !ctx) return;
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  const count = Math.min(44, Math.max(18, Math.floor(innerWidth / 34)));
  flecks = Array.from({length: count}, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - .5) * .10,
    vy: (Math.random() - .5) * .08,
    r: Math.random() * 2.2 + .7,
    a: Math.random() * .18 + .06,
    hue: Math.random() > .55 ? '223,184,108' : '155,182,154'
  }));
}

function draw(){
  if(!canvas || !ctx) return;
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const f of flecks){
    f.x += f.vx; f.y += f.vy;
    if(f.x < -20) f.x = innerWidth + 20;
    if(f.x > innerWidth + 20) f.x = -20;
    if(f.y < -20) f.y = innerHeight + 20;
    if(f.y > innerHeight + 20) f.y = -20;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${f.hue},${f.a})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
initField();

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
