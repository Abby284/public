const intro = document.getElementById("intro");
const playBtn = document.getElementById("playBtn");
const crack = document.getElementById("crackSound");
const whoosh = document.getElementById("whooshSound");

/* ======================
   PLAY SEQUENCE
====================== */
playBtn.addEventListener("click", () => {
  playBtn.style.opacity = "0";
  playBtn.style.pointerEvents = "none";

  intro.classList.add("show-logo");

  setTimeout(() => {
    crack.volume = 0.4;
    crack.play();
    intro.classList.add("fracture", "shake");
  }, 120);

  setTimeout(() => {
    whoosh.volume = 0.4;
    whoosh.play();
    intro.classList.add("rgb");
  }, 520);

  setTimeout(() => {
    document.body.classList.add("fade-in");
  }, 1000);

  setTimeout(() => {
   window.location.href = "/public/index.html";

  }, 1600);
});

/* ======================
   ORBS
====================== */
const canvas = document.getElementById("orbCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const orbs = Array.from({ length: 18 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 50 + 40,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  c: `hsla(${Math.random()*360},80%,60%,0.45)`
}));

addEventListener("mousemove", e => {
  orbs.forEach(o => {
    const dx = o.x - e.clientX;
    const dy = o.y - e.clientY;
    const d = Math.sqrt(dx*dx + dy*dy);
    if (d < 140) {
      o.vx += dx / d * 0.5;
      o.vy += dy / d * 0.5;
    }
  });
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  orbs.forEach(o => {
    o.x += o.vx;
    o.y += o.vy;

    const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
    g.addColorStop(0, o.c);
    g.addColorStop(1, "transparent");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();
