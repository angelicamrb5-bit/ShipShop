/* ShipShop catalog — SAMPLE DATA.
   Product names, prices, stock, ratings and photos are placeholders to stress-test the layouts.
   CLIENT TO SUPPLY: real catalog, photos (4:5, 4-6 per product) and verified reviews.
   Shape follows the data model in components.md (Product / variants). Prices are GYD integers. */
(function () {
  var CATEGORIES = [
    { id: "women", name: "Women", world: "fashion" },
    { id: "men", name: "Men", world: "fashion" },
    { id: "kids", name: "Kids", world: "fashion" },
    { id: "accessories", name: "Accessories", world: "fashion" },
    { id: "plus-size", name: "Plus Size", world: "fashion" },
    { id: "home", name: "Home", world: "home" },
    { id: "gifts", name: "Gifts", world: "home" },
    { id: "beauty", name: "Beauty", world: "home" },
    { id: "toys", name: "Kids & Toys", world: "home" },
  ];

  var C = {
    sand: ["Sand", "#D8C3A5"], white: ["White", "#FFFFFF"], black: ["Black", "#1E1E1E"],
    rose: ["Rose", "#C98A94"], sage: ["Sage", "#9AAE95"], navy: ["Navy", "#26324A"],
    coral: ["Coral", "#E9806E"], lilac: ["Lilac", "#B9A3C9"], olive: ["Olive", "#6E6B3E"],
    denim: ["Denim", "#5677A0"], gold: ["Gold", "#C7A44A"], cream: ["Cream", "#F2E8D5"],
    terracotta: ["Terracotta", "#B5603F"], sky: ["Sky", "#9CC3DD"], yellow: ["Sunshine", "#F2CC5B"],
    grey: ["Grey", "#9A9A9A"], natural: ["Natural", "#E6DAC3"], blush: ["Blush", "#EBC1BC"],
  };
  var CLOTHING = ["XS", "S", "M", "L", "XL"];
  var PLUS = ["1X", "2X", "3X", "4X"];
  var KIDS = ["2-3Y", "4-5Y", "6-7Y", "8-9Y"];
  var ONE = ["One size"];

  // Deterministic sample stock so the same product always shows the same state.
  function seed(str) { var h = 0; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; }

  function P(o) {
    var colors = o.colors.map(function (k) { return C[k]; });
    var s = seed(o.slug);
    var variants = [];
    colors.forEach(function (c, ci) {
      o.sizes.forEach(function (size, si) {
        var stock = 4 + ((s >>> ((ci * 3 + si) % 20)) % 12);
        if (o.lowStock && ci === 0 && si === Math.min(2, o.sizes.length - 1)) stock = 3;
        if (o.soldOut && ci === 0 && si === 0) stock = 0;
        if (o.allSoldOut) stock = 0;
        variants.push({
          id: o.slug + "--" + c[0].toLowerCase() + "--" + size.toLowerCase().replace(/\s+/g, "-"),
          color: c[0], colorHex: c[1], size: size, stock: stock,
        });
      });
    });
    var cat = CATEGORIES.filter(function (c) { return c.id === o.category; })[0];
    var badges = [];
    if (o.isNew) badges.push("new");
    if (o.compareAtPrice) badges.push("sale");
    if (o.lowStock) badges.push("low-stock");
    return {
      id: "p" + (s % 100000), slug: o.slug, name: o.name, world: cat.world, category: o.category,
      price: o.price, compareAtPrice: o.compareAtPrice, badges: badges,
      images: o.images, variants: variants, details: o.details,
      rating: o.rating, reviewCount: o.reviewCount,
      bestSeller: !!o.bestSeller, backInStock: !!o.backInStock, isNew: !!o.isNew, order: o.order || 0,
    };
  }

  var VIEWS = function (desc) {
    return [desc + ", front", desc + ", back", desc + ", fabric detail", desc + ", on model in daylight"];
  };
  var OBJ = function (desc) {
    return [desc + ", front", desc + ", side", desc + ", detail", desc + ", in use at home"];
  };

  var list = [
    P({ slug: "linen-wrap-midi-dress", name: "Linen wrap midi dress", category: "women", price: 8500, compareAtPrice: 10500, colors: ["sand", "rose", "sage", "black"], sizes: CLOTHING, lowStock: true, bestSeller: true, isNew: true, order: 1, rating: 4.6, reviewCount: 23, images: VIEWS("Linen wrap dress in sand, midi length, tie waist"), details: "Breathable linen blend with a tie waist and flutter sleeves. Midi length. Machine wash cold, line dry." }),
    P({ slug: "puff-sleeve-cotton-blouse", name: "Puff sleeve cotton blouse", category: "women", price: 4500, colors: ["white", "blush", "sky"], sizes: CLOTHING, isNew: true, order: 2, rating: 4.4, reviewCount: 12, images: VIEWS("White cotton blouse with puff sleeves and square neck"), details: "Light cotton poplin, square neckline and short puff sleeves. Easy to pair with jeans or skirts." }),
    P({ slug: "high-waist-wide-leg-trousers", name: "High-waist wide-leg trousers with side pockets", category: "women", price: 6800, colors: ["cream", "black", "olive"], sizes: CLOTHING, bestSeller: true, order: 8, rating: 4.7, reviewCount: 31, images: VIEWS("Cream wide-leg trousers, high waist, side pockets"), details: "Flowing wide-leg trousers with an elastic back waist and deep side pockets. Cool for the heat." }),
    P({ slug: "floral-tiered-maxi-skirt", name: "Floral tiered maxi skirt", category: "women", price: 5900, compareAtPrice: 7200, colors: ["coral", "lilac"], sizes: CLOTHING, soldOut: true, order: 12, rating: 4.3, reviewCount: 9, images: VIEWS("Coral floral tiered maxi skirt"), details: "Three-tier maxi skirt in a soft floral print, elastic waist, fully lined." }),
    P({ slug: "satin-slip-dress", name: "Satin slip dress", category: "women", price: 9200, colors: ["gold", "black", "rose"], sizes: CLOTHING, isNew: true, order: 3, images: VIEWS("Gold satin slip dress, adjustable straps"), details: "Bias-cut satin slip dress with adjustable straps. Made for evenings and celebrations." }),
    P({ slug: "classic-linen-shirt-men", name: "Classic linen shirt", category: "men", price: 6200, colors: ["white", "sky", "sand", "navy", "olive"], sizes: CLOTHING, bestSeller: true, order: 9, rating: 4.8, reviewCount: 40, images: VIEWS("Men's white linen shirt, long sleeves, button front"), details: "Relaxed linen shirt with a button front and chest pocket. Roll the sleeves for hot days." }),
    P({ slug: "everyday-chino-shorts", name: "Everyday chino shorts", category: "men", price: 4200, colors: ["sand", "navy", "olive"], sizes: ["S", "M", "L", "XL", "XXL"], backInStock: true, order: 14, rating: 4.5, reviewCount: 18, images: VIEWS("Sand chino shorts, 9-inch inseam"), details: "Cotton stretch chino shorts with a 9-inch inseam and four pockets." }),
    P({ slug: "pique-polo-shirt", name: "Piqué polo shirt", category: "men", price: 3900, compareAtPrice: 4800, colors: ["navy", "white", "terracotta"], sizes: CLOTHING, isNew: true, order: 4, images: VIEWS("Navy piqué polo shirt"), details: "Breathable cotton piqué polo with a two-button placket." }),
    P({ slug: "kids-cotton-sundress", name: "Kids cotton sundress", category: "kids", price: 3200, colors: ["yellow", "blush", "sky"], sizes: KIDS, bestSeller: true, order: 10, rating: 4.9, reviewCount: 15, images: VIEWS("Kids sunshine-yellow cotton sundress with ruffle straps"), details: "Soft cotton sundress with ruffle straps and a full skirt. Easy to wash." }),
    P({ slug: "kids-graphic-tee-and-shorts-set", name: "Kids graphic tee and shorts set", category: "kids", price: 3800, colors: ["sky", "grey"], sizes: KIDS, backInStock: true, order: 15, rating: 4.6, reviewCount: 7, images: VIEWS("Kids sky-blue graphic tee with matching shorts"), details: "Two-piece cotton set: printed tee and pull-on shorts." }),
    P({ slug: "woven-straw-tote-bag", name: "Woven straw tote bag", category: "accessories", price: 4800, colors: ["natural"], sizes: ONE, bestSeller: true, isNew: true, order: 5, rating: 4.7, reviewCount: 26, images: OBJ("Natural woven straw tote bag with leather handles"), details: "Hand-woven straw tote with leather handles and an inner zip pocket. 40 × 30 cm." }),
    P({ slug: "gold-hoop-earrings", name: "Gold-tone hoop earrings", category: "accessories", price: 2500, colors: ["gold"], sizes: ONE, lowStock: true, order: 16, rating: 4.5, reviewCount: 34, images: OBJ("Gold-tone medium hoop earrings"), details: "Lightweight gold-tone hoops, 4 cm diameter. Nickel free." }),
    P({ slug: "silk-feel-hair-scarf", name: "Silk-feel hair scarf", category: "accessories", price: 1900, compareAtPrice: 2400, colors: ["rose", "lilac", "coral", "navy", "sage", "gold"], sizes: ONE, order: 17, images: OBJ("Rose silk-feel square hair scarf"), details: "Square satin scarf, 70 × 70 cm. Wear it in your hair, on your neck or on your bag." }),
    P({ slug: "plus-size-wrap-top", name: "Plus size wrap top", category: "plus-size", price: 5200, colors: ["terracotta", "black", "rose"], sizes: PLUS, isNew: true, order: 6, rating: 4.6, reviewCount: 11, images: VIEWS("Terracotta plus size wrap top with tie side"), details: "Jersey wrap top with a side tie and three-quarter sleeves. Soft stretch for comfort." }),
    P({ slug: "plus-size-shirt-dress", name: "Plus size belted shirt dress", category: "plus-size", price: 7900, colors: ["denim", "sage"], sizes: PLUS, bestSeller: true, order: 11, rating: 4.8, reviewCount: 19, images: VIEWS("Denim-blue belted shirt dress, knee length"), details: "Button-front shirt dress with a removable belt and roll-up sleeves. Knee length." }),
    P({ slug: "linen-cushion-cover-set", name: "Linen cushion cover set of 2", category: "home", price: 4400, colors: ["natural", "terracotta", "sage"], sizes: ["45 × 45 cm"], bestSeller: true, order: 18, rating: 4.7, reviewCount: 22, images: OBJ("Two natural linen cushion covers on a sofa"), details: "Set of two washed-linen cushion covers with hidden zip. Inserts not included." }),
    P({ slug: "ceramic-dinner-plate-set", name: "Stoneware dinner plate set of 4", category: "home", price: 9800, compareAtPrice: 11800, colors: ["cream", "blush"], sizes: ["27 cm"], isNew: true, order: 7, images: OBJ("Four cream stoneware dinner plates stacked"), details: "Glazed stoneware plates, 27 cm. Dishwasher and microwave safe." }),
    P({ slug: "scented-soy-candle", name: "Scented soy candle — coconut & lime", category: "home", price: 2800, colors: ["cream"], sizes: ["200 g"], backInStock: true, order: 19, rating: 4.4, reviewCount: 29, images: OBJ("Soy candle in a cream ceramic jar"), details: "Hand-poured soy wax candle in a reusable jar. Around 40 hours of burn time." }),
    P({ slug: "cotton-bath-towel-set", name: "Cotton bath towel set", category: "home", price: 6500, colors: ["white", "grey", "blush"], sizes: ["Set of 3"], order: 20, rating: 4.5, reviewCount: 14, images: OBJ("Folded white cotton bath towels"), details: "Set of three: bath towel, hand towel and face cloth. 100% cotton, 550 gsm." }),
    P({ slug: "pamper-gift-box", name: "Pamper gift box", category: "gifts", price: 7500, colors: ["blush"], sizes: ONE, bestSeller: true, order: 21, rating: 4.9, reviewCount: 17, images: OBJ("Blush gift box with candle, body butter and hair scarf"), details: "A ready-to-give box with a soy candle, body butter and a satin hair scarf. Gift note included on request." }),
    P({ slug: "personalised-mug", name: "Name mug with gift wrap", category: "gifts", price: 2200, colors: ["white"], sizes: ONE, isNew: true, order: 22, images: OBJ("White ceramic mug with a hand-lettered name"), details: "Ceramic mug, 350 ml. Tell us the name on WhatsApp after you order; ready in 2 days." }),
    P({ slug: "shea-body-butter", name: "Whipped shea body butter", category: "beauty", price: 2600, colors: ["cream"], sizes: ["250 ml"], backInStock: true, order: 23, rating: 4.6, reviewCount: 38, images: OBJ("Jar of whipped shea body butter"), details: "Rich whipped shea butter with coconut oil. Fragrance-light. For all skin types." }),
    P({ slug: "makeup-brush-set", name: "Makeup brush set with pouch", category: "beauty", price: 3500, compareAtPrice: 4300, colors: ["rose"], sizes: ONE, allSoldOut: true, order: 24, rating: 4.2, reviewCount: 8, images: OBJ("Eight makeup brushes in a rose pouch"), details: "Eight soft synthetic brushes for face and eyes in a zip pouch." }),
    P({ slug: "wooden-stacking-toy", name: "Wooden rainbow stacking toy", category: "toys", price: 3900, colors: ["natural"], sizes: ["18 m+"], bestSeller: true, order: 25, rating: 4.8, reviewCount: 13, images: OBJ("Wooden rainbow stacking toy with seven arches"), details: "Seven painted wooden arches with child-safe paint. For 18 months and up." }),
    P({ slug: "plush-teddy-bear", name: "Soft plush teddy bear", category: "toys", price: 2900, colors: ["cream", "blush"], sizes: ["30 cm"], isNew: true, order: 26, images: OBJ("Cream plush teddy bear, 30 cm"), details: "Extra-soft plush bear, 30 cm. Surface wash only." }),
  ];

  window.CATALOG = {
    categories: CATEGORIES,
    products: list,
    bySlug: function (slug) { return list.filter(function (p) { return p.slug === slug; })[0]; },
    variant: function (id) {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].variants.length; j++) {
          if (list[i].variants[j].id === id) return { product: list[i], variant: list[i].variants[j] };
        }
      }
      return null;
    },
    category: function (id) { return CATEGORIES.filter(function (c) { return c.id === id; })[0]; },
    // Current season collection (SeasonBanner). Change by campaign.
    season: {
      id: "diwali", eyebrow: "Diwali", title: "Diwali Collection",
      line: "Gold details, soft satin and gifts to share with the people you love.",
      image: "Satin dresses, gold hoops and lit diyas on a blush table",
      slugs: ["satin-slip-dress", "gold-hoop-earrings", "silk-feel-hair-scarf", "plus-size-wrap-top", "ceramic-dinner-plate-set", "scented-soy-candle", "pamper-gift-box", "personalised-mug"],
    },
  };
})();
