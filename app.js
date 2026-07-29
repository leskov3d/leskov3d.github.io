function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    const wrap = canvas.parentElement;
    canvas.width = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.08,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildPortfolioGrid() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  const allFiles = [
    "портфолио/opt_1.jpg",
    "портфолио/opt_2.jpg",
    "портфолио/opt_3.jpg",
    "портфолио/opt_4.jpg",
    "портфолио/opt_5.jpg",
    "портфолио/opt_6.jpg",
    "портфолио/opt_7.jpg",
    "портфолио/opt_8.jpg",
    "портфолио/opt_9.jpg",
    "портфолио/opt_10.jpg",
    "портфолио/opt_11.jpg",
    "портфолио/opt_12.jpg",
    "портфолио/opt_13.jpg",
    "портфолио/opt_14.jpg",
    "портфолио/opt_15.jpg",
    "портфолио/opt_16.jpg",
    "портфолио/opt_17.jpg",
    "портфолио/opt_18.jpg",
    "портфолио/opt_19.jpg",
    "портфолио/opt_20.jpg",
    "портфолио/opt_21.jpg",
    "портфолио/opt_22.jpg",
    "портфолио/opt_23.jpg",
    "портфолио/opt_24.jpg",
    "портфолио/opt_25.jpg",
    "портфолио/opt_26.jpg",
    "портфолио/opt_27.jpg",
    "портфолио/opt_28.jpg",
    "портфолио/opt_29.jpg",
    "портфолио/opt_30.jpg",
    "портфолио/opt_31.jpg",
    "портфолио/opt_32.jpg",
    "портфолио/opt_33.jpg",
    "портфолио/opt_34.jpg",
    "портфолио/opt_35.jpg",
    "портфолио/opt_36.jpg",
    "портфолио/opt_37.jpg",
    "портфолио/opt_38.jpg",
    "портфолио/opt_39.jpg",
    "портфолио/opt_40.jpg",
    "портфолио/opt_41.jpg",
    "портфолио/opt_42.jpg",
    "портфолио/opt_43.jpg",
    "портфолио/opt_44.jpg",
    "портфолио/opt_45.jpg",
    "портфолио/opt_46.jpg",
    "портфолио/opt_47.jpg",
    "портфолио/opt_48.jpg",
    "портфолио/opt_49.jpg",
    "портфолио/opt_50.jpg",
    "портфолио/opt_51.jpg",
    "портфолио/opt_52.jpg",
    "портфолио/opt_53.jpg",
    "портфолио/opt_54.jpg",
    "портфолио/opt_55.jpg",
    "портфолио/opt_56.jpg",
    "портфолио/opt_57.jpg",
    "портфолио/opt_58.jpg",
    "портфолио/opt_59.jpg",
    "портфолио/opt_60.jpg",
    "портфолио/opt_61.jpg",
  ];

  shuffle(allFiles);

  const rows = 8;
  const chunkSize = Math.ceil(allFiles.length / rows);
  for (let r = 0; r < rows; r++) {
    const chunk = allFiles.slice(r * chunkSize, (r + 1) * chunkSize);
    const row = document.createElement("div");
    row.className = "portfolio-row";
    [...chunk, ...chunk].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      row.appendChild(img);
    });
    grid.appendChild(row);
  }

  // Duplicate rows for vertical seamless loop
  [...grid.children].forEach(row => {
    grid.appendChild(row.cloneNode(true));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let exploded = false;

  window.addEventListener("scroll", () => {
    if (exploded) return;
    document.querySelector(".hero").classList.toggle("hero--dark", window.scrollY > 200);
    document.querySelector(".hero-wrap").classList.toggle("hero-hidden", window.scrollY > 200);
  });

  const portfolioBtn = document.getElementById("ctaBtn");
  if (portfolioBtn) {
    portfolioBtn.addEventListener("click", () => {
      if (exploded) return;
      exploded = true;

      document.querySelector(".hero-wrap").classList.add("exploded");
      document.querySelector(".hero-photo").classList.add("explode-photo");
      document.querySelector("h1").classList.add("explode-title");
      document.querySelector(".hero-subtitle").classList.add("explode-subtitle");
      document.querySelector(".hero-desc").classList.add("explode-desc");
      portfolioBtn.classList.add("explode-btn");
      document.querySelector(".hero-contacts").classList.add("explode-contacts");

      const bg = document.getElementById("portfolioBg");
      bg.classList.add("visible");
      bg.querySelectorAll(".portfolio-row").forEach((row) => {
        row.style.animation = "slideRow 180s linear infinite";
      });

      setTimeout(() => {
        const msg = document.querySelector(".hero-message");
        const contacts = document.querySelector(".hero-contacts");
        const wrap = document.createElement("div");
        wrap.className = "explode-center";
        contacts.parentNode.insertBefore(wrap, contacts);
        wrap.appendChild(msg);
        wrap.appendChild(contacts);
        contacts.classList.remove("explode-contacts");
        contacts.classList.add("rearranged");
        msg.classList.add("visible");
      }, 900);
    });
  }

  buildPortfolioGrid();
  initParticles();

  document.querySelector(".nav-logo").addEventListener("click", () => location.reload());
  document.querySelector(".nav-links a").addEventListener("click", () => location.reload());
});

window.addEventListener("load", () => {
  document.getElementById("preloader").classList.add("loaded");

  const heroPhoto = document.querySelector(".hero-photo");
  const heroTitle = document.querySelector("h1");
  const heroSub = document.querySelector(".hero-subtitle");
  const heroDesc = document.querySelector(".hero-desc");
  const heroContacts = document.querySelector(".hero-contacts");
  const heroBtn = document.querySelector(".portfolio-btn");

  heroPhoto.classList.add("hero-animate", "hero-animate--photo");
  heroTitle.classList.add("hero-animate", "hero-animate--title");
  heroSub.classList.add("hero-animate", "hero-animate--subtitle");
  heroDesc.classList.add("hero-animate", "hero-animate--desc");
  heroContacts.classList.add("hero-animate", "hero-animate--contacts");
  heroBtn.classList.add("hero-animate", "hero-animate--btn");

  document.querySelectorAll(".hero-hidden").forEach(el => el.classList.remove("hero-hidden"));

  setTimeout(() => {
    document.querySelector(".hero-wrap").classList.add("hero-loaded");
  }, 1700);
});
