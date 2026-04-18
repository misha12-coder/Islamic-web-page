/* =============================================
   The Beauty of Islam — JS
   Loader + Particles + Scroll Reveal
   ============================================= */

// === LOADER QUOTES ===
const loaderQuotes = [
    "اَللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ",
    "یا نبی سلام علیک",
    "علی ولی اللہ",
    "الحمد للہ رب العالمین",
    "سُبْحَانَ اللّٰه وَبِحَمْدِهِ",
];

(function initLoader() {
    const quoteEl = document.getElementById('loader-quote');
    const loader  = document.getElementById('loader');
    let qi = 0;

    // Cycle quotes
    const quoteInterval = setInterval(() => {
        qi = (qi + 1) % loaderQuotes.length;
        quoteEl.style.opacity = 0;
        setTimeout(() => {
            quoteEl.textContent = loaderQuotes[qi];
            quoteEl.style.transition = 'opacity 0.5s';
            quoteEl.style.opacity = 1;
        }, 300);
    }, 600);

    // First quote
    quoteEl.textContent = loaderQuotes[0];

    // Hide after bar completes (2.5s + fade)
    setTimeout(() => {
        clearInterval(quoteInterval);
        loader.classList.add('hidden');
    }, 3000);
})();


// === PARTICLE CANVAS ===
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx    = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const COLORS = ['#9d4edd','#d4a843','#7b2fff','#c77dff','#f0c864'];

    function createParticle() {
        return {
            x:     Math.random() * W,
            y:     Math.random() * H,
            r:     Math.random() * 1.8 + 0.4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            vx:    (Math.random() - 0.5) * 0.3,
            vy:    -Math.random() * 0.5 - 0.2,
            alpha: Math.random() * 0.5 + 0.1,
        };
    }

    for (let i = 0; i < 100; i++) particles.push(createParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p, i) => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle   = p.color;
            ctx.shadowBlur  = 6;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            p.x += p.vx;
            p.y += p.vy;

            if (p.y < -10 || p.x < -10 || p.x > W + 10) {
                particles[i] = createParticle();
                particles[i].y = H + 10;
            }
        });
        requestAnimationFrame(draw);
    }
    draw();
})();


// === SCROLL REVEAL ===
(function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
})();


// === SMOOTH NAV ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
