---
title: "Construyendo un Sitio de Portfolio con Astro"
description: "Guía técnica que documenta cómo está construido este sitio usando Astro, incluyendo routing, content collections e internacionalización."
tags: ["astro", "frontend", "arquitectura", "guides"]
date: 2026-02-01T00:00:00-6:00
updatedDate: 2026-02-01T00:00:00-6:00
draft: false
---

# Construyendo un Sitio de Portfolio con Astro

Esta guía documenta la arquitectura y las decisiones de diseño detrás de un sitio de portfolio real construido con Astro. En lugar de enfocarse en detalles de código, explica **por qué** las cosas están estructuradas de esta manera, haciéndola útil para desarrolladores nuevos en Astro que quieren entender cómo construir sitios mantenibles y escalables.

> **Proyecto de referencia**: [devfolio en GitHub](https://github.com/box-bm/devfolio)

## Tabla de Contenidos

- [¿Por qué Astro?](#por-qué-astro)
- [Visión General del Proyecto](#visión-general-del-proyecto)
- [Decisiones Arquitectónicas Clave](#decisiones-arquitectónicas-clave)
- [Routing Basado en Archivos](#routing-basado-en-archivos)
- [Estrategia de Internacionalización](#estrategia-de-internacionalización)
- [Content Collections](#content-collections)
- [Estructura de Componentes](#estructura-de-componentes)
- [Configuración de TypeScript](#configuración-de-typescript)
- [Conclusión](#conclusión)

## ¿Por qué Astro?

Astro fue elegido para este proyecto porque sobresale en **sitios web centrados en contenido**. A diferencia de las SPAs tradicionales que envían frameworks completos de JavaScript al navegador, Astro genera HTML estático por defecto y solo añade JavaScript donde específicamente se necesita.

Beneficios clave para este caso de uso:

- **Cero JS por defecto**: Perfecto para portfolios y sitios de contenido donde la interactividad es mínima
- **Rendimiento inmediato**: La generación estática significa tiempos de carga rápidos sin trabajo de optimización
- **Content Collections**: Gestión de contenido type-safe con Markdown/MDX
- **Arquitectura de Islas**: Añade React, Vue u otros frameworks solo donde se necesite
- **Experiencia del Desarrollador**: Routing basado en archivos, hot reload y excelente soporte de TypeScript

La documentación oficial de Astro proporciona información completa sobre estos conceptos: [docs.astro.build](https://docs.astro.build)

## Visión General del Proyecto

El sitio sirve múltiples propósitos:

- Portfolio personal mostrando proyectos y habilidades
- Guías técnicas y posts de blog
- Documentación legal para aplicaciones móviles
- Soporte multi-idioma (inglés y español)

La arquitectura necesitaba manejar:

- Contenido dinámico en múltiples idiomas
- Esquemas de contenido type-safe
- Componentes UI reutilizables
- Estructura de código limpia y mantenible

## Decisiones Arquitectónicas Clave

### Separación de Responsabilidades

La estructura del proyecto separa claramente diferentes responsabilidades:

```
src/
├── pages/           # Rutas y plantillas de páginas
├── layouts/         # Estructuras de página compartidas
├── components/      # Elementos UI reutilizables
├── content/         # Contenido en Markdown
├── i18n/           # Lógica de traducciones
├── styles/         # Estilos globales
└── constants/      # Constantes compartidas
```

**Por qué esto importa**: Cada directorio tiene un propósito único y claro. Cuando necesitas modificar el routing, vas a `pages/`. Cuando necesitas actualizar un botón reutilizable, vas a `components/`. Esta predictibilidad hace que el código sea más fácil de navegar y mantener a medida que crece.

### Generación de Sitio Estático

Todo el sitio es pre-renderizado en tiempo de build usando la Generación de Sitio Estático (SSG) de Astro. Ningún contenido se obtiene en tiempo de ejecución.

**Por qué esto importa**:

- Cada página es HTML puro, cargado instantáneamente
- Sin obtención de datos en runtime significa sin estados de carga o spinners
- Mejor SEO porque los motores de búsqueda ven contenido completo inmediatamente
- Menores costos de hosting (puede servirse desde CDN)

Aprende más: [Generación de Sitio Estático en Astro](https://docs.astro.build/en/guides/server-side-rendering/)

## Routing Basado en Archivos

Astro genera rutas basadas en archivos en `src/pages/`. Este proyecto usa una estrategia de routing dinámico con prefijos de idioma.

### La Estructura de Rutas

```
src/pages/
├── index.astro                          → / (redirige a /en)
├── [...lang]/
│   ├── index.astro                     → /en, /es
│   └── guides/
│       ├── index.astro                 → /en/guides, /es/guides
│       └── [slug].astro                → /en/guides/getting-started-with-nvim
└── legal/
    └── [appName]/
        └── [type]/
            ├── index.astro
            └── [lang].astro
```

### ¿Por qué Rutas Dinámicas?

La sintaxis `[...lang]` crea una ruta catch-all que captura el código de idioma. Este enfoque tiene varias ventajas:

1. **Única fuente de verdad**: Una plantilla genera todas las variantes de idioma
2. **Type safety**: TypeScript sabe qué parámetros están disponibles
3. **Fácil de extender**: Añadir un nuevo idioma requiere cambios mínimos
4. **Consistencia de URL**: `/en/guides` y `/es/guides` siguen el mismo patrón

### Cómo Funcionan las Rutas Estáticas

Para que las rutas dinámicas funcionen con SSG, debes decirle a Astro qué rutas generar usando `getStaticPaths()`:

```typescript
export async function getStaticPaths() {
  return [{ params: { lang: "en" } }, { params: { lang: "es" } }];
}
```

Esto define explícitamente qué rutas de idioma deben pre-renderizarse en tiempo de build.

**Documentación oficial**: [Rutas Dinámicas](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes)

## Estrategia de Internacionalización

En lugar de usar routing basado en carpetas (`/en/` vs `/es/`) o parámetros de consulta, este proyecto usa **prefijos de idioma en las URLs**.

### Principios Clave

1. **Cada idioma tiene un prefijo**: Incluso el idioma por defecto usa `/en`
2. **Sin redirecciones implícitas**: La raíz `/` redirige explícitamente a `/en`
3. **Idioma extraído de la URL**: La utilidad `getLangFromUrl()` lee params, no cookies o headers

### Configuración i18n de Astro

```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false, // False para URLs más limpias
    },
  },
});
```

**¿Por qué este enfoque?**

- Las URLs son predecibles y compartibles
- No se necesita lógica del lado del servidor para determinar el idioma
- Mejor para SEO (cada idioma tiene URLs distintas)
- Los usuarios pueden cambiar idiomas manualmente editando la URL

Las utilidades i18n manejan la búsqueda de traducciones:

```typescript
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
```

**Aprende más**: [Guía de Internacionalización de Astro](https://docs.astro.build/en/guides/internationalization/)

## Content Collections

Content Collections es la forma recomendada de Astro para gestionar contenido estructurado como posts de blog, documentación o descripciones de proyectos.

### ¿Por qué Content Collections?

En lugar de importar archivos Markdown manualmente, Content Collections proporcionan:

- **Type safety**: Define esquemas con Zod
- **Validación automática**: El contenido se verifica en tiempo de build
- **Contenido organizado**: Separación clara del código
- **Queries poderosas**: Filtrar y ordenar con JavaScript

### Definición de Esquema

El proyecto define dos colecciones en `src/content.config.ts`:

```typescript
const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    updatedDate: z.date(),
    draft: z.boolean().default(false),
  }),
});
```

**Lo que esto logra**:

- TypeScript sabe exactamente qué campos de frontmatter existen
- Los campos requeridos son obligatorios
- Los campos de fecha se analizan correctamente
- Los posts en borrador pueden excluirse de builds de producción

### Nomenclatura de Archivos de Contenido

Los archivos de contenido siguen un patrón específico:

```
content/guides/
├── building-an-astro-app.en.md
├── building-an-astro-app.es.md
├── getting-started-with-nvim.en.md
└── getting-started-with-nvim.es.md
```

La convención de nomenclatura `{slug}.{lang}.md` facilita:

- Identificar contenido por idioma
- Generar rutas programáticamente
- Mantener traducciones relacionadas juntas

### Cargando Contenido en Páginas

Las páginas de guías dinámicas usan `getStaticPaths()` para generar todas las rutas posibles:

```typescript
export async function getStaticPaths() {
  const guides = await getCollection("guides", (guide) => !guide.data.draft);

  return guides.flatMap((guide) => ({
    props: { guide },
    params: {
      lang: guide.id.split(".")[1],
      slug: guide.id.split(".")[0],
    },
  }));
}
```

Esto crea rutas como `/en/guides/building-an-astro-app` y `/es/guides/construyendo-un-sitio-con-astro`.

**Docs oficiales**: [Content Collections](https://docs.astro.build/en/guides/content-collections/)

## Estructura de Componentes

Los componentes están organizados por responsabilidad, no por página. Esto los hace más reutilizables y fáciles de mantener.

### Categorías de Componentes

**Componentes de Layout** (`src/layouts/`)

- `Base.astro`: Estructura HTML, fuentes, inicialización de tema
- `Website.astro`: Wrapper de página de portfolio con header/footer
- `Guides.astro`: Wrapper de página de guía con breadcrumbs
- `Legal.astro`: Wrapper de documento legal

**Componentes UI** (`src/components/`)

- `Button.astro`: Botón reutilizable con variantes
- `Card.astro`: Tarjetas de contenido con efectos hover
- `Chip.astro`: Tags y etiquetas
- `Header.astro`: Navegación con menú móvil
- `Footer.astro`: Footer del sitio con traducciones

**Componentes Especializados**

- `ProjectCard.astro`: Visualización de proyectos del portfolio
- `TechChip.astro`: Badges de tecnologías
- `LanguagePicker.astro`: Dropdown de cambio de idioma

### Filosofía de Diseño de Componentes

Los componentes en este proyecto siguen estos principios:

1. **Responsabilidad Única**: Cada componente hace una cosa bien
2. **Configuración basada en Props**: El comportamiento se controla a través de props, no hard-coded
3. **Estilos Scoped**: CSS está limitado a componentes para evitar conflictos
4. **JavaScript Mínimo**: Solo añadir JS del lado del cliente cuando sea necesario

Ejemplo: El componente `Button` acepta un prop `type` para cambiar apariencia en lugar de tener componentes de botón separados para cada variante.

## Configuración de TypeScript

El `tsconfig.json` usa alias de ruta para hacer las importaciones más limpias y mantenibles:

```json
{
  "paths": {
    "@components/*": ["./src/components/*"],
    "@layouts/*": ["./src/layouts/*"],
    "@i18n/*": ["./src/i18n/*"],
    "@constants": ["./src/constants/index.ts"]
  }
}
```

**Por qué esto importa**:

- Las importaciones son más fáciles de leer: `@components/Button.astro` vs `../../../components/Button.astro`
- Refactorizar es más seguro: Mover archivos no rompe las importaciones
- El autocompletado del IDE funciona mejor con rutas absolutas

La configuración también habilita:

- `strictNullChecks`: Detecta errores potenciales de null/undefined
- `verbatimModuleSyntax`: Asegura que las importaciones se manejen correctamente
- Soporte TypeScript específico de Astro vía `@astrojs/ts-plugin`

## Conclusión

Esta arquitectura demuestra cómo construir un sitio centrado en contenido con Astro mediante:

- **Adoptar la generación estática**: Pre-renderizar todo para máximo rendimiento
- **Usar routing basado en archivos**: Dejar que el sistema de archivos defina las URLs
- **Aprovechar Content Collections**: Obtener type safety para todo el contenido
- **Organizar por responsabilidad**: Mantener el código relacionado junto
- **Hacer el i18n explícito**: El idioma es parte de la estructura de URL

La clave es que Astro funciona mejor cuando tratas tu sitio como **contenido que necesita mostrarse**, no como una aplicación que casualmente tiene contenido. Este cambio de mentalidad lleva a sitios más simples, rápidos y mantenibles.

### Lectura Adicional

- [Documentación de Astro](https://docs.astro.build/)
- [Profundización en Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Routing en Astro](https://docs.astro.build/en/core-concepts/routing/)
- [Guía de Internacionalización](https://docs.astro.build/en/guides/internationalization/)
- [TypeScript en Astro](https://docs.astro.build/en/guides/typescript/)
