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
