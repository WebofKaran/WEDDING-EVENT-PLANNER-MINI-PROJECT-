"use strict";
function toggleItem(id) {
  const item = catalog.find(entry => entry.id === id);
  if (selected.includes(id)) selected = selected.filter(key => key !== id);
  else {
    if (item.group !== "services") selected = selected.filter(key => catalog.find(entry => entry.id === key).group !== item.group);
    selected.push(id);
  }
  save();
}
function save() {
  const saved = storage.set("elan-package", selected);
  $("#save-status").textContent = saved ? "Your selections are saved in this browser." : "Download your estimate to keep it.";
  render();
}
function render() {
  const holder = $("#package-items");
  holder.replaceChildren();
  if (!selected.length) holder.textContent = "Your story is a blank canvas. Select an option below to begin.";
  for (const item of items()) {
    const row = document.createElement("div");
    row.className = "package-row";
    row.innerHTML = "<span><small></small></span><span><button type='button' class='remove-item'>×</button></span>";
    $("small", row).textContent = item.group;
    row.firstChild.append(item.name);
    row.lastChild.prepend(money(item.price));
    $("button", row).setAttribute("aria-label", "Remove " + item.name);
    $("button", row).onclick = () => toggleItem(item.id);
    holder.append(row);
  }
  $$(".option-card").forEach(card => {
    const active = selected.includes(card.dataset.id);
    card.classList.toggle("selected", active);
    card.setAttribute("aria-pressed", String(active));
    $(".card-price", card).textContent = money(catalog.find(item => item.id === card.dataset.id).price);
  });
  $("#package-total").textContent = money(total());
  $("#request-package").disabled = $("#download-package").disabled = !selected.length;
}
$$(".option-card").forEach(card => card.onclick = () => toggleItem(card.dataset.id));
$("#clear-package").onclick = () => { selected = []; save(); };
$("#download-package").onclick = () => download("Elan-Wedding-Estimate.txt", estimate());
$("#request-package").onclick = () => location.href = "contact.html?" + new URLSearchParams({package: selected.join(",")});
render();
