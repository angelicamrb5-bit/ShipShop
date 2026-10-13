# ShipShop

Tienda online de ShipShop (Georgetown, Guyana), sitio en inglés construido con la skill **shipshop-design** (Boutique Blush · Tipografía 10).
Sitio estático (HTML + CSS + JS, sin build) listo para Cloudflare.

## Deploy en Cloudflare

**Opción A: Workers (static assets), recomendada**
```bash
npm install
npx wrangler login
npm run deploy        # wrangler deploy → usa wrangler.jsonc (carpeta ./public)
```

**Opción B: Cloudflare Pages**
- Dashboard → Pages → *Connect to Git* → este repo · Build command: *(vacío)* · Output directory: `public`
- o por CLI: `npm run pages:deploy`

Vista local: `npm run dev` (http://localhost:8787).

## Páginas
| Ruta | Página |
|---|---|
| `/` | Home (orden fijo de la guía) |
| `/category?c=women` · `?q=linen` | Listado + FilterSheet (colecciones: `fashion`, `home`, `new`, `sale`, `best-sellers`, `under-5000`, `back-in-stock`, `diwali` y cada categoría) |
| `/product?p=slug` | PDP con StickyBuyBar móvil y "Order on WhatsApp" |
| `/cart` + CartDrawer | Bolsa con barra de envío gratis |
| `/checkout` | Checkout de una página como invitado (MMG / COD / Card) |
| `/order?id=` | Confirmación |
| `/account` | Pedidos en este dispositivo + wishlist |
| `/how-to-order`, `/size-guide`, `/privacy`, `404` | Ayuda y legales |

## Antes del lanzamiento (datos a confirmar con el cliente)
- **`public/assets/js/config.js`** concentra todos los datos del negocio: número de WhatsApp, MMG, dirección, horarios, zonas y tarifas, umbral de envío gratis, devoluciones y oferta del club. Son **valores de ejemplo** de la guía.
- **`public/assets/js/products.js`** es un **catálogo de muestra**: reemplazar por productos, precios, stock y fotos reales (4:5).
- Las fotos son placeholders `[PRODUCT PHOTO: …]` y las reseñas están marcadas como muestra.
- Logo: "ShipShop" en Young Serif como placeholder (`data-placeholder="logo"`).
- Pagos con tarjeta desactivados (`cardEnabled: false`) hasta definir la pasarela.
- Pedidos: sin backend, el pedido se guarda en el navegador y se envía a la tienda por WhatsApp desde la confirmación ("Track on WhatsApp" lleva el detalle). Para recibirlo por servidor, define `orderEndpoint` (POST JSON). Lo mismo con `clubEndpoint`.

## Sistema de diseño
- `public/assets/css/tokens.css`: tokens de la guía copiados tal cual, con las adiciones del sistema marcadas.
- `public/assets/css/styles.css`: componentes, construidos solo con tokens.
- Los nombres de componentes siguen la guía (AnnouncementBar, Header, MegaMenu/MobileMenu, WhatsAppCTA, ProductCard, CategoryTile, BenefitStrip, SeasonBanner, Tabs, WaysToShop, ReviewCard, FilterSheet, StickyBuyBar, CartDrawer, Footer).
