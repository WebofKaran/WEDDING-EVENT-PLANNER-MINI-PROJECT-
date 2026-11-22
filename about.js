"use strict";
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
// Release home-page motion 0.2 seconds before the logo overlay finishes.
let releaseIntroMotion;
const introHandoff = new Promise((resolve) => {
  releaseIntroMotion = resolve;
});
const introFinished = new Promise((resolve) => {
  const intro = $(".intro");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let completed = false;
  function finishIntro() {
    if (completed) return;
    completed = true;
    document.body.classList.add("page-motion-started");
    releaseIntroMotion();
    if (intro) intro.hidden = true;
    document.body.classList.add("intro-complete");
    resolve();
  }
  if (
    !intro || reduced.matches || getComputedStyle(intro).visibility === "hidden"
  ) {
    document.body.classList.add("page-motion-started");
    finishIntro();
    return;
  }
  const introStyle = getComputedStyle(intro);
  const introDelay = parseFloat(introStyle.animationDelay) * 1000 || 0;
  const introDuration = parseFloat(introStyle.animationDuration) * 1000 || 0;
  setTimeout(() => {
    document.body.classList.add("page-motion-started");
    releaseIntroMotion();
  }, Math.max(0, introDelay + introDuration - 200));
  intro.addEventListener("animationend", (event) => {
    if (event.target === intro && event.animationName === "intro-exit") {
      finishIntro();
    }
  });
  reduced.addEventListener("change", (event) => {
    if (event.matches) finishIntro();
  });
});
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
const storage = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {}
  },
};
let toastTimer;
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 3500);
}
function download(name, content) {
  const a = document.createElement("a");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const menu = $(".menu-toggle");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", open);
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  $("#nav-links").classList.toggle("open", open);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menu.setAttribute("aria-expanded", "false");
    $("#nav-links").classList.remove("open");
  }
});
$$("[data-close]").forEach((b) =>
  b.addEventListener("click", () => b.closest("dialog").close())
);
$$("dialog").forEach((d) =>
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left || e.clientX > r.right || e.clientY < r.top ||
        e.clientY > r.bottom
      ) d.close();
    }
  })
);
const login = $("#login-dialog");
let authMode = "signup";
function dismissNudge() {
  if ($(".login-nudge")) $(".login-nudge").hidden = true;
  try {
    sessionStorage.setItem("elan-nudge", "yes");
  } catch {}
}
function setAuthMode(mode) {
  authMode = mode;
  $("#login-form").reset();
  $("#auth-password").type = "password";
  $("#toggle-password").textContent = "Show";
  $("#toggle-password").setAttribute("aria-pressed", "false");
  $("#auth-name-field").hidden = mode === "login";
  $("#auth-name").required = mode === "signup";
  $("#auth-submit").textContent = mode === "signup"
    ? "Create Demo Profile"
    : "Log In to Demo";
  $("#login-title").textContent = mode === "signup"
    ? "Your forever starts here."
    : "Welcome back.";
  $("#login-status").textContent = "";
  $$(".auth-mode").forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
function showAuthProfile(profile) {
  const active = !!profile?.name;
  $("#auth-fields").hidden = active;
  $("#auth-success").hidden = !active;
  $("#login-status").textContent = "";
  if (active) {
    $("#login-title").textContent = "Welcome, " + profile.name + ".";
    $("#profile-email").textContent = profile.email || "Local demo profile";
  } else setAuthMode("signup");
}
$$("[data-login]").forEach((button) =>
  button.addEventListener("click", () => {
    dismissNudge();
    showAuthProfile(storage.get("elan-profile", null));
    if (login.tagName === "DIALOG") login.showModal();
    else $("#login-title").scrollIntoView({ block: "center" });
  })
);
$$(".auth-mode").forEach((button) =>
  button.addEventListener("click", () => setAuthMode(button.dataset.mode))
);
$("#toggle-password").addEventListener("click", () => {
  const show = $("#auth-password").type === "password";
  $("#auth-password").type = show ? "text" : "password";
  $("#toggle-password").textContent = show ? "Hide" : "Show";
  $("#toggle-password").setAttribute("aria-pressed", String(show));
});
$("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#auth-email").value.trim();
  const name = authMode === "signup"
    ? $("#auth-name").value.trim()
    : email.split("@")[0];
  if (!name) {
    $("#login-status").textContent = "Please enter your name.";
    $("#auth-name").focus();
    return;
  }
  // This deliberately simulates login: no password comparison, transmission or storage.
  const profile = { name, email };
  const saved = storage.set("elan-profile", profile);
  $("#login-form").reset();
  $("#auth-password").type = "password";
  showAuthProfile(profile);
  updateAccountLinks();
  if (document.body.dataset.page === "login.html" && saved) {
    location.href = "profile.html";
    return;
  }
  $("#login-status").textContent = saved
    ? "Demo profile ready. Name and email saved only in this browser."
    : "Demo profile ready for this visit. Browser storage is unavailable.";
});
login.addEventListener("close", () => {
  $("#auth-password").value = "";
  $("#auth-password").type = "password";
});
$("#logout").addEventListener("click", () => {
  storage.remove("elan-profile");
  updateAccountLinks();
  showAuthProfile(null);
  if (document.body.dataset.page === "profile.html") renderProfilePage();
  $("#login-status").textContent =
    "Logged out. Your local demo profile has been cleared.";
});

// Replay the logo intro on every home-page load, including refreshes.
if ($(".intro")) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  introFinished.then(() =>
    setTimeout(() => {
      let dismissed = false;
      try {
        dismissed = !!sessionStorage.getItem("elan-nudge");
      } catch {}
      if (!dismissed && !storage.get("elan-profile", null)) {
        $(".login-nudge").hidden = false;
      }
    }, reduced ? 700 : 1350)
  );
  $("#dismiss-login").onclick = dismissNudge;
  $("#guest").onclick = dismissNudge;
}
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("pending");
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    { threshold: .08 },
  );
  $$(".reveal").forEach((el) => {
    el.classList.add("pending");
    introHandoff.then(() => observer.observe(el));
  });
}
const catalog = typeof CATALOG === "undefined" ? [] : CATALOG;
// Home photo frames reveal once per page visit, with a stagger within each row.
if (
  document.body.dataset.page === "index.html" &&
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  // Animate the four About frames together; reset only after the section exits.
  const aboutFrames = $$(".about-photo");
  const aboutSection = $(".about-inner");
  aboutFrames.forEach((photo, index) => {
    photo.style.setProperty("--photo-delay", `${[0, 280, 140, 420][index]}ms`);
    photo.style.setProperty("--photo-x", index < 2 ? "-32px" : "32px");
    photo.classList.add("photo-motion", "photo-wait");
  });
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          aboutFrames.forEach((photo) => {
            photo.classList.remove("photo-wait");
            photo.classList.add("photo-in");
          });
        } else if (!entry.isIntersecting) {
          aboutFrames.forEach((photo) => {
            photo.classList.remove("photo-in");
            photo.classList.add("photo-wait");
          });
        }
      });
    }, { threshold: [0, 0.2] });
    introHandoff.then(() => aboutObserver.observe(aboutSection));
  }
  const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("photo-wait");
      entry.target.classList.add("photo-in");
      photoObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  [".strip-row img", ".services .card > img"].forEach((selector) => {
    $$(selector).forEach((photo, index) => {
      photo.style.setProperty("--photo-delay", `${index * 100}ms`);
      photo.classList.add("photo-motion", "photo-wait");
      introHandoff.then(() => photoObserver.observe(photo));
    });
  });
}
let selected = storage.get("elan-package", []);
if (!Array.isArray(selected)) selected = [];
selected = selected.filter((id, i, a) =>
  typeof id === "string" && a.indexOf(id) === i &&
  catalog.some((item) => item.id === id)
);
for (const group of ["planning", "style", "experience"]) {
  const ids = catalog.filter((item) =>
    item.group === group && selected.includes(item.id)
  ).map((item) => item.id);
  if (ids.length > 1) {
    selected = selected.filter((id) => !ids.slice(1).includes(id));
  }
}
const items = () => catalog.filter((item) => selected.includes(item.id));
const total = () => items().reduce((sum, item) => sum + item.price, 0);
function estimate() {
  return "ELAN WEDDINGS — MY PACKAGE\n\n" +
    items().map((item) => item.name + " — " + money(item.price)).join("\n") +
    "\n\nEstimated total: " + money(total()) +
    "\nIllustrative starting prices. Final vendor quotes, taxes, travel and accommodation are additional. No booking has been made.";
}
function renderPackage() {
  if (!$("#package-items")) return;
  const holder = $("#package-items");
  holder.replaceChildren();
  if (!items().length) {
    const empty = document.createElement("p");
    empty.textContent =
      "Your story is a blank canvas. Select an option below to begin.";
    holder.append(empty);
  }
  items().forEach((item) => {
    const row = document.createElement("div");
    row.className = "package-row";
    const label = document.createElement("span");
    const group = document.createElement("small");
    group.textContent = item.group;
    label.append(group, document.createTextNode(item.name));
    const amount = document.createElement("span");
    amount.textContent = money(item.price);
    const remove = document.createElement("button");
    remove.className = "remove-item";
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", "Remove " + item.name);
    remove.onclick = () => {
      selected = selected.filter((id) => id !== item.id);
      persistPackage();
    };
    amount.append(remove);
    row.append(label, amount);
    holder.append(row);
  });
  $("#package-total").textContent = money(total());
  $$(".option-card").forEach((card) => {
    const active = selected.includes(card.dataset.id);
    card.classList.toggle("selected", active);
    card.setAttribute("aria-pressed", String(active));
    const item = catalog.find((i) => i.id === card.dataset.id);
    if (item) $(".card-price", card).textContent = money(item.price);
  });
  $("#request-package").disabled = !selected.length;
  $("#download-package").disabled = !selected.length;
}
function persistPackage() {
  const saved = storage.set("elan-package", selected);
  renderPackage();
  $("#save-status").textContent = saved
    ? "Your selections are saved in this browser."
    : "Browser storage is unavailable. Download your estimate to keep it.";
}
if ($("#package-items")) {
  $$(".option-card").forEach((card) =>
    card.addEventListener("click", () => {
      const id = card.dataset.id, group = card.dataset.group;
      if (selected.includes(id)) selected = selected.filter((x) => x !== id);
      else {
        if (group !== "services") {
          selected = selected.filter((x) =>
            catalog.find((i) => i.id === x)?.group !== group
          );
        }
        selected.push(id);
      }
      persistPackage();
    })
  );
  $("#clear-package").onclick = () => {
    selected = [];
    persistPackage();
  };
  $("#download-package").onclick = () =>
    download("Elan-Wedding-Estimate.txt", estimate());
  $("#request-package").onclick = () => {
    const params = new URLSearchParams({ package: selected.join(",") });
    location.href = "contact.html?" + params;
  };
  renderPackage();
}
$$("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    $$("[data-filter]").forEach((b) => {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });
    $$(".gallery-card").forEach((card) => {
      card.hidden = button.dataset.filter !== "All" &&
        card.dataset.category !== button.dataset.filter;
    });
  })
);
$$("[data-story]").forEach((button) =>
  button.addEventListener(
    "click",
    () => $("#story-" + button.dataset.story).showModal(),
  )
);
if ($("#contact-form")) {
  const query = new URLSearchParams(location.search).get("package");
  if (query !== null) {
    selected = [...new Set(query.split(","))].filter((id) =>
      catalog.some((i) => i.id === id)
    );
  }
  if (selected.length) {
    const panel = $("#contact-package");
    const title = document.createElement("h3");
    title.textContent = "My Package";
    const text = document.createElement("p");
    text.textContent = items().length + " selections · " + money(total());
    const edit = document.createElement("a");
    edit.href = "custom-service-builder.html";
    edit.textContent = "Edit your package";
    panel.append(title, text, edit);
    storage.set("elan-package", selected);
  }
  const date = $("input[type=date]");
  const now = new Date();
  date.min = now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0");
  const profile = storage.get("elan-profile", null);
  if (profile?.name) {
    $("input[name=name]", $("#contact-form")).value = profile.name;
  }
  if (profile?.email) {
    $("input[name=email]", $("#contact-form")).value = profile.email;
  }
  let enquiry = "";
  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (
      !String(data.get("name")).trim() || !String(data.get("message")).trim()
    ) {
      toast("Please enter your name and wedding vision.");
      return;
    }
    enquiry = "Hello Elan Weddings,\n\n" +
      ["name", "email", "phone", "date", "city", "guests", "message"].map(
        (key) => key.toUpperCase() + ": " + (data.get(key) || "Not decided"),
      ).join("\n") + "\n\n" + (selected.length
        ? estimate()
        : "I would like help creating my wedding package.");
    $("#send-email").href = "mailto:everafter@gmail.com?subject=" +
      encodeURIComponent("Wedding enquiry — " + data.get("name")) + "&body=" +
      encodeURIComponent(enquiry);
    $("#enquiry-result").hidden = false;
    $("#enquiry-result").scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });
  $("#contact-form").addEventListener("input", () => {
    $("#enquiry-result").hidden = true;
  });
  $("#download-enquiry").onclick = () =>
    download("Elan-Wedding-Enquiry.txt", enquiry);
}
if ($("#clear-data")) {
  $("#clear-data").onclick = () => {
    ["elan-profile", "elan-package"].forEach((k) => storage.remove(k));
    toast("Your local profile and package have been cleared.");
  };
}

// Add data-typewriter to a plain-text paragraph to reveal it as it enters view.
// Characters keep their space from the start; screen readers get the full text.
(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
  const finishers = [];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .25) {
        entry.target.dispatchEvent(new Event("start-typing"));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: [0, .25] });
  document.querySelectorAll("[data-typewriter]").forEach((element) => {
    if (element.children.length) return; // Keep rich HTML, links and buttons intact.
    const text = element.textContent.trim();
    if (!text) return;
    const accessible = document.createElement("span");
    accessible.className = "typing-accessible";
    accessible.textContent = text;
    const visual = document.createElement("span");
    visual.setAttribute("aria-hidden", "true");
    const characters = [];
    // Keep words together so wrapping stays identical throughout the animation.
    text.split(/(\s+)/).forEach((part) => {
      if (/^\s+$/.test(part)) {
        visual.append(document.createTextNode(part));
        return;
      }
      const word = document.createElement("span");
      word.className = "typing-word";
      Array.from(part).forEach((character) => {
        const span = document.createElement("span");
        span.className = "typing-character";
        span.textContent = character;
        characters.push(span);
        word.append(span);
      });
      visual.append(word);
    });
    element.replaceChildren(accessible, visual);
    let frame = 0, shown = 0, started = false, finished = false;
    const speed = Math.max(
      5,
      Math.min(100, Number(element.dataset.typeSpeed) || 16),
    );
    const duration = Math.min(8000, characters.length * speed);
    function finish() {
      finished = true;
      cancelAnimationFrame(frame);
      // Restore ordinary selectable text, with no extra spans after completion.
      element.textContent = text;
      observer.unobserve(element);
    }
    finishers.push(finish);
    element.addEventListener("start-typing", () => {
      if (started || finished) return;
      started = true;
      const start = performance.now();
      function type(now) {
        if (reducedMotion.matches) {
          finish();
          return;
        }
        const count = Math.min(
          characters.length,
          Math.floor((now - start) / duration * characters.length),
        );
        if (shown) characters[shown - 1].classList.remove("typing-cursor");
        while (shown < count) characters[shown++].classList.add("typed");
        if (shown === characters.length) {
          finish();
          return;
        }
        if (shown) characters[shown - 1].classList.add("typing-cursor");
        frame = requestAnimationFrame(type);
      }
      frame = requestAnimationFrame(type);
    }, { once: true });
    introHandoff.then(() => {
      if (!finished) observer.observe(element);
    });
  });
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) finishers.forEach((finish) => finish());
  });
})();

function updateAccountLinks() {
  const profile = storage.get("elan-profile", null);
  $$("[data-account-link]").forEach((link) => {
    link.textContent = profile?.name ? "Profile" : "Log in / Sign up";
    link.href = profile?.name ? "profile.html" : "login.html";
  });
}
function renderProfilePage() {
  if (!$("#profile-details")) return;
  const profile = storage.get("elan-profile", null);
  const active = !!profile?.name;
  $("#profile-empty").hidden = active;
  $("#profile-details").hidden = !active;
  if (!active) return;
  $("#profile-name").textContent = "Welcome, " + profile.name + ".";
  $("#profile-initial").textContent = profile.name.charAt(0).toUpperCase();
  $("#profile-full-name").textContent = profile.name;
  $("#profile-email-value").textContent = profile.email || "Not provided";
}
updateAccountLinks();
renderProfilePage();
if (document.body.dataset.page === "login.html") {
  showAuthProfile(storage.get("elan-profile", null));
}
if ($("#profile-logout")) {
  $("#profile-logout").addEventListener("click", () => {
    storage.remove("elan-profile");
    updateAccountLinks();
    renderProfilePage();
    toast("Your demo profile has been cleared.");
  });
}
