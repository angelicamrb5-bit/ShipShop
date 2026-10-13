# Benchmark: 10 tiendas online de tamaño mediano (Caribe / Guyana / Surinam)

**Fecha de revisión:** 13 de octubre de 2026
**Objetivo:** identificar patrones comunes en tiendas online activas de ropa y artículos varios, de tamaño pequeño-mediano, en mercados parecidos al de Guyana (poca competencia digital, compras por WhatsApp, pago móvil o contra entrega), para definir los wireframes iniciales de la tienda.

**Criterios de selección**
- Sitio en línea y con actividad comprobada en 2025-2026 (productos, promociones o contenido con fecha reciente).
- Indexado en Google y aparece en búsquedas locales ("online clothing store + país").
- Venta real en el sitio (carrito o checkout) **y/o** canal conversacional (WhatsApp) verificado.
- Volumen pequeño-mediano: catálogo de decenas a cientos de productos, de 1 a 4 tiendas físicas o solo online. Nada del tamaño de Amazon o Shein.
- Mercados del Caribe angloparlante, Guyana y Surinam, con logística y hábitos de pago parecidos.

> Nota: no tuve acceso a métricas de tráfico (Similarweb, etc.). La "visibilidad" se evaluó por su presencia en buscadores, la actividad en redes y la vigencia del contenido.

---

## 1. Las 10 tiendas

| # | Tienda | País | Qué vende | Plataforma | Canales de venta verificados |
|---|---|---|---|---|---|
| 1 | [Shop592](https://shop592.com/) | 🇬🇾 Guyana | Ropa H/M/niños, calzado, bolsos | WordPress + WooCommerce (Elementor) | Checkout web + **WhatsApp** (wa.me/5927641700). Pago **solo MMG**. Envío gratis en Georgetown |
| 2 | [Uncapped Marketplace](https://uncappedmarketplace.gy/) | 🇬🇾 Guyana | Productos hechos en Guyana (alimentos, cuidado personal, regalos) | WooCommerce | Checkout web, **contra entrega** y **MMG online**. Envío gratis en Regiones 3, 4 y 5. Sin WhatsApp en el sitio |
| 3 | [Surplus-GY](https://surplusgy.com/) | 🇬🇾 Guyana | Marketplace: moda, electrónica, hogar, víveres | Desarrollo propio (Laravel) | Checkout web con **tarjeta, MMG y GYD**. Devoluciones en 14 días. Sin WhatsApp visible |
| 4 | [Harmonygirl](https://www.harmonygirl.com/) | 🇧🇧 Barbados | Ropa de mujer, tallas grandes, accesorios (más de 800 artículos) | Lightspeed eCommerce | **"3 maneras de comprar": web, WhatsApp y tienda física**. Visa/MC. Entrega a domicilio o retiro en tienda. Envíos al Caribe |
| 5 | [Too Good Fashions](https://toogoodfashions.com/) | 🇹🇹 Trinidad | Ropa y accesorios de hombre | Ecwid Instant Site | **Botón flotante de WhatsApp** + checkout web. Pago online o efectivo. Tienda física en Chaguanas |
| 6 | [A Ray of Beauty TT](https://www.arayofbeautytt.com/) | 🇹🇹 Trinidad | Ropa de mujer (solo online) | Shopify | Checkout web + **WhatsApp**. El envío **cuesta menos si pides en la web** (TT$25 en vez de TT$35) y es gratis desde TT$750. Tiene un sitio aparte para tallas grandes |
| 7 | [ShopNicks TT](https://shopnickstt.com/) | 🇹🇹 Trinidad | **Ropa + juguetes, electrónica, hogar, herramientas** | Shopify | Checkout web, seguimiento del pedido y **avisos por WhatsApp/SMS** con los datos del courier. Envío gratis desde TT$120 y retiro gratis |
| 8 | [Glammed Up TT](https://www.glammeduptt.com/) | 🇹🇹 Trinidad | Ropa de mujer, trajes de baño, sombreros | Wix | Checkout web: **contra entrega**, PayPal y débito/crédito. 4 opciones de entrega (retiro gratis, directa, TTPost y urgente). Sin WhatsApp |
| 9 | [Sun Island Jamaica](https://www.sunislandjamaica.com/) | 🇯🇲 Jamaica | Ropa con identidad jamaicana, básicos, estampados a medida | WooCommerce | Checkout web + **canal de WhatsApp** para novedades. 4 tiendas físicas. Estudio de diseño a medida |
| 10 | [Kirpalani's](https://www.kirpalani.com/en/) | 🇸🇷 Surinam | Moda + hogar, electrónica, bebé, juguetes | Magento | Checkout web, retiro o entrega, tarjetas propias, transferencia y tarjeta internacional. Sin WhatsApp. Es el más grande y el referente de "tienda de todo" |

**Cómo se reparten los canales**
- 7 de 10 usan **WhatsApp** como canal de venta o de atención: Shop592, Harmonygirl, Too Good, A Ray of Beauty, ShopNicks, Sun Island y también Blackbird (Surinam, revisada pero no incluida).
- 10 de 10 tienen **carrito o checkout web**. WhatsApp **complementa** el checkout, no lo sustituye.
- 3 de 3 tiendas guyanesas aceptan **MMG**. Es un requisito básico en Guyana.
- 4 de 10 ofrecen **contra entrega o efectivo** y 6 de 10 ofrecen **retiro gratis**.

---

## 2. Lo que tienen en común

### 2.1 Arquitectura de la home (orden que se repite)
1. **Barra de anuncio** con la promesa logística: "Free delivery in Georgetown", "Caribbean Shipping Now Available!", "FREE DELIVERY IN REGIONS 3, 4 & 5".
2. **Header**: logo, menú por categorías (Mujer / Hombre / Niños / Accesorios / Ofertas), buscador, cuenta y carrito. Harmonygirl y Shop592 ponen además el **teléfono de WhatsApp en el header**.
3. **Hero** con una sola promesa y 1 o 2 CTA ("Shop Women" / "Shop Men").
4. **Comprar por categoría**: tarjetas grandes con foto (todas las tiendas).
5. **Novedades / New Arrivals** en carrusel o grilla de 4 a 8 productos.
6. **Más vendidos / Top rated**, a veces con pestañas (ShopNicks: Latest / Top Selling / Top Rated).
7. **Bloque de beneficios en iconos**: entrega rápida, pago seguro, atención humana, retiro gratis, 100% auténtico.
8. **"Cómo comprar" o "3 maneras de comprar"**: web, WhatsApp, tienda (Harmonygirl, Shop592).
9. **Prueba social**: reseñas de clientes con nombre (Too Good), feed de Instagram o TikTok incrustado (Too Good, Sun Island, Glammed Up: "shop looks from the 'gram").
10. **Captura de email o club**: "5% off registrándote" (Harmonygirl), "15% en tu próxima compra" (Mostra RD), "Join the Club" (Glammed Up).
11. **Footer**: dirección, horario, mapa ("Get directions"), teléfono, WhatsApp, redes, políticas (envío, devoluciones, guía de tallas).

### 2.2 WhatsApp: cómo lo integran
- **Botón flotante** abajo a la derecha que abre el chat (Too Good).
- **Enlace `wa.me` con mensaje precargado**: Harmonygirl usa `?text=Hi Harmony, I have a question.`. Bajo costo y alta conversión.
- **WhatsApp en el header** junto al teléfono (Harmonygirl).
- **WhatsApp como argumento de confianza**: "Message us on WhatsApp and a real person responds" (Shop592).
- **WhatsApp para la post-venta**: avisos del envío y datos del courier (ShopNicks).
- **Canal de WhatsApp** para lanzamientos y ofertas (Sun Island).
- **Incentivo para comprar en la web**: A Ray of Beauty cobra menos envío a quien pide por la web, para que el WhatsApp quede para dudas y no para tomar pedidos a mano.

### 2.3 Confianza y fricción
- Precios en **moneda local** (GYD, TTD, BBD) y bien visibles.
- **Métodos de pago explicados en la home**, no solo en el checkout: "MMG Only - no card required", "Pay Cash on Delivery, PayPal or Debit".
- **Logística con nombre y precio**: lugares de retiro concretos ("Diego Martin Bus Terminus"), plazos ("1-2 días", "48hr avg."), umbral de envío gratis.
- **Guía de tallas** y **política de devoluciones** enlazadas desde el producto (Harmonygirl).
- **Tienda física visible**: dirección, horario y mapa. Genera confianza aunque se venda sobre todo online.
- **"100% auténtico"** cuando se revenden marcas (Shop592).

### 2.4 Catálogo y navegación
- Categorías por **persona** (Mujer/Hombre/Niños) y luego por **tipo** (Vestidos, Tops, Sets...).
- Colecciones por **ocasión o temporada**: Graduación, Divali, Halloween, Heroes' Day, Navidad, Carnaval. Funcionan muy bien en el Caribe.
- Colecciones por **precio** ("Dresses $150 and under", "RD$1,495").
- **Tallas grandes / Curvy** como categoría propia (Harmonygirl, A Ray of Beauty, ShopNicks).
- Las tiendas de **"ropa + otros artículos"** (ShopNicks, Kirpalani's, Surplus-GY) separan **Moda** de **Hogar / Juguetes / Electrónica** con un mega-menú. Esto aplica directamente a nuestra tienda.

### 2.5 Debilidades frecuentes (la oportunidad para nosotros)
- Diseño genérico de plantilla: Wix, Ecwid o Elementor sin dirección de arte.
- Fotografía irregular: fondos distintos, capturas de pantalla o fotos de proveedor.
- Varias **no tienen footer completo** ni páginas de políticas claras (Shop592 y ShopNicks en la home).
- Atributos del producto poco claros en móvil: talla, color, stock.
- Mostra (RD) tiene `noindex`: invisible en Google. Hay que cuidar el SEO básico.
- Casi nadie tiene un flujo **"pedir por WhatsApp con el carrito armado"**. En Guyana sería un diferencial claro.

---

## 3. Recomendaciones para nuestra tienda (Guyana)

1. **Checkout web + WhatsApp en paralelo**: botón "Pedir por WhatsApp" en cada producto y en el carrito, con mensaje precargado (producto, talla, color, cantidad, precio en GYD y enlace).
2. **MMG como método principal**, más contra entrega y tarjeta si es viable. Explicarlo en la home.
3. **Barra de anuncio logística**: zonas de entrega (Georgetown, East Bank, East Coast, Regiones 3/4/5), costo y umbral de envío gratis.
4. **Mega-menú en dos mundos**: *Moda* (Mujer, Hombre, Niños, Accesorios) y *Hogar y más* (los otros artículos).
5. **Colecciones de temporada guyanesas**: Mashramani, Phagwah, Diwali, Eid, Navidad, regreso a clases, Emancipation.
6. **Prueba social local**: reseñas con nombre y barrio, y un feed de Instagram/TikTok con productos enlazados.
7. **Mobile-first**: la mayor parte del tráfico llegará desde redes sociales. Fotos verticales 4:5, CTA fijo abajo en la ficha de producto.
8. **Dirección de arte coherente** (paleta, tipografía, fondo de foto uniforme). Es la ventaja más barata frente a la competencia local.
9. **SEO local básico**: títulos "... in Guyana / Georgetown", Google Business Profile, precios en GYD.

Ver `02-brief-claude-design.md` para el prompt listo para pegar en Claude Design.
