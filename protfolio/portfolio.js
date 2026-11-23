"use strict";


$$("[data-close]").forEach((b) => 
  b.addEventListener("click", () => b.closest("dialog").close())
);


$$("dialog").forEach((d) => 
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        d.close();
      }
    }
  })
);


$$("[data-filter]").forEach((button) => 
  button.addEventListener("click", () => {
    
    $$("[data-filter]").forEach((b) => {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });

    
    $$(".gallery-card").forEach((card) => {
      card.hidden = button.dataset.filter !== "All" && card.dataset.category !== button.dataset.filter;
    });
  })
);


$$("[data-story]").forEach((button) => 
  button.addEventListener("click", () => $("#story-" + button.dataset.story).showModal())
);