/* =========================================================
   TRAVEL WEBSITE — polished interactions and bug fixes
   Works with the original HTML and local Swiper/ScrollReveal files.
========================================================= */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const navMenu = $("#nav-menu") || $("#nav_manu");
  const navToggle = $("#nav-toggle");
  const navClose = $("#nav-close") || $("#nav_close");
  const header = $("#header");
  const themeButton = $("#theme-button");
  const video = $("#video-file");
  const videoButton = $("#video-button");
  const videoIcon = $("#video-icon");
  const scrollUp = $("#scroll-up");

  // Toast feedback
  function toast(message, type = "success") {
    let region = $("#travel-toast-region");
    if (!region) {
      region = document.createElement("div");
      region.id = "travel-toast-region";
      region.setAttribute("aria-live", "polite");
      region.className = "travel-toast-region";
      document.body.appendChild(region);
    }
    const item = document.createElement("div");
    item.className = `travel-toast travel-toast--${type}`;
    item.textContent = message;
    region.appendChild(item);
    requestAnimationFrame(() => item.classList.add("is-visible"));
    window.setTimeout(() => {
      item.classList.remove("is-visible");
      window.setTimeout(() => item.remove(), 300);
    }, 3200);
  }

  // Mobile menu — consistent IDs, keyboard support, and accessible state.
  const setMenuOpen = open => {
    navMenu?.classList.toggle("show-menu", open);
    navToggle?.setAttribute("aria-expanded", String(open));
    navToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", open && window.matchMedia("(max-width: 767px)").matches);
  };
  const closeMenu = () => setMenuOpen(false);
  navToggle?.addEventListener("click", () => setMenuOpen(!navMenu?.classList.contains("show-menu")));
  navToggle?.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMenuOpen(!navMenu?.classList.contains("show-menu")); }
  });
  navClose?.addEventListener("click", closeMenu);
  $$(".nav_link").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", e => {
    if (window.matchMedia("(max-width: 767px)").matches && navMenu?.classList.contains("show-menu") &&
        !navMenu.contains(e.target) && !navToggle?.contains(e.target)) closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) closeMenu();
  }, { passive: true });

  // Header, scroll progress and back-to-top
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header?.classList.toggle("scroll-header", y >= 80);
      scrollUp?.classList.toggle("show-scroll", y >= 300);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = $("#travel-scroll-progress");
      if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      let current = "";
      const sections = document.querySelectorAll("section[id]");
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 150) current = section.id;
      }
      for (const link of document.querySelectorAll(".nav_link")) {
        const active = link.getAttribute("href") === `#${current}`;
        if (link.classList.contains("active-link") !== active) link.classList.toggle("active-link", active);
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  scrollUp?.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const progress = document.createElement("div");
  progress.id = "travel-scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  // Dark/light theme, with safe storage access
  const applyTheme = mode => {
    document.body.classList.toggle("dark-theme", mode === "dark");
    if (themeButton) {
      themeButton.classList.toggle("ri-sun-line", mode === "dark");
      themeButton.classList.toggle("ri-moon-line", mode !== "dark");
      themeButton.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
      themeButton.setAttribute("role", "button");
      themeButton.setAttribute("tabindex", "0");
    }
  };
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem("selected-theme") || "light"; } catch (_) {}
  applyTheme(savedTheme);
  function toggleTheme() {
    const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("selected-theme", next); } catch (_) {}
  }
  themeButton?.addEventListener("click", toggleTheme);
  themeButton?.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleTheme(); }
  });

  // Swiper destination carousel
  if (typeof window.Swiper === "function" && $(".discover_container")) {
    new Swiper(".discover_container", {
      effect: "slide",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 20,
      watchSlidesProgress: true,
      keyboard: { enabled: true },
      breakpoints: { 640: { spaceBetween: 28 } }
    });
  }

  // Video play/pause button
  function syncVideoIcon() {
    if (!videoIcon || !video) return;
    videoIcon.classList.toggle("ri-play-line", video.paused || video.ended);
    videoIcon.classList.toggle("ri-pause-line", !video.paused && !video.ended);
    videoButton?.setAttribute("aria-label", video.paused ? "Play travel video" : "Pause travel video");
  }
  videoButton?.addEventListener("click", async () => {
    if (!video) return;
    try {
      if (video.paused) await video.play();
      else video.pause();
    } catch (_) { toast("Add your travel video file to assets/video/ to play it.", "error"); }
    syncVideoIcon();
  });
  video?.addEventListener("play", syncVideoIcon);
  video?.addEventListener("pause", syncVideoIcon);
  video?.addEventListener("ended", syncVideoIcon);
  syncVideoIcon();

  // Scroll reveal (guarded if library is absent)
  if (typeof window.ScrollReveal === "function") {
    const sr = ScrollReveal({ distance: "14px", duration: 420, easing: "ease-out", interval: 35, reset: false, viewFactor: 0.08 });
    sr.reveal(".home_data, .home_social-link, .home_info, .section_title", { origin: "top" });
    sr.reveal(".about_data, .video_description, .subscribe_description", { origin: "left" });
    sr.reveal(".about_img-overlay, .video_content, .subscribe_form", { origin: "right", interval: 120 });
    sr.reveal(".discover_card, .experience_data, .place_card, .sponsor_content1, .sponsor_content2, .sponsor_content3, .sponsor_content4, .sponsor_content5", { origin: "bottom", interval: 100 });
  }

  // Add favorites and booking actions to destination cards
  $$(".place_card").forEach(card => {
    const title = $(".place_title", card)?.textContent.trim() || "your destination";
    const priceText = $(".place_price", card)?.textContent.trim() || "$0";
    const action = $(".place_button", card);
    if (action) {
      action.type = "button";
      action.setAttribute("aria-label", `Plan a trip to ${title}`);
      action.addEventListener("click", () => openBooking(title, priceText));
    }
    if (!$(".place_favorite", card)) {
      const fav = document.createElement("button");
      fav.className = "place_favorite";
      fav.type = "button";
      fav.innerHTML = '<i class="ri-heart-line" aria-hidden="true"></i>';
      fav.setAttribute("aria-label", `Save ${title} to favorites`);
      fav.addEventListener("click", () => {
        const active = fav.classList.toggle("is-favorite");
        fav.innerHTML = `<i class="${active ? "ri-heart-fill" : "ri-heart-line"}" aria-hidden="true"></i>`;
        fav.setAttribute("aria-label", `${active ? "Remove" : "Save"} ${title} ${active ? "from" : "to"} favorites`);
        try {
          const list = JSON.parse(localStorage.getItem("travel-favorites") || "[]");
          const updated = active ? [...new Set([...list, title])] : list.filter(x => x !== title);
          localStorage.setItem("travel-favorites", JSON.stringify(updated));
        } catch (_) {}
        toast(active ? `${title} saved to your favorites.` : `${title} removed from favorites.`);
      });
      const titleText = title;
      try {
        const list = JSON.parse(localStorage.getItem("travel-favorites") || "[]");
        if (list.includes(titleText)) {
          fav.classList.add("is-favorite");
          fav.innerHTML = '<i class="ri-heart-fill" aria-hidden="true"></i>';
        }
      } catch (_) {}
      card.appendChild(fav);
    }
  });

  // Booking modal: front-end demo only (no payment/server booking)
  let modal;
  function openBooking(destination = "Sri Lanka", price = "$0") {
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "travel-modal";
      modal.innerHTML = `
        <div class="travel-modal__backdrop" data-close></div>
        <section class="travel-modal__panel" role="dialog" aria-modal="true" aria-labelledby="travel-booking-title">
          <button class="travel-modal__close" type="button" aria-label="Close booking form" data-close><i class="ri-close-line"></i></button>
          <span class="travel-modal__eyebrow">YOUR NEXT ADVENTURE</span>
          <h2 id="travel-booking-title">Plan your trip</h2>
          <p class="travel-modal__hint">Create a quick estimate for your getaway.</p>
          <form id="travel-booking-form">
            <label>Destination<input name="destination" required /></label>
            <div class="travel-modal__row">
              <label>Departure date<input type="date" name="date" required /></label>
              <label>Travelers<select name="travelers"><option value="1">1 traveler</option><option value="2" selected>2 travelers</option><option value="3">3 travelers</option><option value="4">4 travelers</option><option value="5">5 travelers</option><option value="6">6 travelers</option></select></label>
            </div>
            <label>Estimated price per person (USD)<input name="price" type="number" min="0" step="1" required /></label>
            <div class="travel-modal__estimate">Estimated total <strong id="travel-estimate">$0</strong></div>
            <button class="button travel-modal__submit" type="submit">Save trip plan <i class="ri-arrow-right-line"></i></button>
            <p class="travel-modal__fineprint">Demo only — this form does not make a real reservation or payment.</p>
          </form>
        </section>`;
      document.body.appendChild(modal);
      modal.addEventListener("click", e => {
        if (e.target.closest("[data-close]")) closeBooking();
      });
      $("#travel-booking-form", modal).addEventListener("input", updateEstimate);
      $("#travel-booking-form", modal).addEventListener("submit", e => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const plan = {
          destination: data.get("destination"),
          date: data.get("date"),
          travelers: Number(data.get("travelers")),
          pricePerPerson: Number(data.get("price")),
          savedAt: new Date().toISOString()
        };
        try {
          const plans = JSON.parse(localStorage.getItem("travel-trip-plans") || "[]");
          plans.push(plan);
          localStorage.setItem("travel-trip-plans", JSON.stringify(plans));
          closeBooking();
          toast(`Trip plan for ${plan.destination} saved on this device.`);
        } catch (_) { toast("Your browser could not save this trip plan.", "error"); }
      });
    }
    const form = $("#travel-booking-form", modal);
    form.elements.destination.value = destination;
    form.elements.price.value = Number(String(price).replace(/[^0-9.]/g, "")) || 0;
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    form.elements.date.min = localDate;
    if (!form.elements.date.value || form.elements.date.value < localDate) form.elements.date.value = localDate;
    updateEstimate();
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    setTimeout(() => form.elements.date.focus({ preventScroll: true }), 50);
  }
  function closeBooking() {
    modal?.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }
  function updateEstimate() {
    if (!modal) return;
    const form = $("#travel-booking-form", modal);
    const price = Math.max(0, Number(form.elements.price.value) || 0);
    const travelers = Number(form.elements.travelers.value) || 1;
    $("#travel-estimate", modal).textContent = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price * travelers);
  }
  $$(".js-book-trigger").forEach(link => link.addEventListener("click", e => {
    e.preventDefault();
    openBooking("Sri Lanka", "$1399");
  }));

  // Newsletter validation and local demo subscription
  const newsletter = $(".subscribe_form");
  newsletter?.addEventListener("submit", e => {
    e.preventDefault();
    const input = $(".subscribe_input", newsletter) || $("input[type=email]", newsletter);
    const email = input?.value.trim() || "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input?.setAttribute("aria-invalid", "true");
      toast("Please enter a valid email address.", "error");
      input?.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    try {
      const emails = JSON.parse(localStorage.getItem("travel-newsletter-emails") || "[]");
      if (emails.includes(email.toLowerCase())) toast("This email is already subscribed.");
      else {
        emails.push(email.toLowerCase());
        localStorage.setItem("travel-newsletter-emails", JSON.stringify(emails));
        toast("Thanks for subscribing! Your email is saved in this browser.");
      }
    } catch (_) { toast("Subscription demo could not save your email.", "error"); }
    newsletter.reset();
  });
  const emailInput = $(".subscribe_input");
  if (emailInput) emailInput.type = "email";
  const subscribeButton = $(".subscribe_form button");
  if (subscribeButton) subscribeButton.type = "submit";

  // Prevent placeholder links from jumping to the top
  $$('a[href=""]').forEach(a => a.addEventListener("click", e => e.preventDefault()));
})();
