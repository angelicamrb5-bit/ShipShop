# Brief para Claude Design: wireframes iniciales

> Copia todo el bloque de abajo en Claude Design. Está pensado para **wireframes de baja/media fidelidad** (escala de grises + un color de acento), no para diseño final. La paleta se decidirá después con `03-paletas-de-color.pdf`.

---

```
PROYECTO
Tienda online de ropa y artículos varios (hogar, accesorios, regalos) con base en Georgetown, Guyana. Volumen pequeño-mediano (de cientos a pocos miles de productos). En Guyana hay poca competencia digital, así que el objetivo es verse más profesional y confiable que las tiendas locales, que hoy venden sobre todo por Facebook, Instagram y WhatsApp.

IDIOMA DE LA INTERFAZ: inglés (Guyana). Precios en GYD (ej. "GY$ 4,500").

QUÉ NECESITO
Wireframes en escala de grises con UN color de acento para los CTA. Versión MÓVIL primero (390 px) y luego escritorio (1440 px) de estas pantallas:
1. Home
2. Listado de categoría (PLP) con filtros
3. Ficha de producto (PDP)
4. Carrito (drawer lateral + página)
5. Checkout de 1 página
6. Confirmación de pedido
7. Página "How to Order / Delivery & Payment"
8. Mega-menú (escritorio) y menú hamburguesa (móvil)

PATRONES OBLIGATORIOS (vienen de un benchmark de 10 tiendas activas del Caribe y Guyana)

Global
- Barra de anuncio arriba con la promesa logística: "Free delivery in Georgetown on orders over GY$ 10,000 · Pay with MMG".
- Header: logo, buscador, cuenta, carrito con contador, y un enlace visible a WhatsApp ("Chat with us").
- Botón FLOTANTE de WhatsApp abajo a la derecha en todas las páginas (en la PDP no debe tapar el CTA fijo).
- Mega-menú con dos mundos: FASHION (Women, Men, Kids, Accessories, Plus Size) y HOME & MORE (Home, Gifts, Beauty, Kids & Toys). Más SALE y NEW IN.
- Footer completo: dirección + horario + mapa ("Get directions"), teléfono/WhatsApp, redes, enlaces a Delivery, Returns, Size Guide, FAQ, Privacy, y logos de pago (MMG, Visa/Mastercard, Cash on Delivery).

Home (en este orden)
1. Hero con una sola promesa y 2 CTA ("Shop Women" / "Shop Men"). Imagen 4:5 en móvil.
2. Shop by Category: 6 tarjetas con foto (Women, Men, Kids, Accessories, Home, Gifts).
3. New Arrivals: carrusel de 8 productos.
4. Franja de beneficios con 4 íconos: Fast delivery (Georgetown 24-48h) · Pay with MMG or Cash on Delivery · Real people on WhatsApp · Easy returns.
5. Colección de temporada (ej. Diwali / Christmas / Mashramani) en banner a lo ancho.
6. Best Sellers con pestañas (Best Sellers / Under GY$ 5,000 / Back in Stock).
7. "3 ways to shop": Website · WhatsApp · Visit our store (con dirección).
8. Reseñas de clientes con nombre y zona (ej. "Anita, Diamond EBD").
9. Feed "Shop the look" de Instagram/TikTok (grilla de 6).
10. Suscripción al club: "Get 10% off your first order".

Listado de categoría (PLP)
- Breadcrumb, título, número de productos.
- Filtros: Size, Color, Price (GYD), Category, In stock. En móvil, botón "Filter & Sort" que abre un bottom sheet.
- Grilla de 2 columnas en móvil y 4 en escritorio. Tarjeta: foto 4:5, nombre, precio GYD, precio tachado si hay oferta, muestras de color, badge (New / Sale / Low stock), corazón de wishlist.

Ficha de producto (PDP)
- Galería con swipe (4-6 fotos) + video corto opcional.
- Nombre, precio GYD, badge de oferta.
- Selector de color (muestras) y de talla (chips) + enlace "Size guide" (abre un modal).
- Stock: "Only 3 left".
- CTA principal: "Add to bag". CTA secundario igual de visible: "Order on WhatsApp" (abre wa.me con un mensaje precargado: producto, talla, color, precio y enlace).
- En móvil, barra fija abajo con el precio y ambos CTA.
- Acordeones: Details, Delivery & Payment, Returns.
- Bloque de entrega estimada: "Georgetown: tomorrow · Regions 3/4/5: 2-3 days".
- "Complete the look" / "You may also like".
- Reseñas.

Carrito
- Drawer lateral con miniaturas, talla/color, cantidad y quitar.
- Barra de progreso hacia el envío gratis: "You're GY$ 2,000 away from free delivery".
- Subtotal en GYD.
- CTA "Checkout" + CTA secundario "Send order via WhatsApp" (genera un mensaje con la lista completa).

Checkout (1 página, compra como invitado permitida)
- Contacto: nombre, teléfono (WhatsApp) y email opcional.
- Entrega: Delivery (zona en dropdown: Georgetown, East Bank, East Coast, West Demerara, Berbice, otras) o Store pickup.
- Pago: MMG (con instrucciones), Cash on Delivery, Card.
- Resumen del pedido fijo a la derecha en escritorio; en móvil, plegable arriba.
- Botón "Place order".

Confirmación
- Número de pedido, resumen y próximos pasos ("We'll confirm on WhatsApp within 1 hour"), botón "Track on WhatsApp".

TONO
Cálido, cercano y confiable. Se habla de tú, como en una boutique de barrio pero con presentación profesional. Mensajes cortos.

CRITERIOS VISUALES PARA EL WIREFRAME
- Mobile-first. Áreas táctiles de 44 px como mínimo.
- Mucho aire, jerarquía tipográfica clara, una sola acción principal por pantalla.
- El verde de WhatsApp (#25D366) SOLO para el botón y los enlaces de WhatsApp. No usarlo como color de marca.
- Placeholders de imagen en proporción 4:5 para producto y 16:9 o 4:5 para hero.
- Anotar en el margen cada componente reutilizable (ProductCard, CategoryTile, BenefitStrip, WhatsAppCTA, AnnouncementBar).

REFERENCIAS (para inspirarse, no copiar)
- Harmonygirl.com (Barbados): "3 ways to shop", WhatsApp en el header.
- Shop592.com (Guyana): beneficios con MMG y "real person on WhatsApp".
- Toogoodfashions.com (Trinidad): WhatsApp flotante, TikTok incrustado, reseñas con nombre.
- ShopNicksTT.com (Trinidad): mezcla de moda y artículos varios, pestañas Latest/Top Selling.
- Arayofbeautytt.com (Trinidad): envío más barato al pedir en la web.
```

---

## Siguientes pasos sugeridos
1. Generar los wireframes con este brief e iterar la Home y la PDP primero, que concentran la conversión.
2. Elegir 1 o 2 paletas del PDF y pedir a Claude Design una variante de la Home con cada una.
3. Con lo elegido, armar la *skill* de marca (tokens de color, tipografía, componentes, tono) que servirá de guardrail para construir el sitio.
