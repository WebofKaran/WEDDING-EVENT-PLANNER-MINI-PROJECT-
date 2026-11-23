"use strict";
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
renderProfilePage();
$("#profile-logout")?.addEventListener("click", () => {
    storage.remove("elan-profile");
    updateAccountLinks();
    renderProfilePage();
    toast("Your demo profile has been cleared.");
});
