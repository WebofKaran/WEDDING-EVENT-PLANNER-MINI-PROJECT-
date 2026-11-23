"use strict";
const intro = $(".intro"), showLoginNudge = setupLoginNudge($(".login-nudge"));
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
function typeText(el) {
  const original = el.textContent.trim();
  const accessible = document.createElement("span");
  Object.assign(accessible, { className: "typing-accessible", textContent: original });
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  el.replaceChildren(accessible, visual);
  for (const token of original.split(/(\s+)/)) {
    if (!token.trim()) { visual.append(token); continue; }
    const word = Object.assign(document.createElement("span"), { className: "typing-word" });
    for (const char of token) {
      word.append(Object.assign(document.createElement("span"), { className: "typing-character", textContent: char }));
    }
    visual.append(word);
  }
  const letters = $$(".typing-character", visual);
  const start = performance.now(), delay = Math.min(Number(el.dataset.typeSpeed) || 16, 8000 / letters.length);
  let shown = 0;
  function tick(now) {
    while (shown < letters.length && shown < (now - start) / delay) letters[shown++].classList.add("typed");
    if (shown < letters.length && !reduced.matches) requestAnimationFrame(tick);
    else el.textContent = original;
  }
  requestAnimationFrame(tick);
}
function startMotion() {
  if (document.body.classList.contains("page-motion-started")) return;
  document.body.classList.add("page-motion-started");
  revealSections();
  if (reduced.matches || !window.IntersectionObserver) return;
  const observer = new IntersectionObserver(entries => entries.forEach(({target, isIntersecting}) => {
    if (target.matches(".about-inner")) {
      $$(".about-photo").forEach(photo => {
        photo.classList.toggle("photo-in", isIntersecting); photo.classList.toggle("photo-wait", !isIntersecting);
      });
    } else if (isIntersecting) {
      if (target.hasAttribute("data-typewriter")) typeText(target);
      else target.classList.replace("photo-wait", "photo-in");
      observer.unobserve(target);
    }
  }), {threshold: .2});
  $$(".about-photo, .strip-row img, .services .card > img").forEach((photo, index) => {
    photo.classList.add("photo-motion", "photo-wait");
    photo.style.setProperty("--photo-delay", (index % 4) * 140 + "ms");
    photo.style.setProperty("--photo-x", index < 2 ? "-32px" : "32px");
    if (!photo.matches(".about-photo")) observer.observe(photo);
  });
  $$(".about-inner, [data-typewriter]").forEach(el => observer.observe(el));
}
function finish() {
  startMotion(); intro.hidden = true; document.body.classList.add("intro-complete");
  showLoginNudge();
}
const style = getComputedStyle(intro);
const duration = 1000 * (parseFloat(style.animationDelay) + parseFloat(style.animationDuration));
if (reduced.matches || !duration) finish();
else { setTimeout(startMotion, Math.max(0, duration - 200)); setTimeout(finish, duration); }
