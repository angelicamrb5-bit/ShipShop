/* Home — section order fixed by the guide (page-blueprints §1). */
(function () {
  var CAT = window.CATALOG, UI = window.UI, SEC = window.SECTIONS;
  function $(id) { return document.getElementById(id); }
  function li(html) { return "<li>" + html + "</li>"; }

  // 2. CategoryTile ×6
  var tiles = [
    ["women", "Women", "Woman in a rose linen dress"], ["men", "Men", "Man in a white linen shirt"],
    ["kids", "Kids", "Kids in bright cotton outfits"], ["accessories", "Accessories", "Straw tote, hoops and scarves"],
    ["home", "Home", "Linen cushions and candles on a sofa"], ["gifts", "Gifts", "Wrapped gift boxes in blush paper"],
  ];
  $("category-tiles").innerHTML = tiles.map(function (t) {
    return li('<a class="tile" href="/category?c=' + t[0] + '"><div class="ph ph--1x1" role="img" aria-label="' + t[2] + '"><span class="ph__label" aria-hidden="true">[CATEGORY PHOTO: ' + t[2] + ']</span></div><span class="tile__label">' + t[1] + "</span></a>");
  }).join("");

  // 3. New arrivals (8)
  $("new-track").innerHTML = SEC.collection("new").items.sort(function (a, b) { return a.order - b.order; }).slice(0, 8).map(function (p) { return li(UI.productCard(p)); }).join("");

  // 4. BenefitStrip
  $("benefits").innerHTML = SEC.benefitsHTML();

  // 5. SeasonBanner
  var s = CAT.season;
  $("season").innerHTML = '<div class="ph" role="img" aria-label="' + UI.esc(s.image) + '"><span class="ph__label" aria-hidden="true">[CAMPAIGN PHOTO: ' + UI.esc(s.image) + "]</span></div>" +
    '<div class="season__content"><p class="eyebrow">' + UI.esc(s.eyebrow) + '</p><h2 id="season-title" class="collection-name">' + UI.esc(s.title) + "</h2><p>" + UI.esc(s.line) + "</p>" +
    '<a class="btn btn--secondary" href="/category?c=' + s.id + '">Shop the collection</a></div>';

  // 6. Tabs
  var tabs = document.querySelectorAll(".tabs [role=tab]"), panel = $("panel-picks");
  function show(tab) {
    tabs.forEach(function (t) { var on = t === tab; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
    panel.setAttribute("aria-labelledby", tab.id);
    var id = tab.getAttribute("data-pick");
    $("picks-grid").innerHTML = SEC.collection(id).items.slice(0, 8).map(function (p) { return li(UI.productCard(p)); }).join("");
    $("best-see-all").href = "/category?c=" + id;
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { show(t); });
    t.addEventListener("keydown", function (e) {
      var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (n) { var next = tabs[(i + n + tabs.length) % tabs.length]; show(next); next.focus(); }
    });
  });
  show(tabs[0]);

  // 7. WaysToShop
  $("ways").innerHTML = SEC.waysHTML(false);

  // 8. ReviewCard — SAMPLE content until the client supplies verified reviews.
  var reviews = [
    [5, "I ordered on WhatsApp in the morning and my dress came the next day. They even helped me pick the size.", "Anita", "Diamond, EBD"],
    [5, "Paying with MMG was simple and they confirmed my order quickly. The cushion covers look lovely.", "Kezia", "Kitty, Georgetown"],
    [4, "Good quality linen shirt and friendly service. I picked it up at the store the same day.", "Ryan", "Vreed-en-Hoop, WCD"],
  ];
  $("reviews").innerHTML = reviews.map(function (r) {
    return li('<article class="review">' + UI.stars(r[0]) + '<span class="sr-only">' + r[0] + ' out of 5 stars</span><blockquote>“' + r[1] + '”</blockquote><p class="review__who">' + r[2] + " <span>· " + r[3] + "</span></p></article>");
  }).join("");

  // 9. SocialFeed
  var looks = ["linen-wrap-midi-dress", "classic-linen-shirt-men", "woven-straw-tote-bag", "pamper-gift-box", "kids-cotton-sundress", "linen-cushion-cover-set"];
  $("social").innerHTML = looks.map(function (slug) {
    var p = CAT.bySlug(slug);
    return li('<a href="/product?p=' + slug + '"><div class="ph ph--1x1" role="img" aria-label="Shop the look: ' + UI.esc(p.name) + '"><span class="ph__label" aria-hidden="true">[SOCIAL PHOTO: ' + UI.esc(p.images[3] || p.images[0]) + "]</span></div></a>");
  }).join("");

  // 10. ClubSignup
  SEC.wireClub($("club-form"));
  SEC.wireCarousels();
})();
