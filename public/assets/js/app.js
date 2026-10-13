/* ShipShop shared UI: AnnouncementBar, Header, MegaMenu / MobileMenu, CartDrawer, Footer,
   WhatsAppCTA, ProductCard, bag + wishlist stores, GYD formatter. Component names follow the guide. */
(function () {
  var S = window.SHOP, CAT = window.CATALOG;

  /* ---------- Utilities ---------- */
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // The one GYD formatter: integers, comma thousands, no decimals, non-breaking space.
  function money(n) { return "GY$ " + Math.round(n).toLocaleString("en-US"); }
  function moneyPlain(n) { return "GY$ " + Math.round(n).toLocaleString("en-US"); }
  function qs(name) { return new URLSearchParams(location.search).get(name); }
  function store(key, val) {
    try {
      if (val === undefined) { var raw = localStorage.getItem("shipshop." + key); return raw ? JSON.parse(raw) : null; }
      localStorage.setItem("shipshop." + key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  var ICONS = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    chevronLeft: '<path d="M15 6l-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    truck: '<path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3.5V16h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14.5h2"/>',
    chat: '<path d="M4 18.5V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H8z"/><path d="M8.5 9h7M8.5 12.5h4.5"/>',
    returns: '<path d="M9 14l-5-5 5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    pin: '<path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.3"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    star: '<path d="M12 3.8l2.5 5.2 5.6.7-4.1 3.9 1 5.6L12 16.5l-5 2.7 1-5.6-4.1-3.9 5.6-.7z"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.2v.3"/>',
    store: '<path d="M4 9.5L5.5 4h13L20 9.5"/><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5.5 11.5V20h13v-8.5M10 20v-5h4v5"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.3 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.3-3.5-8.5s1-6 3.5-8.5z"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18M12 9v11M12 9c-1.5-3.5-5.5-4-5.5-1.5S10 9 12 9zm0 0c1.5-3.5 5.5-4 5.5-1.5S14 9 12 9z"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z"/>',
  };
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || "") + "</svg>";
  }
  // WhatsApp glyph — used only inside WhatsApp elements.
  function waGlyph(cls) {
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.2A9.7 9.7 0 0 0 3.7 16.9L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7c-1.5 0-3-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 3.9 3.5 1.5.6 2 .7 2.8.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.2z"/></svg>';
  }

  /* ---------- WhatsApp ---------- */
  function waUrl(message) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(message); }
  var WA = {
    help: function (withPage) {
      return "Hi! I have a question about ShipShop." + (withPage ? "\n" + location.href : "");
    },
    product: function (p, v, size) {
      var url = location.origin + "/product?p=" + p.slug;
      return "Hi! I'd like to order:\n• " + p.name + "\n• Color: " + (v ? v.color : "") + " · Size: " + (size || "not sure yet") +
        "\n• Price: " + moneyPlain(p.price) + "\n" + url;
    },
    bag: function (lines, zoneName) {
      var out = "Hi! I'd like to order these items:\n";
      lines.forEach(function (l, i) {
        out += (i + 1) + ". " + l.product.name + " · " + l.variant.color + " / " + l.variant.size + " · x" + l.qty + " · " + moneyPlain(l.lineTotal) + "\n";
      });
      out += "Subtotal: " + moneyPlain(Bag.subtotal()) + "\nDelivery to: " + (zoneName || "I'll share my area");
      return out;
    },
    order: function (id) { return "Hi! I'm checking on my order #" + id + "."; },
  };

  /* ---------- Delivery ---------- */
  function zone(id) { return S.zones.filter(function (z) { return z.id === id; })[0]; }
  function deliveryFee(type, zoneId, subtotal) {
    if (type === "pickup") return 0;
    var z = zone(zoneId);
    if (!z) return null;
    if (z.id === S.freeDelivery.zone && subtotal >= S.freeDelivery.threshold) return 0;
    return z.fee; // null = confirmed on WhatsApp
  }

  /* ---------- Bag store ---------- */
  var Bag = {
    items: function () { return (store("bag") || []).filter(function (i) { return CAT.variant(i.variantId); }); },
    save: function (items) { store("bag", items); document.dispatchEvent(new CustomEvent("bag:change")); },
    add: function (variantId, qty) {
      var items = Bag.items(), found = items.filter(function (i) { return i.variantId === variantId; })[0];
      var stock = CAT.variant(variantId).variant.stock;
      if (found) found.qty = Math.min(stock, found.qty + (qty || 1));
      else items.push({ variantId: variantId, qty: Math.min(stock, qty || 1) });
      Bag.save(items);
    },
    setQty: function (variantId, qty) {
      var items = Bag.items();
      items.forEach(function (i) { if (i.variantId === variantId) i.qty = Math.max(1, Math.min(CAT.variant(variantId).variant.stock, qty)); });
      Bag.save(items);
    },
    remove: function (variantId) { Bag.save(Bag.items().filter(function (i) { return i.variantId !== variantId; })); },
    clear: function () { Bag.save([]); },
    lines: function () {
      return Bag.items().map(function (i) {
        var r = CAT.variant(i.variantId);
        return { variantId: i.variantId, product: r.product, variant: r.variant, qty: i.qty, lineTotal: r.product.price * i.qty };
      });
    },
    count: function () { return Bag.items().reduce(function (n, i) { return n + i.qty; }, 0); },
    subtotal: function () { return Bag.lines().reduce(function (n, l) { return n + l.lineTotal; }, 0); },
  };

  var Wish = {
    list: function () { return store("wishlist") || []; },
    has: function (slug) { return Wish.list().indexOf(slug) > -1; },
    toggle: function (slug) {
      var l = Wish.list(), i = l.indexOf(slug);
      if (i > -1) l.splice(i, 1); else l.push(slug);
      store("wishlist", l);
      return i === -1;
    },
  };

  /* ---------- Shared pieces ---------- */
  function placeholder(desc, ratio, extra) {
    return '<div class="ph ph--' + (ratio || "4x5") + " " + (extra || "") + '" role="img" aria-label="' + esc(desc) + '"><span class="ph__label" aria-hidden="true">[PRODUCT PHOTO: ' + esc(desc) + "]</span></div>";
  }
  function stars(rating) {
    var out = '<span class="stars" aria-hidden="true">';
    for (var i = 1; i <= 5; i++) out += '<span class="star' + (rating >= i - 0.25 ? " is-on" : "") + '">' + icon("star") + "</span>";
    return out + "</span>";
  }
  function percentOff(p) { return p.compareAtPrice ? Math.round((1 - p.price / p.compareAtPrice) * 100) : 0; }
  function priceHTML(p, cls) {
    if (p.compareAtPrice) {
      return '<p class="price-row ' + (cls || "") + '"><span class="price price--sale"><span class="sr-only">Sale price </span>' + money(p.price) +
        '</span> <s class="price price--was"><span class="sr-only">Was </span>' + money(p.compareAtPrice) + "</s></p>";
    }
    return '<p class="price-row ' + (cls || "") + '"><span class="price">' + money(p.price) + "</span></p>";
  }
  function inStock(p) { return p.variants.some(function (v) { return v.stock > 0; }); }
  function colorsOf(p) {
    var seen = {}, out = [];
    p.variants.forEach(function (v) { if (!seen[v.color]) { seen[v.color] = 1; out.push({ name: v.color, hex: v.colorHex }); } });
    return out;
  }
  function sizesOf(p) {
    var seen = {}, out = [];
    p.variants.forEach(function (v) { if (!seen[v.size]) { seen[v.size] = 1; out.push(v.size); } });
    return out;
  }

  // ProductCard — whole card is one link; wishlist heart is a separate button; max one badge.
  function productCard(p) {
    var badge = "";
    if (!inStock(p)) badge = '<span class="badge badge--muted">Out of stock</span>';
    else if (p.compareAtPrice) badge = '<span class="badge badge--sale">-' + percentOff(p) + "%</span>";
    else if (p.isNew) badge = '<span class="badge badge--new">New</span>';
    else if (p.badges.indexOf("low-stock") > -1) badge = '<span class="badge badge--low">Low stock</span>';
    var cols = colorsOf(p), sw = "";
    if (cols.length > 1) {
      sw = '<p class="card__swatches"><span class="sr-only">' + cols.length + " colors</span>";
      cols.slice(0, 4).forEach(function (c) { sw += '<span class="dot" style="background:' + c.hex + '" aria-hidden="true"></span>'; });
      if (cols.length > 4) sw += '<span class="card__more" aria-hidden="true">+' + (cols.length - 4) + "</span>";
      sw += "</p>";
    }
    var saved = Wish.has(p.slug);
    return '<article class="card">' +
      '<a class="card__link" href="/product?p=' + p.slug + '">' +
      '<div class="card__media">' + placeholder(p.images[0], "4x5") + badge + "</div>" +
      '<h3 class="card__name">' + esc(p.name) + "</h3>" + priceHTML(p, "card__price") + sw + "</a>" +
      '<button class="card__wish wish-btn" type="button" data-wish="' + p.slug + '" aria-pressed="' + saved + '" aria-label="Save ' + esc(p.name) + ' to wishlist">' + icon("heart") + "</button>" +
      "</article>";
  }

  /* ---------- Layers: drawers, sheets, dialogs ---------- */
  var openStack = [];
  function focusables(el) {
    return Array.prototype.slice.call(el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'))
      .filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
  }
  function openLayer(el, trigger) {
    el.hidden = false;
    el._trigger = trigger || document.activeElement;
    document.body.classList.add("has-layer");
    requestAnimationFrame(function () { el.classList.add("is-open"); });
    openStack.push(el);
    var f = el.querySelector("[data-autofocus]") || focusables(el)[0];
    if (f) setTimeout(function () { f.focus(); }, 30);
    if (el._trigger && el._trigger.setAttribute && el._trigger.hasAttribute("aria-expanded")) el._trigger.setAttribute("aria-expanded", "true");
  }
  function closeLayer(el) {
    if (!el || el.hidden) return;
    el.classList.remove("is-open");
    openStack = openStack.filter(function (x) { return x !== el; });
    if (!openStack.length) document.body.classList.remove("has-layer");
    var dur = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
    setTimeout(function () { el.hidden = true; }, dur);
    if (el._trigger) {
      if (el._trigger.hasAttribute && el._trigger.hasAttribute("aria-expanded")) el._trigger.setAttribute("aria-expanded", "false");
      if (el._trigger.focus) el._trigger.focus();
    }
  }
  document.addEventListener("keydown", function (e) {
    var top = openStack[openStack.length - 1];
    if (e.key === "Escape" && top) { closeLayer(top); return; }
    if (e.key === "Tab" && top) {
      var f = focusables(top);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-close-layer]");
    if (c) closeLayer(c.closest(".layer"));
  });

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("is-visible"); }, 4000);
  }

  /* ---------- Chrome ---------- */
  function fashion() { return CAT.categories.filter(function (c) { return c.world === "fashion"; }); }
  function homeWorld() { return CAT.categories.filter(function (c) { return c.world === "home"; }); }
  function newCount() { return CAT.products.filter(function (p) { return p.isNew; }).length; }

  function announcementHTML() {
    return '<div class="announcement"><p class="container">Free delivery in Georgetown on orders over ' + money(S.freeDelivery.threshold) +
      ' · Pay with MMG <a href="/how-to-order#delivery">How it works</a></p></div>';
  }

  function megaPanel(id, title, cats, promo) {
    var links = cats.map(function (c) { return '<li><a href="/category?c=' + c.id + '">' + esc(c.name) + "</a></li>"; }).join("");
    return '<div class="megamenu" id="' + id + '" hidden><div class="container megamenu__inner">' +
      '<div class="megamenu__col"><p class="megamenu__title">' + title + '</p><ul>' + links + '<li><a href="/category?c=' + id.replace("mm-", "") + '">Shop all ' + title.toLowerCase() + "</a></li></ul></div>" +
      '<div class="megamenu__col"><p class="megamenu__title">Highlights</p><ul><li><a href="/category?c=new">New in</a></li><li><a href="/category?c=best-sellers">Best sellers</a></li><li><a href="/category?c=sale">Sale</a></li><li><a href="/category?c=' + CAT.season.id + '">' + esc(CAT.season.title) + "</a></li></ul></div>" +
      '<a class="megamenu__promo" href="/category?c=' + CAT.season.id + '"><div class="ph ph--16x9" role="img" aria-label="' + esc(promo) + '"><span class="ph__label" aria-hidden="true">[CAMPAIGN PHOTO: ' + esc(promo) + "]</span></div>" +
      '<span class="megamenu__promo-label">' + esc(CAT.season.eyebrow) + " edit — shop now " + icon("chevronRight") + "</span></a>" +
      "</div></div>";
  }

  function headerHTML(minimal) {
    if (minimal) {
      return '<header class="header header--minimal"><div class="container header__bar">' +
        '<a class="logo" href="/" data-placeholder="logo">ShipShop</a>' +
        '<p class="header__secure">' + icon("check") + " Secure checkout</p>" +
        '<a class="wa-text" href="' + waUrl(WA.help(false)) + '" target="_blank" rel="noopener">' + waGlyph() + '<span>Need help? <span class="u">Chat with us</span></span></a>' +
        "</div></header>";
    }
    return '<header class="header" id="site-header">' +
      '<div class="container header__bar">' +
      '<button class="icon-btn header__menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-open-menu>' + icon("menu") + "</button>" +
      '<a class="logo" href="/" data-placeholder="logo">ShipShop</a>' +
      '<form class="header__search" role="search" action="/category" id="header-search"><label class="sr-only" for="q">Search the store</label>' +
      '<input id="q" name="q" type="search" placeholder="Search dresses, home, gifts…" autocomplete="off"><button type="submit" class="icon-btn" aria-label="Search">' + icon("search") + "</button></form>" +
      '<div class="header__actions">' +
      '<a class="wa-text header__chat" href="' + waUrl(WA.help(true)) + '" target="_blank" rel="noopener">' + waGlyph() + "<span>Chat with us</span></a>" +
      '<button class="icon-btn header__search-toggle" type="button" aria-label="Search" aria-expanded="false" aria-controls="header-search" data-toggle-search>' + icon("search") + "</button>" +
      '<a class="icon-btn header__desk" href="/account" aria-label="My account">' + icon("user") + "</a>" +
      '<a class="icon-btn header__desk" href="/account#wishlist" aria-label="Wishlist">' + icon("heart") + "</a>" +
      '<button class="icon-btn bag-btn" type="button" data-open-bag aria-controls="bag-drawer" aria-expanded="false" aria-label="Bag, 0 items">' + icon("bag") + '<span class="bag-count" aria-hidden="true">0</span></button>' +
      "</div></div>" +
      '<nav class="nav" aria-label="Main"><ul class="container nav__list">' +
      '<li class="nav__item"><button class="nav__trigger" type="button" aria-expanded="false" aria-controls="mm-fashion">Fashion ' + icon("chevronDown") + "</button>" + megaPanel("mm-fashion", "Fashion", fashion(), "Women in satin and linen at a Georgetown garden party") + "</li>" +
      '<li class="nav__item"><button class="nav__trigger" type="button" aria-expanded="false" aria-controls="mm-home">Home &amp; More ' + icon("chevronDown") + "</button>" + megaPanel("mm-home", "Home & More", homeWorld(), "A table set with stoneware plates, candles and gift boxes") + "</li>" +
      '<li class="nav__item"><a class="nav__link" href="/category?c=new">New in</a></li>' +
      '<li class="nav__item"><a class="nav__link nav__link--sale" href="/category?c=sale">Sale</a></li>' +
      '<li class="nav__item nav__item--end"><a class="nav__link" href="/how-to-order">How to order</a></li>' +
      "</ul></nav></header>";
  }

  function mobileMenuHTML() {
    function rows(cats, world) {
      return cats.map(function (c) { return '<li><a class="menu-row" href="/category?c=' + c.id + '">' + esc(c.name) + icon("chevronRight") + "</a></li>"; }).join("") +
        '<li><a class="menu-row" href="/category?c=' + world + '">Shop all' + icon("chevronRight") + "</a></li>";
    }
    var hours = S.store.hours.map(function (h) { return h[0] + " " + h[1]; }).join(" · ");
    return '<div class="layer sheet sheet--left" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>' +
      '<div class="layer__scrim" data-close-layer></div>' +
      '<div class="sheet__panel">' +
      '<div class="sheet__head"><a class="logo" href="/">ShipShop</a><button class="icon-btn" type="button" data-close-layer aria-label="Close menu">' + icon("close") + "</button></div>" +
      '<div class="sheet__body">' +
      '<form class="menu-search" role="search" action="/category"><label class="sr-only" for="mq">Search the store</label><input id="mq" name="q" type="search" placeholder="Search dresses, home, gifts…"><button class="icon-btn" aria-label="Search">' + icon("search") + "</button></form>" +
      '<div class="worlds" role="tablist" aria-label="Shop">' +
      '<button role="tab" type="button" id="w-fashion" aria-selected="true" aria-controls="wp-fashion">Fashion</button>' +
      '<button role="tab" type="button" id="w-home" aria-selected="false" aria-controls="wp-home" tabindex="-1">Home &amp; More</button></div>' +
      '<ul class="menu-rows" role="tabpanel" id="wp-fashion" aria-labelledby="w-fashion">' + rows(fashion(), "fashion") + "</ul>" +
      '<ul class="menu-rows" role="tabpanel" id="wp-home" aria-labelledby="w-home" hidden>' + rows(homeWorld(), "home") + "</ul>" +
      '<ul class="menu-rows menu-rows--extra">' +
      '<li><a class="menu-row" href="/category?c=new">New in <span class="menu-count">' + newCount() + "</span>" + icon("chevronRight") + "</a></li>" +
      '<li><a class="menu-row menu-row--sale" href="/category?c=sale">Sale' + icon("chevronRight") + "</a></li>" +
      '<li><a class="menu-row" href="/account">My account' + icon("chevronRight") + "</a></li>" +
      '<li><a class="menu-row" href="/account#wishlist">Wishlist' + icon("chevronRight") + "</a></li>" +
      '<li><a class="menu-row" href="/how-to-order">How to order' + icon("chevronRight") + "</a></li></ul>" +
      '<a class="btn btn--whatsapp btn--block" href="' + waUrl(WA.help(false)) + '" target="_blank" rel="noopener">' + waGlyph() + "Chat with us on WhatsApp</a>" +
      '<p class="menu-store">' + icon("pin") + "<span>" + esc(S.store.address) + "<br>" + esc(hours) + "</span></p>" +
      "</div></div></div>";
  }

  function drawerHTML() {
    return '<div class="layer drawer" id="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title" hidden>' +
      '<div class="layer__scrim" data-close-layer></div>' +
      '<div class="drawer__panel"><div class="drawer__head"><h2 class="drawer__title" id="bag-title">Your bag</h2>' +
      '<button class="icon-btn" type="button" data-close-layer aria-label="Close bag">' + icon("close") + "</button></div>" +
      '<div class="drawer__body" data-bag-view="drawer"></div></div></div>';
  }

  function footerHTML(minimal, hideSignature) {
    var year = new Date().getFullYear();
    if (minimal) {
      return '<footer class="footer footer--minimal"><div class="container"><p>© ' + year + ' ShipShop · <a href="/privacy">Privacy</a> · <a href="/how-to-order#returns">Returns</a></p></div></footer>';
    }
    var hours = S.store.hours.map(function (h) { return "<li>" + h[0] + ": " + h[1] + "</li>"; }).join("");
    var social = S.social.map(function (s) {
      return s.url ? '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + s.name + "</a></li>" : "<li>" + s.name + ' <span class="todo">[CLIENT TO SUPPLY: link]</span></li>';
    }).join("");
    return '<footer class="footer"><div class="container">' +
      '<div class="footer__brand"><a class="logo logo--light" href="/" data-placeholder="logo">ShipShop</a>' +
      (hideSignature ? "" : '<p class="footer__signature">' + S.signature + "</p>") + "</div>" +
      '<div class="footer__cols">' +
      '<section class="footer__col"><h2 class="footer__h">Visit our store</h2><p>' + esc(S.store.address) + "</p><ul>" + hours + "</ul>" +
      '<a class="footer__map" href="' + S.store.mapsUrl + '" target="_blank" rel="noopener">' + icon("pin") + "<span>Get directions</span></a></section>" +
      '<section class="footer__col"><h2 class="footer__h">Talk to us</h2><ul><li><a href="tel:' + S.phoneDisplay.replace(/\s/g, "") + '">' + S.phoneDisplay + "</a></li>" +
      '<li><a href="' + waUrl(WA.help(false)) + '" target="_blank" rel="noopener">WhatsApp: ' + S.phoneDisplay + "</a></li>" + social + "</ul></section>" +
      '<details class="footer__col footer__acc" data-acc><summary class="footer__h">Help ' + icon("chevronDown") + "</summary><ul>" +
      '<li><a href="/how-to-order">How to order</a></li><li><a href="/how-to-order#delivery">Delivery</a></li><li><a href="/how-to-order#returns">Returns</a></li>' +
      '<li><a href="/size-guide">Size guide</a></li><li><a href="/how-to-order#faq">FAQ</a></li><li><a href="/privacy">Privacy</a></li></ul></details>' +
      '<details class="footer__col footer__acc" data-acc><summary class="footer__h">Shop ' + icon("chevronDown") + "</summary><ul>" +
      '<li><a href="/category?c=fashion">Fashion</a></li><li><a href="/category?c=home">Home &amp; More</a></li><li><a href="/category?c=new">New in</a></li><li><a href="/category?c=sale">Sale</a></li><li><a href="/account">My account</a></li></ul></details>' +
      "</div>" +
      '<div class="footer__pay"><h2 class="footer__h">We accept</h2><ul class="pay-list"><li>MMG</li><li>Visa</li><li>Mastercard</li><li>Cash on Delivery</li></ul></div>' +
      '<p class="footer__legal">© ' + year + " ShipShop · Georgetown, Guyana</p>" +
      "</div></footer>";
  }

  function fabHTML() {
    return '<a class="wa-fab" href="' + waUrl(WA.help(true)) + '" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">' + waGlyph() + "</a>";
  }

  /* ---------- Bag view (CartDrawer + /cart) ---------- */
  function freeDeliveryBar() {
    var sub = Bag.subtotal(), left = S.freeDelivery.threshold - sub;
    var pct = Math.min(100, Math.round((sub / S.freeDelivery.threshold) * 100));
    var text = left > 0
      ? "You’re " + money(left) + " away from free delivery in Georgetown"
      : icon("check") + " You’ve unlocked free delivery in Georgetown";
    return '<div class="free-bar' + (left <= 0 ? " is-done" : "") + '"><p class="free-bar__text" aria-live="polite">' + text + "</p>" +
      '<div class="free-bar__track" role="progressbar" aria-label="Progress to free delivery" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div></div>';
  }

  function renderBag(container) {
    var lines = Bag.lines(), mode = container.getAttribute("data-bag-view");
    var title = document.getElementById(mode === "page" ? "page-bag-title" : "bag-title");
    if (title) title.textContent = "Your bag (" + Bag.count() + ")";
    if (!lines.length) {
      container.innerHTML = '<div class="empty"><span class="empty__icon">' + icon("bag") + "</span>" +
        "<p class=\"empty__title\">Your bag is empty.</p><p>Let’s find something you’ll love.</p>" +
        '<a class="btn btn--primary" href="/category?c=new">Shop new arrivals</a>' +
        '<a class="wa-text" href="' + waUrl(WA.help(false)) + '" target="_blank" rel="noopener">' + waGlyph() + '<span class="u">Ask us on WhatsApp</span></a></div>';
      return;
    }
    var html = freeDeliveryBar() + '<ul class="bag-lines">';
    lines.forEach(function (l) {
      var low = l.variant.stock <= 3;
      html += '<li class="bag-line">' +
        '<a class="bag-line__media" href="/product?p=' + l.product.slug + '" tabindex="-1" aria-hidden="true">' + placeholder(l.product.images[0], "4x5", "ph--mini") + "</a>" +
        '<div class="bag-line__info"><a class="bag-line__name" href="/product?p=' + l.product.slug + '">' + esc(l.product.name) + "</a>" +
        '<p class="meta">' + esc(l.variant.color) + " / " + esc(l.variant.size) + "</p>" +
        (low ? '<p class="stock stock--low">' + icon("alert") + " Only " + l.variant.stock + " left in " + esc(l.variant.size) + "</p>" : "") +
        '<div class="bag-line__row"><div class="qty" role="group" aria-label="Quantity for ' + esc(l.product.name) + '">' +
        '<button type="button" class="qty__btn" data-qty="-1" data-id="' + l.variantId + '" aria-label="Decrease quantity"' + (l.qty <= 1 ? " disabled" : "") + ">" + icon("minus") + "</button>" +
        '<span class="qty__val" aria-live="polite">' + l.qty + "</span>" +
        '<button type="button" class="qty__btn" data-qty="1" data-id="' + l.variantId + '" aria-label="Increase quantity"' + (l.qty >= l.variant.stock ? " disabled" : "") + ">" + icon("plus") + "</button></div>" +
        '<span class="price">' + money(l.lineTotal) + "</span></div>" +
        '<button type="button" class="link-btn" data-remove="' + l.variantId + '">Remove<span class="sr-only"> ' + esc(l.product.name) + "</span></button>" +
        "</div></li>";
    });
    html += "</ul>";
    var z = zone(store("zone"));
    html += '<div class="totals"><div class="totals__row"><span>Subtotal</span><span class="price">' + money(Bag.subtotal()) + "</span></div>" +
      '<div class="totals__row totals__row--muted"><span>Delivery</span><span>Calculated at checkout</span></div></div>' +
      '<div class="bag-actions"><a class="btn btn--primary btn--block" href="/checkout">Checkout</a>' +
      '<a class="btn btn--whatsapp btn--block" href="' + waUrl(WA.bag(lines, z && z.name)) + '" target="_blank" rel="noopener">' + waGlyph() + "Send order via WhatsApp</a>" +
      '<p class="reassure">Real people answer on WhatsApp.</p></div>';
    container.innerHTML = html;
  }

  function refreshBag() {
    var n = Bag.count();
    document.querySelectorAll(".bag-btn").forEach(function (b) {
      b.setAttribute("aria-label", "Bag, " + n + (n === 1 ? " item" : " items"));
      var c = b.querySelector(".bag-count");
      c.textContent = n;
      c.classList.toggle("is-empty", n === 0);
    });
    document.querySelectorAll("[data-bag-view]").forEach(renderBag);
  }

  function openBag(trigger) {
    var d = document.getElementById("bag-drawer");
    if (!d) { location.href = "/cart"; return; }
    refreshBag();
    openLayer(d, trigger || document.querySelector(".bag-btn"));
  }

  /* ---------- Wiring ---------- */
  function wireMegaMenu() {
    var triggers = document.querySelectorAll(".nav__trigger");
    function closeAll(except) {
      triggers.forEach(function (t) {
        if (t === except) return;
        t.setAttribute("aria-expanded", "false");
        document.getElementById(t.getAttribute("aria-controls")).hidden = true;
      });
    }
    triggers.forEach(function (t) {
      var panel = document.getElementById(t.getAttribute("aria-controls")), item = t.parentNode, timer;
      function open() { closeAll(t); t.setAttribute("aria-expanded", "true"); panel.hidden = false; }
      function close() { t.setAttribute("aria-expanded", "false"); panel.hidden = true; }
      t.addEventListener("click", function () { t.getAttribute("aria-expanded") === "true" ? close() : open(); });
      item.addEventListener("mouseenter", function () { clearTimeout(timer); timer = setTimeout(open, 120); });
      item.addEventListener("mouseleave", function () { clearTimeout(timer); timer = setTimeout(close, 200); });
      item.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { close(); t.focus(); } });
      item.addEventListener("focusout", function (e) { if (!item.contains(e.relatedTarget)) close(); });
    });
  }

  function wireMobileMenu() {
    var tabs = document.querySelectorAll(".worlds [role=tab]");
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = tabs[(i + 1) % 2]; select(n); n.focus(); }
      });
    });
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    }
  }

  function wireGlobal() {
    document.addEventListener("click", function (e) {
      var t;
      if ((t = e.target.closest("[data-open-bag]"))) { e.preventDefault(); openBag(t); }
      else if ((t = e.target.closest("[data-open-menu]"))) { openLayer(document.getElementById("mobile-menu"), t); }
      else if ((t = e.target.closest("[data-toggle-search]"))) {
        var form = document.getElementById("header-search"), on = form.classList.toggle("is-open");
        t.setAttribute("aria-expanded", on);
        if (on) form.querySelector("input").focus();
      }
      else if ((t = e.target.closest("[data-qty]"))) {
        var id = t.getAttribute("data-id"), cur = Bag.items().filter(function (i) { return i.variantId === id; })[0];
        if (cur) Bag.setQty(id, cur.qty + Number(t.getAttribute("data-qty")));
        var again = document.querySelector('[data-qty="' + t.getAttribute("data-qty") + '"][data-id="' + id + '"]');
        if (again && !again.disabled) again.focus();
      }
      else if ((t = e.target.closest("[data-remove]"))) {
        var r = CAT.variant(t.getAttribute("data-remove"));
        Bag.remove(t.getAttribute("data-remove"));
        toast(r.product.name + " removed from your bag");
        var view = document.querySelector("[data-bag-view]:not([hidden])");
        var f = view && view.querySelector("a,button");
        if (f) f.focus();
      }
      else if ((t = e.target.closest("[data-wish]"))) {
        e.preventDefault();
        var slug = t.getAttribute("data-wish"), on2 = Wish.toggle(slug), p = CAT.bySlug(slug);
        document.querySelectorAll('[data-wish="' + slug + '"]').forEach(function (b) { b.setAttribute("aria-pressed", on2); });
        toast(on2 ? "Added to wishlist" : "Removed from wishlist");
        document.dispatchEvent(new CustomEvent("wish:change", { detail: p }));
      }
    });
    document.addEventListener("bag:change", refreshBag);

    // Header compacts on scroll.
    var header = document.getElementById("site-header");
    if (header) {
      var onScroll = function () { header.classList.toggle("is-compact", window.scrollY > 40); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    // Footer link groups: accordions on mobile, open on desktop.
    var mq = matchMedia("(min-width: 768px)");
    function syncAcc() { document.querySelectorAll("[data-acc]").forEach(function (d) { d.open = mq.matches; }); }
    syncAcc();
    mq.addEventListener("change", syncAcc);
    // Prefill search field.
    var q = qs("q"), qi = document.getElementById("q");
    if (q && qi) qi.value = q;
  }

  function renderChrome() {
    var body = document.body, page = body.getAttribute("data-page"), minimal = page === "checkout";
    var top = document.createElement("div");
    top.innerHTML = '<a class="skip-link" href="#main">Skip to content</a>' + (minimal ? "" : announcementHTML()) + headerHTML(minimal);
    var frag = document.createDocumentFragment();
    while (top.firstChild) frag.appendChild(top.firstChild);
    body.insertBefore(frag, body.firstChild);
    var end = document.createElement("div");
    end.innerHTML = footerHTML(minimal, body.hasAttribute("data-no-footer-signature")) +
      (minimal ? "" : mobileMenuHTML() + drawerHTML() + fabHTML()) +
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
    while (end.firstChild) body.appendChild(end.firstChild);
    if (!minimal) { wireMegaMenu(); wireMobileMenu(); }
    wireGlobal();
    refreshBag();
  }

  window.UI = {
    esc: esc, money: money, moneyPlain: moneyPlain, qs: qs, store: store, icon: icon, waGlyph: waGlyph,
    waUrl: waUrl, WA: WA, zone: zone, deliveryFee: deliveryFee, Bag: Bag, Wish: Wish,
    placeholder: placeholder, stars: stars, priceHTML: priceHTML, percentOff: percentOff, inStock: inStock,
    colorsOf: colorsOf, sizesOf: sizesOf, productCard: productCard, openLayer: openLayer, closeLayer: closeLayer,
    openBag: openBag, toast: toast, renderBag: renderBag,
  };

  renderChrome();
})();
