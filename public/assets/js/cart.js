/* Cart page — same content as CartDrawer + "You may also like" (page-blueprints §4). */
(function () {
  var CAT = window.CATALOG, UI = window.UI;
  var inBag = UI.Bag.lines().map(function (l) { return l.product.slug; });
  var recs = CAT.products.filter(function (p) { return p.bestSeller && inBag.indexOf(p.slug) < 0 && UI.inStock(p); }).slice(0, 8);
  document.getElementById("main").innerHTML =
    '<div class="container"><div class="page-head" style="padding-top:var(--space-6)"><h1 id="page-bag-title">Your bag</h1></div>' +
    '<div class="cart-page"><div class="cart-page__bag" data-bag-view="page"></div></div></div>' +
    '<section class="section section--alt" aria-labelledby="recs-title"><div class="container"><div class="section__head"><div><p class="eyebrow">Best sellers</p><h2 id="recs-title">You may also like</h2></div>' +
    '<div class="carousel__arrows"><button class="icon-btn" type="button" data-carousel-prev="recs-track" aria-label="Previous products"></button><button class="icon-btn" type="button" data-carousel-next="recs-track" aria-label="Next products"></button></div></div>' +
    '<div class="carousel"><ul class="carousel__track" id="recs-track">' + recs.map(function (p) { return "<li>" + UI.productCard(p) + "</li>"; }).join("") + "</ul></div></div></section>";
  document.querySelectorAll("[data-bag-view]").forEach(UI.renderBag);
  window.SECTIONS.wireCarousels();
})();
