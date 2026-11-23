"use strict";
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => root.querySelectorAll(s);
const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } },
  remove(key) { try { localStorage.removeItem(key); } catch {} }
};
const menu = $(".menu-toggle");
function toggleMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  $("#nav-links").classList.toggle("open", open);
}
menu.onclick = () => toggleMenu(menu.getAttribute("aria-expanded") !== "true");
document.addEventListener("keydown", event => { if (event.key === "Escape") toggleMenu(false); });
function updateAccountLinks() {
  const profile = storage.get("elan-profile", null);
  $$("[data-account-link]").forEach((link) => {
    link.textContent = profile?.name ? "Profile" : "Log in / Sign up";
    link.href = profile?.name ? "profile.html" : "login.html";
  });
}
updateAccountLinks();
function revealSections() {
  if (!window.IntersectionObserver || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(({target, isIntersecting}) => {
    if (isIntersecting) { target.classList.replace("pending", "visible"); observer.unobserve(target); }
  }), {threshold: .08});
  $$(".reveal").forEach(el => { el.classList.add("pending"); observer.observe(el); });
}
if (!$(".intro")) revealSections();

let toastTimer;
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 3500);
}

function setupLoginNudge(nudge) {
  function dismiss() {
    nudge.hidden = true;
    try { sessionStorage.setItem("elan-nudge", "yes"); } catch {}
  }
  $("#guest").onclick = $("#dismiss-login").onclick = dismiss;
  $("[data-login]").onclick = () => { dismiss(); location.href = "login.html"; };
  return () => {
    try { if (sessionStorage.getItem("elan-nudge")) return; } catch {}
    if (!storage.get("elan-profile", null)) nudge.hidden = false;
  };
}