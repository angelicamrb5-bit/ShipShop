# ShipShop - Components

Names in **bold** are the guide's component names; keep them exactly in designs, code and docs. Every component uses tokens from `tokens.css` only.

## Documentation format (use for every component)

```
Name · Purpose (one line)
Anatomy        numbered parts
Variants       e.g. primary / secondary / whatsapp
Sizes          heights, paddings, responsive behavior
States         default · hover · focus-visible · active · disabled · loading · error · empty · success
Tokens         list of tokens used
Accessibility  role, name, keyboard, contrast, target size
Content        copy rules and limits
Do / Don't     2-3 each
```

## Foundations

### Button
- **Variants:** Primary (bg `--color-primary`, text white; hover `--color-primary-strong`) · Secondary (2px `--color-ink` or `--color-primary` outline on Marfil, text same) · Text link (palo de rosa, underline on hover) · **WhatsApp** (bg `--color-whatsapp`, text/icon `--color-whatsapp-ink`, WhatsApp glyph left).
- Pill radius, 48px (52px for primary on mobile), padding 0 24px, Jakarta 600 15px, sentence case, full-width on mobile when it's the main action.
- States: disabled = Blush bg + Piedra text (never just lower opacity); loading = spinner replaces icon, label stays ("Placing order…"), button keeps width.
- One primary per screen. The WhatsApp button can sit beside the primary (PDP, cart): same size, never larger.

### Inputs (text, phone, select, radio, checkbox)
- 48px high, `--radius-card`, 1px `--color-field-border`, white or Marfil fill, label above (Jakarta 500 14px), helper text below (14px muted).
- Phone field with fixed "+592" prefix, numeric keyboard, labeled "Phone (WhatsApp)".
- Error: 2px `--color-primary-strong` border + error icon + message in `--color-ink` directly below, linked with `aria-describedby`; the message says how to fix it ("Enter a 7-digit phone number"). Never clear what the shopper typed. Validate on blur and on submit, not on every keystroke.
- Radio cards (delivery and payment choices): full-width card, 12px radius, selected = 2px palo de rosa border + check; show the price/condition on the right ("from GY$ 800", "Free").

### Chip / size selector / color swatch
- Size chips: pill, 44px min, label centered; selected = Tinta fill + Marfil text; unavailable = struck through + muted, still focusable with "(out of stock)" in its name.
- Color swatches: 32px circle inside 44px target, 1px line ring, selected = 2px Tinta ring; selected color name shown in text ("Color: Sand").

### Badge
- 4px radius, Jakarta 600 12px, sentence case: **New** (champán + tinta) · **Sale / -19%** (palo de rosa + white) · **Low stock** (Blush suave + warning-text). Max one badge per card.

## Global components

### **AnnouncementBar**
- Malva bg, Marfil text 13-14px, one line, centered. Default copy: "Free delivery in Georgetown on orders over GY$ 10,000 · Pay with MMG". Optional link to How to Order. No carousel of messages; one message at a time, changed by campaign.

### **Header**
- Mobile: hamburger · logo · search · bag (with counter). Desktop: logo · search field ("Search dresses, home, gifts…") · "Chat with us" (WhatsApp link) · Account · Wishlist · Bag (counter) and a nav row FASHION · HOME & MORE · NEW IN · SALE · How to order.
- Marfil bg, 1px line bottom. Sticky, compacts on scroll. Bag counter: palo de rosa circle, white number.

### **MegaMenu / MobileMenu**
- Two worlds: **FASHION** (Women, Men, Kids, Accessories, Plus Size) and **HOME & MORE** (Home, Gifts, Beauty, Kids & Toys), plus NEW IN and SALE. Nav labels may be uppercase here as the guide's wireframes show; keep them Jakarta 600 13-14px with modest tracking.
- Desktop: panel with category columns + one 16:9 promo image ("Diwali edit - shop now ›"). Opens on hover-intent and click; Esc closes; full keyboard support.
- Mobile: full-height sheet, two-world toggle at top, 50px rows with chevrons, then My account, Wishlist, How to order, WhatsApp CTA ("Chat with us on WhatsApp") and store address/hours at the bottom.

### **WhatsAppCTA**
- Variants: `floating` (56px circle, bottom-right, 16px from edges, above everything but sheets; **hidden on PDP mobile**), `button`, `link`.
- Always receives a pre-filled message (templates in `voice-and-copy.md`) and opens `https://wa.me/592XXXXXXX?text=` + `encodeURIComponent(message)`.
- Accessible name "Chat with us on WhatsApp"; opens in a new tab/app.

### **Footer**
- Malva bg, Marfil text. Columns: store (address, hours, small map + "Get directions"), contact (phone/WhatsApp, socials IG · TikTok · FB), help (Delivery, Returns, Size Guide, FAQ, Privacy, How to order), "We accept" payment logos (MMG, Visa/Mastercard, Cash on Delivery). Signature line next to the logo. Mobile: accordions for link groups; contact block always open.

## Merchandising components

### **ProductCard**
- Anatomy: 4:5 image (second image on hover, desktop) · badge (top-left) · wishlist heart (top-right, 44px target) · name (2 lines max) · price (+ struck-through original) · color swatches (max 4 + "+2").
- Whole card is one link; heart is a separate button. No "Add to bag" on the card by default (keeps grids calm); quick-add allowed on desktop only if the client asks.
- Empty/missing image: Blush placeholder with product name.

### **CategoryTile**
- Photo (1:1 or 4:5) + label below (Jakarta 600 15px) or on a bottom Marfil band. 3 cols mobile / 6 desktop on Home.

### **BenefitStrip**
- 4 items, icon + title + one line: Fast delivery (Georgetown 24-48h) · Pay with MMG or Cash on Delivery · Real people on WhatsApp · Easy returns. 2×2 grid on mobile, 4 in a row desktop, Blush suave bg. Each item may link to the relevant How to Order section.

### **SeasonBanner**
- Full-width image (scrim if text overlays) + eyebrow + Young Serif title ("Mashramani Collection") + one CTA ("Shop the collection"). One per page.

### **Tabs**
- Best Sellers / Under GY$ 5,000 / Back in Stock. Underline indicator in palo de rosa, Jakarta 600 15px, horizontally scrollable on mobile, ARIA tabs pattern.

### Carousel (New arrivals, Complete the look)
- Horizontal scroll-snap; peek of the next card on mobile; arrows on desktop; "See all" link in the section header. No auto-advance.

### **WaysToShop**
- 3 cards: Website · WhatsApp · Visit our store (address). Each: icon, title, one line, link. Intro line: the signature line. The WhatsApp card uses the WhatsApp link style; the others use text links.

### **ReviewCard**
- Stars · short quote · name and area ("Anita, Diamond EBD") · "verified" when applicable. Only real reviews; sample content labeled as such in mocks.

### SocialFeed ("Shop the look")
- 1:1 grid of 6 (3×2 mobile, 6×1 desktop), handle link, each tile links to the product(s) shown.

### ClubSignup
- Title "Join the club — get 10% off your first order", one field (WhatsApp number or email), button "Get my 10%", consent line. Blush bg.

## Shop flow components

### Breadcrumb · PLP header
- "Home / Women / Dresses" (14px muted) · H1 title · product count ("128 products").

### **FilterSheet**
- Mobile: "Filter & Sort" button (with active count) opens a bottom sheet: Sort by, Size, Color, Price (GYD range), Category, In stock only; "Clear all" + primary "Show 46 products". Active filters show as removable chips under the bar ("Size M ×"). Filter bar sticky on scroll.
- Desktop: left sidebar with the same groups, applied instantly.

### Gallery
- Swipe on mobile with "1 / 6" indicator and dots; desktop main 4:5 image with zoom on hover + thumbnails; optional video tile with play icon.

### Size guide (modal)
- Opened from "Size guide" link next to sizes. Table in cm/in `[CLIENT TO SUPPLY: measurements]`, how-to-measure illustration, "Still unsure? Ask us on WhatsApp".

### Accordion
- Details · Delivery & Payment · Returns. 52px rows, plus/minus icon, `<details>`-like behavior, first closed by default on mobile.

### Delivery estimate block
- Truck icon + "Estimated delivery" + per-zone lines. Blush suave panel, 12px radius.

### **StickyBuyBar**
- PDP mobile only, appears after the main buy buttons scroll out of view: price (left) · "Add to bag" (primary) · "WhatsApp" (WhatsApp button, compact). White/Marfil bg, `--shadow-sheet`, safe-area padding. The floating WhatsApp button is hidden on this page.

### **CartDrawer** (and /cart page with the same content)
- Title "Your bag (2)" · close · FreeDeliveryBar · line items (thumbnail, name, color/size, price, − qty +, Remove) · Subtotal · "Delivery calculated at checkout" · primary "Checkout" · WhatsApp "Send order via WhatsApp".
- Empty state: "Your bag is empty" + "Shop new arrivals" + WhatsApp link.

### Checkout sections
- Header: logo · "Secure checkout" · "Need help? Chat with us". No main nav.
- Order summary: collapsible at top on mobile ("Show order summary ▾ GY$ 8,000"), pinned right on desktop.
- 1 · Contact (Full name, Phone (WhatsApp), Email optional) · 2 · Delivery (radio cards Delivery from GY$ 800 / Store pickup Free; Zone dropdown; Address / landmark) · 3 · Payment (MMG with instructions, Cash on Delivery, Card).
- "No account needed — check out as a guest." Primary "Place order · GY$ 8,800" shows the total.
- Payment-method notes appear inline when selected (MMG number + "use your order number as reference · we confirm on WhatsApp"). COD only offered for eligible zones; explain why if hidden.

### Confirmation
- Check icon · "Thank you, Anita!" · order number · "What happens next" 3 steps · "Track on WhatsApp" · "Continue shopping" · summary.

### Order status stepper
- Pending payment → Confirmed → Shipped → Delivered; icon + label + time; current step in palo de rosa, done in Tinta with check, future in muted.

### Toast / inline notice
- Inline notices preferred over toasts. Toasts only for non-critical confirmations ("Added to wishlist"), 4s, dismissible, announced via `aria-live="polite"`.

## Data model (from the guide)

```ts
type Product = {
  id: string; slug: string; name: string;
  world: "fashion" | "home";
  category: string;          // women, men, kids, accessories, plus-size, home, gifts, beauty, toys
  price: number;             // GYD integer
  compareAtPrice?: number;   // struck-through price
  badges?: ("new" | "sale" | "low-stock")[];
  images: string[];          // 4:5, 4-6
  video?: string;
  variants: { id: string; color: string; colorHex: string; size: string; stock: number }[];
  details: string; rating?: number; reviewCount?: number;
};
type CartItem = { variantId: string; qty: number };
type Order = {
  id: string;                // "GY-10482"
  customer: { name: string; phone: string; email?: string };
  fulfillment: { type: "delivery" | "pickup"; zone?: Zone; address?: string };
  payment: "mmg" | "cod" | "card";
  status: "pending_payment" | "confirmed" | "shipped" | "delivered";
  items: CartItem[]; subtotal: number; deliveryFee: number; total: number;
};
type Zone = "georgetown" | "east-bank" | "east-coast" | "west-demerara" | "berbice" | "other";
```

Components read from this model; designs show realistic values (long names, sale prices, low stock, many colors) to stress-test layouts.
