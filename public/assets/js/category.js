/* Category listing (PLP) + FilterSheet — page-blueprints §2. */
(function () {
  var CAT = window.CATALOG, UI = window.UI, SEC = window.SECTIONS, S = window.SHOP;
  var PAGE = 12;
  var c = UI.qs("c"), q = (UI.qs("q") || "").trim();
  var col, crumbs = [];
  if (q) {
    var words = q.toLowerCase().split(/\s+/);
    col = { title: "Results for “" + q + "”", items: CAT.products.filter(function (p) {
      var cat = CAT.category(p.category);
      var hay = (p.name + " " + cat.name + " " + p.world + " " + p.details + " " + UI.colorsOf(p).map(function (x) { return x.name; }).join(" ")).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) > -1 || hay.indexOf(w.replace(/s$/, "")) > -1; });
    }) };
    crumbs = ["Search"];
  } else {
    col = (c && SEC.collection(c)) || { title: "All products", items: CAT.products.slice() };
    if (col.crumb) crumbs.push(col.crumb);
  }
  document.title = col.title + " — ShipShop";
  var base = col.items;

  var state = { sizes: [], colors: [], cats: [], min: "", max: "", inStock: false, sort: "featured", shown: PAGE };

  // Facets available in this listing.
  function uniq(arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); }
  var sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "1X", "2X", "3X", "4X"];
  var sizes = uniq([].concat.apply([], base.map(UI.sizesOf))).sort(function (a, b) {
    var ia = sizeOrder.indexOf(a), ib = sizeOrder.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  var colorMap = {};
  base.forEach(function (p) { UI.colorsOf(p).forEach(function (x) { colorMap[x.name] = x.hex; }); });
  var colors = Object.keys(colorMap).sort();
  var cats = uniq(base.map(function (p) { return p.category; }));

  function apply() {
    var min = parseInt(state.min, 10), max = parseInt(state.max, 10);
    var list = base.filter(function (p) {
      if (state.inStock && !UI.inStock(p)) return false;
      if (state.cats.length && state.cats.indexOf(p.category) < 0) return false;
      if (!isNaN(min) && p.price < min) return false;
      if (!isNaN(max) && p.price > max) return false;
      return p.variants.some(function (v) {
        return (!state.sizes.length || state.sizes.indexOf(v.size) > -1) &&
          (!state.colors.length || state.colors.indexOf(v.color) > -1) &&
          (!state.inStock || v.stock > 0);
      });
    });
    var sorters = {
      featured: function (a, b) { return a.order - b.order; },
      newest: function (a, b) { return (b.isNew - a.isNew) || (a.order - b.order); },
      "price-asc": function (a, b) { return a.price - b.price; },
      "price-desc": function (a, b) { return b.price - a.price; },
    };
    return list.sort(sorters[state.sort]);
  }
  function activeCount() {
    return state.sizes.length + state.colors.length + state.cats.length + (state.min ? 1 : 0) + (state.max ? 1 : 0) + (state.inStock ? 1 : 0);
  }

  /* ---------- Markup ---------- */
  function optGroup(prefix, legend, name, values, label, swatch) {
    if (values.length < 2 && name !== "inStock") return "";
    return "<fieldset><legend>" + legend + '</legend><div class="opts">' + values.map(function (v, i) {
      return '<label class="opt"><input type="checkbox" name="' + name + '" value="' + UI.esc(v) + '" id="' + prefix + name + i + '"><span>' +
        (swatch ? '<i class="dot" style="background:' + colorMap[v] + '" aria-hidden="true"></i>' : "") + UI.esc(label ? label(v) : v) + "</span></label>";
    }).join("") + "</div></fieldset>";
  }
  function filtersHTML(prefix, withSort) {
    var sort = withSort ? '<fieldset><legend>Sort by</legend><div class="opts">' + [["featured", "Featured"], ["newest", "Newest"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"]].map(function (o) {
      return '<label class="opt"><input type="radio" name="sort" value="' + o[0] + '"><span>' + o[1] + "</span></label>";
    }).join("") + "</div></fieldset>" : "";
    return sort +
      optGroup(prefix, "Category", "cats", cats, function (v) { return CAT.category(v).name; }) +
      optGroup(prefix, "Size", "sizes", sizes) +
      optGroup(prefix, "Color", "colors", colors, null, true) +
      '<fieldset><legend>Price (GY$)</legend><div class="price-range">' +
      '<div class="field"><label for="' + prefix + 'min">Min</label><input class="input" id="' + prefix + 'min" name="min" type="number" inputmode="numeric" min="0" step="500" placeholder="0"></div>' +
      '<div class="field"><label for="' + prefix + 'max">Max</label><input class="input" id="' + prefix + 'max" name="max" type="number" inputmode="numeric" min="0" step="500" placeholder="20,000"></div></div></fieldset>' +
      '<fieldset><legend class="sr-only">Availability</legend><label class="check"><input type="checkbox" name="inStock"> <span>In stock only</span></label></fieldset>';
  }

  var crumbHTML = '<nav class="breadcrumb container" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>' +
    crumbs.map(function (x) { return "<li>" + UI.esc(x) + "</li>"; }).join("") + '<li aria-current="page">' + UI.esc(col.title) + "</li></ol></nav>";

  document.getElementById("main").innerHTML = crumbHTML +
    '<div class="container page-head"><h1>' + UI.esc(col.title) + '</h1><p class="meta" id="count" aria-live="polite"></p></div>' +
    '<div class="filter-bar"><div class="container filter-bar__inner"><button class="chip filter-btn" type="button" id="open-filters" aria-controls="filter-sheet" aria-expanded="false">' + UI.icon("filter") + '<span id="filter-label">Filter &amp; Sort</span></button><span class="chips" id="chips-mob" style="display:contents"></span></div></div>' +
    '<div class="container plp">' +
    '<aside class="plp__aside" aria-label="Filters"><form class="filters" id="f-desk">' + filtersHTML("d-", false) + "</form></aside>" +
    "<div>" +
    '<div class="plp__top"><div class="chips" id="chips-desk"></div><div class="field"><label class="sr-only" for="sort-desk">Sort by</label><select class="select sort-select" id="sort-desk"><option value="featured">Sort by: Featured</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div></div>' +
    '<ul class="grid" id="grid"></ul><div id="empty"></div>' +
    '<div class="plp__more" id="more"></div>' +
    '<p class="plp__help">Can’t find it? <a class="text-link" href="' + UI.waUrl(UI.WA.help(true)) + '" target="_blank" rel="noopener">Ask us on WhatsApp</a></p>' +
    "</div></div>" +
    '<div class="layer sheet sheet--bottom sheet--filters" id="filter-sheet" role="dialog" aria-modal="true" aria-labelledby="filters-title" hidden>' +
    '<div class="layer__scrim" data-close-layer></div><div class="sheet__panel">' +
    '<div class="sheet__head"><h2 class="sheet__title" id="filters-title">Filter &amp; Sort</h2><button class="icon-btn" type="button" data-close-layer aria-label="Close filters">' + UI.icon("close") + "</button></div>" +
    '<div class="sheet__body"><form class="filters" id="f-mob">' + filtersHTML("m-", true) + "</form></div>" +
    '<div class="sheet__foot"><button class="btn btn--secondary" type="button" id="clear-mob">Clear all</button><button class="btn btn--primary" type="button" id="show-mob" data-close-layer></button></div>' +
    "</div></div>";

  var forms = [document.getElementById("f-desk"), document.getElementById("f-mob")];
  var sortDesk = document.getElementById("sort-desk");

  function syncForms() {
    forms.forEach(function (f) {
      f.querySelectorAll("input[type=checkbox]").forEach(function (i) {
        i.checked = i.name === "inStock" ? state.inStock : state[i.name].indexOf(i.value) > -1;
      });
      f.querySelectorAll("input[name=sort]").forEach(function (i) { i.checked = i.value === state.sort; });
      ["min", "max"].forEach(function (k) { var i = f.querySelector("input[name=" + k + "]"); if (document.activeElement !== i) i.value = state[k]; });
    });
    sortDesk.value = state.sort;
  }

  function chipsHTML() {
    var out = [];
    function chip(label, kind, value) {
      out.push('<button type="button" class="chip" data-unset="' + kind + '" data-value="' + UI.esc(value) + '" aria-label="Remove filter ' + UI.esc(label) + '">' + UI.esc(label) + UI.icon("close") + "</button>");
    }
    state.cats.forEach(function (v) { chip(CAT.category(v).name, "cats", v); });
    state.sizes.forEach(function (v) { chip("Size " + v, "sizes", v); });
    state.colors.forEach(function (v) { chip(v, "colors", v); });
    if (state.min) chip("From " + UI.moneyPlain(state.min), "min", "");
    if (state.max) chip("Up to " + UI.moneyPlain(state.max), "max", "");
    if (state.inStock) chip("In stock", "inStock", "");
    if (out.length) out.push('<button type="button" class="link-btn" data-clear>Clear all</button>');
    return out.join("");
  }

  function render() {
    var list = apply(), n = list.length, shown = list.slice(0, state.shown), ac = activeCount();
    document.getElementById("count").textContent = n + (n === 1 ? " product" : " products");
    document.getElementById("grid").innerHTML = shown.map(function (p) { return "<li>" + UI.productCard(p) + "</li>"; }).join("");
    document.getElementById("empty").innerHTML = n ? "" :
      '<div class="empty"><span class="empty__icon">' + UI.icon("search") + '</span><p class="empty__title">No products match these filters.</p>' +
      (ac ? '<button class="btn btn--secondary" type="button" data-clear>Clear filters</button>' : '<a class="btn btn--secondary" href="/category?c=new">See new arrivals</a>') +
      '<a class="wa-text" href="' + UI.waUrl(UI.WA.help(true)) + '" target="_blank" rel="noopener">' + UI.waGlyph() + '<span class="u">Ask us on WhatsApp</span></a></div>';
    document.getElementById("more").innerHTML = n > PAGE ? '<p class="meta">Showing ' + shown.length + " of " + n + "</p>" +
      (shown.length < n ? '<button class="btn btn--secondary" type="button" id="load-more">Load more</button>' : "") : "";
    document.getElementById("filter-label").textContent = "Filter & Sort" + (ac ? " (" + ac + ")" : "");
    document.getElementById("show-mob").textContent = "Show " + n + (n === 1 ? " product" : " products");
    var chips = chipsHTML();
    document.getElementById("chips-desk").innerHTML = chips;
    document.getElementById("chips-mob").innerHTML = chips;
    syncForms();
  }

  function readForm(f, changed) {
    if (changed.name === "sort") state.sort = changed.value;
    else if (changed.name === "inStock") state.inStock = changed.checked;
    else if (changed.name === "min" || changed.name === "max") state[changed.name] = changed.value.replace(/\D/g, "");
    else {
      var arr = state[changed.name], i = arr.indexOf(changed.value);
      if (changed.checked && i < 0) arr.push(changed.value);
      if (!changed.checked && i > -1) arr.splice(i, 1);
    }
    state.shown = PAGE;
    render();
  }
  forms.forEach(function (f) {
    f.addEventListener("change", function (e) { readForm(f, e.target); });
    f.addEventListener("submit", function (e) { e.preventDefault(); });
  });
  sortDesk.addEventListener("change", function () { state.sort = sortDesk.value; render(); });

  function clearAll() { state.sizes = []; state.colors = []; state.cats = []; state.min = ""; state.max = ""; state.inStock = false; state.shown = PAGE; render(); }
  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-unset]"))) {
      var k = t.getAttribute("data-unset"), v = t.getAttribute("data-value");
      if (k === "min" || k === "max") state[k] = ""; else if (k === "inStock") state.inStock = false;
      else state[k] = state[k].filter(function (x) { return x !== v; });
      render();
      var f = document.querySelector(".chips [data-unset]") || document.getElementById("count");
      if (f && f.focus) f.focus();
    } else if (e.target.closest("[data-clear]") || e.target.id === "clear-mob") { clearAll(); }
    else if (e.target.id === "load-more") {
      var before = state.shown;
      state.shown += PAGE;
      render();
      var cards = document.querySelectorAll("#grid .card__link");
      if (cards[before]) cards[before].focus();
    }
  });
  document.getElementById("open-filters").addEventListener("click", function (e) {
    UI.openLayer(document.getElementById("filter-sheet"), e.currentTarget);
  });
  render();
})();
