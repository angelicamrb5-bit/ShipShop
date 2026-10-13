---
name: shipshop-design
description: Internal design instruction set for the client ShipShop (online shopping for the everyday public in Guyana; creative direction "Boutique Blush"). Use this skill whenever designing, wireframing, writing UI copy for, building, or reviewing anything visual for ShipShop - websites, marketing pages, landing pages, shop/product/cart/checkout flows, consultation booking, product experiences, components, design tokens, design-system documentation, emails, or social/ad layouts. Also use when the user mentions ShipShop, Boutique Blush, the --ss- tokens, "Come and buy with us", or asks to "make it on-brand" for this client.
---

# ShipShop - Design Skill

This is how Claude designs for ShipShop. It turns the client's audience, message, conversion goal and creative direction ("Guía Boutique Blush · Tipografía") into design decisions. Read this file in full before any design work. Open the files under `references/` when the task needs that level of detail.

**This skill is a folder, not just this file.** The directory this SKILL.md was loaded from also contains:

```
references/brand-foundations.md   references/tokens.css          references/visual-system.md
references/components.md          references/page-blueprints.md  references/voice-and-copy.md
assets/creative-direction/README.md  (+ the Boutique Blush guide export, when supplied)
```

Read them with your file tools from the skill's own directory. Never say they are missing unless you listed the directory and they weren't there. If file access is off, say so once and continue: this file holds every non-negotiable rule.

> **Creative-direction status.** The palette and typefaces in this skill are a *provisional* Boutique Blush system built to the guide's name and intent. When `assets/creative-direction/` contains the guide export, its exact hex values and typefaces **replace** the provisional ones (update `references/tokens.css` palette tokens only; role tokens and every rule below stay the same). See `references/brand-foundations.md` §1.

## 0. The brief in one breath

- **Who we design for (two audiences, one experience):**
  1. **Everyday shoppers** who want buying online to be as easy and accessible as possible. Many may be buying online for the first time. They judge us in seconds: *Do I understand this? Do I trust it? Can I finish?*
  2. **Design system designers** who build, extend and audit ShipShop's components. They judge us by whether the system is coherent, documented, accessible and predictable.
- **Primary message:** *We can make your shopping faster, easier and personalized.*
- **Signature line:** *"Come and buy with us — it's easier for you."* (Client wording: "Come and buy with us is easier for you." Use the punctuated version on screen; see §3.)
- **Conversion goal:** set the standard of online shopping quality in Guyana, as the pioneers of online selling for the regular public. Every screen must feel like *the* reference for how online shopping should work.
- **Primary action on marketing pages:** **book a free shopping consultation** (personal help to find and buy what you need). In shop flows, the task action (Add to cart, Checkout) leads and the consultation becomes the help path.
- **Creative source of truth:** the Boutique Blush guide (`assets/creative-direction/`), summarized in `references/brand-foundations.md`, implemented in `references/tokens.css`.

## 1. Design approach and feeling

**Target feeling: "a friendly boutique that takes care of you."** Warm, calm, clear and well kept. Premium in care and finish, never exclusive or intimidating. A first-time shopper should feel welcome; a design system lead should see order underneath.

Hold three ideas together on every screen:

| Idea | How it shows up |
|---|---|
| **Easy** (the promise) | One task per screen region. Big readable type, large tap targets, plain words, obvious next step. Nothing to decode. |
| **Personal** (the difference) | "You/your" language, a real person available to help, remembered choices, recommendations framed as help, not upsell. |
| **Boutique quality** (the standard) | Blush-and-cream surfaces, a confident berry accent, elegant display type, generous whitespace, consistent detail. The page itself proves the standard. |

**The two tests for any decision:**
1. *Could someone who has never shopped online finish this without help?*
2. *Would a design system designer find this consistent, tokenized and documented?*
If a choice fails either test, change it. If it is decorative and helps neither, cut it.

## 2. Communicating expertise to design system teams

Design system designers are specialists. They trust systems they can inspect. Show the craft; don't describe it with adjectives.

**Do**
- **Build only from role tokens** (`--ss-*` in `references/tokens.css`). No raw hex, no one-off sizes. Name new tokens by role (`--ss-surface-promo`), never by look (`--ss-pink-2`).
- **Document every component the same way:** purpose → anatomy → variants → sizes → states (default, hover, focus-visible, active, disabled, loading, error, empty, success) → tokens used → accessibility notes → content rules → do/don't. Format in `references/components.md`.
- **Treat accessibility as a quality spec:** WCAG 2.2 AA minimum, contrast pairs listed in `brand-foundations.md`, 44×44px targets, visible focus ring, labels on every input, motion that respects `prefers-reduced-motion`.
- **Show states and edge cases**, not only the happy path: out of stock, long product names, missing images, slow connection, payment failure, empty cart. These are what system teams look for first.
- **Use their vocabulary correctly** in system docs: tokens (primitive / semantic / component), variants, slots, density, breakpoints, theming, deprecation, changelog, contribution model.
- **Keep consumer copy and system docs separate.** Shopper-facing pages never use system jargon; documentation pages never use sales tone.
- **Version and explain decisions:** when you add or change a component, state the problem, the rule it follows and the tokens it uses.

**Avoid**
- Superlatives without proof ("best", "#1 in Guyana", "world-class").
- Invented numbers, partners, payment methods, delivery times, reviews, awards or user counts. Insert a clearly marked placeholder: `[CLIENT TO SUPPLY: delivery areas]`.
- One-off components that duplicate an existing one with small visual changes.
- Hiding complexity behind decoration. Clarity is the expertise.

## 3. "Come and buy with us — it's easier for you" - the message system

This line is the spine of the experience. It means: **we do the hard parts so buying feels simple for you.** It should be felt on every screen, not just printed once.

**Where the literal line appears (verbatim, do not reword):**
1. Home hero - as the supporting line under the headline, or as the headline itself.
2. The closing CTA band before the footer on marketing pages.
3. The footer, next to the logo, as the signature.
4. The order-confirmation screen, as the small closing line under the next steps (never as the main heading: "Thank you, your order is in" leads).

Once per viewport at most. Never in buttons, error messages or legal text. If the client confirms a different punctuation or a Spanish/Creole version, update `references/voice-and-copy.md` and use that everywhere.

**Where the idea appears (every page, in plain words):**
- **Faster** → fewer steps and visible progress: "3 steps to checkout", progress indicator, saved details, clear delivery expectations `[CLIENT TO SUPPLY]`.
- **Easier** → one obvious next action, plain language, help always one tap away, forgiving forms (no lost input, inline guidance).
- **Personalized** → "for you" moments: recommendations explained ("Because you looked at…"), a named helper in the consultation, remembered sizes/addresses, choice of how to be contacted.
- **Headlines lead with the shopper:** "Find what you need, we'll handle the rest." ShipShop is the helper, the shopper is the subject.
- **Microcopy keeps the promise small and specific:** "We'll confirm your order by [CLIENT TO SUPPLY: channel]." "You can change this later."

Supporting phrasings (adapt; don't overuse any one): *"Shopping made simple." / "Tell us what you need. We'll find it." / "Help from a real person." / "Your order, step by step."*

## 4. Messaging hierarchy and CTA guidance

**Order of persuasion on every marketing page** (top to bottom):
1. **Promise** - faster, easier, personalized shopping for you. (Hero)
2. **How it works** - 3 numbered steps a first-timer understands in 5 seconds. (Directly after the hero.)
3. **What you can do / buy** - categories or services, shown, not listed.
4. **Personal help** - the consultation: what it is, who helps, what you get.
5. **Trust and standard** - how ShipShop protects the shopper (clear prices, order updates, support, returns policy `[CLIENT TO SUPPLY]`) and the pioneer story: setting the standard for online shopping in Guyana. Frame "pioneer" as responsibility and care, not boasting.
6. **Risk removal** - FAQ in plain language.
7. **Close** - signature line + CTA.

**CTA rules**
- **Primary marketing CTA, identical everywhere: "Book a free consultation."** Short form where space is tight: "Book free consultation". If the client renames the service, change it in `voice-and-copy.md` and everywhere at once.
- **One primary button per viewport.** Secondary actions ("Start shopping", "See how it works") use the secondary or text button.
- **Placement:** header (right, always visible), hero, after "Personal help", closing band. On mobile, a slim sticky bottom bar after the visitor scrolls past the hero (hidden inside checkout).
- **Reassurance line under every primary CTA:** *"Free · No obligation · A real person helps you."* (Adjust only if the client confirms different terms.)
- **Explain the consultation** wherever it is the main focus, in 3 steps: *Tell us what you need → We find the best options for you → You decide and we handle the order.*
- **Booking form:** as few fields as possible. Required: name, phone or WhatsApp/email (one contact method, shopper's choice) `[CLIENT TO CONFIRM channels]`, "What are you looking for?" (free text). Optional: budget, preferred time to be contacted, photo or link of the item. Confirmation screen restates what happens next and when `[CLIENT TO SUPPLY: response time]`.
- **In shop flows** (catalog, product, cart, checkout) the primary button is the task: "Add to cart", "Go to checkout", "Place order". The consultation appears as a quiet help link: "Not sure? Get free help choosing."
- **Phone/WhatsApp/email** are always visible as a secondary path (header utility row or footer), never competing with the primary button.

Quality leadership comes from clarity and lowered risk, not price claims. Don't invent prices, discounts, delivery times or guarantees.

## 5. Visual direction (summary - full specs in references)

### Color (Boutique Blush)
- **60 / 30 / 10:** 60% Cream `#FFFAF7` + Blush 50 `#FBEFEC` backgrounds; 30% Blush 100/200 surfaces and Plum `#2A1720` text and footer; 10% Berry `#8E2C47` for primary buttons, links, active states and key highlights.
- Body text Plum; secondary text Mauve `#6B5560`; headings Plum or Berry Deep `#6E1F36`.
- **Rose `#B8475F`** is an accent for large display words, icons and badges on Cream only. Never small text on Blush 100/200 (fails AA).
- **Blush 400 `#D99A92`** and Champagne `#C9A27A` are decorative only (illustration, rules, dividers). Never text, never borders that carry meaning.
- Functional colors (success, error, warning) are reserved for status; never decorative.
- Mostly light, warm site. No dark mode marketing pages; a Plum band may anchor one section and the footer.
- Always use `--ss-*` role tokens; never hard-code hex in components.

### Typography ("Tipografía")
- **Display / headings:** an elegant high-contrast serif (provisional: **Fraunces** 500-600, soft optical size). H1/H2 only. May set one key word in *italic* or Rose for warmth.
- **Body / UI:** a friendly, highly legible sans (provisional: **Nunito Sans** 400/600/700). **Body 18px on mobile and desktop** (16px minimum anywhere), line-height 1.6, measure 45-70 characters.
- **Prices and numbers:** body sans, 700, tabular figures. Currency always shown `[CLIENT TO CONFIRM: GYD / USD display]`.
- **Eyebrows:** sans 600, 13-14px, uppercase, 0.08em tracking, Berry on light.
- If the guide specifies other fonts, keep the roles: elegant display serif / friendly legible sans / no third family.
- Full scale in `references/visual-system.md`.

### Layout and spacing
- Mobile-first. Design at 375px first, then 768px and 1280px. 16px side gutters on mobile; 12-column grid, 1200px max content on desktop.
- 8px spacing base; section padding 64px mobile / 96px desktop.
- One idea per section, one primary action per viewport. Left-aligned text; center only short hero or closing statements.
- Alternate Cream and Blush 50 sections; at most one Plum (or Berry Deep) band per page plus the footer.

### Imagery
- Real products and real people shopping, receiving and unboxing; warm natural light; soft blush-toned backgrounds for product shots. Show the help: a ShipShop helper on the phone, packing an order, handing over a parcel.
- Product photos: consistent background, consistent crop (square 1:1 in grids), no clutter.
- Text over photos only on a Plum overlay (≥70% opacity where text sits) or on a Cream panel.
- No generic stock (corporate handshakes, headset call centers), no luxury-fashion editorial that feels exclusive, no AI images presented as real products or real customers.
- Missing images: neutral Blush 50 placeholder labeled `[PRODUCT PHOTO: description]`.

### UI styling
- **Buttons:** pill shape, min height 48px (52px on mobile primary). Primary = Berry with white text; secondary = Berry 2px outline on Cream; text button = Berry underline on hover.
- **Cards:** 16px radius, Cream surface on Blush 50 (or white on Cream), 1px Blush 200 border, soft shadow only on hover/elevation. Soft and tidy > glossy.
- **Signature motif - the "ribbon tag":** a small rounded tag (like a boutique gift tag) in Blush 100 with Berry text, used for eyebrows, "For you" recommendations, status labels. Max a few per screen.
- **Focus ring:** 3px Berry outline with 2px Cream offset on every interactive element.
- Icons: rounded, 2px stroke, 24px, always paired with a text label for actions.
- Full component specs: `references/components.md`.

### Data (prices, orders, progress)
- Show totals early and the same way every time: item subtotal, delivery `[CLIENT TO SUPPLY]`, total. No surprises at the last step.
- Order status as a horizontal stepper on desktop / vertical on mobile, with plain labels (Ordered → Confirmed → On the way → Delivered `[CLIENT TO CONFIRM stages]`) and a date/time per step.
- Numbers use tabular figures; never color alone to signal status (always icon + label).
- Charts (only in dashboards or system docs) follow `references/visual-system.md` §Data.

### Motion
- Purpose: reassure and guide, never perform. 150-250ms for UI states, max 400ms for reveals. Ease-out `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Confirm actions visibly: add-to-cart pulse on the cart count, a checkmark on success, a gentle progress fill in checkout.
- Signature (optional, once per flow): **"wrapped with care"** - on order confirmation, the ribbon tag gently ties/settles in (≤600ms).
- No bounce, parallax, autoplay carousels or looping animations. Respect `prefers-reduced-motion` (replace movement with fades or nothing).

## 6. Pages

Site structure and section order for each key page are in `references/page-blueprints.md`: Home, How it works, Personal shopping consultation (booking), Shop / category, Product detail, Cart and checkout, Order tracking, Our standard (pioneers / about), Help & FAQ, Campaign landing page, and the Design system documentation hub. Start every page from its blueprint, then adapt.

## 7. Design rules

**Lean into**
- Cream and blush surfaces, one confident Berry accent, Plum for text and anchoring.
- Large, readable type and big tap targets; plain, warm words.
- One obvious next step per screen; visible progress; totals shown early.
- A real person available to help, always one tap away.
- The signature line in its fixed places; the "you" voice everywhere.
- Consistent components, tokens and states that a design system team can inspect.
- Accessibility as part of the quality standard.

**Avoid**
- Rose or decorative blush for small text; pastel-on-pastel text; meaning carried by color alone.
- Exclusive luxury cues (tiny thin type, all-caps body, cold black-and-gold, inaccessible "editorial" layouts).
- Bargain-bin cues (red starbursts, countdown timers, fake scarcity, cluttered banners).
- Dark patterns: pre-checked add-ons, hidden fees, confirm-shaming, forced account creation before checkout.
- Jargon ("SKU", "fulfillment", "omnichannel") in shopper-facing copy.
- Invented proof, prices, delivery promises or reviews; placeholder copy that looks final.
- Competing primary CTAs; CTA wording that changes page to page.
- Autoplay carousels, mega-menus with dozens of links, modals on page load.

## 8. Workflow for any design task

1. Identify the deliverable (page, section, component, flow) and which audience it mainly serves (shopper, design system team, or both).
2. Load `references/tokens.css` (and `visual-system.md` / `components.md` as needed). Pick the page blueprint if it's a page.
3. Check `assets/creative-direction/` for the guide export; if present, confirm tokens match it.
4. Write the message first: shopper-first headline, how it works, CTA. Then lay out, mobile first.
5. Build with role tokens only. Mark every missing fact as `[CLIENT TO SUPPLY: ...]`.
6. Run the checklist below before presenting. When presenting, briefly state which rules drove key choices.

## 9. Pre-ship checklist

- [ ] Every color, size and radius comes from `--ss-*` tokens; no new hex values.
- [ ] Surfaces are mostly Cream/Blush; Berry ≈10%; at most one Plum band plus footer.
- [ ] Every text/background pair is on the approved list (`brand-foundations.md` §3); body ≥16px (18px default).
- [ ] Hero speaks to the shopper; signature line verbatim in its fixed places, never twice in one viewport.
- [ ] "How it works" sits right after the hero; no invented numbers, prices, delivery times or reviews.
- [ ] One primary button per viewport; marketing CTA reads "Book a free consultation" with the reassurance line; shop flows lead with the task action.
- [ ] All states designed (hover, focus, disabled, loading, error, empty, success); targets ≥44px; focus ring visible.
- [ ] Forms: visible labels, inline errors in plain words, no lost input, minimal required fields.
- [ ] Reduced motion respected; images have descriptive alt text; status never by color alone.
- [ ] Layout works at 375px with 16px gutters and no horizontal scroll.

## Reference files

- `references/brand-foundations.md` - palette, approved contrast pairs, color roles, logo and brand-fact rules, how to apply the guide export.
- `references/tokens.css` - drop-in CSS variables: color, roles, type, spacing, radius, shadow, motion.
- `references/visual-system.md` - type scale, grid, spacing, imagery, iconography, data, motion specs.
- `references/components.md` - component specs: anatomy, sizes, tokens, states, accessibility, content rules.
- `references/page-blueprints.md` - page hierarchy and section-by-section content guidance.
- `references/voice-and-copy.md` - tone, word choices, headline patterns, CTA and microcopy library.
- `assets/creative-direction/README.md` - where the Boutique Blush guide lives and how to sync it.
