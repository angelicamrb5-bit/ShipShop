# Website audit: ShipShop, How to order → Payment (messy first pass)

> This is a raw working audit. It is deliberately unpolished, and detail matters more than tidiness here. Some points overlap on purpose.
> Certainty tags: [VERIFIED] observed · [LIKELY] inferred from evidence · [ASSUMPTION] guess · [UNVERIFIED] couldn't check · [QUESTION] needs owner input

## 0. Meta
- **Date:** 2026-10-13
- **Auditor:** Claude Code (website-audit skill)
- **Scope:** both the live site and the codebase, centred on **https://shipshop.hermeswraps.workers.dev/how-to-order#payment** (the `#payment` section). The rest of the How-to-order page and every *other place on the site that makes a payment claim* is included, because the payment section only makes sense next to them: the footer, announcement bar, benefit strip, PDP accordion, checkout payment step and order confirmation. The home, category, PDP and cart pages were **not** audited in full.
- **Codebase:** `/home/user/ShipShop`, branch `claude/gallant-dijkstra-1llzbi` @ `f747d1c`. It is a static HTML/CSS/vanilla JS site deployed as Cloudflare Workers static assets (`wrangler.jsonc`).
- **Pages/routes reviewed:**
  - Live: `/how-to-order` (rendered) and `/assets/js/config.js`.
  - Code: `public/how-to-order.html`, `assets/js/how-to-order.js`, `config.js`, `app.js` (header, footer, announcement, money, WA helpers), `sections.js`, `checkout.js`, `order.js`, `product.js` (payment accordion), `css/styles.css`, `css/tokens.css`, `_headers`, `robots.txt`.
- **Viewports checked:** 360 px mobile (full page), 1280 px desktop (full page) and 1920×1080 desktop (above the fold). All came from Firecrawl screenshots.
- **Tools used:**
  - Firecrawl `firecrawl_scrape` for markdown, rendered `rawHtml`, links and screenshots.
  - `curl` (blocked, see below).
  - grep/sed over the repo.
  - Python/PIL to crop screenshots and compute WCAG contrast ratios.
- **Tools NOT available / not run:**
  - **Direct HTTP access to the live host is blocked by this cloud environment's network policy.** `curl` got `403` from the egress proxy for `shipshop.hermeswraps.workers.dev`. As a result, live **response headers, redirects, robots.txt/sitemap/404 behaviour, caching and security headers were not observed** [UNVERIFIED]. Firecrawl worked as a fallback for page content and screenshots.
  - The Playwright capture script was not run because it would hit the same proxy block. That means no live console-error or failed-request log.
  - Lighthouse, axe and pa11y were not run.
- **Not in scope / not done:** no orders were placed, no forms submitted, no WhatsApp/MMG messages sent. Checkout, confirmation and account behaviour were read **from code only**.
- **Evidence:** screenshots are in the session scratchpad, not in the repo:
  - `/tmp/claude-0/-home-user-ShipShop/b41ca95f-11a5-5280-b8e6-61ca19e04c29/scratchpad/{desk.png, d1280.png, d_mid.png, mob.png, mob_*.png}`
  - These are ephemeral. Ask if you want them saved into `website-audit-evidence/`.
- **Live vs code:** the rendered live `<main>` content and the live `config.js` match the repo byte-for-byte in the parts I compared [VERIFIED]. So code findings below apply to production as deployed today.

## 1. What I think this site is for  [ASSUMPTION unless stated by owner]
- **Business / offer:** ShipShop is an online plus physical store in Georgetown, Guyana selling fashion, home goods, gifts and accessories. Prices are in GY$ [VERIFIED: README, page copy].
- **Audience(s):**
  - Local Guyanese shoppers, mostly mobile and WhatsApp-first [LIKELY: WhatsApp CTAs everywhere, MMG-first payment, "Pay the way you already pay"].
  - Possibly diaspora gift buyers [ASSUMPTION].
- **Primary conversions:**
  - (1) Web order placed, then paid via MMG or cash.
  - (2) WhatsApp chat order.
  - (3) Store visit or pickup [VERIFIED from "3 ways to shop" block].
- **Job of the `#payment` section:** remove payment doubt before or after checkout. In particular it should teach people unfamiliar with paying online through MMG, and reassure people who would rather pay cash [ASSUMPTION].
- **Status:** this looks like a **pre-launch / staging build**. README says business data is "valores de ejemplo" (sample values) and photos are placeholders [VERIFIED README]. But it is publicly reachable on a `workers.dev` URL and not `noindex`'d [VERIFIED: no robots meta in HTML; robots.txt only disallows checkout/cart/order/account].
- [QUESTION] Is this URL shared with real customers yet, or is it a review link only? Several severities below depend on the answer.

## 2. Quick scan: raw first impressions (unfiltered)
- Clean, calm, on-brand (blush/ivory, Young Serif headline). The payment section is short and scannable, with 3 cards: MMG, Cash on Delivery, Card.
- "Pay the way you already pay" is a nice headline, but nothing in the section explains **what MMG is** for anyone who doesn't already use it.
- The MMG number **600-0000** is a placeholder, shown live in bold. The WhatsApp **+592 600 0000** is also a placeholder. If anyone actually follows these instructions, the money goes to a stranger.
- The Card card says "**coming soon**", yet the footer two scrolls down says "**We accept: MMG · Visa · Mastercard · Cash on Delivery**". Those are contradictory claims on the same page.
- The "Website" way, earlier on the same page, says "Pay with MMG, cash on delivery **or card**". That is a third contradiction.
- On desktop the three payment cards' headings sit at **different heights** (MMG high, Card low). It looks accidental.
- MMG and Card use the **same icon**, a credit card.
- The MMG steps use a plain `1. 2. 3.` list. The "3 ways" cards above use pink numbered circles. Same page, two step styles.
- No "copy number" button. No payee name to check against. No mention of a screenshot or transaction ID as proof. No deadline.
- The announcement bar says "Pay with MMG **How it works**" but links to `#delivery`, not `#payment`.
- `[CLIENT TO SUPPLY: …]` placeholder text is visible in Returns (next section) and in the footer social links.
- Mobile: the delivery table directly above the payment section is cut off at 360 px. The Fee column is off-screen and needs horizontal scrolling.

## 3. Severity snapshot
| Severity | Count | Finding IDs |
|---|---|---|
| Critical | 2 | F-001, F-002 |
| High | 4 | F-003, F-004, F-005, F-006 |
| Medium | 8 | F-007, F-008, F-009, F-010, F-011, F-012, F-013, F-018 |
| Low | 7 | F-014, F-015, F-016, F-017, F-019, F-020, F-021 |
| Note | 5 | F-022, F-023, F-024, F-025, F-026 |

Top issues (rough, not final priority):
1. **F-001:** a placeholder MMG number (`600-0000`) and placeholder WhatsApp number are live in the payment instructions. Real money could go to the wrong person.
2. **F-002:** web orders never reach the store unless the customer taps "Track on WhatsApp" (`orderEndpoint: ""`). An MMG payment can arrive for an order the shop has no record of.
3. **F-003:** cards are listed as accepted in the footer, in the "Website" way, in the benefit strip and in the PDP accordion, yet they're "coming soon" here and disabled at checkout.
4. **F-004:** the "Other" zone plus MMG case is incoherent. The customer is told to send "the total", which excludes the still-unknown delivery fee, while the FAQ promises the fee is confirmed "before you pay".
5. **F-005:** the order of events contradicts itself. How-to-order says pay → we confirm. The confirmation page says we confirm → you pay. No deadline, no proof-of-payment instruction.
6. **F-006:** order numbers are `GY-` plus 5 random digits, used as the MMG payment reference. Collisions are likely at modest volume, which would make reconciliation ambiguous.

## 4. Inventories

### 4.1 Page / route inventory (scope-limited)
| URL / route | Source file | Status | Title | H1 | Meta desc? | Canonical | Indexable | Notes |
|---|---|---|---|---|---|---|---|---|
| `/how-to-order` (`#payment`) | `public/how-to-order.html` + `assets/js/how-to-order.js` | 200 (Firecrawl) [VERIFIED] | "How to order, delivery and payment — ShipShop" (46 chars) | "How to order" | Yes, 132 chars, mentions MMG + COD | **none** [VERIFIED] | Yes, not disallowed | Payment cards are injected by JS |
| `/checkout` | `checkout.html` + `checkout.js` | not fetched live | – | – | – | – | Disallowed in robots.txt | Payment step 3 read from code |
| `/order?id=` | `order.html` + `order.js` | not fetched live | – | – | – | – | Disallowed | MMG instructions read from code |
| `/assets/js/config.js` | same | 200 (Firecrawl) | – | – | – | – | – | Identical to repo |

### 4.2 Section outline of `/how-to-order` (rendered) [VERIFIED]
```
H1 How to order
  nav "On this page": Ordering · Delivery · Payment · Returns · FAQ
  H2 Pick what's easiest for you      (#ordering)  → H3 Website / WhatsApp / Visit our store
  H2 Delivery zones and fees          (#delivery)  → table
  H2 Pay the way you already pay      (#payment)   → H3 MMG / Cash on Delivery / Card
  H2 Free returns within 7 days       (#returns)
  H2 Questions we hear often          (#faq)       → 6 <details>
  H2 Still have a question?           (closing CTA)
footer: H2 Visit our store / Talk to us / [summary] Help / [summary] Shop / H2 We accept
dialogs (hidden): mobile menu, H2 Your bag (0)
```
The heading order is logical. The footer and drawer H2s come after `<main>`, which is fine.

### 4.3 Payment-claim inventory (every place the site tells users how they can pay)
| Where | Exact copy | Card claimed? | COD zones | Source | Consistent with `#payment`? |
|---|---|---|---|---|---|
| `#payment` → Card card | "Visa and Mastercard are coming soon. For now, pay with MMG or cash." | **No** (driven by `cardEnabled:false`) | – | `how-to-order.js:13` | – (reference) |
| `#payment` → COD card | "Available in Georgetown and East Bank Demerara. Paying at store pickup works too." | – | **hard-coded text** | `how-to-order.js:12` | matches config today |
| `#ordering` → Website way, step 3 | "Pay with MMG, cash on delivery **or card**." | **Yes** | – | `sections.js:40` | ❌ |
| `#ordering` → WhatsApp way, step 3 | "Pay with MMG or cash on delivery. Done." | No | – | `sections.js:43` | ✅ |
| Footer "We accept" | "MMG · **Visa · Mastercard** · Cash on Delivery" | **Yes** | – | `app.js:341` (hard-coded) | ❌ |
| Announcement bar | "Free delivery … · Pay with MMG **How it works**" → `/how-to-order#delivery` | – | – | `app.js:239` | link targets the wrong anchor |
| Benefit strip (home etc.) | "Pay with MMG or Cash on Delivery / **Or card, the way you prefer**" → `#payment` | **Yes** | – | `sections.js:28` | ❌ |
| PDP accordion "Delivery & Payment" | "Pay with MMG, cash on delivery (Georgetown and East Bank) **or card**." → link "Delivery and payment details" → `#delivery` | **Yes** | hard-coded | `product.js:55` | ❌ and wrong anchor |
| Checkout step 3 | MMG "Send from your phone, we confirm on WhatsApp" · COD "Georgetown and East Bank" · Card disabled "coming soon" | No (correct) | hard-coded sub-label + `codZones` logic | `checkout.js:37-41, 87-96` | ✅ mostly |
| Checkout MMG note | "after you place your order, send GY$ X to **600-0000** … We'll confirm on WhatsApp within 1 hour." | – | – | `checkout.js:96` | ✅ |
| Order confirmation | "We confirm your order on WhatsApp … → Send GY$ X with MMG to 600-0000 using #GY-xxxxx" | – | – | `order.js:25-37` | ⚠ step order differs (F-005) |
| FAQ "outside listed zones" | "We'll confirm if we can deliver and the fee **before you pay**." | – | – | `how-to-order.html` | ⚠ conflicts with "send the total" (F-004) |
| Home sample review | "Paying with MMG was simple…" (Kezia, Kitty) | – | – | `home.js:53` (marked SAMPLE in code) | – see F-024 |

### 4.4 CTA inventory (payment-relevant)
| Page / area | CTA label | Style | Position | Destination | Notes |
|---|---|---|---|---|---|
| `#payment` section | **none** | – | – | – | No action in the section, no "Start shopping" and no "Questions about paying? Ask on WhatsApp" (F-012) |
| Anchor chips | "Payment" | chip | top of page | `#payment` | works (same-page) |
| Announcement | "How it works" | inline link | top bar | `#delivery` | probably meant to be `#payment` (F-010) |
| Closing band | "Chat with us on WhatsApp" | WhatsApp button | end of page | `wa.me/5926000000?...` | placeholder number (F-001) |
| WA FAB | (icon) aria-label "Chat with us on WhatsApp" | floating | bottom-right | same + page URL incl. `#payment` | nice: it passes page context |
| Header | "Chat with us" | text+icon | header | same | – |

### 4.5 Forms inventory (NOT submitted)
None inside `#payment`. The checkout payment fieldset is reviewed from code in §5.16.

### 4.6 Component inventory (payment-related)
| Component / block | Where used | Variants found | Divergences | Should be shared? | Notes |
|---|---|---|---|---|---|
| `.pay-card` | `/how-to-order#payment` only | 1 | MMG uses an `<ol class="prose">` with an inline style; COD/Card use `<p>` | – | grid stretch bug (F-014) |
| `.pay-note` | checkout MMG note, order confirmation | 2 copies of MMG wording | slightly different wording ("How MMG works:" vs "Pay with MMG:") | yes, one `mmgInstructions(total, id)` helper | – |
| Payment method list | footer `.pay-list`, benefit strip, ways, PDP, checkout radio-cards, how-to-order cards | **6 independent hard-coded lists** | card/COD claims diverge | yes, derive all from `config.js` (`cardEnabled`, `codZones`) | root cause of F-003 and F-011 |
| Numbered steps | `.ways ol` (pink circle badges), `#payment` MMG `ol` (plain decimals), `.next-steps` on order page | 3 | visual mismatch on the same page | yes | F-016 |

### 4.7 Design tokens actually used (payment section only)
| Token type | Values seen | Notes |
|---|---|---|
| Colors | `--color-bg #FFFCFA` (card bg), `--color-line #EBD3CF` (border), `--color-primary #A4505D` (icons), `--color-ink #211A1D` (text) | All token-based [VERIFIED styles.css:617-621] |
| Contrast | ink/bg **16.7:1**, primary/bg **5.29:1**, muted/bg 5.69:1, muted/surface-2 5.2:1 | all ≥4.5 for text ✅. Card border `#EBD3CF` on bg is 1.39:1, which is fine as a decorative border, not as a required UI boundary |
| Type | `.pay-card h3` → `--text-h3 clamp(18px,2vw,24px)`, weight 600 | – |
| Spacing | `--space-5` padding, `--space-2` gap, `--space-4` grid gap | inline `padding-left:20px` is a hard-coded px value (F-017) |
| Radii | `--radius-card` | – |
| Breakpoint | 3 columns at `min-width:1024px` | stacked below that |

### 4.8 Tech stack & third parties
| Thing | Evidence | Notes |
|---|---|---|
| Cloudflare Workers static assets | `wrangler.jsonc`, `*.workers.dev` host | `html_handling: auto-trailing-slash`, `not_found_handling: 404-page` |
| No framework / no build | README, plain `<script>` tags | All payment content is rendered client-side from `window.SHOP` |
| Google Fonts | `<link>` to fonts.googleapis.com (Young Serif, Plus Jakarta Sans 400–700, `display=swap`) | – |
| wa.me deep links | rendered HTML | – |
| Google Maps search link | rendered HTML | – |
| Analytics / pixels | **none found** in code (grep for gtag/GTM/fbq/plausible returned nothing in the files reviewed) [LIKELY] | F-025 |
| Payment gateway | none, `cardEnabled:false` | – |

### 4.9 Technical checks
| Check | Result | Evidence | Tag |
|---|---|---|---|
| HTTPS / redirects | not observed | proxy 403 | [UNVERIFIED] |
| robots.txt | repo version disallows `/checkout /cart /order /account`; no `Sitemap:` line | `public/robots.txt` | [VERIFIED code] / live [UNVERIFIED] |
| sitemap.xml | none in repo | `find public` | [VERIFIED code] |
| 404 page | `public/404.html` exists and is wired via `not_found_handling` | code | live [UNVERIFIED] |
| Security headers | `_headers` sets nosniff, Referrer-Policy, X-Frame-Options DENY, Permissions-Policy. **No HSTS, no CSP** | `public/_headers` | code [VERIFIED], live [UNVERIFIED] |
| Console errors | not captured | – | [UNVERIFIED] |
| Failed requests | not captured | – | [UNVERIFIED] |
| Lighthouse / PSI | not run | – | [UNVERIFIED] |
| Live == repo | rendered `<main>` and `config.js` identical | Firecrawl rawHtml vs repo | [VERIFIED] |

---

## 5. Findings by area

### 5.1 First impression / 5-second test

#### F-001 · Placeholder MMG and WhatsApp numbers are live in payment instructions  `[VERIFIED]`
- **Area(s):** Trust, Conversion, Content, Security/fraud risk
- **What I noticed:** the MMG card tells users to "Send the total to **600-0000**". Every WhatsApp CTA on the page points to `wa.me/5926000000`, and the footer shows `tel:+5926000000`. In `config.js` these values are marked `// EXAMPLE — confirm`.
- **Where:**
  - https://shipshop.hermeswraps.workers.dev/how-to-order#payment (MMG card)
  - `public/assets/js/config.js:9-10, 38`
  - Also used by `checkout.js:96` and `order.js:25, 34`
  - Screenshot: `d_mid.png`, `mob_2800.png`
- **Evidence:** live `config.js` (Firecrawl) has `mmgNumber: "600-0000", // EXAMPLE — confirm` and `whatsapp: "5926000000"`.
- **Why it may be a problem:** these are instructions to **send money**. If the number is fake, the payment fails. If it happens to belong to a real person, the customer has paid a stranger. The WhatsApp confirmation loop the whole flow depends on also goes to a placeholder.
- **User impact:** lost money, confusion, no way to get help, because the help channel is also a placeholder.
- **Business impact:** chargeback/refund liability, reputational damage, every web conversion breaks.
- **Severity:** **Critical**, a payment instruction to a non-business account on a publicly reachable URL. (Drops to "launch blocker" if the URL is not yet shared; see §1 question.)
- **Effort guess:** S `[ASSUMPTION]`, once the client supplies the real numbers.
- **Possible solution(s):**
  - A: put the real MMG merchant number and WhatsApp number into `config.js`.
  - B: until then, add a staging banner and `noindex`, or password-protect the Worker.
- **Implementation notes:** single source in `config.js`, all surfaces read from it. Also add an `mmgName` (the registered account name) so customers can check the payee (see F-008).
- **Related:** F-002, F-008, F-023
- **Investigate further / open questions:** [QUESTION] Is `600-0000` a real MMG account anywhere? [QUESTION] Who is the real MMG account holder (business name vs personal)?

### 5.2 UX

#### F-005 · The payment sequence is told differently on each page; no deadline, no proof-of-payment step  `[VERIFIED]`
- **Area(s):** UX, Content, Conversion
- **What I noticed:**
  - `#payment` MMG steps: (1) place order → (2) send total with order # → (3) "We confirm your payment on WhatsApp."
  - Checkout note: "after you place your order, send … We'll confirm on WhatsApp within 1 hour."
  - Order confirmation "What happens next": (1) "**We confirm your order on WhatsApp** within 1 hour." → (2) "Send GY$ X with MMG …" → (3) Delivery.
  - So it's unclear whether the customer should pay immediately or wait for the store's confirmation (stock, delivery fee). Nothing says how long they have to pay, what happens if they don't, whether to send a screenshot or transaction ID, or whether the order is held or dispatched before payment.
- **Where:** `how-to-order.js:11`, `checkout.js:96`, `order.js:25-37`
- **Evidence:** quotes above.
- **Why it may be a problem:** paying before confirmation risks paying for out-of-stock items, or the wrong total when the delivery fee is unknown (F-004). Waiting for confirmation adds a step the How-to-order page doesn't mention.
- **User impact:** hesitation, duplicate payments, "did you get my money?" messages.
- **Business impact:** extra support load, slower fulfilment, refunds.
- **Severity:** **High**. This is the core payment instruction and it is ambiguous.
- **Effort guess:** S (copy) `[ASSUMPTION]`
- **Possible solution(s):**
  - Pick one canonical sequence with the client and use it everywhere. Example: "1. Place your order → 2. Send GY$ X to [number] ([name]) with reference GY-12345 → 3. Send us the MMG confirmation SMS/screenshot on WhatsApp → 4. We confirm and dispatch."
  - Add "Please pay within 24 h or your items are released" if that is the policy.
- **Implementation notes:** centralise the copy in a helper in `app.js`/`sections.js` used by all three pages.
- **Related:** F-004, F-002, F-013
- **Investigate further:** [QUESTION] Does the store dispatch before MMG payment clears? Is there a payment window?

#### F-004 · "Other" zone + MMG: the customer is told to send a total that excludes an unknown delivery fee  `[VERIFIED]`
- **Area(s):** UX, Conversion, Content consistency
- **What I noticed:**
  - For zone `other`, `fee: null`, so `totals()` uses `fee || 0`, giving total = subtotal.
  - The checkout MMG note and the confirmation page then say "send GY$ {subtotal} to 600-0000".
  - The FAQ says for these customers "We'll confirm if we can deliver and the fee **before you pay**."
  - The WhatsApp message from the confirmation page appends "+ delivery (to confirm)", but the on-screen pay instruction doesn't.
- **Where:** `checkout.js:59-63, 96`, `order.js:22, 25, 34`, `app.js:81-87`, `how-to-order.html` FAQ #5. The `#payment` MMG card says "Send the total" with no caveat.
- **Evidence:** code snippets cited.
- **Why it may be a problem:** the customer underpays, then has to make a second MMG transfer, or pays before the store has even confirmed it can deliver.
- **User impact:** two transfers, possible fees per transfer [ASSUMPTION about MMG fees], confusion.
- **Business impact:** reconciliation pain, and refunds when delivery isn't possible.
- **Severity:** **High**. It is a direct contradiction in money instructions, but it only affects "Other" zone + MMG orders.
- **Effort guess:** S `[ASSUMPTION]`
- **Possible solution(s):**
  - A: for `fee === null`, hide the "send now" instruction and say "We'll message you the final total including delivery. Pay after that."
  - B: add a line to the `#payment` MMG card: "Outside our listed zones? Wait for our WhatsApp with the final total."
- **Related:** F-005, F-011

### 5.3 UI design

#### F-014 · Payment card contents are vertically misaligned on desktop  `[VERIFIED]`
- **Area(s):** UI, Visual polish
- **What I noticed:** at 1280 px the three cards are equal height, but their content is spread out vertically. The MMG title sits at ~y824, COD at ~y834 and Card at ~y847 in the screenshot. The Card body floats in the middle of its box.
- **Where:** `/how-to-order#payment` ≥1024 px; screenshot `d_mid.png`; CSS `styles.css:618` `.pay-card { display:grid; gap:… }` inside `.pay-cards { grid-template-columns: repeat(3,1fr) }` (`:621`)
- **Evidence:** grid items stretch to row height, and the default `align-content: normal` (stretch) inside the `.pay-card` grid spreads the implicit rows. [LIKELY root cause; the visual result is VERIFIED.]
- **Why it may be a problem:** it looks unfinished and breaks the scan line across cards.
- **User impact:** minor. **Business impact:** perceived polish/trust, minor.
- **Severity:** Low
- **Effort guess:** S
- **Possible solution(s):** add `align-content: start` to `.pay-card`.
- **Related:** F-016

#### F-015 · MMG and Card share the same icon, which shows a credit card  `[VERIFIED]`
- **Area(s):** UI, Clarity
- **What I noticed:** both use `UI.icon("wallet")`, which renders as a card-shaped rectangle with a stripe. MMG is mobile money, phone-based.
- **Where:** `how-to-order.js:11, 13`; screenshot `d_mid.png`
- **Why it may be a problem:** the MMG icon suggests "card", and two methods look identical at a glance.
- **Severity:** Low · **Effort:** S
- **Possible solution(s):** use a phone/mobile icon for MMG. Keep the card icon for Card, and perhaps show it muted while card payments are disabled.
- **Related:** F-003

#### F-016 · Three different "numbered steps" styles; the MMG list is the odd one out  `[VERIFIED]`
- **Area(s):** UI, Design-system consistency
- **What I noticed:**
  - The "3 ways" cards use pink circular step badges.
  - The MMG card uses a plain browser `1. 2. 3.` list, forced with an inline style (`list-style:decimal;padding-left:20px`).
  - Its text indent doesn't line up with the COD/Card paragraphs: on mobile the list digits start ~4 px right of the other cards' text, and wrapped lines indent further.
- **Where:** `how-to-order.js:11`; screenshots `desk.png` (ways badges) vs `d_mid.png` / `mob_2800.png` (MMG list)
- **Severity:** Low · **Effort:** S
- **Possible solution(s):** reuse the `.ways ol` step-badge style, or `.next-steps` from the order page, for MMG steps.
- **Related:** F-017, F-014

### 5.4 Layout
- The `#payment` cards stack at <1024 px and sit in 3 columns at ≥1024 px. At 360 px they are full-width, readable and free of overflow [VERIFIED `mob_2800.png`].
- Between 768 and 1023 px the cards stay single-column at full width, which makes for long line lengths [LIKELY from CSS; not screenshotted]. [UNVERIFIED visually]

#### F-018 · Delivery table directly above `#payment` is clipped on mobile; Fee column off-screen  `[VERIFIED]`
- **Area(s):** Layout, Mobile. It is adjacent to payment because the fee is part of "what will I pay".
- **What I noticed:** at 360 px only "Zone" and part of "Time" are visible. "Other → We'll con…" is cut off, and Fee requires horizontal scrolling with no visible affordance. Scrollbars are hidden elsewhere, and there's no shadow or hint here.
- **Where:** `mob_1400.png`; `.table-wrap` / `.table` (`styles.css:~528`)
- **Why it may be a problem:** the fee is the most important column for payment and it's the one hidden.
- **Severity:** Medium (hurts the key info on the key device) · **Effort:** S–M
- **Possible solution(s):** on mobile, stack each zone as a row card ("Georgetown · 24–48h · GY$ 800"), or drop the Region sub-label and let the columns fit.
- **Related:** F-004

### 5.5 Visual hierarchy
- Inside `#payment`, MMG is first and visually heaviest (3-step list plus a bold number), which suits "MMG-first" [VERIFIED].
- The bold number is the most dominant element in the MMG card. Good, as long as it's the real one (F-001).
- The disabled Card option gets equal visual weight with the live methods. Consider de-emphasising it with a "Coming soon" tag (F-022).

### 5.6 Navigation

#### F-010 · Payment-related links point to `#delivery` instead of `#payment`  `[VERIFIED]`
- **Area(s):** Navigation, IA
- **What I noticed:**
  - The announcement bar on every page reads "Pay with MMG **How it works**" and links to `/how-to-order#delivery`.
  - The PDP accordion "Delivery & Payment → Delivery and payment details" also links to `#delivery`.
  - Only the benefit strip's "Pay with MMG or Cash on Delivery" links to `#payment`.
- **Where:** `app.js:239`, `product.js:55`, `sections.js:28`
- **Why it may be a problem:** someone curious how MMG works lands two sections above the answer.
- **Severity:** Medium (global announcement bar, every page) · **Effort:** S
- **Possible solution(s):** point the announcement link to `#payment`, or split it into "Free delivery…" → `#delivery` and "Pay with MMG" → `#payment`. For the PDP, link to `#delivery` and `#payment` separately.
- **Related:** F-019

#### F-019 · Deep-link landing on `#payment` may be off because content above it is injected by JS  `[UNVERIFIED]`
- **Area(s):** Navigation, Technical
- **What I noticed:**
  - The header, announcement bar, "3 ways" cards and delivery table rows are all injected by JS (`app.js`, `how-to-order.js`) after the HTML parses. Scripts sit at the end of `<body>`, without defer.
  - The browser may scroll to `#payment` and then have content inserted above it.
  - Also, `scroll-padding-top: 120px` (`styles.css:6`) is slightly less than the desktop sticky header (bar ~77 px + nav ~49 px ≈ 126 px, estimated from `desk.png`). So the "Payment" eyebrow could tuck under the header.
- **Why it may be a problem:** links from the benefit strip and from WhatsApp messages land a bit off.
- **Severity:** Low · **Effort:** S
- **Possible solution(s):** after rendering in `how-to-order.js`, re-scroll if `location.hash` is present. Set `scroll-padding-top` from the measured header height (CSS var).
- **Investigate:** Firecrawl screenshots were taken from the top, so they don't confirm or deny. Test in a real browser with `/how-to-order#payment` on mobile and desktop.

### 5.7 Information architecture
- Payment lives as a section of `/how-to-order`. There's no dedicated `/payment` or `/delivery` URL. That's fine for this size of site [Note].
- The footer "Help" list has How to order · Delivery · Returns · Size guide · FAQ · Privacy, but **no "Payment" link**, even though the footer has a "We accept" block [VERIFIED app.js footer]. Low; see F-020.
- No Terms / Terms of sale page exists. Payment terms (deadlines, refunds, pricing errors) have no home [VERIFIED: `public/` has no terms page]. See F-013.

#### F-020 · Footer "We accept" is not linked to the payment explanation; no "Payment" link in Help  `[VERIFIED]`
- **Severity:** Low · **Effort:** S
- **Possible solution(s):** add "Payment" → `/how-to-order#payment` to the footer Help column, and/or make the "We accept" heading link there.
- **Related:** F-003, F-010

### 5.8 User journeys

**J1: First-time local mobile shopper, never paid a shop with MMG, wants to know how payment works before buying (mobile, 360 px)**
| Step | Action | Observation |
|---|---|---|
| 1 | Sees the announcement "Pay with MMG How it works", taps it | lands on **#delivery** (F-010) |
| 2 | Scrolls past the delivery table (Fee column hidden, F-018) | – |
| 3 | Reads the MMG card | learns the number, but not what MMG is, how to send, the payee name, whether to send a screenshot, or a deadline (F-005, F-008) |
| 4 | Wants to copy the number | no copy button; must long-press bold text (F-009) |
| 5 | No CTA in the section | must scroll to the end for WhatsApp, or back up for shop links (F-012) |
- Drop-off risk: steps 3–4, trust and clarity [ASSUMPTION].

**J2: Customer in Linden ("Other" zone) wants to pay with MMG (mobile)**
- Checkout → zone "Other" → COD hidden with the note "For your area, pay with MMG" → MMG note says "send GY$ {subtotal}" → the confirmation page says the same. FAQ: "fee confirmed before you pay". Delivery is never added to the amount to send (F-004).
- Outcome: likely underpayment or a second transfer [LIKELY from code].

**J3: Diaspora relative wants to buy a gift for family in Georgetown, has no MMG (desktop)**
- Card: "coming soon". COD is cash only. MMG needs a Guyanese mobile money account [ASSUMPTION].
- The footer still says Visa/Mastercard accepted (F-003), so the shopper may go all the way through checkout before finding card is disabled.
- **Dead end.** No alternative is offered, such as bank transfer, PayPal or "pay for someone else" [QUESTION: does the client want this segment?]. See F-022.

**J4: Customer who paid by MMG and wants confirmation**
- Order page: "Track on WhatsApp" sends the order details. If they **don't** tap it, the store never learns of the order (F-002). Their MMG reference "GY-xxxxx" may collide with someone else's (F-006).

**J5: Keyboard / screen-reader user reading `#payment`**
- The "Payment" chip is a real link and the section has `aria-labelledby` [VERIFIED].
- H3s inside the cards and the icons are `aria-hidden` [VERIFIED].
- The number "600-0000" may be read as "six hundred minus zero" by some screen readers [ASSUMPTION]. See F-021.

### 5.9 Content

#### F-003 · Card payment is claimed as accepted in 4 places but is disabled  `[VERIFIED]`
- **Area(s):** Content, Trust, Messaging, Conversion
- **What I noticed:** `#payment` correctly says cards are "coming soon", and checkout disables Card. But the following say otherwise:
  - The footer on every page: "We accept: MMG · **Visa · Mastercard** · Cash on Delivery".
  - The Website way step 3 on this same page: "Pay with MMG, cash on delivery **or card**".
  - The benefit strip: "**Or card**, the way you prefer".
  - The PDP accordion: "… **or card**".
- **Where:** `app.js:341`, `sections.js:28, 40`, `product.js:55`. Only `how-to-order.js:13` and `checkout.js:39` read `S.cardEnabled`.
- **Evidence:** live rendered footer HTML (Firecrawl rawHtml) contains `<li>Visa</li><li>Mastercard</li>`.
- **Why it may be a problem:** a customer who plans to pay by card finds out only at checkout (or reading `#payment`) that they can't. On the same page, the site contradicts itself within a few scrolls.
- **User impact:** wasted effort, abandonment at checkout, distrust.
- **Business impact:** lost orders from non-MMG/cash payers. Possible consumer-protection concerns about advertising unavailable payment methods [UNVERIFIED legally; not legal advice].
- **Severity:** **High**, a trust-damaging contradiction on every page.
- **Effort guess:** S
- **Possible solution(s):** make every payment-method mention read `S.cardEnabled` (and `S.codZones`). Better still, generate the method list from one config array, e.g. `paymentMethods: [{id, label, enabled, note}]`.
- **Related:** F-011, F-015, F-020

#### F-011 · COD zone text is hard-coded in 4+ places instead of derived from `codZones`  `[VERIFIED]`
- **What I noticed:**
  - "Georgetown and East Bank Demerara" / "Georgetown and East Bank" is typed out by hand in `how-to-order.js:12`, `checkout.js:38, 41, 90` and `product.js:55`.
  - Meanwhile the checkout *logic* uses `S.codZones` (`checkout.js:87`).
- **Why it may be a problem:** if the client adds East Coast to COD, the logic changes but the copy doesn't, and the page lies.
- **Severity:** Medium (latent; consistent today) · **Effort:** S
- **Possible solution(s):** build the text from `S.codZones.map(id => zone(id).name)`.
- **Related:** F-003

#### F-007 · `[CLIENT TO SUPPLY]` placeholders visible on the live page  `[VERIFIED]`
- **What I noticed:**
  - Returns section (immediately after payment): "[CLIENT TO SUPPLY: full returns policy — exceptions such as earrings, beauty and personalised items]".
  - Footer: "Instagram [CLIENT TO SUPPLY: link]" ×3.
  - Megamenu promos: "[CAMPAIGN PHOTO: …]".
- **Where:** `how-to-order.html` returns block; `app.js` footer; screenshot `mob_2800.png`
- **Why it may be a problem:** it signals "unfinished" right next to the money instructions.
- **Severity:** Medium on a public URL · **Effort:** S (needs client content)
- **Related:** F-001, F-023

#### F-008 · No payee name or verification detail for MMG; "what is MMG" isn't explained  `[VERIFIED]`
- **What I noticed:** the MMG card only gives a number. There's no account/merchant name ("you'll see *ShipShop Ltd* on the confirmation"), no "MMG = Mobile Money Guyana" explanation, and no link to how to send MMG.
- **Why it may be a problem:** customers can't check they're paying the right party, which matters as a scam-awareness habit. New MMG users get no guidance.
- **Severity:** Medium · **Effort:** S
- **Possible solution(s):**
  - Add "Account name: ___" and one line: "MMG is GTT's Mobile Money Guyana. Send from the MMG app or dial *___#" [needs client confirmation of the correct instructions; don't guess codes].
  - Add a "We'll never ask you to pay a different number" line.
- **Related:** F-001, F-005

#### F-013 · Refund and payment-terms details are thin  `[VERIFIED]`
- **What I noticed:**
  - "We exchange it or refund you the same way you paid." It isn't said how a COD/cash refund works (cash in store? MMG?), whether the delivery fee is refunded, or how long refunds take.
  - There is no terms page covering pricing errors, cancellations after MMG payment, or a payment window.
  - FAQ "Can I change or cancel my order?" doesn't cover refunds of MMG already sent.
- **Severity:** Medium · **Effort:** S–M (needs client policy)
- **Related:** F-005, F-007

### 5.10 Messaging
- "Pay the way you already pay" is local and warm, and on-brand (WhatsApp/MMG-first) [VERIFIED copy]. It does assume the reader already uses MMG or cash. Fine for the core audience, weak for J3 (F-022).
- The section has no intro line. Other sections have `section__intro` (e.g. the delivery free-rule line). A one-liner such as "Most customers pay with MMG — it takes a minute" would help [Note].
- Reassurance language ("Real people answer") exists elsewhere on the page but not inside `#payment`, where payment anxiety peaks [ASSUMPTION].

### 5.11 CTAs

#### F-012 · The `#payment` section is a dead end, with no action and no help link  `[VERIFIED]`
- **What I noticed:** none of the three cards has a link or button. Ordering cards each have one. The closing WhatsApp CTA is 3 sections further down.
- **Why it may be a problem:** someone who arrives via `#payment` from the benefit strip and has a payment question has no immediate next step.
- **Severity:** Medium · **Effort:** S
- **Possible solution(s):** under the cards, add "Questions about paying? **Ask us on WhatsApp**" (prefilled "Hi! I have a question about paying with MMG"). Optionally add "Start shopping".
- **Related:** F-010

#### F-009 · No copy-to-clipboard for the MMG number or order reference  `[VERIFIED]`
- **Where:** `#payment` MMG card; also the `checkout.js` MMG note and the `order.js` pay-note
- **Why it may be a problem:** on mobile, users switch to the MMG app and need to retype the number and the reference. Typos send money to the wrong account.
- **Severity:** Medium (money + mobile) · **Effort:** S
- **Possible solution(s):** add a "Copy" button next to the number (and next to the order # on the confirmation page), with a toast via the existing `#toast` live region.
- **Related:** F-001, F-006

### 5.12 Trust
- Positive [VERIFIED]: real-looking store address and hours, a cash option, and the "Real people" tone. The WhatsApp FAB passes the page URL, so staff know the context.
- Negative:
  - placeholder numbers (F-001)
  - contradictory card claims (F-003)
  - visible placeholders (F-007)
  - no payee name (F-008)
  - the home page shows **sample reviews** that mention MMG (`home.js:50-53`, marked SAMPLE in code). Whether they are labelled as samples on the live page is [UNVERIFIED]; see F-024.

### 5.13 Conversion

#### F-002 · Web orders are stored only in the customer's browser; the store learns of them only if the customer taps "Track on WhatsApp"  `[VERIFIED]`
- **Area(s):** Conversion, Technical, Payment reconciliation
- **What I noticed:**
  - `orderEndpoint: ""` in the live `config.js`.
  - `checkout.js` saves the order to `localStorage` (`UI.store("orders")`) and redirects to `/order?id=`.
  - The only path to the store is the "Track on WhatsApp" button on the confirmation page. README confirms: "sin backend, el pedido se guarda en el navegador y se envía a la tienda por WhatsApp desde la confirmación" ("no backend; the order is saved in the browser and sent to the store via WhatsApp from the confirmation page").
  - Meanwhile `#payment` tells customers "Place your order … Send the total … We confirm your payment on WhatsApp", which implies the store already knows about the order.
- **Where:** `config.js` (`orderEndpoint`), `checkout.js:143-162`, `order.js` "Track on WhatsApp"; `how-to-order.js:11`
- **Why it may be a problem:** a customer can place an order, send MMG with reference GY-12345, close the tab and wait for a confirmation that never comes. Staff receive an MMG transfer with a reference that matches nothing.
- **User impact:** paid but no order; anxiety. **Business impact:** lost orders, manual reconciliation, refunds, trust damage.
- **Severity:** **Critical** for the web-order + MMG path (it blocks the core conversion silently).
- **Effort guess:** M `[ASSUMPTION]`
- **Possible solution(s):**
  - A: set `orderEndpoint` to a Worker route that stores orders (KV/D1) and notifies staff by WhatsApp Business API or email.
  - B (stop-gap): make the WhatsApp send part of placing the order, e.g. the "Place order" button opens WhatsApp with the order and copy says "Send this message to complete your order".
  - C: in `#payment` step 1, say explicitly "Place your order **and send it to us on WhatsApp**".
- **Implementation notes:** wrangler is already configured. Adding a `main` Worker script alongside `assets` is possible but it changes the deploy shape.
- **Related:** F-005, F-006, F-001

#### F-006 · Order IDs are 5 random digits and double as the MMG payment reference, so collisions are likely  `[VERIFIED]`
- **What I noticed:** `id: "GY-" + String(Math.floor(10000 + Math.random() * 90000))` gives 90,000 possible values, generated client-side, with no uniqueness check (there is no backend).
- **Where:** `checkout.js:147`
- **Evidence:** by the birthday bound, the chance of at least one duplicate passes ~50% around ~350 orders (math, not a traffic estimate).
- **Why it may be a problem:** two customers can send MMG with the same reference, making it ambiguous whose payment is whose.
- **Severity:** **High** (payment reconciliation), assuming the shop gets more than a few hundred web orders.
- **Effort guess:** S–M
- **Possible solution(s):** a longer ID (date + 4–6 random base32 chars, e.g. `GY-1013-K7QF`), or server-issued IDs once F-002 is fixed.
- **Related:** F-002, F-009

#### F-022 · No payment path for customers without MMG and not paying cash (card disabled)  `[VERIFIED]` / impact `[ASSUMPTION]`
- **Severity:** Note (it's a business decision) · see J3.
- **Ideas:** bank transfer instructions, pay-by-link from a gateway, "send a gift, recipient pays cash" option, or at least say "Paying from abroad? Message us."
- [QUESTION] Is diaspora/gift buying a target?

### 5.14 Accessibility
- [VERIFIED]:
  - `#payment` has `aria-labelledby="payment-title"`.
  - Card icons are `aria-hidden="true" focusable="false"`.
  - Headings are H2 → H3.
  - Text contrast passes AA (ink 16.7:1, muted 5.2–5.7:1, primary 5.29:1).
  - `lang="en-GY"`.
  - A skip link exists.
  - `prefers-reduced-motion` disables smooth scroll.
- Anchor chips are ≥44 px tall (`--tap-min: 44px`) ✅.

#### F-021 · Phone-style number "600-0000" may be read oddly by screen readers; no `tel:`/copy semantics  `[ASSUMPTION]`
- **Severity:** Low · **Effort:** S
- **Possible solution(s):** wrap it as `<span aria-label="6 0 0, 0 0 0 0">600-0000</span>`, or simply format it as "600 0000". Pair with the copy button (F-009).

#### F-017 · Inline style and hard-coded px on the MMG list  `[VERIFIED]`
- **What:** `<ol class="prose" style="list-style:decimal;padding-left:20px">` is built inside a JS string. Also the delivery note uses `style="margin-top:var(--space-3)"` in HTML.
- **Why:** it bypasses tokens and would break under a strict CSP (`style-src` without `'unsafe-inline'`).
- **Severity:** Low · **Effort:** S
- **Related:** F-016, F-026

### 5.15 Mobile responsiveness
- Payment cards at 360 px: fine, no overflow, readable 16 px+ body [VERIFIED `mob_2800.png`].
- The delivery table above is clipped (F-018).
- The floating WhatsApp FAB (bottom-right) may overlap card text while scrolling on mobile. It was not seen overlapping in the full-page shot, which doesn't render fixed elements per viewport [UNVERIFIED].

### 5.16 Forms (checkout payment step, read from code; NOT submitted)
| Aspect | Observation | Tag |
|---|---|---|
| Structure | `<fieldset class="radio-cards" aria-describedby="payment-error">` with `<legend class="sr-only">Payment method</legend>` ✅ | [VERIFIED code] |
| Default | No method preselected, and validation requires one ("Choose how you'd like to pay.") | [VERIFIED code] |
| COD gating | `codOk = pickup \|\| codZones.includes(zone) \|\| !zone`. COD is **shown when no zone is chosen yet**, then hidden after zone selection. A choice the user already made silently disappears (`codInput.checked = false`) and the reason shows only in `#cod-why` | [VERIFIED code] |
| Card | Disabled radio + `.is-disabled`; sub-label explains why ✅ | [VERIFIED code] |
| MMG note | Appears only when MMG is selected; shows the live total and number | [VERIFIED code] |
| Draft | Payment choice saved to localStorage draft ✅ | [VERIFIED code] |
- The COD auto-uncheck is a small surprise. It's announced only if `#cod-why` sits in a live region, and it doesn't appear to [LIKELY]. Low; folded into F-011's area, no new ID.

### 5.17 Interactions & motion
- The `#payment` section has no interactions. Smooth scroll from the chips respects reduced motion ✅.
- **JS dependence:** with JS disabled, `#pay-cards` is **empty**, so the section shows only "Pay the way you already pay" with nothing under it. The header, footer, ways and zones are empty too [VERIFIED from HTML source: `<div class="pay-cards" id="pay-cards"></div>`]. See F-026.

### 5.18 Empty / loading / error / success states
| Area | Loading | Empty | Error | Success | Other states | Notes |
|---|---|---|---|---|---|---|
| `#payment` cards | none (sync JS) | blank section if JS fails | none | n/a | `cardEnabled` toggles Card copy ✅ | no `<noscript>` fallback |
| Checkout payment | – | – | inline "Choose how you'd like to pay." ✅ | → `/order` | COD hidden by zone, card disabled ✅ | `fail()` path exists for `orderEndpoint` ✅ |
| Order confirmation MMG | – | – | if `id` not found? [UNVERIFIED, not read] | MMG pay-note ✅ | "Other" fee → "Confirmed on WhatsApp" | amount excludes unknown fee (F-004) |
| Payment received | – | – | – | **no state at all.** The site never shows "payment received" | – | everything happens on WhatsApp (by design) |

### 5.19 SEO
- Title (46 chars) and meta description (132 chars) are unique, descriptive and mention MMG/COD ✅ [VERIFIED].
- **No canonical, no Open Graph/Twitter tags, no structured data** on this page [VERIFIED source]. WhatsApp link previews matter for a WhatsApp-first shop, so no `og:image`/`og:title` means bare previews when the page is shared. Low–Medium; see F-025.
- No sitemap.xml and no `Sitemap:` in robots.txt [VERIFIED code].

#### F-026 · Payment, delivery and ordering content is rendered client-side only  `[VERIFIED]`
- **What:** the HTML source has empty containers (`#ways`, `#zones`, `#pay-cards`). Text exists only after JS runs.
- **Why:** crawlers that don't execute JS, link-preview bots, reader modes and no-JS users see no payment info. The meta description promises "MMG, cash on delivery … explained". Google does render JS, so the SEO impact is probably limited [LIKELY].
- **Severity:** Note/Low · **Effort:** M (prerender at build time or inline the static copy)
- **Possible solution(s):** put the payment cards directly in `how-to-order.html` with `data-` hooks for the few dynamic values (number, card status), or add a tiny build step that bakes in `config.js`.

### 5.20 Performance
- The page loads 5 scripts synchronously at the end of body. `products.js` (13 KB, the full catalog) loads on how-to-order even though it isn't needed for payment content [VERIFIED `how-to-order.html`]. It may be required by `app.js` for the bag drawer and menu counts [LIKELY].
- `styles.css` is 52 KB, unminified [VERIFIED file size].
- Google Fonts uses `display=swap` with preconnect ✅.
- `_headers`: `/assets/*` is cached 1 h with `must-revalidate`. No fingerprinting, so long caching isn't possible [VERIFIED code].
- Lighthouse/CWV: **[UNVERIFIED]**, not run (network policy).

### 5.21 Technical issues
- Live security headers: [UNVERIFIED]. The repo `_headers` lacks **HSTS** and **CSP** [VERIFIED code]. `workers.dev` serves HTTPS, but HSTS on a custom domain later will matter.
- Console errors: [UNVERIFIED].
- `target="_blank" rel="noopener"` on all wa.me and maps links ✅ [VERIFIED].
- Order data (name, phone, address) lives in `localStorage` on shared devices. Privacy implication, note only [VERIFIED code].

### 5.22 Code quality (payment scope)
- **Good:** `config.js` as the "ONE place for store data", with EXAMPLE / CLIENT TO SUPPLY markers. `cardEnabled` is wired in 2 places.
- **Not so good:**
  - The payment-method facts are duplicated as literal strings in ~6 places (F-003, F-011).
  - MMG instruction copy is duplicated in 3 files (F-005).
  - HTML is built by string concatenation with mixed `UI.esc` usage. `S.mmgNumber` is inserted unescaped in `how-to-order.js:11` and `checkout.js:96`. That's low risk because it comes from config, not user input [VERIFIED].
  - `money()` and `moneyPlain()` in `app.js:13-14` are identical functions.
- No tests, lint or CI in the repo [VERIFIED: only `package.json` with a wrangler devDependency].

### 5.23 Design-system consistency
- Payment components use tokens properly except for the inline px (F-017).
- The step-list styles diverge (F-016) and icon semantics are reused (F-015).

### 5.24 Repeated components
- "Payment method list" is effectively a repeated component with 6 hand-written variants (§4.6). It's the main consolidation candidate.
- MMG instructions block ×3 (how-to-order card, checkout note, order pay-note).

### 5.25 Missing pages / states / features
- No Terms of sale page (F-013).
- No "payment received" state or order status lookup (by design; WhatsApp).
- No copy button (F-009).
- No `og:` meta (F-025).
- No sitemap.
- No `<noscript>` fallback (F-026).

### 5.26 Confusing decisions
- [QUESTION] Why does the footer hard-code Visa/Mastercard when a `cardEnabled` flag exists? Was it intended as a "future" list?
- [QUESTION] Should COD include East Coast Demerara? It's priced the same as East Bank (GY$ 1,200, 1–2 days) but excluded from COD.
- [QUESTION] "Paying at store pickup works too": does pickup accept MMG at the counter, or card? The page only says cash works.
- [QUESTION] The delivery table says "Times are counted from when we confirm your order on WhatsApp". For MMG, is it counted from confirmation of *payment*?

### 5.27 Opportunities
- **Quick wins (S):**
  - fix the anchor links (F-010)
  - `align-content:start` (F-014)
  - MMG icon (F-015)
  - copy buttons (F-009)
  - help CTA in section (F-012)
  - derive card/COD copy from config (F-003, F-011)
  - payee name line (F-008)
- **Bigger bets:**
  - Real order intake via a Worker + D1/KV (F-002) with unique IDs (F-006).
  - Pay-by-link card gateway when ready.
  - Optional "send proof of payment" flow (a prefilled WhatsApp message with order # and amount).
- **Hypotheses to test** (no invented uplift):
  - "Explicit 'send the MMG SMS to us' step reduces 'did you get my payment' chats."
  - "Showing COD availability per zone in the table reduces checkout surprises."

### 5.28 Legal / compliance hints (not legal advice)
- Advertising payment methods that aren't available (F-003) could raise consumer-protection questions [UNVERIFIED legally].
- No terms of sale covering payment, cancellation and refunds (F-013). A privacy page exists (`/privacy`), but its contents weren't reviewed for this audit.
- Personal data (name, phone, address) is stored in `localStorage` and sent in WhatsApp messages. Consider mentioning this in the privacy page [UNVERIFIED whether it already does].

### 5.29 Analytics & measurement

#### F-025 · No analytics or event tracking found; no share metadata  `[LIKELY]`
- **What:** no analytics snippet in the reviewed files and no `og:` tags.
- **Severity:** Note
- **Suggested events (to validate this report):**
  - clicks on the "Payment" chip
  - payment method selected at checkout (and COD auto-hidden events)
  - "Track on WhatsApp" taps vs orders placed (this directly measures the F-002 gap)
  - copy-number taps once F-009 is added
  - WhatsApp CTA clicks from `#payment`

#### F-023 · Public, indexable staging build  `[VERIFIED]` (indexability) / `[QUESTION]` (intent)
- **What:** `workers.dev` URL, no `noindex`, robots.txt allows `/how-to-order`. The content includes EXAMPLE business data.
- **Severity:** Note (becomes part of F-001 if the URL is public)
- **Fix:** add `X-Robots-Tag: noindex` in `_headers` until launch, or put Cloudflare Access in front.

#### F-024 · Sample reviews mentioning MMG exist in code  `[VERIFIED code]` / live labelling `[UNVERIFIED]`
- **Where:** `home.js:50-53` ("SAMPLE content until the client supplies verified reviews")
- **Why:** if these are shown on the live homepage without a clear "sample" label, they read as fabricated testimonials.
- **Severity:** Note here (home page out of scope). Check the live home.

## 6. Page-by-page raw notes

### /how-to-order#payment
- **Desktop 1280:** 3 equal cards, contents drift vertically (F-014). MMG list in default decimal style. "600-0000" bold. Card copy "coming soon" is fine.
- **Desktop 1920:** above the fold shows header, H1, chips and "3 ways" cards. Payment is below the fold, as expected for an anchor target.
- **Mobile 360:** stacked cards with good padding and readable text. The table above is clipped (F-018).
- **Copy quotes:**
  - "Pay the way you already pay"
  - "Place your order and note your order number." / "Send the total to **600-0000** with your order number as reference." / "We confirm your payment on WhatsApp."
  - "Pay in cash when your order arrives. Available in Georgetown and East Bank Demerara. Paying at store pickup works too."
  - "Visa and Mastercard are coming soon. For now, pay with MMG or cash."
- **Weirdness:**
  - "note your order number": the confirmation page shows it, but there's no copy button and no emailed copy (email is optional at checkout).
  - "Send the total": total of what? Subtotal plus delivery? See F-004.
- **Related findings:** F-001–F-026

## 7. Live vs code differences
- None found in the compared parts. Rendered `<main>` and `config.js` match the repo HEAD (`f747d1c`) [VERIFIED].
- I could not compare `_headers` or robots.txt as served [UNVERIFIED, proxy].

## 8. Parking lot
- Show COD availability as a column, or ✓ marks, in the delivery zones table so "can I pay cash?" is answered where people look for fees.
- A "How to send MMG" mini-illustration (3 phone screens). Needs real screenshots from the client.
- Use a WhatsApp Business catalog / payment confirmation template on the store side to reconcile `GY-` references.
- Consider showing the amount to send *including* a "GY$" format exactly as the MMG app expects (no "GY$ " prefix, no commas?) [QUESTION: how does the MMG app take amounts?].
- Re-run this audit with direct network access (allow `shipshop.hermeswraps.workers.dev` in the environment) to get headers, the console log, Playwright screenshots at 320/768/1024 and a Lighthouse run.
- Test the deep-link landing on `#payment` on a real iPhone/Android (F-019).

## 9. Questions for the owner / team
- [QUESTION] Real MMG number **and the account name customers will see**?
- [QUESTION] Real WhatsApp Business number?
- [QUESTION] Pay first or wait for our confirmation? Is there a payment deadline?
- [QUESTION] What proof of payment do you want: SMS screenshot, transaction ID, nothing?
- [QUESTION] For "Other" zones, should customers wait for the fee before paying?
- [QUESTION] Will cards come soon? Which gateway? Until then, should the footer list cards at all?
- [QUESTION] COD zones: confirm Georgetown + East Bank only. What about East Coast?
- [QUESTION] Can pickup customers pay by MMG at the counter?
- [QUESTION] How are refunds made for COD and MMG, how fast, and is delivery refunded?
- [QUESTION] Is the workers.dev URL public, or for review only?
- [QUESTION] Do you want to serve diaspora/gift buyers without MMG?

## 10. Assumptions log
| # | Assumption | Why assumed | How to verify |
|---|---|---|---|
| A1 | Core audience is local, mobile-first and already uses MMG | copy "Pay the way you already pay", MMG-first ordering | client interview / analytics |
| A2 | The site is pre-launch | README says example data and placeholders | ask the owner |
| A3 | The pay-card misalignment is caused by grid `align-content` stretch | CSS reading plus screenshot | DevTools: add `align-content:start` |
| A4 | Desktop sticky header height ≈126 px > 120 px scroll padding | pixel reading of `desk.png` | DevTools measure |
| A5 | Diaspora buyers can't use MMG | general knowledge of mobile money, not checked | client / MMG documentation |
| A6 | Screen readers may misread "600-0000" | common behaviour, not tested | NVDA/VoiceOver test |

## 11. Could not verify
| Item | Why not | What would verify it |
|---|---|---|
| Live response headers, HSTS/CSP, caching, redirects | Environment network policy returns 403 for the host via `curl` | Allow the host in environment settings, then `curl -sIL` |
| Live robots.txt / sitemap / 404 | Same | Same |
| Console errors / failed requests | Playwright blocked by the same policy | Run `capture.mjs` after allowing the host |
| Lighthouse / CWV | Not run | PSI or `npx lighthouse` |
| Anchor landing accuracy on `#payment` | Firecrawl screenshots start at the top | Real browser test |
| Whether 600-0000 is a real MMG account | Can't and shouldn't test with money | Client |
| Checkout / order pages as rendered live | Read-only, no orders placed | Staging test with the client's consent |
| Sample-review labelling on the live home | Out of scope | Scrape `/` |

## 12. Finding index
| ID | Title | Area(s) | Severity | Effort | Tag | Where |
|---|---|---|---|---|---|---|
| F-001 | Placeholder MMG and WhatsApp numbers live in payment instructions | Trust, Conversion | Critical | S | VERIFIED | config.js:9-10,38; #payment |
| F-002 | Web orders never reach the store unless the customer taps WhatsApp | Conversion, Technical | Critical | M | VERIFIED | config.js orderEndpoint; checkout.js:143-162 |
| F-003 | Card claimed in 4 places but disabled | Content, Trust | High | S | VERIFIED | app.js:341; sections.js:28,40; product.js:55 |
| F-004 | "Other" zone + MMG: send a total without delivery fee | UX, Conversion | High | S | VERIFIED | checkout.js:59-63,96; order.js:25,34; FAQ |
| F-005 | Contradictory payment sequence; no deadline or proof step | UX, Content | High | S | VERIFIED | how-to-order.js:11; checkout.js:96; order.js:25-37 |
| F-006 | 5-digit random order IDs used as MMG reference | Conversion, Technical | High | S–M | VERIFIED | checkout.js:147 |
| F-007 | `[CLIENT TO SUPPLY]` placeholders visible | Content, Trust | Medium | S | VERIFIED | how-to-order.html returns; app.js footer |
| F-008 | No payee name; MMG not explained | Content, Trust | Medium | S | VERIFIED | how-to-order.js:11 |
| F-009 | No copy button for number/reference | CTA, Mobile | Medium | S | VERIFIED | how-to-order.js:11; order.js:34 |
| F-010 | Payment links point to #delivery | Navigation | Medium | S | VERIFIED | app.js:239; product.js:55 |
| F-011 | COD zone text hard-coded, not from codZones | Content, Code | Medium | S | VERIFIED | how-to-order.js:12; checkout.js:38,41,90; product.js:55 |
| F-012 | #payment section has no CTA | CTA | Medium | S | VERIFIED | how-to-order.html #payment |
| F-013 | Thin refund/payment terms; no terms page | Content, Legal | Medium | S–M | VERIFIED | #returns; public/ |
| F-014 | Pay-card contents misaligned on desktop | UI | Low | S | VERIFIED | styles.css:618; d_mid.png |
| F-015 | MMG and Card share a credit-card icon | UI | Low | S | VERIFIED | how-to-order.js:11,13 |
| F-016 | Inconsistent numbered-step styles | UI, DS | Low | S | VERIFIED | how-to-order.js:11 vs .ways |
| F-017 | Inline style / hard-coded px on MMG list | Code, DS | Low | S | VERIFIED | how-to-order.js:11 |
| F-018 | Delivery table clipped on mobile; Fee hidden | Layout, Mobile | Medium | S–M | VERIFIED | mob_1400.png |
| F-019 | Deep-link landing on #payment may be off | Navigation, Tech | Low | S | UNVERIFIED | styles.css:6; JS injection |
| F-020 | No "Payment" link in footer Help | IA | Low | S | VERIFIED | app.js footer |
| F-021 | Number may be misread by screen readers | A11y | Low | S | ASSUMPTION | #payment |
| F-022 | No payment path without MMG/cash | Conversion | Note | M–L | VERIFIED/ASSUMPTION | #payment Card |
| F-023 | Public, indexable staging build | SEO, Trust | Note | S | VERIFIED | robots.txt; no noindex |
| F-024 | Sample reviews mention MMG | Trust | Note | S | VERIFIED code | home.js:50-53 |
| F-025 | No analytics/event tracking; no OG tags | Analytics, SEO | Note | S–M | LIKELY | how-to-order.html head |
| F-026 | Payment content is client-side rendered only | SEO, Tech | Note | M | VERIFIED | how-to-order.html #pay-cards |

