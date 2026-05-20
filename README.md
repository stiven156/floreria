# 🌸 Floristería · Catálogo virtual

Catálogo virtual completo para floristería, con:

- **Catálogo público** con búsqueda, categorías y destacados.
- **Carrito** persistente en `localStorage`.
- **Cierre por WhatsApp**: cada producto tiene "Comprar por WhatsApp" y el carrito genera un mensaje completo.
- **Panel admin** protegido por contraseña para crear, editar, ocultar o eliminar productos.
- **Toggle de precios** global y por producto.
- **Ajustes** editables: nombre, slogan, número WhatsApp, dirección, horario, Instagram, imagen hero.
- **Persistencia**: Vercel Blob (un único JSON), con fallback a un seed local.

Construido con **Next.js 16 (App Router)**, **React 19**, **Tailwind v4** y **TypeScript**.

## Demo local

```bash
npm install
cp .env.example .env.local
# edita ADMIN_PASSWORD
npm run dev
```

- Catálogo: <http://localhost:3000>
- Admin: <http://localhost:3000/admin>

## Despliegue a Vercel

1. Conecta el repo en Vercel y haz el primer deploy.
2. En **Storage → Create**, agrega **Blob** y conéctalo al proyecto (esto inyecta `BLOB_READ_WRITE_TOKEN`).
3. En **Settings → Environment Variables**, agrega `ADMIN_PASSWORD` con la contraseña que vas a usar.
4. Vuelve a desplegar (Deployments → Redeploy).

Sin Blob conectado el sitio funciona en modo solo-lectura usando los productos del seed (`data/seed.json`).

## Personalización rápida

- Cambia los productos iniciales en `data/seed.json`.
- Cambia los colores en `app/globals.css` (variables `--primary`, `--accent`, etc.).
- Cambia el número WhatsApp por defecto en `data/seed.json → settings.whatsappNumber`.

## Estructura

```
app/
  page.tsx                # Home (hero + destacados + catálogo)
  producto/[id]/page.tsx  # Detalle de producto
  admin/page.tsx          # Login + dashboard
  api/
    products/route.ts     # GET/POST/DELETE productos
    settings/route.ts     # GET/PUT ajustes
    auth/route.ts         # Login admin (cookie)
components/               # UI pública + admin/
lib/
  storage.ts              # Lectura/escritura del catálogo (Blob + seed)
  whatsapp.ts             # Constructores de mensajes WhatsApp
  auth.ts                 # Cookie de sesión admin
  types.ts                # Tipos
data/seed.json            # Datos iniciales
```

## Cómo funciona la persistencia

- En `GET /api/products` y `GET /api/settings`, si `BLOB_READ_WRITE_TOKEN` existe, leemos `catalog.json` del Blob; si no, devolvemos el seed.
- En `POST/PUT/DELETE`, escribimos un nuevo `catalog.json` en el Blob (requiere autenticación con cookie admin).
- Hay un caché en memoria de 5 segundos para evitar lecturas innecesarias.

## Seguridad

- El panel admin está protegido por una cookie `httpOnly`, `sameSite=lax` y, en producción, `secure`.
- La contraseña se compara contra `ADMIN_PASSWORD`; cámbiala antes de salir a producción.

---

Hecho con cariño 🌹
