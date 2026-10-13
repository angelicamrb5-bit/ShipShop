/* Order confirmation — page-blueprints §6. */
(function () {
  var S = window.SHOP, UI = window.UI, main = document.getElementById("main");
  var id = UI.qs("id"), order = (UI.store("orders") || []).filter(function (o) { return o.id === id; })[0];
  if (!order) {
    main.innerHTML = '<div class="container"><div class="empty"><span class="empty__icon">' + UI.icon("search") + '</span><h1 class="h2">We can’t show this order here</h1><p>Orders are saved on the device where they were placed. Ask us on WhatsApp and we’ll check it for you.</p>' +
      '<a class="btn btn--whatsapp" href="' + UI.waUrl(id ? UI.WA.order(id) : UI.WA.help(false)) + '" target="_blank" rel="noopener">' + UI.waGlyph() + 'Track on WhatsApp</a><a class="text-link" href="/">Continue shopping</a></div></div>';
    return;
  }
  var first = order.customer.name.split(" ")[0];
  var zone = UI.zone(order.fulfillment.zone);
  var payLabel = { mmg: "MMG", cod: order.fulfillment.type === "pickup" ? "Cash at pickup" : "Cash on Delivery", card: "Card" }[order.payment];

  // Track message: the guide's template. Without an order backend, the order details travel with it
  // so the store receives the full order in the chat.
  var msg = UI.WA.order(order.id);
  if (!S.orderEndpoint) {
    msg += "\n\nName: " + order.customer.name + "\nPhone: " + order.customer.phone +
      "\n" + (order.fulfillment.type === "pickup" ? "Store pickup" : "Delivery to: " + (zone ? zone.name : "") + " — " + order.fulfillment.address) +
      "\nPayment: " + payLabel + "\n" +
      order.items.map(function (it, i) { return (i + 1) + ". " + it.name + " · " + it.color + " / " + it.size + " · x" + it.qty + " · " + UI.moneyPlain(it.price * it.qty); }).join("\n") +
      "\nTotal: " + UI.moneyPlain(order.total) + (order.deliveryFee === null ? " + delivery (to confirm)" : "");
  }

  var step2 = order.payment === "mmg" ? "Send " + UI.money(order.total) + " with MMG to " + S.mmgNumber + " using #" + order.id + " as reference."
    : order.fulfillment.type === "pickup" ? "We prepare your order and message you when it’s ready." : "We prepare your order. Pay in cash when it arrives.";
  var step3 = order.fulfillment.type === "pickup" ? "Pick it up at " + S.store.address + "."
    : "Delivery to " + (zone ? zone.name : "your area") + (zone && zone.fee !== null ? " in " + zone.time : "") + ".";

  var fee = order.deliveryFee === null ? "Confirmed on WhatsApp" : order.deliveryFee === 0 ? "Free" : UI.money(order.deliveryFee);
  main.innerHTML = '<div class="container"><div class="confirm">' +
    '<span class="confirm__check">' + UI.icon("check") + "</span>" +
    "<div><h1>Thank you, " + UI.esc(first) + '!</h1><p class="order-no" style="margin-top:8px">Order #' + UI.esc(order.id) + "</p><p>We’ll confirm on WhatsApp " + S.confirmTime + ".</p></div>" +
    (order.payment === "mmg" ? '<div class="pay-note"><p><strong>Pay with MMG:</strong> send ' + UI.moneyPlain(order.total) + " to <strong>" + S.mmgNumber + "</strong> and use your order number <strong>#" + UI.esc(order.id) + "</strong> as reference. We’ll confirm on WhatsApp.</p></div>" : "") +
    '<section aria-labelledby="next-title"><h2 class="h3" id="next-title" style="margin-bottom:12px">What happens next</h2><ol class="next-steps">' +
    "<li>We confirm your order on WhatsApp " + S.confirmTime + ".</li><li>" + UI.esc(step2) + "</li><li>" + UI.esc(step3) + "</li></ol></section>" +
    '<div class="confirm__actions"><a class="btn btn--whatsapp btn--block" href="' + UI.waUrl(msg) + '" target="_blank" rel="noopener">' + UI.waGlyph() + 'Track on WhatsApp</a><a class="btn btn--secondary btn--block" href="/">Continue shopping</a></div>' +
    '<section class="summary" aria-labelledby="os-title"><div class="summary__body" style="padding-top:16px"><h2 class="h3" id="os-title">Order summary</h2><ul class="summary__items">' +
    order.items.map(function (it) {
      return '<li class="summary__item">' + UI.placeholder(it.image, "4x5", "ph--mini") + "<div><strong>" + UI.esc(it.name) + "</strong>" + UI.esc(it.color) + " / " + UI.esc(it.size) + " · x" + it.qty + '</div><span class="price">' + UI.money(it.price * it.qty) + "</span></li>";
    }).join("") + "</ul>" +
    '<div class="totals"><div class="totals__row"><span>Subtotal</span><span class="price">' + UI.money(order.subtotal) + "</span></div>" +
    '<div class="totals__row"><span>' + (order.fulfillment.type === "pickup" ? "Store pickup" : "Delivery") + "</span><span>" + fee + "</span></div>" +
    '<div class="totals__row totals__row--total"><span>Total</span><span class="price">' + UI.money(order.total) + "</span></div></div>" +
    '<p class="meta">Payment: ' + payLabel + " · " + (order.fulfillment.type === "pickup" ? "Store pickup" : UI.esc((zone ? zone.name + " — " : "") + order.fulfillment.address)) + "</p></div></section>" +
    '<p class="closing-line">' + S.signature + "</p>" +
    "</div></div>";
})();
