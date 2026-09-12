// SPEL site — shared behaviors

// Reveal animations only apply when JS is running (see .js .reveal in CSS)
document.documentElement.classList.add("js");

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

// Scroll reveal (falls back to always-visible if IntersectionObserver is unavailable)
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// Mark active top-level nav link by filename
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav a.top-link").forEach((a) => {
  if (a.getAttribute("href") === here) a.classList.add("active");
});

// Drag-to-scroll for horizontal cover strips (mouse only; touch already scrolls natively)
document.querySelectorAll(".cover-strip").forEach((strip) => {
  let down = false, moved = false, startX = 0, startLeft = 0;
  const THRESHOLD = 6; // px of movement before a press counts as a drag

  const onMove = (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > THRESHOLD) { moved = true; strip.classList.add("dragging"); }
    if (moved) strip.scrollLeft = startLeft - dx;
  };
  const onUp = () => {
    down = false;
    strip.classList.remove("dragging");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };

  strip.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    if (e.target.closest("figcaption")) return; // let text be selected instead of panning
    down = true; moved = false;
    startX = e.clientX; startLeft = strip.scrollLeft;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  });

  // A drag must not open the cover's link; a plain click still does
  strip.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  // Suppress the browser's native image ghost-drag
  strip.addEventListener("dragstart", (e) => e.preventDefault());
});
