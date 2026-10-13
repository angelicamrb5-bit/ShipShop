# ShipShop - Brand foundations

## 1. Source and status

- **Creative direction:** "Guía Boutique Blush · Tipografía" (Claude Design project, shared by the client).
- **Status:** the values below are a **provisional Boutique Blush system**, built to the guide's name and intent (blush, boutique, typographic) and checked for WCAG AA. They are not copied from the guide.
- **When the guide export is available** (`assets/creative-direction/`):
  1. Replace the hex values in the *Core palette* and *Supporting tones* blocks of `tokens.css` with the guide's values, keeping token names.
  2. Replace the font families in `--ss-font-*` with the guide's typefaces, keeping the roles (display serif / UI sans).
  3. Re-check every pair in §3 below; if a guide color fails AA for a role, keep it decorative and use the nearest darker shade for text.
  4. Do not change role tokens, components or rules. They are the system; the palette is a skin.

## 2. Palette

| Token | Hex | Role |
|---|---|---|
| `--ss-cream` | `#FFFAF7` | Main page background (60%) |
| `--ss-blush-50` | `#FBEFEC` | Alternate section background |
| `--ss-blush-100` | `#F6E0DB` | Tags, soft surfaces, selected rows |
| `--ss-blush-200` | `#EECBC3` | Borders, dividers, card outlines |
| `--ss-blush-400` | `#D99A92` | Decorative only (illustration, rules) |
| `--ss-rose` | `#B8475F` | Accent: large display words, icons, badges on Cream |
| `--ss-berry` | `#8E2C47` | Primary action, links, active state (10%) |
| `--ss-berry-deep` | `#6E1F36` | Hover/pressed for Berry, headings, one anchor band |
| `--ss-plum` | `#2A1720` | Body text, footer, overlays |
| `--ss-mauve` | `#6B5560` | Secondary text, captions, helper text |
| `--ss-champagne` | `#C9A27A` | Decorative finishing detail only (thin rules, ribbon) |
| `--ss-white` | `#FFFFFF` | Product image grounds, inputs, text on Berry |
| `--ss-success` | `#2F6B4F` | Status: success / delivered / in stock |
| `--ss-error` | `#B3261E` | Status: error / out of stock / failed |
| `--ss-warning` | `#8A5A00` | Status: attention / low stock / delayed |

## 3. Approved contrast pairs (WCAG 2.x)

Normal text needs ≥4.5:1; large text (≥24px, or ≥18.66px bold) and UI graphics need ≥3:1.

| Foreground | On Cream | On Blush 50 | On Blush 100 | On Blush 200 | Use |
|---|---|---|---|---|---|
| Plum | 16.3 | 15.0 | 13.4 | 11.3 | Any text |
| Berry Deep | 10.6 | 9.8 | 8.7 | 7.3 | Any text, headings |
| Berry | 7.8 | 7.2 | 6.4 | 5.4 | Any text, links |
| Mauve | 6.6 | 6.0 | 5.4 | 4.5 | Secondary text (Blush 200: borderline, avoid) |
| Success | 6.1 | 5.6 | 5.0 | 4.2 ✗ | Status text (not on Blush 200) |
| Error | 6.3 | 5.8 | 5.2 | 4.4 ✗ | Status text (not on Blush 200) |
| Warning | 5.7 | 5.3 | 4.7 | 3.9 ✗ | Status text (not on Blush 200) |
| Rose | 4.9 | 4.6 | 4.1 ✗ | 3.4 ✗ | Text only on Cream/Blush 50; large/display elsewhere |
| Blush 400 | 2.3 ✗ | — | — | — | Never text |

| Text on dark | White | Cream | Blush 100 | Blush 200 |
|---|---|---|---|---|
| On Berry | 8.1 | 7.8 | 6.4 | 5.4 |
| On Berry Deep | 11.0 | 10.6 | 8.7 | 7.3 |
| On Plum | 16.9 | 16.3 | 13.4 | 11.3 |
| On Rose | 5.1 | 4.9 | 4.1 ✗ | 3.4 ✗ |

Primary button = White on Berry (8.1). Focus ring = Berry on Cream (7.8 > 3:1).

## 4. Color roles and proportions

- **60%** Cream + Blush 50 (page and section backgrounds).
- **30%** Blush 100/200 surfaces, Plum text, one Plum/Berry Deep band, footer.
- **10%** Berry (primary buttons, links, selected states, key prices or highlights) + Rose accents.
- Champagne and Blush 400 are seasoning: thin lines, ribbon details, illustration. Never more than a touch per screen.
- Status colors only mean status. Never use Error red for sales or urgency.

## 5. Logo and wordmark rules

- `[CLIENT TO SUPPLY: logo files]`. Until supplied, set "ShipShop" in the display serif, Plum on light or Cream on Plum, as a clearly marked placeholder.
- Logo sits on Cream, Blush 50 or Plum. Never on busy photos, never recolored outside the palette, never stretched or outlined.
- Clear space around the logo ≥ the height of its capital "S".

## 6. Brand facts we can use

Only these, as supplied by the client:
- ShipShop makes shopping **faster, easier and personalized**.
- ShipShop positions itself as a **pioneer of online selling for the regular public in Guyana**, aiming to **set the standard of online shopping quality** there.
- Signature line: **"Come and buy with us is easier for you"** (on screen: "Come and buy with us — it's easier for you.").

Everything else (delivery areas and times, payment methods, return policy, prices, founding year, team, order volumes, reviews) is `[CLIENT TO SUPPLY]`. Never invent it.
