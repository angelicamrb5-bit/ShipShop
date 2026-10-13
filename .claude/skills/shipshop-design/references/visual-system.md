# ShipShop - Visual system

All values map to tokens in `tokens.css`. Typography is professional through the discipline of how it's applied, not through the font itself.

## 1. Typography

### Families and roles
| Family | Weights | Roles |
|---|---|---|
| Young Serif | 400 only | H1, H2, logo placeholder, collection names (e.g. "Mashramani Collection") |
| Plus Jakarta Sans | 400 / 500 / 600 / 700 | Everything else: H3, body, eyebrows, product names, prices, buttons, menus, forms, badges, tables |

Max two families. Italic of Young Serif doesn't exist; don't fake it with synthetic slant.

### Scale (mobile 390 → desktop 1440)
| Role | Mobile | Desktop | Font | Details |
|---|---|---|---|---|
| H1 hero | 34-40px | 48-56px | Young Serif | lh 1.05 · -0.01em · sentence case |
| H2 section | 26-28px | 32-40px | Young Serif | lh 1.15 |
| H3 / collection | 18-20px | 22-24px | Jakarta 600 | — |
| Eyebrow | 12px | 13px | Jakarta 600 | Sentence case with palo de rosa dot: "• New in" |
| Body | 16px | 16-17px | Jakarta 400 | lh 1.55-1.65 · max 65 characters |
| Small / meta | 14px | 14px | Jakarta 400/500 | Helper text, captions, delivery lines |
| Product name | 14px | 15px | Jakarta 500 | Max 2 lines, truncate with "…" |
| Price | 15px | 16px | Jakarta 600 | Tabular numbers · "GY$ 8,500" |
| Button | 15px | 15px | Jakarta 600 | Sentence case · pill · 48-52px high |

### Treatment
- **Do:** sentence-case headlines of medium size ("solid without shouting"); an eyebrow with "•" above each H2 ("• Best sellers" → "Loved by Georgetown"); at most one accent word per headline in palo de rosa; left-aligned on mobile, centered only for hero and short banners; section top margin ≥ 2× headline height.
- **Don't:** Young Serif under 20px (prices, filters, forms); forced uppercase in buttons or eyebrows; paragraphs in italic or all caps; more than 2 families; Montserrat or Playfair; text on photos without a scrim.
- Readability for everyday shoppers: never body text under 16px; 14px only for metadata; avoid long paragraphs (3 lines on mobile, then break or use a list).

## 2. Layout and grid

| | Mobile (design at 390, test 360-430) | Tablet (768) | Desktop (1440) |
|---|---|---|---|
| Columns | 4 | 8 | 12 |
| Side margin | 16px | 32px | 64px (container 1312px) |
| Gutter | 16px | 24px | 24px |
| Product grid | 2 col | 3 col | 4 col |
| Category tiles | 3 col | 3 col | 6 col |

- Mobile-first: design the 390px screen first, then expand. Never just shrink the desktop.
- One idea per section; one primary filled button per screen.
- Rhythm: alternate Marfil and Blush suave sections. AnnouncementBar (Malva) on top, footer (Malva) at the bottom frame the page.
- Sticky elements allowed: header (compact on scroll), PLP filter bar, PDP StickyBuyBar (mobile), checkout summary (desktop). Never stack two sticky bars at the bottom.
- Desktop PDP: gallery left (7 cols), buy box right (5 cols). Desktop checkout: form left (7-8 cols), summary pinned right (4-5 cols).

## 3. Spacing

- Base 4px; scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64.
- Inside components: 8-16px. Between components in a section: 24-32px. Between sections: ≥48px mobile, ≥64px desktop (and ≥ 2× headline height).
- Tap targets ≥44px with ≥8px between adjacent targets (size chips, color swatches, quantity steppers).

## 4. Color application

See `brand-foundations.md` for values and pairs. Quick map:
- Page `--color-bg`; alternate section `--color-surface-2`; cards/chips/blocks `--color-surface`; product image ground white or `--color-surface`.
- Text `--color-ink`; secondary `--color-muted`; links and accent word `--color-primary` (on Blush use `--color-primary-strong`).
- AnnouncementBar and footer `--color-secondary` with Marfil text.
- Primary button `--color-primary` + white; hover/pressed `--color-primary-strong`.
- WhatsApp elements `--color-whatsapp` + `--color-whatsapp-ink`, nowhere else.

## 5. Imagery

- **Ratios:** product 4:5 (all cards and galleries); hero 4:5 mobile / 16:9 desktop; season banner full width (4:5 or 1:1 mobile, 16:9 or 21:9 desktop); category tile 1:1 or 4:5; social "Shop the look" 1:1 grid of 6.
- **Product photos:** 4-6 per product (front, back, detail, on body or in use, scale) + optional short muted video. Consistent background and light within a category. Show color accurately: the swatch must match the photo.
- **Lifestyle and campaigns:** warm daylight, real local settings and seasons (Mashramani, Diwali, Christmas), real people wearing or using the products. Feminine and soft, but the store also sells Men, Kids and Home: keep those sections equally cared for.
- **Text over images:** only with a scrim/gradient (`--color-overlay`) or on a solid Blush/Marfil panel; check ≥4.5:1 per image.
- **Alt text** describes the product as a shopper needs it ("Linen wrap dress in sand, midi length, tie waist").
- **Never:** AI-generated images presented as real products, customers or reviews; stock images that misrepresent the catalog. Placeholders labeled `[PRODUCT PHOTO: description]`.
- Performance: lazy-load below the fold, modern formats, fixed aspect boxes to avoid layout shift.

## 6. Iconography

- Simple line icons, 24px, ~1.5-2px stroke, rounded joins, Tinta (palo de rosa only for active/selected).
- Required set: search, account, heart (wishlist), bag with counter, menu, close, chevrons, filter, plus/minus, check, truck (delivery), wallet/MMG (payment), chat (WhatsApp - use the official WhatsApp glyph only in WhatsApp elements), return arrow, location pin, clock, star.
- Icon-only buttons need an accessible name and a 44px target. Action icons in content are paired with a label.

## 7. Data display

- **Prices:** one formatter for all GYD values: `GY$ 8,500` (integers, comma thousands, no decimals, non-breaking space after "GY$"). Sale: current price in `--color-sale`, original struck through in `--color-muted`, optional "-19%" chip. Prices use tabular numbers so grids align.
- **Totals:** subtotal → delivery (zone fee, "Free", or "Calculated at checkout") → total, always in that order, right-aligned figures.
- **Free-delivery progress:** bar in `--color-primary` on `--color-surface` + text "You're GY$ 2,000 away from free delivery"; on reaching it: check icon + "You've unlocked free delivery in Georgetown".
- **Stock:** "In stock" (success-text + check), "Only 3 left in M" (warning-text + icon), "Out of stock" (muted + "Notify me" / "Ask on WhatsApp"). Never color alone.
- **Delivery estimate:** per zone, short: "Georgetown: tomorrow · Regions 3/4/5: 2-3 days".
- **Ratings:** 5 stars (filled Tinta or palo de rosa) + "4.6 · 23 reviews"; hide the block when there are no reviews instead of showing zero.
- **Order status:** stepper Pending payment → Confirmed → Shipped → Delivered (vertical on mobile, horizontal on desktop), each with icon, label and date/time.
- **Tables** (delivery zones, size guide): Jakarta 14-16px, header row on Blush, 1px line rows, first column 600 weight; on mobile, allow horizontal scroll *inside* the table only, with the first column sticky.
- **Charts** appear only in internal dashboards or system docs: palo de rosa for the primary series, malva and piedra for secondary, champán for a single highlight; label values directly.

## 8. Motion

| Interaction | Motion | Duration |
|---|---|---|
| Button/chip hover, press | color shift, 1-2% scale on press | 150ms |
| Add to bag | bag counter bump + drawer opens (or toast on desktop if drawer disabled) | 200ms + 300ms |
| Cart drawer / filter bottom sheet / mega-menu | slide in from right / bottom / top + scrim fade | 300ms ease-out |
| Accordion, tabs | height/opacity | 200ms |
| Free-delivery bar | width fills | 300ms |
| Confirmation | checkmark draw | ≤400ms, once |

- Purpose: confirm actions and show where things came from. No decorative entrance animations on scroll for content shoppers need to read.
- Carousels: swipe and arrows, no auto-advance. Video: muted, user-initiated, with controls.
- WhatsApp floating button: static. No pulse, bounce or shake.
- `prefers-reduced-motion`: replace movement with instant state changes or fades.
