/* ================= CUSTOM CURSOR ================= */
const cursor = document.getElementById("cursor");

if (cursor) {
  window.addEventListener("mousemove", (e) => {
    // We use left/top so we don't overwrite the CSS 'transform: translate(-50%, -50%)'
    // This keeps the cursor perfectly centered on the mouse tip.
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

/* ================= SCROLL REVEAL ================= */
const sections = document.querySelectorAll(".section.reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.1 });

// FIX: Actually tell the observer to watch the sections
sections.forEach(section => {
  observer.observe(section);
});

/* ================= FLOATING GLOWING ORBS ================= */
const orbCanvas = document.getElementById("bg-orbs");

// Only run canvas logic if the element exists
if (orbCanvas) {
  const orbCtx = orbCanvas.getContext("2d");

  function resizeCanvas() {
    orbCanvas.width = window.innerWidth;
    orbCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const orbColors = [
    "rgba(239,68,68,0.45)",   // Primary Red
    "rgba(59,130,246,0.35)",  // Blue
    "rgba(168,85,247,0.35)",  // Purple
    "rgba(34,197,94,0.30)"    // Green
  ];

  // Create Orbs
  const orbs = Array.from({ length: 14 }, () => ({
    x: Math.random() * orbCanvas.width,
    y: Math.random() * orbCanvas.height,
    r: Math.random() * 60 + 40,        // Radius between 40-100
    vx: (Math.random() - 0.5) * 0.3,   // Velocity X
    vy: (Math.random() - 0.5) * 0.3,   // Velocity Y
    color: orbColors[Math.floor(Math.random() * orbColors.length)]
  }));

  function animateOrbs() {
    orbCtx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);

    orbs.forEach(o => {
      // Move
      o.x += o.vx;
      o.y += o.vy;

      // Bounce off walls (with buffer)
      if (o.x < -100 || o.x > orbCanvas.width + 100) o.vx *= -1;
      if (o.y < -100 || o.y > orbCanvas.height + 100) o.vy *= -1;

      // Draw
      const gradient = orbCtx.createRadialGradient(
        o.x, o.y, 0,
        o.x, o.y, o.r
      );
      gradient.addColorStop(0, o.color);
      gradient.addColorStop(1, "rgba(0,0,0,0)"); // Fade to transparent

      orbCtx.beginPath();
      orbCtx.fillStyle = gradient;
      orbCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      orbCtx.fill();
    });

    requestAnimationFrame(animateOrbs);
  }

  animateOrbs();
}const text = document.getElementById("typing-text");
const phrases = ["Scalable Systems", "Modern Interfaces", "Backend APIs", "Clean Code"];
let i = 0, j = 0, isDeleting = false;

function type() {
  const currentPhrase = phrases[i];
  text.textContent = isDeleting ? currentPhrase.substring(0, j--) : currentPhrase.substring(0, j++);
  
  if (!isDeleting && j === currentPhrase.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.hidden.md\\:flex');

menuToggle.addEventListener('click', () => {
  // Simple toggle for mobile view
  navLinks.classList.toggle('hidden');
  navLinks.classList.toggle('flex');
  navLinks.classList.toggle('flex-col');
  navLinks.classList.toggle('absolute');
  navLinks.classList.toggle('top-20');
  navLinks.classList.toggle('left-0');
  navLinks.classList.toggle('w-full');
  navLinks.classList.toggle('bg-black');
  navLinks.classList.toggle('p-8');
});window.addEventListener('scroll', () => {
  const gauge = document.getElementById('scroll-gauge');
  const needle = document.getElementById('gauge-needle');
  const percentText = document.getElementById('speedo-percent');
  
  // Calculate scroll percentage
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  // Only show the gauge after we've started scrolling
  if (winScroll > 100) {
    gauge.style.opacity = '1';
  } else {
    gauge.style.opacity = '0';
  }

  // Update SVG dashoffset: 251.2 is the full circumference
  const offset = 251.2 - (scrolled / 100) * 251.2;
  needle.style.strokeDashoffset = offset;
  
  // Update the number text
  percentText.innerText = Math.round(scrolled);
});


