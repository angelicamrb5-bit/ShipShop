/* ShipShop business facts — the ONE place for store data.
   Values marked EXAMPLE come from the guide and must be confirmed by the client before launch
   (see brand-foundations §6). Anything marked CLIENT TO SUPPLY is still missing. */
window.SHOP = {
  name: "ShipShop",
  signature: "Come and buy with us — it’s easier for you.",

  // EXAMPLE — confirm. Digits only, country code first (used for wa.me links).
  whatsapp: "5926000000",
  phoneDisplay: "+592 600 0000",

  // EXAMPLE — confirm.
  store: {
    address: "Lot 12 Regent St, Georgetown",
    hours: [["Mon–Sat", "9am–6pm"], ["Sun", "Closed"]],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Regent+Street+Georgetown+Guyana",
  },

  // EXAMPLE — confirm.
  freeDelivery: { zone: "georgetown", threshold: 10000 },
  zones: [
    { id: "georgetown",    name: "Georgetown",           region: "Region 4", time: "24–48h",    fee: 800 },
    { id: "east-bank",     name: "East Bank Demerara",   region: "Region 4", time: "1–2 days",  fee: 1200 },
    { id: "east-coast",    name: "East Coast Demerara",  region: "Region 4", time: "1–2 days",  fee: 1200 },
    { id: "west-demerara", name: "West Demerara",        region: "Region 3", time: "2–3 days",  fee: 1500 },
    { id: "berbice",       name: "Berbice",              region: "Region 5", time: "2–3 days",  fee: 2000 },
    { id: "other",         name: "Other",                region: "",         time: "We’ll confirm on WhatsApp", fee: null },
  ],
  pickup: { time: "Same day", fee: 0 },
  codZones: ["georgetown", "east-bank"],
  deliveryEstimate: "Georgetown: tomorrow · Regions 3/4/5: 2–3 days",

  mmgNumber: "600-0000",           // EXAMPLE — confirm
  cardEnabled: false,              // CLIENT TO SUPPLY: card gateway
  confirmTime: "within 1 hour",    // EXAMPLE — confirm
  returns: "Free returns within 7 days", // EXAMPLE — confirm
  clubOffer: "10% off your first order", // EXAMPLE — confirm

  // CLIENT TO SUPPLY: real social profile URLs.
  social: [
    { name: "Instagram", url: "" },
    { name: "TikTok", url: "" },
    { name: "Facebook", url: "" },
  ],

  // Optional: URL that receives orders as JSON (POST). Leave empty to keep orders on-device
  // and send them to the store through WhatsApp from the confirmation page.
  orderEndpoint: "",
  // Optional: URL that receives club sign-ups as JSON (POST).
  clubEndpoint: "",
};
