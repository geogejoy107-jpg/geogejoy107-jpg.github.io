document.getElementById('year').textContent = new Date().getFullYear();

const cards = document.querySelectorAll('.tile, .profile-card');
window.addEventListener('pointermove', (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  cards.forEach((card, index) => {
    const strength = index === cards.length - 1 ? 5 : 2;
    card.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  });
}, { passive: true });
