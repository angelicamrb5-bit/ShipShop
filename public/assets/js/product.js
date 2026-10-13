/* Product page (PDP) — page-blueprints §3. */
(function () {
  var CAT = window.CATALOG, UI = window.UI, S = window.SHOP;
  var main = document.getElementById("main");
  var p = CAT.bySlug(UI.qs("p") || "");
  if (!p) {
    document.title = "Product not found — ShipShop";
    main.innerHTML = '<div class="container"><div class="empty"><span class="empty__icon">' + UI.icon("search") + '</span><h1 class="h2">We couldn’t find that product</h1><p>It may have sold out or moved. Let’s find you something similar.</p>' +
      '<a class="btn btn--primary" href="/category?c=new">Shop new arrivals</a><a class="wa-text" href="' + UI.waUrl(UI.WA.help(true)) + '" target="_blank" rel="noopener">' + UI.waGlyph() + '<span class="u">Ask us on WhatsApp</span></a></div></div>';
    return;
  }
  document.title = p.name + " — ShipShop";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", p.name + " — " + UI.moneyPlain(p.price) + ". " + p.details);

  var cat = CAT.category(p.category), colors = UI.colorsOf(p), sizes = UI.sizesOf(p);
  var firstAvail = p.variants.filter(function (v) { return v.stock > 0; })[0] || p.variants[0];
  var state = { color: firstAvail.color, size: sizes.length === 1 ? sizes[0] : null };
  function variant(color, size) { return p.variants.filter(function (v) { return v.color === color && v.size === size; })[0]; }

  /* ---------- Markup ---------- */
  var off = UI.percentOff(p);
  var gallery = '<div class="gallery" aria-label="Product photos">' +
    '<div class="gallery__track" id="g-track" tabindex="0" aria-label="Photo gallery, swipe for more">' + p.images.map(function (d) { return UI.placeholder(d, "4x5"); }).join("") + "</div>" +
    '<div class="gallery__thumbs">' + p.images.map(function (d, i) { return '<button type="button" data-thumb="' + i + '" aria-label="Show photo ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + ">" + UI.placeholder(d, "4x5") + "</button>"; }).join("") + "</div>" +
    '<span class="gallery__count" id="g-count" aria-hidden="true">1 / ' + p.images.length + "</span>" +
    '<div class="gallery__dots" aria-hidden="true">' + p.images.map(function (d, i) { return '<span class="' + (i === 0 ? "is-on" : "") + '"></span>'; }).join("") + "</div></div>";

  var rating = p.rating ? '<p class="rating">' + UI.stars(p.rating) + '<a href="#reviews">' + p.rating.toFixed(1) + " · " + p.reviewCount + " reviews</a></p>" : "";

  var colorGroup = '<div class="opt-group"><div class="opt-group__head"><span>Color: <strong id="color-name"></strong></span></div>' +
    '<div class="swatches" role="radiogroup" aria-label="Color">' + colors.map(function (c) {
      return '<button type="button" class="swatch" role="radio" aria-checked="false" data-color="' + UI.esc(c.name) + '" aria-label="' + UI.esc(c.name) + '"><span style="background:' + c.hex + '"></span></button>';
    }).join("") + "</div></div>";

  var sizeGroup = '<div class="opt-group" id="size-group"><div class="opt-group__head"><span>Size' + (sizes.length > 1 ? ': <strong id="size-name">Choose a size</strong>' : ': <strong id="size-name"></strong>') + "</span>" +
    (["women", "men", "kids", "plus-size"].indexOf(p.category) > -1 ? '<button type="button" class="link-btn" id="open-size-guide" style="color:var(--color-primary)">Size guide</button>' : "") + "</div>" +
    '<div class="sizes" role="radiogroup" aria-label="Size" aria-describedby="size-error">' + sizes.map(function (s) {
      return '<button type="button" class="size" role="radio" aria-checked="false" data-size="' + UI.esc(s) + '">' + UI.esc(s) + "</button>";
    }).join("") + '</div><p class="error-msg sizes-error" id="size-error">' + UI.icon("alert") + "<span>Choose a size to add this to your bag.</span></p></div>";

  var z = S.zones;
  var deliveryRows = z.filter(function (x) { return x.fee !== null; }).map(function (x) { return "<li>" + x.name + ": " + x.time + " · " + UI.money(x.fee) + "</li>"; }).join("");

  var buybox = '<div class="buybox">' +
    '<div><h1>' + UI.esc(p.name) + "</h1></div>" +
    '<div class="price-row">' + (p.compareAtPrice ? '<span class="price price--sale"><span class="sr-only">Sale price </span>' + UI.money(p.price) + '</span><s class="price price--was"><span class="sr-only">Was </span>' + UI.money(p.compareAtPrice) + '</s><span class="badge badge--sale">-' + off + "%</span>" : '<span class="price">' + UI.money(p.price) + "</span>") + "</div>" +
    rating + colorGroup + sizeGroup +
    '<p class="stock" id="stock" aria-live="polite"></p>' +
    '<div class="buy-actions" id="buy-actions"></div>' +
    '<p class="reassure" style="text-align:left">Real people answer on WhatsApp.</p>' +
    '<div class="delivery-box">' + UI.icon("truck") + "<div><strong>Estimated delivery</strong>" + UI.esc(S.deliveryEstimate) + "<br>Store pickup: free, same day</div></div>" +
    '<div class="accordion">' +
    "<details><summary>Details" + UI.icon("plus", "i-plus") + UI.icon("minus", "i-minus") + '</summary><div class="acc-body"><p>' + UI.esc(p.details) + "</p></div></details>" +
    "<details><summary>Delivery &amp; Payment" + UI.icon("plus", "i-plus") + UI.icon("minus", "i-minus") + '</summary><div class="acc-body"><ul>' + deliveryRows + "<li>Store pickup: same day · Free</li></ul><p>Free delivery in Georgetown on orders over " + UI.money(S.freeDelivery.threshold) + ".</p><p>Pay with MMG, cash on delivery (Georgetown and East Bank) or card.</p><p><a class=\"text-link\" href=\"/how-to-order#delivery\">Delivery and payment details</a></p></div></details>" +
    "<details><summary>Returns" + UI.icon("plus", "i-plus") + UI.icon("minus", "i-minus") + '</summary><div class="acc-body"><p>' + UI.esc(S.returns) + '. Items must be unworn with tags on. Chat with us on WhatsApp to start a return.</p><p><a class="text-link" href="/how-to-order#returns">Returns policy</a></p></div></details>' +
    "</div></div>";

  // Complete the look: same world, other categories first.
  var related = CAT.products.filter(function (x) { return x.slug !== p.slug && x.world === p.world; })
    .sort(function (a, b) { return (a.category === p.category) - (b.category === p.category) || a.order - b.order; }).slice(0, 8);

  // Reviews — SAMPLE until the client supplies verified reviews.
  var sampleReviews = [
    [5, "Fits true to size and the fabric is lovely for the heat. Delivery to Kitty was the next day.", "Shanice", "Kitty, Georgetown"],
    [4, "Nice quality. I asked on WhatsApp about the color and they sent me extra photos.", "Priya", "Providence, EBD"],
  ];
  var reviewsSection = p.rating ? '<section class="section section--alt" id="reviews" aria-labelledby="rev-title"><div class="container">' +
    '<div class="section__head"><div><p class="eyebrow">Reviews</p><h2 id="rev-title">What customers say</h2></div>' +
    '<a class="text-link" href="' + UI.waUrl("Hi! I'd like to leave a review for " + p.name + ".") + '" target="_blank" rel="noopener">Write one</a></div>' +
    '<div class="reviews-summary"><span class="reviews-summary__score">' + p.rating.toFixed(1) + "</span><div>" + UI.stars(p.rating) + '<p class="meta">' + p.reviewCount + " reviews</p></div></div>" +
    '<ul class="reviews">' + sampleReviews.map(function (r) {
      return '<li><article class="review">' + UI.stars(r[0]) + '<span class="sr-only">' + r[0] + " out of 5 stars</span><blockquote>“" + r[1] + '”</blockquote><p class="review__who">' + r[2] + " <span>· " + r[3] + "</span></p></article></li>";
    }).join("") + '</ul><p class="sample-note">Sample reviews shown for layout. [CLIENT TO SUPPLY: verified customer reviews]</p></div></section>' : "";

  main.innerHTML = '<nav class="breadcrumb container" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/category?c=' + p.category + '">' + UI.esc(cat.name) + '</a></li><li aria-current="page">' + UI.esc(p.name) + "</li></ol></nav>" +
    '<div class="container pdp">' + gallery + buybox + "</div>" +
    '<section class="section" aria-labelledby="ctl-title"><div class="container"><div class="section__head"><div><p class="eyebrow">Complete the look</p><h2 id="ctl-title">You may also like</h2></div>' +
    '<div class="carousel__arrows"><button class="icon-btn" type="button" data-carousel-prev="rel-track" aria-label="Previous products"></button><button class="icon-btn" type="button" data-carousel-next="rel-track" aria-label="Next products"></button></div></div>' +
    '<div class="carousel"><ul class="carousel__track" id="rel-track" aria-label="You may also like">' + related.map(function (x) { return "<li>" + UI.productCard(x) + "</li>"; }).join("") + "</ul></div></div></section>" +
    reviewsSection +
    '<div class="sticky-buy" id="sticky-buy" aria-hidden="true"></div>' +
    '<dialog class="dialog" id="size-guide" aria-labelledby="sg-title"><div class="dialog__head"><h2 class="h3" id="sg-title">Size guide</h2><button class="icon-btn" type="button" data-close-dialog aria-label="Close size guide">' + UI.icon("close") + "</button></div>" +
    '<div class="dialog__body"><p>Measure around the fullest part of your bust, your natural waist and the fullest part of your hips.</p>' +
    '<div class="table-wrap"><table class="table"><thead><tr><th scope="col">Size</th><th scope="col">Bust</th><th scope="col">Waist</th><th scope="col">Hips</th></tr></thead><tbody>' +
    sizes.map(function (s) { return '<tr><th scope="row">' + UI.esc(s) + "</th><td colspan=\"3\">[CLIENT TO SUPPLY: measurements in cm / in]</td></tr>"; }).join("") +
    '</tbody></table></div><p>Still unsure? <a class="text-link" href="' + UI.waUrl("Hi! I need help choosing a size for " + p.name + ".\n" + location.href) + '" target="_blank" rel="noopener">Ask us on WhatsApp</a></p></div></dialog>';

  /* ---------- Behaviour ---------- */
  var buy = document.getElementById("buy-actions"), sticky = document.getElementById("sticky-buy");

  function waHref() { return UI.waUrl(UI.WA.product(p, variant(state.color, state.size || sizes[0]) || { color: state.color }, state.size)); }

  function render() {
    document.getElementById("color-name").textContent = state.color;
    document.querySelectorAll(".swatch").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-color") === state.color); b.tabIndex = b.getAttribute("data-color") === state.color ? 0 : -1; });
    document.querySelectorAll(".size").forEach(function (b) {
      var s = b.getAttribute("data-size"), v = variant(state.color, s), out = !v || v.stock === 0;
      b.classList.toggle("is-out", out);
      b.setAttribute("aria-label", s + (out ? " (out of stock)" : ""));
      b.setAttribute("aria-checked", s === state.size);
      b.tabIndex = (state.size ? s === state.size : s === sizes[0]) ? 0 : -1;
    });
    var sn = document.getElementById("size-name");
    if (sn) sn.textContent = state.size || "Choose a size";

    var v = state.size ? variant(state.color, state.size) : null;
    var stock = document.getElementById("stock"), anyInColor = p.variants.some(function (x) { return x.color === state.color && x.stock > 0; });
    var outNow = (v && v.stock === 0) || (!v && !anyInColor);
    if (v && v.stock === 0) stock.innerHTML = '<span class="stock stock--out">' + UI.icon("close") + " Out of stock in " + UI.esc(state.size) + "</span>";
    else if (!v && !anyInColor) stock.innerHTML = '<span class="stock stock--out">' + UI.icon("close") + " Out of stock in " + UI.esc(state.color) + "</span>";
    else if (v && v.stock <= 3) stock.innerHTML = '<span class="stock stock--low">' + UI.icon("alert") + " Only " + v.stock + " left in " + UI.esc(state.size) + "</span>";
    else stock.innerHTML = '<span class="stock stock--in">' + UI.icon("check") + " In stock</span>";

    var wa = waHref();
    if (outNow) {
      var what = v ? state.size : state.color;
      buy.innerHTML = '<button class="btn btn--primary btn--block" type="button" disabled aria-describedby="stock">Add to bag</button>' +
        '<a class="btn btn--whatsapp btn--block" href="' + UI.waUrl("Hi! " + p.name + " is out of stock in " + what + ". Can you suggest an alternative?\n" + location.href) + '" target="_blank" rel="noopener">' + UI.waGlyph() + "Ask on WhatsApp</a>" +
        '<a class="btn btn--secondary btn--block" style="grid-column:1/-1" href="' + UI.waUrl("Hi! Please notify me when " + p.name + " (" + state.color + (v ? " / " + state.size : "") + ") is back in stock.\n" + location.href) + '" target="_blank" rel="noopener">Notify me</a>';
    } else {
      buy.innerHTML = '<button class="btn btn--primary btn--block" type="button" data-add>Add to bag</button>' +
        '<a class="btn btn--whatsapp btn--block" href="' + wa + '" target="_blank" rel="noopener">' + UI.waGlyph() + "Order on WhatsApp</a>";
    }
    sticky.innerHTML = '<span class="price">' + UI.money(p.price) + "</span>" +
      (outNow ? '<button class="btn btn--primary" type="button" disabled>Add to bag</button>' : '<button class="btn btn--primary" type="button" data-add data-from-sticky>Add to bag</button>') +
      '<a class="btn btn--whatsapp" href="' + (outNow ? UI.waUrl("Hi! Can you suggest an alternative to " + p.name + "?\n" + location.href) : wa) + '" target="_blank" rel="noopener" aria-label="Order on WhatsApp">' + UI.waGlyph() + "WhatsApp</a>";
  }

  function radioKeys(container, attr, values, setter) {
    container.addEventListener("keydown", function (e) {
      var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      var cur = values.indexOf(e.target.getAttribute(attr));
      var next = values[(cur + d + values.length) % values.length];
      setter(next);
      container.querySelector("[" + attr + '="' + next + '"]').focus();
    });
  }

  document.querySelector(".swatches").addEventListener("click", function (e) {
    var b = e.target.closest("[data-color]"); if (!b) return;
    state.color = b.getAttribute("data-color"); render();
  });
  radioKeys(document.querySelector(".swatches"), "data-color", colors.map(function (c) { return c.name; }), function (v) { state.color = v; render(); });
  var sizeWrap = document.querySelector(".sizes");
  sizeWrap.addEventListener("click", function (e) {
    var b = e.target.closest("[data-size]"); if (!b) return;
    state.size = b.getAttribute("data-size");
    document.getElementById("size-group").classList.remove("has-error");
    render();
  });
  radioKeys(sizeWrap, "data-size", sizes, function (v) { state.size = v; document.getElementById("size-group").classList.remove("has-error"); render(); });

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (!b) return;
    if (!state.size) {
      var g = document.getElementById("size-group");
      g.classList.add("has-error");
      g.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      var first = g.querySelector(".size:not(.is-out)") || g.querySelector(".size");
      setTimeout(function () { first.focus(); }, 300);
      return;
    }
    var v = variant(state.color, state.size);
    if (!v || v.stock === 0) return;
    UI.Bag.add(v.id, 1);
    var count = document.querySelector(".bag-count");
    if (count) { count.classList.remove("bump"); void count.offsetWidth; count.classList.add("bump"); }
    UI.openBag(b);
  });

  // Gallery: swipe indicator + desktop thumbnails.
  var track = document.getElementById("g-track");
  track.addEventListener("scroll", function () {
    var i = Math.round(track.scrollLeft / track.clientWidth);
    document.getElementById("g-count").textContent = (i + 1) + " / " + p.images.length;
    document.querySelectorAll(".gallery__dots span").forEach(function (d, j) { d.classList.toggle("is-on", i === j); });
    document.querySelectorAll("[data-thumb]").forEach(function (t, j) { t.setAttribute("aria-current", i === j); });
  }, { passive: true });
  document.querySelectorAll("[data-thumb]").forEach(function (t) {
    t.addEventListener("click", function () { track.scrollTo({ left: track.clientWidth * Number(t.getAttribute("data-thumb")) }); });
  });

  // StickyBuyBar appears once the main buy buttons leave the viewport (mobile only via CSS).
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var hidden = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      sticky.classList.toggle("is-visible", hidden);
      sticky.setAttribute("aria-hidden", !hidden);
      sticky.querySelectorAll("a,button").forEach(function (el) { el.tabIndex = hidden ? 0 : -1; });
    }).observe(buy);
  }

  // Size guide dialog.
  var dlg = document.getElementById("size-guide"), sgBtn = document.getElementById("open-size-guide");
  if (sgBtn) sgBtn.addEventListener("click", function () { dlg.showModal(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest("[data-close-dialog]")) dlg.close(); });

  render();
  window.SECTIONS.wireCarousels();
})();
