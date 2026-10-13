/* One-page guest checkout — page-blueprints §5. Totals update live; errors inline; input never lost. */
(function () {
  var S = window.SHOP, UI = window.UI, main = document.getElementById("main");
  var lines = UI.Bag.lines();
  if (!lines.length) {
    main.innerHTML = '<div class="container"><div class="empty"><span class="empty__icon">' + UI.icon("bag") + '</span><h1 class="h2">Your bag is empty.</h1><p>Let’s find something you’ll love.</p><a class="btn btn--primary" href="/category?c=new">Shop new arrivals</a></div></div>';
    return;
  }
  var draft = UI.store("checkout-draft") || {};
  var zoneOpts = S.zones.map(function (z) {
    return '<option value="' + z.id + '">' + z.name + (z.region ? " (" + z.region + ")" : "") + " — " + (z.fee === null ? "fee confirmed on WhatsApp" : UI.moneyPlain(z.fee) + " · " + z.time) + "</option>";
  }).join("");
  function err(id) { return '<p class="error-msg" id="' + id + '-error"></p>'; }

  main.innerHTML = '<div class="container checkout">' +
    '<aside class="checkout__summary" aria-label="Order summary"><details class="summary" id="summary"><summary><span>Order summary</span><span style="display:flex;align-items:center;gap:8px"><span class="price" id="sum-head"></span>' + UI.icon("chevronDown") + '</span></summary><div class="summary__body" id="sum-body"></div></details></aside>' +
    '<form class="checkout__form" id="checkout-form" novalidate>' +
    '<h1>Checkout</h1><p class="guest-note">' + UI.icon("check") + "No account needed — check out as a guest.</p>" +

    '<section class="step" aria-labelledby="s1"><h2 class="step__title" id="s1"><span class="step__num" aria-hidden="true">1</span>Contact</h2>' +
    '<div class="field" data-field="name"><label for="name">Full name</label><input class="input" id="name" name="name" autocomplete="name" required aria-describedby="name-error">' + err("name") + "</div>" +
    '<div class="field" data-field="phone"><label for="phone">Phone (WhatsApp)</label><div class="input-prefix"><span aria-hidden="true">+592</span><input class="input" id="phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="600 0000" required aria-describedby="phone-help phone-error"></div>' +
    '<p class="helper" id="phone-help">We’ll confirm your order on this number.</p>' + err("phone") + "</div>" +
    '<div class="field" data-field="email"><label for="email">Email <span class="optional">(optional)</span></label><input class="input" id="email" name="email" type="email" autocomplete="email" aria-describedby="email-error">' + err("email") + "</div></section>" +

    '<section class="step" aria-labelledby="s2"><h2 class="step__title" id="s2"><span class="step__num" aria-hidden="true">2</span>Delivery</h2>' +
    '<fieldset class="radio-cards"><legend class="sr-only">Delivery or pickup</legend>' +
    '<label class="radio-card"><input type="radio" name="fulfillment" value="delivery" checked><span class="radio-card__mark">' + UI.icon("check") + '</span><span class="radio-card__body"><span class="radio-card__title">Delivery</span><span class="radio-card__sub">Georgetown and Regions 3, 4 and 5</span></span><span class="radio-card__side">from ' + UI.money(800) + "</span></label>" +
    '<label class="radio-card"><input type="radio" name="fulfillment" value="pickup"><span class="radio-card__mark">' + UI.icon("check") + '</span><span class="radio-card__body"><span class="radio-card__title">Store pickup</span><span class="radio-card__sub">' + UI.esc(S.store.address) + " · same day</span></span><span class=\"radio-card__side\">Free</span></label></fieldset>" +
    '<div id="delivery-fields" style="display:grid;gap:var(--space-4)">' +
    '<div class="field" data-field="zone"><label for="zone">Zone</label><select class="select" id="zone" name="zone" aria-describedby="zone-error"><option value="">Choose your area</option>' + zoneOpts + "</select>" + err("zone") + "</div>" +
    '<div class="field" data-field="address"><label for="address">Address or landmark</label><textarea class="textarea" id="address" name="address" autocomplete="street-address" placeholder="e.g. Lot 5 Pike St, Kitty — green house next to the school" aria-describedby="address-help address-error"></textarea><p class="helper" id="address-help">A landmark helps our driver find you.</p>' + err("address") + "</div></div>" +
    '<p class="form-note" id="pickup-note" hidden>' + UI.icon("store") + "<span>Pick up at " + UI.esc(S.store.address) + " · " + S.store.hours.map(function (h) { return h[0] + " " + h[1]; }).join(" · ") + ". We’ll message you on WhatsApp when it’s ready.</span></p></section>" +

    '<section class="step" aria-labelledby="s3"><h2 class="step__title" id="s3"><span class="step__num" aria-hidden="true">3</span>Payment</h2>' +
    '<div class="field" data-field="payment"><fieldset class="radio-cards" aria-describedby="payment-error"><legend class="sr-only">Payment method</legend>' +
    '<label class="radio-card"><input type="radio" name="payment" value="mmg"><span class="radio-card__mark">' + UI.icon("check") + '</span><span class="radio-card__body"><span class="radio-card__title">MMG</span><span class="radio-card__sub">Send from your phone, we confirm on WhatsApp</span></span></label>' +
    '<label class="radio-card" id="cod-card"><input type="radio" name="payment" value="cod"><span class="radio-card__mark">' + UI.icon("check") + '</span><span class="radio-card__body"><span class="radio-card__title" id="cod-title">Cash on Delivery</span><span class="radio-card__sub" id="cod-sub">Georgetown and East Bank</span></span></label>' +
    '<label class="radio-card' + (S.cardEnabled ? "" : " is-disabled") + '"><input type="radio" name="payment" value="card"' + (S.cardEnabled ? "" : " disabled") + '><span class="radio-card__mark">' + UI.icon("check") + '</span><span class="radio-card__body"><span class="radio-card__title">Card</span><span class="radio-card__sub">' + (S.cardEnabled ? "Visa or Mastercard" : "Visa and Mastercard coming soon. Pay with MMG or cash for now.") + "</span></span></label>" +
    "</fieldset>" + err("payment") + "</div>" +
    '<p class="form-note" id="cod-why" hidden>' + UI.icon("alert") + "<span>Cash on delivery is available in Georgetown and East Bank Demerara. For your area, pay with MMG — it only takes a minute.</span></p>" +
    '<div class="pay-note" id="mmg-note" hidden></div></section>' +

    '<div class="place-order"><p class="form-note form-error" id="form-error" role="alert" tabindex="-1"></p>' +
    '<button class="btn btn--primary btn--block" type="submit" id="place"></button>' +
    '<p class="meta" style="text-align:center">By placing your order you agree to our <a href="/how-to-order#returns">returns policy</a> and <a href="/privacy">privacy policy</a>.</p></div>' +
    "</form></div>";

  var form = document.getElementById("checkout-form");
  var F = function (n) { return form.elements[n]; };

  // Restore draft so nothing typed is ever lost.
  ["name", "phone", "email", "zone", "address"].forEach(function (k) { if (draft[k]) F(k).value = draft[k]; });
  if (!draft.zone && UI.store("zone")) F("zone").value = UI.store("zone");
  if (draft.fulfillment) form.querySelector('input[name=fulfillment][value="' + draft.fulfillment + '"]').checked = true;
  if (draft.payment) { var pr = form.querySelector('input[name=payment][value="' + draft.payment + '"]'); if (pr && !pr.disabled) pr.checked = true; }

  function val(name) { var el = form.querySelector("input[name=" + name + "]:checked"); return el ? el.value : ""; }
  function totals() {
    var sub = UI.Bag.subtotal(), type = val("fulfillment"), zid = F("zone").value;
    var fee = type === "delivery" && !zid ? undefined : UI.deliveryFee(type, zid, sub);
    return { sub: sub, fee: fee, total: sub + (fee || 0), type: type, zone: zid };
  }

  function renderSummary() {
    var t = totals();
    var feeText = t.fee === undefined ? "Choose your zone" : t.fee === null ? "Confirmed on WhatsApp" : t.fee === 0 ? "Free" : UI.money(t.fee);
    var nudge = "";
    if (t.type === "delivery" && t.zone === S.freeDelivery.zone && t.sub < S.freeDelivery.threshold) {
      nudge = '<p class="form-note">' + UI.icon("truck") + "<span>Add " + UI.money(S.freeDelivery.threshold - t.sub) + ' more for free delivery. <a href="/category?c=best-sellers">Keep shopping</a></span></p>';
    }
    document.getElementById("sum-body").innerHTML = '<ul class="summary__items">' + lines.map(function (l) {
      return '<li class="summary__item">' + UI.placeholder(l.product.images[0], "4x5", "ph--mini") + "<div><strong>" + UI.esc(l.product.name) + "</strong>" + UI.esc(l.variant.color) + " / " + UI.esc(l.variant.size) + " · x" + l.qty + '</div><span class="price">' + UI.money(l.lineTotal) + "</span></li>";
    }).join("") + "</ul>" +
      '<div class="totals"><div class="totals__row"><span>Subtotal</span><span class="price">' + UI.money(t.sub) + "</span></div>" +
      '<div class="totals__row' + (t.fee === 0 ? " totals__row--free" : "") + '"><span>' + (t.type === "pickup" ? "Store pickup" : "Delivery") + "</span><span>" + feeText + "</span></div>" +
      '<div class="totals__row totals__row--total"><span>Total</span><span class="price">' + UI.money(t.total) + "</span></div></div>" + nudge +
      '<p class="meta" style="text-align:center"><a href="/cart">Edit bag</a></p>';
    document.getElementById("sum-head").textContent = UI.money(t.total);
    document.getElementById("place").textContent = "Place order · " + UI.moneyPlain(t.total);
  }

  function renderOptions() {
    var t = totals(), pickup = t.type === "pickup";
    document.getElementById("delivery-fields").style.display = pickup ? "none" : "grid";
    document.getElementById("pickup-note").hidden = !pickup;
    var codOk = pickup || S.codZones.indexOf(t.zone) > -1 || !t.zone;
    var cod = document.getElementById("cod-card"), codInput = cod.querySelector("input");
    document.getElementById("cod-title").textContent = pickup ? "Cash at pickup" : "Cash on Delivery";
    document.getElementById("cod-sub").textContent = pickup ? "Pay when you collect your order" : "Georgetown and East Bank";
    cod.hidden = !codOk;
    document.getElementById("cod-why").hidden = codOk;
    if (!codOk && codInput.checked) codInput.checked = false;
    var mmg = document.getElementById("mmg-note");
    mmg.hidden = val("payment") !== "mmg";
    mmg.innerHTML = "<p><strong>How MMG works:</strong> after you place your order, send " + UI.moneyPlain(t.total) + " to <strong>" + S.mmgNumber + "</strong> and use your order number as reference. We’ll confirm on WhatsApp " + S.confirmTime + ".</p>";
    renderSummary();
  }

  /* ---------- Validation (on blur and on submit, never per keystroke) ---------- */
  var rules = {
    name: function () { return F("name").value.trim().length >= 2 ? "" : "Enter your full name so we know who the order is for."; },
    phone: function () { var d = F("phone").value.replace(/\D/g, "").replace(/^592/, ""); return d.length === 7 ? "" : "Enter a 7-digit phone number, like 600 0000."; },
    email: function () { var v = F("email").value.trim(); return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Check your email, like name@example.com — or leave it empty."; },
    zone: function () { return val("fulfillment") === "pickup" || F("zone").value ? "" : "Choose your area so we can calculate delivery."; },
    address: function () { return val("fulfillment") === "pickup" || F("address").value.trim().length >= 5 ? "" : "Add your address or a landmark near you."; },
    payment: function () { return val("payment") ? "" : "Choose how you’d like to pay."; },
  };
  function check(name) {
    var msg = rules[name](), wrap = form.querySelector('[data-field="' + name + '"]'), e = document.getElementById(name + "-error");
    wrap.classList.toggle("has-error", !!msg);
    e.innerHTML = msg ? UI.icon("alert") + "<span>" + msg + "</span>" : "";
    var input = F(name);
    if (input && input.setAttribute) input.setAttribute("aria-invalid", !!msg);
    return !msg;
  }
  ["name", "phone", "email", "zone", "address"].forEach(function (n) {
    F(n).addEventListener("blur", function () { if (F(n).value || form.querySelector('[data-field="' + n + '"]').classList.contains("has-error")) check(n); });
  });

  function saveDraft() {
    UI.store("checkout-draft", { name: F("name").value, phone: F("phone").value, email: F("email").value, zone: F("zone").value, address: F("address").value, fulfillment: val("fulfillment"), payment: val("payment") });
    if (F("zone").value) UI.store("zone", F("zone").value);
  }
  form.addEventListener("input", saveDraft);
  form.addEventListener("change", function (e) {
    if (e.target.name === "payment") check("payment");
    if (e.target.name === "zone") check("zone");
    renderOptions(); saveDraft();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fe = document.getElementById("form-error");
    fe.classList.remove("is-visible");
    var firstBad = null;
    Object.keys(rules).forEach(function (n) { if (!check(n) && !firstBad) firstBad = n; });
    if (firstBad) {
      var el = firstBad === "payment" ? form.querySelector("input[name=payment]:not([disabled])") : F(firstBad);
      el.focus();
      return;
    }
    var t = totals(), btn = document.getElementById("place");
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Placing order…';
    var order = {
      id: "GY-" + String(Math.floor(10000 + Math.random() * 90000)),
      date: new Date().toISOString(),
      customer: { name: F("name").value.trim(), phone: "+592 " + F("phone").value.replace(/\D/g, "").replace(/^592/, ""), email: F("email").value.trim() || undefined },
      fulfillment: { type: t.type, zone: t.type === "delivery" ? t.zone : undefined, address: t.type === "delivery" ? F("address").value.trim() : undefined },
      payment: val("payment"),
      status: "pending_payment",
      items: lines.map(function (l) { return { variantId: l.variantId, qty: l.qty, name: l.product.name, color: l.variant.color, size: l.variant.size, price: l.product.price, image: l.product.images[0] }; }),
      subtotal: t.sub, deliveryFee: t.fee, total: t.total,
    };
    function done() {
      var orders = UI.store("orders") || [];
      orders.unshift(order);
      UI.store("orders", orders.slice(0, 20));
      UI.store("checkout-draft", null);
      UI.Bag.clear();
      location.href = "/order?id=" + encodeURIComponent(order.id);
    }
    function fail() {
      btn.disabled = false;
      renderSummary();
      fe.innerHTML = UI.icon("alert") + '<span>Something went wrong on our side. Your details are saved — try again or <a href="' + UI.waUrl(UI.WA.bag(lines, UI.zone(t.zone) && UI.zone(t.zone).name)) + '" target="_blank" rel="noopener">chat with us</a>.</span>';
      fe.classList.add("is-visible");
      fe.focus();
    }
    if (S.orderEndpoint) {
      fetch(S.orderEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); }).catch(fail);
    } else {
      setTimeout(done, 400);
    }
  });

  // Summary: collapsible on mobile, always open on desktop.
  var mq = matchMedia("(min-width: 1024px)"), sum = document.getElementById("summary");
  function syncSummary() { sum.open = mq.matches; }
  syncSummary(); mq.addEventListener("change", syncSummary);
  renderOptions();
})();
