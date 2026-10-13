/* How to order / Delivery & Payment — page-blueprints §7. Facts come from config.js. */
(function () {
  var S = window.SHOP, UI = window.UI;
  document.getElementById("ways").innerHTML = window.SECTIONS.waysHTML(true);
  document.getElementById("free-rule").textContent = "Free delivery in Georgetown on orders over " + UI.moneyPlain(S.freeDelivery.threshold) + ". Store pickup is always free.";
  document.getElementById("zones").innerHTML = S.zones.map(function (z) {
    return '<tr><th scope="row">' + z.name + (z.region ? ' <span class="meta">' + z.region + "</span>" : "") + "</th><td>" + z.time + '</td><td class="num">' + (z.fee === null ? "Confirmed on WhatsApp" : UI.money(z.fee)) + "</td></tr>";
  }).join("") + '<tr><th scope="row">Store pickup</th><td>' + S.pickup.time + '</td><td class="num">Free</td></tr>';
  document.getElementById("pay-cards").innerHTML =
    '<article class="pay-card"><h3>' + UI.icon("wallet") + "MMG</h3><ol class=\"prose\" style=\"list-style:decimal;padding-left:20px\"><li>Place your order and note your order number.</li><li>Send the total to <strong>" + S.mmgNumber + "</strong> with your order number as reference.</li><li>We confirm your payment on WhatsApp.</li></ol></article>" +
    '<article class="pay-card"><h3>' + UI.icon("truck") + "Cash on Delivery</h3><p>Pay in cash when your order arrives. Available in Georgetown and East Bank Demerara. Paying at store pickup works too.</p></article>" +
    '<article class="pay-card"><h3>' + UI.icon("wallet") + "Card</h3><p>" + (S.cardEnabled ? "Visa and Mastercard accepted at checkout." : "Visa and Mastercard are coming soon. For now, pay with MMG or cash.") + "</p></article>";
  var wa = document.getElementById("closing-wa");
  wa.href = UI.waUrl(UI.WA.help(false));
  wa.insertAdjacentHTML("afterbegin", UI.waGlyph());
})();
