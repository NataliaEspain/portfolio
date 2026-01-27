# Documentación del Portfolio - Marandina

## Estructura del Proyecto

```
portfolio/
├── app/
│   ├── globals.css          # Estilos globales, animaciones, variables CSS
│   ├── layout.tsx           # Layout raíz (Server Component)
│   └── page.tsx             # Página principal (Client Component)
├── components/
│   ├── design-card.tsx      # Tarjeta de diseño expandible (Client Component)
│   ├── theme-provider.tsx   # Proveedor de temas
│   └── ui/                  # Componentes shadcn/ui (50+ componentes)
├── lib/
│   └── utils.ts             # Utilidad cn() para clases Tailwind
├── public/                  # Assets estáticos (imágenes)
├── styles/
│   └── globals.css          # Estilos adicionales
└── next.config.mjs          # Configuración de Next.js
```

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 14.2.25 | Framework principal (App Router) |
| React | 19 | Biblioteca UI |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | 4.1.9 | Estilos utilitarios |
| shadcn/ui | - | Componentes UI (Radix UI base) |
| Lucide React | 0.454.0 | Iconos |

---

## Componentes Principales

### 1. `app/page.tsx` - Página Principal

**Directiva:** `"use client"` - Componente cliente

**Estados:**
```typescript
selectedCategory: string      // Categoría activa en tabs
isVisible: boolean            // Control de animación de entrada
selectedArtwork: CarouselItem // Obra seleccionada para galería
mousePosition: {x, y}         // Posición del mouse (parallax)
scrollProgress: number        // Progreso de scroll (0-1)
```

**Sub-componentes internos:**

#### `ImageCarousel`
- Galería fullscreen para ver obras
- Navegación con flechas
- Estados: `currentIndex`, `isExiting`

#### `ArtworkCard`
- Tarjeta de obra para secciones Paintings, Digital, Tattoos
- Overlay con gradiente on-hover
- Click abre ImageCarousel

### 2. `components/design-card.tsx` - Tarjeta Expandible

**Directiva:** `"use client"` - Componente cliente

**Props:**
```typescript
interface DesignItem {
  id: number
  title: string
  type: string
  image: string
  description: string
  link?: string
}

{ design: DesignItem, idx: number }
```

**Estado:**
```typescript
isOpen: boolean  // Controla si la descripción está expandida
```

**Funcionalidad:**
- Muestra imagen con ratio 16:10
- Botón "Ver más" / "Cerrar"
- Descripción expandible con animación
- Soporte para links externos (Behance)

### 3. `app/layout.tsx` - Layout Raíz

**Tipo:** Server Component (por defecto)

**Fuentes cargadas:**
- Inter (sans-serif) - Cuerpo de texto
- Playfair Display (serif) - Títulos
- Space Mono (monospace) - Etiquetas

---

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│                    User Interaction                      │
│              (click, scroll, mousemove)                 │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   Event Handler                          │
│            (onClick, onChange, etc.)                    │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                     setState                             │
│         (setIsOpen, setSelectedCategory, etc.)          │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    Re-render                             │
│           (React reconciliation)                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              DOM Update + CSS Transitions               │
└─────────────────────────────────────────────────────────┘
```

---

## Sistema de Estilos

### Variables CSS (globals.css)

```css
/* Colores principales */
--primary: #8c5cf2;    /* Púrpura */
--secondary: #f28322;  /* Naranja */
--accent: #f2b33d;     /* Amarillo */
--background: #f2f2f2; /* Fondo claro */
--foreground: #262624; /* Texto oscuro */
```

### Animaciones Personalizadas

| Animación | Descripción |
|-----------|-------------|
| `float` | Flotación suave infinita (4s) |
| `fadeInUp` | Entrada desde abajo (0.8s) |
| `revealText` | Reveal con clip-path (1s) |
| `glitch` | Efecto glitch on-hover (0.3s) |
| `grain` | Textura de grano (8s) |

---

## Datos del Portfolio

Los datos están hardcodeados en `app/page.tsx`:

```typescript
const graphicDesigns = [
  { id: 1, title: "...", type: "Branding", image: "...", description: "...", link: "..." },
  // ... 6 items
]

const paintings = [...]     // 3 items
const digitalArt = [...]    // 3 items
const tattoos = [...]       // 3 items
```

---

## Análisis del Problema: Botón "Ver más" no funciona

### Diagnóstico

El componente `DesignCard` tiene la estructura correcta:
- `"use client"` presente
- `useState` importado de React
- `onClick` en el botón nativo `<button>`
- Estado `isOpen` controla el renderizado condicional

### Posibles Causas

#### 1. **Cache del Navegador**
El navegador puede estar sirviendo una versión cacheada del JavaScript.

**Solución:**
- Ctrl + Shift + R (hard refresh)
- Abrir DevTools > Network > Disable cache
- Borrar cache del navegador

#### 2. **Puerto Incorrecto**
Si hay múltiples servidores corriendo, podrías estar viendo el puerto equivocado.

**Verificar:**
- El servidor actual corre en `localhost:3001`
- Asegúrate de no estar viendo `localhost:3000` (servidor viejo)

#### 3. **Error de Hidratación**
React puede fallar silenciosamente si hay mismatch entre server y client.

**Síntomas:**
```
Warning: Prop `className` did not match.
```

**Solución:**
Revisar que no haya diferencias entre lo que renderiza el servidor y el cliente.

#### 4. **Next.js Cache**
Next.js cachea agresivamente en desarrollo.

**Solución:**
```bash
# Borrar cache de Next.js
rm -rf .next
npm run dev
```

#### 5. **Compilación Incompleta**
Fast Refresh puede fallar silenciosamente.

**Verificar en terminal:**
```
✓ Compiled in XXXms
```

Si ves:
```
⚠ Fast Refresh had to perform a full reload due to a runtime error.
```
Hay un error que necesita investigarse.

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Borrar cache y reiniciar
rm -rf .next && npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

---

## Recomendaciones de Mejora

1. **Crear `tailwind.config.ts`** - Actualmente no existe
2. **Implementar ThemeProvider** - Dark mode no funciona
3. **Mover datos a archivo externo** - `/lib/portfolio-data.ts`
4. **Remover `ignoreBuildErrors`** - En `next.config.mjs`
5. **Agregar throttle** - En mouse/scroll listeners

---

## Contacto

Proyecto creado con v0.dev y customizado manualmente.
