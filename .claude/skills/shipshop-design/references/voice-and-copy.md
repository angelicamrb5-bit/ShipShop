# ShipShop - Voice and copy

## Tone
Warm, close and trustworthy, like a neighborhood boutique with professional presentation. Talk to the shopper as "you". Short messages. Interface in English (Guyana); prices in GYD.

- **Say:** bag (not cart), delivery, pickup, "real people", "Chat with us", "check out as a guest", local places and zones by name.
- **Avoid:** jargon (SKU, fulfillment, PLP, omnichannel), hype ("best ever", "#1"), pressure ("Hurry!", "Last chance!!"), blame in errors ("Invalid input").
- Sentence case everywhere (buttons, eyebrows, headlines). Numbers as digits. GY$ always with the space: `GY$ 4,500`.

## Signature line
- On screen: **"Come and buy with us — it's easier for you."**
- Client wording: "Come and buy with us is easier for you." Don't rewrite it further without client approval.
- Fixed places: Home hero supporting line · WaysToShop intro · closing band/Club · Footer. Once per viewport.

## Message pillars → example lines
| Pillar | Lines |
|---|---|
| Faster | "Georgetown: tomorrow." · "Check out in one page." · "We'll confirm on WhatsApp within 1 hour." |
| Easier | "No account needed — check out as a guest." · "Pay with MMG, cash on delivery or card." · "Shop the way that suits you." |
| Personalized | "Real people answer on WhatsApp." · "Not sure about your size? Ask us." · "Complete the look." |

## Headline patterns
- Product/season promise: "New styles for the heat — delivered across Georgetown." · "Dresses for every celebration."
- Section H2 with eyebrow: "• Best sellers" / "Loved by Georgetown" · "• New in" / "Just arrived" · "• Gifts" / "Something for everyone".
- One accent word max, in palo de rosa: "Dresses for every *celebration*".

## CTA library (use exactly)
| Action | Label |
|---|---|
| Hero | Shop Women · Shop Men |
| Season | Shop the collection |
| Section link | See all |
| PDP primary | Add to bag |
| PDP WhatsApp | Order on WhatsApp |
| Sticky bar WhatsApp | WhatsApp |
| Cart | Checkout · Send order via WhatsApp |
| Checkout | Place order · GY$ {total} |
| Confirmation | Track on WhatsApp · Continue shopping |
| Header / help | Chat with us · Chat with us on WhatsApp |
| Filters | Filter & Sort · Clear all · Show {n} products |
| Grid | Load more |
| Club | Get my 10% |
| Out of stock | Notify me · Ask on WhatsApp |
| Store | Get directions |

## WhatsApp message templates
Link: `https://wa.me/592XXXXXXX?text=` + `encodeURIComponent(message)`.

PDP · "Order on WhatsApp"
```
Hi! I'd like to order:
• {product.name}
• Color: {color} · Size: {size}
• Price: GY$ {price}
{product.url}
```
Cart · "Send order via WhatsApp"
```
Hi! I'd like to order these items:
1. {name} · {color} / {size} · x{qty} · GY$ {lineTotal}
2. …
Subtotal: GY$ {subtotal}
Delivery to: {zone}
```
Confirmation · "Track on WhatsApp"
```
Hi! I'm checking on my order #{orderId}.
```
General help (header/floating): `Hi! I have a question about ShipShop.` On a PDP/PLP, add the page link.

## Microcopy
| Moment | Copy |
|---|---|
| Announcement | Free delivery in Georgetown on orders over GY$ 10,000 · Pay with MMG |
| Free-delivery bar | You're GY$ 2,000 away from free delivery |
| Free delivery reached | You've unlocked free delivery in Georgetown |
| Low stock | Only 3 left in M |
| Delivery estimate | Georgetown: tomorrow · Regions 3/4/5: 2–3 days |
| Checkout intro | No account needed — check out as a guest. |
| MMG instructions | Send GY$ {total} to 600-0000 and use your order number as reference. We'll confirm on WhatsApp. |
| Confirmation | Thank you, {name}! We'll confirm on WhatsApp within 1 hour. |
| Club | Join the club — get 10% off your first order |
| Help | Still have a question? We're real people, happy to help. |
| Empty bag | Your bag is empty. Let's find something you'll love. |
| No results | No products match these filters. |
| Phone error | Enter a 7-digit phone number, like 600 0000. |
| Generic error | Something went wrong on our side. Your details are saved — try again or chat with us. |

Values (fees, times, numbers, %) are the guide's examples: keep them in sync with `brand-foundations.md` §6.
