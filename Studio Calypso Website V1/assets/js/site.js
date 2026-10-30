/* =========================================================
   Studio Calypso — site settings
   Change these values and they update across every page.
   ========================================================= */
const STUDIO = {
  leadTime: "10–12 weeks",            // current waiting time for new commissions
  workshopLead: "3–4 weeks",          // how far ahead workshops usually book up
  email: "hello@studiocalypso.co.za", // where enquiries go
  // Optional: paste a form-service URL (e.g. https://formspree.io/f/xxxx) to receive
  // enquiries automatically. Left empty, forms open the visitor's email app instead.
  formEndpoint: ""
};

/* ---------- Shared text ---------- */
document.querySelectorAll("[data-studio]").forEach((el) => {
  const value = STUDIO[el.dataset.studio];
  if (value) el.textContent = value;
});
document.querySelectorAll("[data-studio-email]").forEach((a) => {
  a.href = "mailto:" + STUDIO.email;
  a.textContent = STUDIO.email;
});
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Header ---------- */
const header = document.querySelector(".site-header");
const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const toggle = document.querySelector(".menu-toggle");
const setNav = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
};
if (toggle) {
  toggle.addEventListener("click", () => setNav(toggle.getAttribute("aria-expanded") !== "true"));
  document.getElementById("site-nav").addEventListener("click", (e) => {
    if (e.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
  });
}

/* ---------- Scroll reveal ---------- */
const revealables = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Pre-fill the enquiry form from links ----------
   e.g. consult.html?type=workshop&about=Silver%20Jewellery%20Workshop */
const enquiry = document.getElementById("enquiry-form");
if (enquiry) {
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  const about = params.get("about");
  if (type && enquiry.elements.type.querySelector(`option[value="${type}"]`)) {
    enquiry.elements.type.value = type;
  }
  if (about && !enquiry.elements.message.value) {
    enquiry.elements.message.value = type === "piece"
      ? `I'm interested in the ${about}. `
      : `I'd like to book the ${about}. `;
  }
}

/* ---------- Form sending ---------- */
const labelFor = (form, field) => {
  const label = field.id && form.querySelector(`label[for="${field.id}"]`);
  return label ? label.firstChild.textContent.trim() : field.name;
};

document.querySelectorAll("form[data-form]").forEach((form) => {
  const status = form.querySelector(".form-status") || form.parentElement.querySelector(".form-status");
  const say = (msg, isError) => {
    status.textContent = msg;
    status.classList.toggle("is-error", Boolean(isError));
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const isSignup = form.dataset.form === "signup";
    const typeField = form.elements.type;
    const subject = isSignup
      ? "Studio list sign-up (10% off)"
      : "Website enquiry: " + (typeField ? typeField.options[typeField.selectedIndex].text : "General");

    if (STUDIO.formEndpoint) {
      say("Sending…");
      try {
        const data = new FormData(form);
        data.append("_subject", subject);
        const res = await fetch(STUDIO.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        say(isSignup
          ? "Welcome to the list — your 10% code is on its way to your inbox."
          : "Thank you — your enquiry is in. Hestelle will be in touch within two working days.");
      } catch (err) {
        say(`Sorry, something went wrong. Please email ${STUDIO.email} instead.`, true);
      }
      return;
    }

    // No form service set up yet: open the visitor's email app with everything filled in.
    const lines = [...form.elements]
      .filter((f) => f.name && f.value && f.type !== "submit")
      .map((f) => `${labelFor(form, f)}: ${f.tagName === "SELECT" ? f.options[f.selectedIndex].text : f.value}`);
    const body = isSignup ? "Please add me to the Studio Calypso list.\n\n" + lines.join("\n") : lines.join("\n");
    window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    say("Your email app should open with your message ready to send.");
  });
});
