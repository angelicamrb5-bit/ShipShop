# ShipShop - Page blueprints

Mobile (390px) first, then desktop (1440px). Every page except checkout has: AnnouncementBar · Header · content · Footer · floating WhatsAppCTA (hidden on PDP mobile). Section names in parentheses are components from `components.md`. Copy shown is the default; adapt to the campaign, not the structure.

## 1. Home `/`
Order is fixed by the guide.
1. **Hero** - eyebrow ("• The Holiday Edit") · H1 one promise ("New styles for the heat — delivered across Georgetown.") · signature line as supporting text · primary "Shop Women" + secondary "Shop Men". Image 4:5 mobile / 16:9 desktop.
2. **Shop by category** (CategoryTile ×6) - Women, Men, Kids, Accessories, Home, Gifts.
3. **New arrivals** (carousel of 8 ProductCards) + "See all".
4. **BenefitStrip** - Fast delivery · Pay with MMG or COD · Real people on WhatsApp · Easy returns.
5. **SeasonBanner** - current collection (Mashramani / Diwali / Christmas) + "Shop the collection".
6. **Best sellers** (Tabs: Best Sellers / Under GY$ 5,000 / Back in Stock + ProductCards).
7. **3 ways to shop** (WaysToShop) - intro: signature line; Website · WhatsApp · Visit our store.
8. **What our customers say** (ReviewCard ×3-6) - name and area.
9. **Shop the look** (SocialFeed, 6 tiles).
10. **Join the club** (ClubSignup) - "Get 10% off your first order".
Then Footer (signature next to logo).
Desktop: mega-menu available from the nav; hero 16:9 with text left.

## 2. Category listing (PLP) `/c/[slug]`
1. Breadcrumb · H1 ("Dresses") · product count.
2. Sticky bar: "Filter & Sort" (count) + active filter chips (mobile) / sort dropdown (desktop).
3. Grid of ProductCards: 2 col mobile, 4 col desktop with left filter sidebar (FilterSheet).
4. "Showing 24 of 128" + "Load more" (not infinite scroll, so the footer stays reachable).
5. Optional: short category intro (2 lines max) and a help line: "Can't find it? Ask us on WhatsApp."
Empty results: "No products match these filters" + "Clear filters" + WhatsApp link.

## 3. Product page (PDP) `/p/[slug]`
1. Gallery (swipe, 4-6 photos 4:5 + optional video).
2. Breadcrumb · product name (H1, Jakarta 600 20-24px, not Young Serif if long) · price (+ original and -% chip) · rating summary.
3. Color (swatches + "Color: Sand") · Size (chips) + "Size guide" link (modal).
4. Stock line ("Only 3 left in M").
5. Primary "Add to bag" + equally visible "Order on WhatsApp" (pre-filled).
6. Estimated delivery block (by zone).
7. Accordions: Details · Delivery & Payment · Returns.
8. Complete the look / You may also like (carousel).
9. Reviews (summary + list + "Write one").
Mobile: StickyBuyBar (price + Add to bag + WhatsApp) after the buy buttons scroll away; floating WhatsApp hidden. Desktop: gallery left, buy box right and sticky.
Out of stock: "Out of stock in M" + "Notify me" + "Ask on WhatsApp" (find an alternative); primary disabled with reason.

## 4. Cart - drawer + `/cart`
Same content in both: "Your bag (n)" · FreeDeliveryBar · items (thumbnail, name, color/size, price, quantity, Remove) · Subtotal · "Delivery calculated at checkout" · primary "Checkout" · WhatsApp "Send order via WhatsApp". Page version adds "You may also like" below. Empty state with "Shop new arrivals".

## 5. One-page checkout `/checkout`
Minimal header (logo · "Secure checkout" · "Need help? Chat with us"); no nav, no footer links except legal.
- Mobile: collapsible order summary at top → "No account needed — check out as a guest." → 1 · Contact → 2 · Delivery (Delivery / Store pickup; zone; address or landmark) → 3 · Payment (MMG / Cash on Delivery / Card) → "Place order · GY$ total".
- Desktop: form left, summary pinned right (items, subtotal, delivery by zone, total, "Add GY$ 2,000 more for free delivery").
- Totals update live when zone changes. Errors inline; never reset the form.

## 6. Order confirmation `/order/[id]`
Check icon · "Thank you, {name}!" · "Order #GY-10482" · What happens next (1. We confirm on WhatsApp within 1 hour · 2. Pay/prepare per method · 3. Delivery or pickup) · "Track on WhatsApp" · "Continue shopping" · order summary · signature line as the small closing line. For MMG: repeat the payment instructions here.

## 7. How to Order / Delivery & Payment `/how-to-order`
1. H1 "How to order" + "Shop the way that suits you. We're real people, happy to help."
2. In-page tabs/anchors: Ordering · Delivery · Payment · Returns.
3. 3 ways to shop (WaysToShop) with step-by-step for each (website: 3 steps; WhatsApp: send the product link or photo; store: address, hours, map).
4. Delivery zones table (zone · time · fee) + free delivery rule.
5. Payment methods (MMG with how-to, Cash on Delivery with eligible zones, Card).
6. Returns summary + link to full policy.
7. FAQ (accordions).
8. Closing: "Still have a question? Chat with us on WhatsApp".
This page is the main trust page for first-time online buyers: plain language, numbered steps, no fine print hidden.

## 8. Menus
- Desktop mega-menu: FASHION ▾ · HOME & MORE ▾ · NEW IN · SALE; panel with category columns + one promo image.
- Mobile menu: search, two-world toggle, 50px rows, NEW IN (with count), SALE, My account, Wishlist, How to order, WhatsApp CTA, address and hours.

## 9. Help and legal pages `/delivery`, `/returns`, `/size-guide`, `/faq`, `/privacy`
H1 + one-line summary at top ("Free returns within 7 days" `[confirm]`) · short sections with H2s · tables where useful · WhatsApp help CTA at the end. Max 65-character lines; no walls of text.

## 10. Campaign / season landing page `/collections/[slug]`
1. Hero (season eyebrow, Young Serif title, 1-line promise, "Shop the collection").
2. Curated product grid or 2-3 edits ("For her", "For home", "Gifts under GY$ 5,000").
3. BenefitStrip (delivery deadline for the season if confirmed).
4. Shop the look.
5. WhatsApp help: "Need a gift idea? Ask us on WhatsApp."
6. Club signup.
One primary CTA per screen; no countdown timers unless the date is real and confirmed.

## 11. Design system documentation hub (internal)
For design system designers; system voice, no sales copy.
1. Overview: principles (Easy · Personal · Boutique quality), the two tests, how to contribute.
2. Foundations: color (palette, roles, contrast pairs, system additions), typography (scale + treatment rules), spacing, grid, radius, elevation, motion, iconography, imagery.
3. Tokens: the full `tokens.css`, with guide vs system-addition labels.
4. Components: one page each, in the documentation format from `components.md`, with live states and do/don't.
5. Patterns: WhatsApp ordering, GYD prices, delivery by zone, checkout, empty/error states.
6. Content: voice, CTA library, WhatsApp templates.
7. Accessibility checklist and changelog.
