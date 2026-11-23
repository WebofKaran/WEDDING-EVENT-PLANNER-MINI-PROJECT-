"use strict";
let authMode = "signup";
function setAuthMode(mode) {
  authMode = mode;
  $("#login-form").reset();
  $("#auth-password").type = "password";
  $("#login-status").textContent = "";
  $("#toggle-password").textContent = "Show";
  $("#toggle-password").setAttribute("aria-pressed", "false");
  $("#auth-name-field").hidden = mode === "login";
  $("#auth-name").required = mode === "signup";
  $("#auth-submit").textContent = mode === "signup" ? "Create Demo Profile" : "Log In to Demo";
  $("#login-title").textContent = mode === "signup" ? "Your forever starts here." : "Welcome back.";
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
  if (active) {
    $("#login-title").textContent = "Welcome, " + profile.name + ".";
    $("#profile-email").textContent = profile.email || "Local demo profile";
  } else setAuthMode("signup");
}
$$(".auth-mode").forEach((button) => button.addEventListener("click", () => setAuthMode(button.dataset.mode)));
$("#toggle-password").addEventListener("click", () => {
  const show = $("#auth-password").type === "password";
  $("#auth-password").type = show ? "text" : "password";
  $("#toggle-password").textContent = show ? "Hide" : "Show";
  $("#toggle-password").setAttribute("aria-pressed", String(show));
});
$("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#auth-email").value.trim();
  const name = authMode === "signup" ? $("#auth-name").value.trim() : email.split("@")[0];
  if (!name) {
    $("#login-status").textContent = "Please enter your name.";
    return $("#auth-name").focus();
  }
  const saved = storage.set("elan-profile", { name, email });
  $("#login-status").textContent = "";
  $("#login-form").reset();
  $("#auth-password").type = "password";
  showAuthProfile({ name, email });
  updateAccountLinks();
  if (saved) location.href = "profile.html";
  else $("#login-status").textContent = "Demo profile ready for this visit. Browser storage is unavailable.";
});
$("#logout").addEventListener("click", () => {
  storage.remove("elan-profile");
  updateAccountLinks();
  showAuthProfile(null);
  $("#login-status").textContent = "Logged out. Your local demo profile has been cleared.";
});
showAuthProfile(storage.get("elan-profile", null));
