---
title: "Cómo está construido este guía con Astro"
description: "Guía técnica que documenta cómo está construido este sitio usando Astro, incluyendo routing, content collections e internacionalización."
tags: ["astro", "frontend", "arquitectura", "guides"]
date: 2026-02-01T00:00:00-6:00
updatedDate: 2026-02-01T00:00:00-6:00
draft: false
---

# Construyendo un sitio con Astro

Esta guía explica **cómo construir un sitio web con Astro** tomando como referencia un proyecto real y funcional.  
El enfoque es práctico: estructura, routing, contenido, internacionalización y generación estática.

Repositorio del proyecto base:  
https://github.com/box-bm/devfolio

## Índice

- [Introducción](#introducción)
- [¿Por qué Astro?](#por-qué-astro)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Routing basado en archivos](#routing-basado-en-archivos)
- [Internacionalización con prefijo de idioma](#internacionalización-con-prefijo-de-idioma)
- [Gestión de contenido con Content Collections](#gestión-de-contenido-con-content-collections)
- [Guías: índice y páginas individuales](#guías-índice-y-páginas-individuales)
- [Generación estática y getStaticPaths](#generación-estática-y-getstaticpaths)
- [SEO y rendimiento](#seo-y-rendimiento)
- [Conclusión](#conclusión)
- [Referencias](#referencias)

## Introducción

Astro es especialmente adecuado para sitios **orientados a contenido**: portafolios, documentación, blogs y guías técnicas.  
Este proyecto demuestra cómo usar Astro más allá de un sitio estático simple, aplicando una arquitectura pensada para crecer.

La guía asume conocimientos básicos de HTML, CSS y JavaScript.

## ¿Por qué Astro?

Astro se eligió por las siguientes razones:

- Renderizado estático por defecto
- Envío mínimo de JavaScript al cliente
- Routing basado en archivos
- Integración nativa con Markdown
- Content Collections tipadas
- Excelente rendimiento y SEO

Astro permite tratar el sitio como **contenido primero**, no como una aplicación pesada.

## Estructura del proyecto

La estructura separa claramente responsabilidades:

src/
pages/
layouts/
components/
i18n/
content/
guides/
projects/
legal/

Responsabilidades principales:

- `pages`: define las rutas del sitio
- `layouts`: estructura común (header, footer, SEO)
- `components`: UI reutilizable
- `i18n`: textos traducibles
- `content`: contenido en Markdown

Esta separación permite modificar UI o contenido sin acoplamientos innecesarios.

## Routing basado en archivos

Astro genera rutas a partir de archivos dentro de `src/pages`.

Este proyecto utiliza rutas dinámicas con prefijo de idioma:

src/pages/[…lang]/

Esto permite generar URLs como:

/en
/es
/es/guides
/es/guides/construyendo-un-sitio-con-astro

El idioma se obtiene directamente desde:

Astro.params.lang

No se utilizan query params ni carpetas duplicadas por idioma.

Documentación relacionada:  
https://docs.astro.build/en/core-concepts/routing/

## Internacionalización con prefijo de idioma

La internacionalización sigue estos principios:

- Todos los idiomas tienen prefijo (`/en`, `/es`)
- El idioma por defecto también está prefijado
- La raíz `/` redirige al idioma por defecto
- El idioma se obtiene desde la URL

Este enfoque mantiene URLs consistentes y simplifica el SEO.

Documentación oficial:  
https://docs.astro.build/en/guides/internationalization/

## Gestión de contenido con Content Collections

Astro Content Collections se utilizan para manejar contenido estructurado.

Tipos de contenido:

- Guías
- Proyectos
- Legal

Ejemplo de estructura:

content/
guides/
construyendo-un-sitio-con-astro.es.md
construyendo-un-sitio-con-astro.en.md

Convención utilizada:

slug.lang.md

El idioma se extrae desde el `id` del archivo, no desde el slug de la URL, evitando inferencias frágiles.

Documentación:  
https://docs.astro.build/en/guides/content-collections/

## Guías: índice y páginas individuales

Las guías tienen dos tipos de páginas:

### Índice de guías

Ruta:

src/pages/[…lang]/guides/index.astro

Responsabilidades:

- Cargar todas las guías
- Filtrar por idioma
- Excluir borradores
- Ordenar por fecha
- Exponer metadata (título, descripción, tags)

### Guía individual

Ruta:

src/pages/[…lang]/guides/[slug].astro

Flujo:

1. Leer `lang` y `slug` desde la URL
2. Resolver el archivo correcto en la colección
3. Renderizar el contenido Markdown

Esto permite prerenderizar todas las guías en build time.

## Generación estática y getStaticPaths

El sitio utiliza **Static Site Generation (SSG)**.

Debido a las rutas dinámicas (`[...lang]`, `[slug]`), se define explícitamente:

- Idiomas soportados
- Slugs disponibles

Esto se hace con `getStaticPaths`.

Beneficios:

- Builds deterministas
- Mejor SEO
- Menos complejidad en runtime

Documentación:  
https://docs.astro.build/en/reference/api-reference/#getstaticpaths

## SEO y rendimiento

Desde la arquitectura se prioriza:

- HTML estático
- Contenido indexable (texto real)
- URLs semánticas
- Mínimo JavaScript en cliente

Astro permite enviar HTML casi puro al navegador, lo que mejora métricas como LCP y CLS sin optimizaciones adicionales complejas.

## Conclusión

Este proyecto muestra cómo usar Astro como **framework de construcción de sitios basados en contenido**.

La combinación de:

- Routing dinámico
- Content Collections
- Generación estática
- Internacionalización explícita

permite construir un sitio claro, rápido y mantenible, incluso a medida que el contenido crece.

## Referencias

- Repositorio del proyecto:  
  https://github.com/box-bm/devfolio

- Documentación oficial de Astro:  
  https://docs.astro.build/

- Routing en Astro:  
  https://docs.astro.build/en/core-concepts/routing/

- Content Collections:  
  https://docs.astro.build/en/guides/content-collections/

- Internacionalización:  
  https://docs.astro.build/en/guides/internationalization/
