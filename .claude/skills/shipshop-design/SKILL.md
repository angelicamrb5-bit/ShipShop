---
name: shipshop-design
description: Internal design instruction set for the client ShipShop - an online store for clothing and home, gifts and accessories based in Georgetown, Guyana (creative direction "Boutique Blush · Tipografía 10": palo de rosa, blush, malva, champán on marfil; Young Serif + Plus Jakarta Sans). Use this skill whenever designing, wireframing, writing UI copy for, building, or reviewing anything visual for ShipShop - home and marketing pages, landing/campaign pages, category, product, cart, checkout and confirmation flows, How to Order, WhatsApp ordering, components, design tokens, design-system documentation, emails, or social/ad layouts. Also use when the user mentions ShipShop, Boutique Blush, Tipografía 10, Young Serif, "Come and buy with us", GY$ prices, MMG, or asks to "make it on-brand" for this client.
---

# ShipShop - Design Skill

This is how Claude designs for ShipShop. It turns the client's audience, message, conversion goal and creative direction into design decisions. Read this file in full before any design work. Open the files under `references/` when the task needs that level of detail.

**This skill is a folder, not just this file.** The directory this SKILL.md was loaded from also contains:

```
references/brand-foundations.md   references/tokens.css          references/visual-system.md
references/components.md          references/page-blueprints.md  references/voice-and-copy.md
assets/creative-direction/         (README + the client's palette and typography PDFs)
```

Read them with your file tools from the skill's own directory. Never say they are missing unless you listed the directory and they weren't there. If file access is off, say so once and continue: this file holds every non-negotiable rule.

## 0. The brief in one breath

- **What ShipShop is:** an online store for clothing (Women, Men, Kids, Accessories, Plus Size) and Home & More (Home, Gifts, Beauty, Kids & Toys), based in Georgetown, Guyana. It sells through three channels: website, WhatsApp and a physical store. UI language: English (Guyana). Prices in GYD, formatted `GY$ 4,500`.
- **Who we design for (two audiences, one experience):**
  1. **Everyday shoppers** who want buying to be as easy and accessible as possible. Many are used to buying by chatting on WhatsApp or social media, not through a website. They judge us in seconds: *Do I understand this? Do I trust it? Can I finish?*
  2. **Design system designers** who build, extend and audit ShipShop's components. They judge us by whether the system is coherent, tokenized, documented and accessible.
- **Primary message:** *We can make your shopping faster, easier and personalized.*
- **Signature line:** *"Come and buy with us — it's easier for you."* (Client wording: "Come and buy with us is easier for you". Use the punctuated version on screen; see §3.)
- **Conversion goal:** set the standard of online shopping quality in Guyana, as the pioneers of online selling for the regular public. Every screen should look like *the* reference for how a local store sells online.
- **The "consultation":** personal help from a real person on WhatsApp (ask, get advice on size/color/gifts, or place the order in chat). Its CTA is **"Chat with us"** and its pre-filled-order variants (§4).
- **Creative source of truth:** "Guía Boutique Blush · Tipografía 10" (`assets/creative-direction/`), implemented in `references/tokens.css`.

## 1. Design approach and feeling

**Target feeling: "a neighborhood boutique with professional presentation"** (*cercana con carácter*). Warm, feminine, soft and elegant, but solid and confident, never fragile or exclusive. A first-time online shopper should feel welcome and capable; a design system lead should see order underneath.

Hold three ideas together on every screen:

| Idea | How it shows up |
|---|---|
| **Easy** (the promise) | Mobile-first. One main action per screen. Big tap targets, plain words, clear prices in GY$, an obvious next step, guest checkout. |
| **Personal** (the difference) | Real people on WhatsApp, one tap away on every page. "You" language. Pre-filled WhatsApp messages so nobody has to type their order. Delivery explained for *your* zone. |
| **Boutique quality** (the standard) | Marfil pages, blush surfaces, palo de rosa accents, Young Serif headlines in sentence case, generous air, consistent detail. The page itself proves the standard. |

**The two tests for any decision:**
1. *Could someone who has only ever ordered by WhatsApp finish this on their phone without help?*
2. *Would a design system designer find this consistent, tokenized and documented?*
If a choice fails either test, change it. If it is decorative and helps neither, cut it.

## 2. Communicating expertise to design system teams

Design system designers trust what they can inspect. Show the craft; don't describe it with adjectives.

**Do**
- **Build only from the guide's tokens** (`--color-*`, `--font-*`, `--text-*`, `--radius-*`, spacing scale) in `references/tokens.css`. No raw hex, no one-off sizes. Name any new token by role (`--color-surface-promo`), never by look (`--pink-2`), and mark it as a system addition.
- **Use the guide's component names** exactly: AnnouncementBar, Header, MegaMenu / MobileMenu, WhatsAppCTA, ProductCard, CategoryTile, BenefitStrip, SeasonBanner, Tabs, WaysToShop, ReviewCard, FilterSheet, StickyBuyBar, CartDrawer, Footer (+ the supporting ones in `components.md`).
- **Document every component the same way:** purpose → anatomy → variants → sizes → states (default, hover, focus-visible, active, disabled, loading, error, empty, success) → tokens → accessibility → content rules → do/don't. Format in `references/components.md`.
- **Treat accessibility as a quality spec:** WCAG 2.2 AA, the approved contrast pairs in `brand-foundations.md`, 44px minimum targets (buttons 48-52px), visible focus, labels on every input, keyboard navigation, `prefers-reduced-motion`.
- **Design the edge cases**, not only the happy path: out of stock, one size left, long product names (2 lines then "…"), missing photos, slow connection, MMG payment pending, empty bag, delivery zone "Other". System teams look for these first.
- **Keep data rules explicit:** prices are GYD integers formatted by one function (`GY$ 8,500`); order statuses are `pending_payment → confirmed → shipped → delivered`; see `components.md` §Data.
- **Separate the voices:** shopper pages never use system jargon; system docs never use sales tone.

**Avoid**
- Superlatives without proof ("best store in Guyana", "#1").
- Inventing facts. Fees, times, address, phone, discount and policies in the guide are **example values to confirm with the client**; keep them in one place (`brand-foundations.md` §6) and mark anything else as `[CLIENT TO SUPPLY: ...]`.
- One-off components that duplicate an existing one with small visual changes.

## 3. "Come and buy with us — it's easier for you" - the message system

This line is the spine of the experience. It means: **we do the hard parts, so buying feels simple for you** - any way you prefer to buy (website, WhatsApp, or visiting the store).

**Where the literal line appears (verbatim, never reworded):**
1. **Home hero**, as the supporting line under the headline (the headline itself stays a product/season promise, e.g. "New styles for the heat — delivered across Georgetown.").
2. **"3 ways to shop" (WaysToShop)** section intro on Home and How to Order.
3. **Club signup / closing band** before the footer on marketing pages.
4. **Footer**, next to the logo, as the signature.

Once per viewport at most. Never in buttons, error messages, checkout or legal text. If the client confirms a different punctuation or wording, update `references/voice-and-copy.md` and use it everywhere at once.

**Where the idea appears (every page, in plain words):**
- **Faster** → fewer steps and visible speed: one-page checkout, guest checkout, estimated delivery by zone on the PDP, free-delivery progress bar in the bag, "We'll confirm on WhatsApp within 1 hour".
- **Easier** → one obvious action, plain language, GY$ prices everywhere, payment the way people already pay (MMG, Cash on Delivery, card), WhatsApp always available, forms that never lose input.
- **Personalized** → real people on WhatsApp, pre-filled order messages, size guide, "Complete the look" / "You may also like", club offer, reviews with name and area.
- **Headlines lead with the shopper's outcome**, not with ShipShop.

## 4. Messaging hierarchy and CTA guidance

**Order of persuasion on marketing pages** (top to bottom):
1. **Promise** - one product/season promise + the signature line. (Hero)
2. **Show the store** - Shop by category, New arrivals: products before claims.
3. **Remove doubts** - BenefitStrip: fast delivery, pay with MMG or COD, real people on WhatsApp, easy returns.
4. **Inspire** - SeasonBanner, Best Sellers.
5. **Personal help** - "3 ways to shop" (Website · WhatsApp · Visit our store).
6. **Proof** - reviews with name and area; Shop the look.
7. **Close** - Club signup, signature line, footer with address, hours, map and payment logos.
The pioneer/standard story is shown through this quality, not told in a banner. If an About page is requested, frame "pioneer" as responsibility and care, never boasting.

**CTA system** (one *primary* filled button per screen; WhatsApp is the always-on personal path):

| Context | Primary (palo de rosa, filled) | Personal/consultation path (WhatsApp) |
|---|---|---|
| Header (all pages) | - | "Chat with us" text link with WhatsApp icon |
| Every page except PDP mobile | - | Floating WhatsApp button (56px, bottom right) |
| Home hero | "Shop Women" | "Shop Men" as secondary button |
| PDP | "Add to bag" | "Order on WhatsApp" - equally visible, WhatsApp green |
| PDP mobile | StickyBuyBar: price + "Add to bag" | + "WhatsApp" in the same bar (floating button hidden) |
| Cart | "Checkout" | "Send order via WhatsApp" |
| Checkout | "Place order · GY$ 8,800" | "Need help? Chat with us" (header link) |
| Confirmation | "Track on WhatsApp" (WhatsApp style) | "Continue shopping" (secondary) |
| How to Order / Help / FAQ | - | "Chat with us on WhatsApp" as the closing CTA |

- Keep CTA wording identical across the site (library in `voice-and-copy.md`). Buttons in sentence case.
- Every WhatsApp CTA opens `wa.me` with a **pre-filled message** (product, color/size, price, link; or the full bag; or the order number). Never an empty chat when context exists.
- Reassurance near the personal path: *"Real people answer on WhatsApp."*
- Don't invent prices, discounts, delivery times or guarantees beyond the confirmed list.

## 5. Visual direction (summary - full specs in references)

### Color (Boutique Blush)
- **Marfil `#FFFCFA`** page background · **Blush suave `#FBF0EE`** alternate sections · **Blush `#F6E4E1`** cards, blocks, chips · **Tinta `#211A1D`** headlines and body · **Piedra `#6F6266`** secondary text, strikethrough · **Palo de rosa `#A4505D`** CTAs, eyebrows, accent word, sale price · **Malva `#7A4E5E`** AnnouncementBar and footer · **Champán `#C8A66B`** NEW badge only, always with Tinta text · **Line `#EBD3CF`** dividers.
- Proportion guide: ~60% marfil/blush suave, ~30% blush surfaces + tinta text + malva bars, ~10% palo de rosa.
- **Champán is never text** on light backgrounds. **WhatsApp green `#25D366` is only for WhatsApp** buttons/links, always with `#0B2E17` text; never a brand color.
- Palo de rosa as normal-size text only on marfil/white/blush suave; on Blush use Tinta or large text. Approved pairs and system additions (accessible warning/success text, input border) are in `brand-foundations.md`.

### Typography (Tipografía 10 · "Cercana con carácter")
- **Young Serif 400** (single weight) for H1, H2, logo and collection names. Sentence case, medium-large, solid without shouting. **Never below 20px**, never for prices, filters or forms.
- **Plus Jakarta Sans 400/500/600/700** for body, prices, buttons, menus, forms, H3.
- Scale (mobile → desktop): H1 34-40 → 48-56 (lh 1.05, -0.01em) · H2 26-28 → 32-40 (lh 1.15) · H3 18-20 → 22-24 (Jakarta 600) · eyebrow 12 → 13 (Jakarta 600, sentence case with a palo de rosa dot: "• New in") · body 16 → 16-17 (lh 1.55-1.65, max 65 characters) · product name 14 → 15 (500, max 2 lines) · price 15 → 16 (600, tabular numbers) · button 15 (600, sentence case).
- One accent word per headline in palo de rosa (or not at all). No forced uppercase in buttons or eyebrows, no italic or all-caps paragraphs, max two families. Avoid Montserrat and Playfair.

### Layout and spacing
- **Mobile-first at 390px**, then desktop at 1440px (container 1312px, 64px side margins). 16px side gutter on mobile.
- 4px base, scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Section top margin ≥ 2× the headline height.
- Left-aligned on mobile; center only the hero and short banners.
- Product grids: 2 columns mobile, 4 desktop. Category tiles: 3 mobile, 6 desktop.

### Imagery
- Product photography is the hero: **4:5** for products (4-6 photos + optional short video), **4:5 mobile / 16:9 desktop** for heroes and season banners.
- Consistent light, background and crop across a category. Real products, real local context (Georgetown, Guyanese seasons like Mashramani, Diwali, Christmas).
- Text on photos only with an overlay or gradient that guarantees contrast.
- Never AI-generated images presented as real products, customers or reviews. Missing photos: Blush placeholder labeled `[PRODUCT PHOTO: description]`.

### UI styling
- Buttons and chips: pill radius `999px`, height 48-52px. Cards, inputs and sheets: `12px` radius. Badges: `4px` radius.
- Badges: NEW (Champán + Tinta), SALE (Palo de rosa + white), Low stock (warning text on Blush suave).
- Soft and tidy: flat surfaces separated by color and 1px lines; shadow only for sheets/drawers (`--shadow-sheet`).
- Visible focus ring on every interactive element (2px Tinta outline, 2px offset).
- Icons: simple line icons, 24px, paired with a text label for actions (bag count, wishlist heart may stand alone with an accessible name).

### Data
- Prices always via one formatter: `GY$ 8,500` (integers, thousands separator, no decimals). Sale: new price in palo de rosa + old price struck through in Piedra + "-19%" chip.
- Totals shown early and the same way every time: subtotal, delivery by zone (or "calculated at checkout"), total. Free-delivery progress bar in the bag.
- Stock: "Only 3 left in M". Delivery: "Georgetown: tomorrow · Regions 3/4/5: 2-3 days". Ratings: stars + "4.6 · 23 reviews".
- Status is never color alone: always icon + label. Order statuses: Pending payment → Confirmed → Shipped → Delivered.

### Motion
- Purpose: confirm and guide, never perform. 150-250ms for UI states, max 300ms for drawers and sheets, ease-out.
- Confirm actions visibly: bag counter bump on add, drawer slides in, progress bar fills toward free delivery, checkmark on confirmation.
- No autoplay video with sound, no parallax, no looping attention animations on the WhatsApp button. Carousels are swipe/arrow driven, never auto-advancing. Respect `prefers-reduced-motion`.

## 6. Pages

Section order and content for each page are in `references/page-blueprints.md`: Home, Category (PLP) + Filter sheet, Product (PDP), Cart (drawer + page), One-page checkout, Order confirmation, How to Order / Delivery & Payment, Menus (mega-menu + mobile), Help & legal pages, Campaign/season landing page, and the Design system documentation hub. Start every page from its blueprint, then adapt.

## 7. Design rules

**Lean into**
- Marfil and blush surfaces, palo de rosa as the confident accent, malva bars framing the page.
- Young Serif headlines in sentence case with one accent word; Plus Jakarta for everything functional.
- Product photography first; categories and new arrivals before claims.
- WhatsApp as the personal path on every page, with pre-filled messages.
- GY$ prices, delivery by zone and payment options visible early, never hidden until the end.
- One primary action per screen; guest checkout; forgiving forms.
- Consistent, documented components and tokens; accessibility as part of the standard.

**Avoid**
- WhatsApp green outside WhatsApp; champán as text; palo de rosa small text on Blush; text over photos without an overlay.
- Young Serif under 20px, forced uppercase, italic or all-caps paragraphs, more than two families, Montserrat or Playfair.
- Bargain-bin cues (starbursts, red countdown timers, fake scarcity, cluttered banners) and cold luxury cues (tiny thin type, black-and-gold).
- Dark patterns: pre-checked add-ons, hidden fees, forced account creation, confirm-shaming.
- Shopper-facing jargon ("SKU", "fulfillment", "PLP").
- Invented facts, reviews, prices or policies; placeholder copy that looks final.
- Competing primary buttons; the floating WhatsApp button covering the PDP sticky bar.

## 8. Workflow for any design task

1. Identify the deliverable (page, section, component, flow) and its main audience (shopper, design system team, or both).
2. Load `references/tokens.css` (+ `visual-system.md` / `components.md` as needed). Pick the page blueprint if it's a page.
3. Write the message first: shopper outcome, products, reassurance, CTA. Then lay out at 390px, then 1440px.
4. Build with tokens and named components only. Use confirmed facts from `brand-foundations.md` §6; mark anything else `[CLIENT TO SUPPLY: ...]`.
5. Run the checklist below. When presenting, briefly state which rules drove key choices.

## 9. Pre-ship checklist

- [ ] Every color, size and radius comes from the guide's tokens; no new hex values (system additions marked).
- [ ] Text/background pairs are on the approved list; champán never text; WhatsApp green only on WhatsApp elements with `#0B2E17` text.
- [ ] Young Serif only for H1/H2/logo/collections, ≥20px, sentence case; body 16px+; buttons sentence case.
- [ ] One primary filled button per screen; WhatsApp path present with a pre-filled message; CTA wording from the library.
- [ ] Signature line verbatim in its fixed places, never twice in one viewport.
- [ ] Prices formatted `GY$ 8,500`; delivery/payment info visible; no invented facts.
- [ ] All states designed (hover, focus, disabled, loading, error, empty, success, out of stock); targets ≥44px; focus visible.
- [ ] Floating WhatsApp hidden on PDP mobile; sticky bars never overlap.
- [ ] Reduced motion respected; images have descriptive alt text; status never by color alone.
- [ ] Works at 390px (and 375px) with 16px gutters and no horizontal scroll, and at 1440px.

## Reference files

- `references/brand-foundations.md` - palette, approved contrast pairs, system additions, color roles, logo rules, confirmed and example business facts.
- `references/tokens.css` - the guide's tokens, ready to paste, plus marked system additions.
- `references/visual-system.md` - type scale and treatment, grid, spacing, imagery, iconography, data display, motion.
- `references/components.md` - component specs: anatomy, variants, states, tokens, accessibility, content rules; data model.
- `references/page-blueprints.md` - page hierarchy and section-by-section content guidance.
- `references/voice-and-copy.md` - tone, word choices, CTA library, WhatsApp message templates, microcopy.
- `assets/creative-direction/` - the client's palette and typography PDFs and a summary of the guide.
