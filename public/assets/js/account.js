/* My account — orders placed on this device + wishlist. No login needed (guest checkout). */
(function () {
  var CAT = window.CATALOG, UI = window.UI, main = document.getElementById("main");
  function render() {
    var orders = UI.store("orders") || [];
    var wish = UI.Wish.list().map(CAT.bySlug).filter(Boolean);
    main.innerHTML = '<div class="container"><div class="page-head" style="padding-top:var(--space-6)"><h1>My account</h1><p>Your orders and saved items on this device. No password needed.</p></div></div>' +
      '<section class="section" style="padding-top:0" aria-labelledby="orders-title"><div class="container"><h2 id="orders-title" style="margin-bottom:var(--space-5)">Your orders</h2>' +
      (orders.length ? '<ul class="order-list">' + orders.map(function (o) {
        return '<li class="order-item"><div><p class="order-no">Order #' + UI.esc(o.id) + '</p><p class="meta">' + new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " · " + o.items.length + (o.items.length === 1 ? " item" : " items") + ' · <span class="price">' + UI.money(o.total) + "</span></p></div>" +
          '<div style="display:flex;gap:8px;flex-wrap:wrap"><a class="text-link" href="/order?id=' + encodeURIComponent(o.id) + '">View order</a><a class="wa-text" href="' + UI.waUrl(UI.WA.order(o.id)) + '" target="_blank" rel="noopener">' + UI.waGlyph() + '<span class="u">Track on WhatsApp</span></a></div></li>';
      }).join("") + "</ul>" : '<p class="meta">No orders on this device yet. Ordered on WhatsApp? <a href="' + UI.waUrl(UI.WA.help(false)) + '" target="_blank" rel="noopener">Ask us</a> about your order.</p>') +
      "</div></section>" +
      '<section class="section section--alt" id="wishlist" aria-labelledby="wish-title"><div class="container"><h2 id="wish-title" style="margin-bottom:var(--space-5)">Wishlist</h2>' +
      (wish.length ? '<ul class="grid">' + wish.map(function (p) { return "<li>" + UI.productCard(p) + "</li>"; }).join("") + "</ul>"
        : '<div class="empty"><span class="empty__icon">' + UI.icon("heart") + '</span><p class="empty__title">No saved items yet.</p><p>Tap the heart on any product to save it here.</p><a class="btn btn--primary" href="/category?c=new">Shop new arrivals</a></div>') +
      "</div></section>";
  }
  render();
  document.addEventListener("wish:change", render);
})();
