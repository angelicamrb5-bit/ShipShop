# ShipShop - Brand foundations

## 1. Source

- **Creative direction:** "Guía Boutique Blush · Tipografía 10" (Claude Design), built on the client's palette study (`palette-study.pdf`, option E · Boutique Blush: *femenina · suave · elegante*) and typography study (`typography-boutique-blush.pdf`, option 10 · Young Serif + Plus Jakarta Sans: *cercana con carácter*). Both PDFs are in `assets/creative-direction/`.
- The guide's palette, type, tokens and component names are fixed. This skill adds only what the guide leaves open (accessible text variants, focus, input borders), each marked **system addition**.

## 2. Palette (from the guide)

| Name | Hex | Token | Use |
|---|---|---|---|
| Palo de rosa | `#A4505D` | `--color-primary` | CTAs, eyebrows, accent word, sale price |
| Malva | `#7A4E5E` | `--color-secondary` | AnnouncementBar, footer |
| Blush | `#F6E4E1` | `--color-surface` | Cards, blocks, chips |
| Blush suave | `#FBF0EE` | `--color-surface-2` | Alternate sections |
| Marfil | `#FFFCFA` | `--color-bg` | Page background |
| Champán | `#C8A66B` | `--color-accent` | NEW badge, always with Tinta text |
| Tinta | `#211A1D` | `--color-ink` | Headlines and body |
| Piedra | `#6F6266` | `--color-muted` | Secondary text, strikethrough price |
| Line | `#EBD3CF` | `--color-line` | Dividers, card borders (decorative) |
| Sale | `#A4505D` | `--color-sale` | Sale price / SALE badge |
| Warning | `#B26A00` | `--color-warning` | Low-stock icon/indicator |
| Success | `#2E7D32` | `--color-success` | Success icon/indicator |
| WhatsApp | `#25D366` | `--color-whatsapp` | **Only** WhatsApp buttons/links |
| WhatsApp ink | `#0B2E17` | `--color-whatsapp-ink` | Text/icon on WhatsApp green |

### System additions (not in the guide; needed to keep text AA)

| Token | Hex | Why |
|---|---|---|
| `--color-primary-strong` | `#93424F` | Hover/pressed for primary; palo de rosa *text* on Blush (5.5:1) |
| `--color-warning-text` | `#8F5500` | "Only 3 left" text; guide warning is 4.1:1 on marfil |
| `--color-success-text` | `#2A6B2E` | Success text on Blush surfaces |
| `--color-field-border` | `#6F6266` (= muted) | Input/checkbox borders need ≥3:1; `--color-line` is 1.4:1 |
| `--color-focus` | `#211A1D` (= ink) | Focus outline, 16.7:1 on marfil |

## 3. Approved contrast pairs (WCAG 2.x, computed)

Normal text ≥4.5:1 · large text (≥24px, or ≥18.66px bold) and UI graphics ≥3:1.

| Text | On Marfil | On Blush suave | On Blush | On White | Rule |
|---|---|---|---|---|---|
| Tinta | 16.7 | 15.3 | 13.9 | 17.1 | Any text |
| Malva | 6.7 | 6.1 | 5.6 | 6.8 | Any text |
| Piedra | 5.7 | 5.2 | 4.7 | 5.8 | Secondary text, any light surface |
| Palo de rosa | 5.3 | 4.8 | **4.4 ✗** | 5.4 | Normal text on marfil/blush suave/white; on Blush only large text, else use primary-strong |
| Primary-strong | 6.6 | 6.0 | 5.5 | — | Palo de rosa text anywhere light |
| Success (guide) | 5.0 | 4.6 | **4.2 ✗** | 5.1 | Text on marfil/white; on Blush use success-text |
| Warning (guide) | **4.1 ✗** | **3.8 ✗** | **3.5 ✗** | **4.2 ✗** | Icons/indicators only; text uses warning-text (5.9 on marfil) |
| Champán | 2.3 ✗ | 2.1 ✗ | 1.9 ✗ | 2.3 ✗ | Never text; fill only |

| On a filled color | White | Marfil | Tinta | WhatsApp ink |
|---|---|---|---|---|
| Palo de rosa | **5.4** | 5.3 | 3.2 ✗ | ✗ |
| Malva | **6.8** | 6.7 | ✗ | ✗ |
| Tinta | 17.1 | **16.7** | — | — |
| Champán | 2.3 ✗ | ✗ | **7.4** | 6.4 |
| WhatsApp green | 2.0 ✗ | ✗ | 8.6 | **7.5** |

So: primary button = white on palo de rosa; AnnouncementBar/footer = marfil on malva; NEW badge = tinta on champán; WhatsApp button = `#0B2E17` on `#25D366`. Never white text on WhatsApp green.

## 4. Color roles and proportions

- **~60%** Marfil + Blush suave (page and alternating sections).
- **~30%** Blush surfaces (cards, chips, blocks), Tinta text, Malva AnnouncementBar and footer.
- **~10%** Palo de rosa (primary buttons, eyebrow dots, accent word, sale prices, active states).
- Champán: a touch (NEW badge, a fine detail). WhatsApp green: only WhatsApp elements, so it reads as "chat", not as brand.
- Status colors only mean status. Sale uses palo de rosa, not red.

## 5. Logo and wordmark

- `[CLIENT TO SUPPLY: logo files]`. Until supplied, set "ShipShop" in Young Serif 400, Tinta on light or Marfil on Malva, clearly marked as placeholder.
- Logo on Marfil, Blush suave or Malva only; never on busy photos; never recolored outside the palette, stretched or outlined.

## 6. Business facts

**Confirmed by the client brief (use freely):**
- Primary message: *We can make your shopping faster, easier and personalized.*
- Signature line: *Come and buy with us is easier for you* (on screen: "Come and buy with us — it's easier for you.").
- Goal: set the standard of online shopping quality in Guyana as pioneers of online selling for the regular public.
- Market: Georgetown and Regions 3, 4 and 5. Catalog: Fashion (Women, Men, Kids, Accessories, Plus Size) + Home & More (Home, Gifts, Beauty, Kids & Toys), plus New In and Sale.
- Channels: website, WhatsApp, physical store. Payments: MMG, Cash on Delivery, card (Visa / Mastercard; gateway to be defined).
- Interface in English (Guyana); prices in GYD.

**Example values used in the guide and wireframes - use them in designs, but they must be confirmed before launch:**
| Item | Example value |
|---|---|
| Free delivery threshold | Georgetown, orders over GY$ 10,000 |
| Delivery zones | Georgetown 24-48h GY$ 800 · East Bank Demerara 1-2 days GY$ 1,200 · East Coast Demerara 1-2 days GY$ 1,200 · West Demerara 2-3 days GY$ 1,500 · Berbice 2-3 days GY$ 2,000 · Store pickup same day, free |
| Cash on Delivery | Georgetown and East Bank |
| MMG | Send to 600-0000, order number as reference, confirmed on WhatsApp; order stays `pending_payment` until then |
| WhatsApp confirmation time | "within 1 hour" |
| Store | Lot 12 Regent St, Georgetown · Mon-Sat 9am-6pm · Sun closed · +592 600 0000 |
| Returns | "Free returns within 7 days" |
| Club offer | "10% off your first order" |

Anything not in these two lists (reviews, ratings, stock counts, founding story, team, order volume) is `[CLIENT TO SUPPLY]` or clearly labeled sample data.
