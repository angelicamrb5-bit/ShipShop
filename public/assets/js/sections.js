/* Shared marketing sections: BenefitStrip, WaysToShop, Carousel, ClubSignup, collections. */
(function () {
  var S = window.SHOP, CAT = window.CATALOG, UI = window.UI;

  // Named collections used by Home tabs, menus and /category.
  function collection(id) {
    var all = CAT.products.slice();
    var c = CAT.category(id);
    if (c) return { title: c.name, items: all.filter(function (p) { return p.category === id; }), crumb: c.world === "fashion" ? "Fashion" : "Home & More" };
    var map = {
      fashion: { title: "Fashion", f: function (p) { return p.world === "fashion"; } },
      home: { title: "Home & More", f: function (p) { return p.world === "home"; } },
      "new": { title: "New in", f: function (p) { return p.isNew; } },
      sale: { title: "Sale", f: function (p) { return !!p.compareAtPrice; } },
      "best-sellers": { title: "Best sellers", f: function (p) { return p.bestSeller; } },
      "under-5000": { title: "Under GY$ 5,000", f: function (p) { return p.price < 5000; } },
      "back-in-stock": { title: "Back in stock", f: function (p) { return p.backInStock; } },
    };
    map[CAT.season.id] = { title: CAT.season.title, f: function (p) { return CAT.season.slugs.indexOf(p.slug) > -1; } };
    var m = map[id];
    if (!m) return null;
    return { title: m.title, items: all.filter(m.f) };
  }

  function benefitsHTML() {
    var items = [
      ["truck", "Fast delivery", "Georgetown 24–48h", "/how-to-order#delivery"],
      ["wallet", "Pay with MMG or Cash on Delivery", "Or card, the way you prefer", "/how-to-order#payment"],
      ["chat", "Real people on WhatsApp", "Ask about sizes, colors or gifts", "/how-to-order#ordering"],
      ["returns", "Easy returns", S.returns, "/how-to-order#returns"],
    ];
    return items.map(function (b) {
      return '<li><a class="benefit" href="' + b[3] + '">' + UI.icon(b[0]) + '<span><span class="benefit__title">' + b[1] + '</span><br><span class="benefit__text">' + UI.esc(b[2]) + "</span></span></a></li>";
    }).join("");
  }

  function waysHTML(detailed) {
    var hours = S.store.hours.map(function (h) { return h[0] + " " + h[1]; }).join(" · ");
    var web = '<article class="way">' + UI.icon("globe") + "<h3>Website</h3><p>Browse, add to your bag and check out as a guest in one page.</p>" +
      (detailed ? "<ol><li>Choose your size and color, then tap “Add to bag”.</li><li>Tap “Checkout” and fill in one short page — no account needed.</li><li>Pay with MMG, cash on delivery or card. We confirm on WhatsApp " + S.confirmTime + ".</li></ol>" : "") +
      '<a class="text-link" href="/category?c=new">Shop new arrivals ' + UI.icon("chevronRight") + "</a></article>";
    var wa = '<article class="way">' + UI.icon("chat") + "<h3>WhatsApp</h3><p>Send us a product link or a photo and we’ll take your order in the chat.</p>" +
      (detailed ? "<ol><li>Tap “Order on WhatsApp” on any product, or send us a photo.</li><li>We confirm size, color, price and delivery for your area.</li><li>Pay with MMG or cash on delivery. Done.</li></ol>" : "") +
      '<a class="wa-text" href="' + UI.waUrl(UI.WA.help(false)) + '" target="_blank" rel="noopener">' + UI.waGlyph() + '<span class="u">Chat with us on WhatsApp</span></a></article>';
    var visit = '<article class="way">' + UI.icon("store") + "<h3>Visit our store</h3><p>" + UI.esc(S.store.address) + "<br>" + UI.esc(hours) + "</p>" +
      (detailed ? "<ol><li>Come by and try things on.</li><li>Or order online and choose “Store pickup” — it’s free and ready the same day.</li></ol>" : "") +
      '<a class="text-link" href="' + S.store.mapsUrl + '" target="_blank" rel="noopener">Get directions ' + UI.icon("chevronRight") + "</a></article>";
    return web + wa + visit;
  }

  function wireCarousels() {
    document.querySelectorAll("[data-carousel-prev],[data-carousel-next]").forEach(function (b) {
      var prev = b.hasAttribute("data-carousel-prev");
      var track = document.getElementById(b.getAttribute(prev ? "data-carousel-prev" : "data-carousel-next"));
      if (!track) return;
      b.innerHTML = UI.icon(prev ? "chevronLeft" : "chevronRight");
      b.addEventListener("click", function () {
        track.scrollBy({ left: (prev ? -1 : 1) * track.clientWidth * 0.9, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      });
      function sync() {
        var max = track.scrollWidth - track.clientWidth - 4;
        b.disabled = prev ? track.scrollLeft <= 4 : track.scrollLeft >= max;
      }
      track.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      setTimeout(sync, 50);
    });
  }

  function wireClub(form) {
    if (!form) return;
    var field = form.querySelector(".field"), input = form.querySelector("input[name=contact]"), err = form.querySelector(".error-msg");
    var consent = form.querySelector("input[name=consent]"), ok = form.querySelector(".success-note");
    function check() {
      var v = input.value.trim(), digits = v.replace(/\D/g, "");
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || (digits.length === 7 || (digits.length === 10 && digits.indexOf("592") === 0));
      field.classList.toggle("has-error", !valid);
      input.setAttribute("aria-invalid", !valid);
      if (!valid) err.innerHTML = UI.icon("alert") + "<span>Enter an email or a 7-digit WhatsApp number, like 600 0000.</span>";
      return valid;
    }
    input.addEventListener("blur", function () { if (input.value) check(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!check()) { input.focus(); return; }
      if (!consent.checked) {
        field.classList.add("has-error");
        err.innerHTML = UI.icon("alert") + "<span>Tick the box so we can send you the offer.</span>";
        consent.focus();
        return;
      }
      var payload = { contact: input.value.trim(), date: new Date().toISOString() };
      if (S.clubEndpoint) {
        fetch(S.clubEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(function () {});
      }
      UI.store("club", payload);
      ok.hidden = false;
      ok.innerHTML = UI.icon("check") + "<span>You’re in! We’ll send your 10% code on WhatsApp or by email.</span>";
      form.querySelector("button[type=submit]").disabled = true;
    });
  }

  window.SECTIONS = { collection: collection, benefitsHTML: benefitsHTML, waysHTML: waysHTML, wireCarousels: wireCarousels, wireClub: wireClub };
})();
