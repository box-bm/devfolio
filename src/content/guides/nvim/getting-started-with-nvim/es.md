---
title: Guía completa de configuración y primeros pasos en Neovim
description: Una guía práctica para configurar Neovim de manera moderna y estable, ideal para quienes desean un entorno funcional y mantenible.
tags: [neovim, text editor, setup, guia]
topic: nvim
guide: getting-started-with-neovim
slug: es/guides/nvim/getting-started-with-neovim
language: es
draft: false
date: 2026-01-31
---

# Guía completa de configuración y primeros pasos en Neovim

Esta guía documenta una configuración **moderna, estable y realista** de Neovim y, al mismo tiempo, sirve como **introducción práctica** para empezar a usarlo sin perderse en setups frágiles o innecesariamente complejos. Está pensada para quienes quieren pasar de un editor tradicional —o de un Neovim básico— a un entorno usable en el día a día.

No es un setup experimental ni minimalista extremo: es un sistema que **funciona**, es mantenible y evita conflictos comunes. La idea no es copiar y pegar, sino entender **por qué** se configura cada parte.

La configuración utiliza **lazy.nvim** como gestor de plugins y separa responsabilidades (LSP, autocompletado, formato, linting y UI) de forma clara y progresiva.

## Índice

1. [Importante: ¿por qué uso Neovim?](#importante-por-qué-uso-neovim)
2. [Primeros pasos: cómo pensar y navegar en Neovim](#primeros-pasos-cómo-pensar-y-navegar-en-neovim)
   - [Modos: la base de todo](#modos-la-base-de-todo)
   - [La tecla ](#la-tecla-esc)[`<Esc>`](#la-tecla-esc)
   - [Movimiento básico](#movimiento-básico)
   - [¿Qué es ](#qué-es-leader)[`<leader>`](#qué-es-leader)[?](#qué-es-leader)
   - [La idea general de Neovim](#la-idea-general-de-neovim)
3. [Terminal y entorno](#terminal-y-entorno)
4. [Filosofía del setup](#filosofía-del-setup)
5. [Estructura del proyecto](#estructura-del-proyecto)
6. [Bootstrap y gestor de plugins (lazy.nvim)](#bootstrap-y-gestor-de-plugins-lazynvim)
7. [Plugins principales](#plugins-principales)
8. [Conclusión](#conclusión)

## Importante: ¿por qué uso Neovim?

Esta guía parte de una decisión personal que vale la pena aclarar desde el inicio.

Uso Neovim no porque sea más popular, más "hardcore" o porque haga ver el setup más avanzado, sino porque encaja mejor con la forma en la que pienso y trabajo.

Neovim me obliga a:

- entender lo que hago, no solo a hacer clic
- separar edición de navegación
- automatizar lo repetitivo
- ser intencional con cada acción

No es la herramienta correcta para todos, y esa es justamente la idea. Si buscas algo que funcione sin fricción desde el minuto uno, probablemente otro editor sea mejor opción. Si buscas control, consistencia y un editor que se adapte a ti con el tiempo, entonces Neovim tiene sentido.

## Primeros pasos: cómo pensar y navegar en Neovim

Antes de hablar de configuración, es importante entender **la idea central de Neovim**. Neovim no está pensado para usar el mouse ni para depender de menús, sino para **editar texto de forma eficiente usando el teclado**.

La clave no es memorizar atajos, sino entender el modelo mental.

### Modos: la base de todo

Neovim funciona con **modos**, y eso es lo primero que suele confundir:

- **Normal mode**: para navegar y ejecutar acciones (es el modo por defecto).
- **Insert mode**: para escribir texto.
- **Visual mode**: para seleccionar texto.

La regla práctica es simple:

> _En Neovim pasas la mayor parte del tiempo en modo normal, no escribiendo._

Por eso salir de Insert mode rápido es importante.

### La tecla `<Esc>`

`<Esc>` sirve para **volver siempre a modo normal**. Es tu botón de seguridad.

Buenas prácticas:

- No asignes acciones importantes a `<Esc>`
- Úsala solo para cancelar o salir de un estado

Si algo se siente raro, presiona `<Esc>`.

### Movimiento básico

Al inicio, no necesitas nada avanzado:

- `h` `j` `k` `l` → izquierda, abajo, arriba, derecha
- `w` / `b` → avanzar o retroceder por palabras
- `gg` / `G` → inicio o final del archivo

Con esto ya puedes moverte sin tocar las flechas.

### ¿Qué es `<leader>`?

`<leader>` es una tecla especial que **tú defines** (en este setup es la barra espaciadora).

Se usa como prefijo para acciones que:

- no son navegación básica
- no deben ejecutarse por accidente
- dependen de tu configuración

Ejemplos mentales:

- `<leader>f` → algo relacionado con _find_
- `<leader>g` → algo relacionado con _git_
- `<leader>b` → algo relacionado con _buffers_

Principios que seguimos en este setup:

- `<leader>` solo para acciones
- Nada crítico en `<Esc>`
- Evitar colisiones entre plugins

Los mappings se definen **una sola vez** y no se redefinen dentro de plugins.

### La idea general de Neovim

Neovim no busca que hagas todo más rápido desde el primer día.

Busca que:

- el movimiento sea preciso
- las acciones sean repetibles
- el editor no se interponga

Al principio es más lento. Luego deja de estorbar.

Con esta base clara, **la configuración tiene sentido**. Sin esto, cualquier setup se vuelve frágil o frustrante.

## Terminal y entorno

Este setup asume:

- Terminal moderno (Ghostty, Kitty, Alacritty)
- True color
- Fuente monoespaciada con Nerd Font

Neovim **no parchea problemas del terminal**: el entorno importa.

## Filosofía del setup

Antes de entrar en código, es importante entender las decisiones clave:

- Cada herramienta tiene **una sola responsabilidad**
- Evitar plugins que se pisen entre sí
- Priorizar estabilidad sobre moda
- Preferir configuraciones explícitas
- Resolver conflictos antes de añadir más cosas

Regla central:

> _Si dos plugins hacen lo mismo, uno sobra._

## Estructura del proyecto

La configuración se divide en archivos pequeños y claros:

```text
nvim/
├── init.lua
├── lua/
│   ├── config/
│   │   └── lazy.lua
│   ├── plugin/
│   │   ├── autopairs.lua
│   │   ├── bufremove.lua
│   │   ├── cmp.lua
│   │   ├── formatting.lua
│   │   ├── gitsigns.lua
│   │   ├── linters.lua
│   │   ├── lsp.lua
│   │   ├── lualine.lua
│   │   ├── telescope.lua
│   │   ├── theme.lua
│   │   ├── toggleterm.lua
│   │   └── tree.lua
│   └── remap.lua
└── plugins.lua
```

Esto permite:

- Debug sencillo
- Cambios aislados
- Reutilización
- Documentación clara

## Bootstrap y gestor de plugins (lazy.nvim)

`lazy.nvim` se encarga de:

- Instalar plugins
- Cargarlos bajo demanda
- Manejar dependencias

Características importantes del setup:

- `mapleader` definido **antes** de cargar plugins
- Plugins declarados en un solo archivo (`plugins.lua`)
- Sin lógica de plugins dispersa

## Plugins principales

En lugar de describir cada plugin por separado, esta es la lista completa de plugins usados en el setup, con su responsabilidad principal claramente definida:

- **[wtfox/jellybeans.nvim](https://github.com/wtfox/jellybeans.nvim)**: tema base del editor, con soporte para transparencia y buen contraste en terminales modernos.
- [**nvim-tree/nvim-tree.lua**](https://github.com/nvim-tree/nvim-tree.lua): explorador de archivos para orientación visual del proyecto, no para navegación principal.
- [**nvim-telescope/telescope.nvim**](https://github.com/nvim-telescope/telescope.nvim): búsqueda de archivos, texto y símbolos; herramienta principal de navegación.
- [**neovim/nvim-lspconfig**](https://github.com/neovim/nvim-lspconfig): integración del Language Server Protocol para diagnósticos y acciones semánticas.
- [**mason-org/mason.nvim**](https://github.com/mason-org/mason.nvim): instalación y gestión de servidores LSP y herramientas externas.
- [**stevearc/conform.nvim**](https://github.com/stevearc/conform.nvim): formateo automático y manual, independiente del LSP.
- [**mfussenegger/nvim-lint**](https://github.com/mfussenegger/nvim-lint): ejecución de linters de forma explícita y controlada.
- [**hrsh7th/nvim-cmp**](https://github.com/hrsh7th/nvim-cmp): motor central de autocompletado.
- [**L3MON4D3/LuaSnip**](https://github.com/L3MON4D3/LuaSnip): sistema de snippets flexible e integrado con cmp.
- [**rafamadriz/friendly-snippets**](https://github.com/rafamadriz/friendly-snippets): colección de snippets listos para usar.
- [**windwp/nvim-autopairs**](https://github.com/windwp/nvim-autopairs): inserción automática de pares al escribir manualmente.
- [**github/copilot.vim**](https://github.com/github/copilot.vim): asistente de sugerencias de código bajo demanda.
- [**mg979/vim-visual-multi**](https://github.com/mg979/vim-visual-multi): edición con múltiples cursores para casos puntuales.
- [**akinsho/toggleterm.nvim**](https://github.com/akinsho/toggleterm.nvim): terminal integrado dentro de Neovim.
- [**nvim-lualine/lualine.nvim**](https://github.com/nvim-lualine/lualine.nvim): barra de estado con información contextual.
- [**lewis6991/gitsigns.nvim**](https://github.com/lewis6991/gitsigns.nvim): indicadores de cambios de Git y blame por línea.

## Conclusión

Este no es un setup perfecto, ni pretende serlo. Es el resultado de usar Neovim todos los días, de romper cosas, ajustarlas, frustrarme, volver atrás y quedarme solo con lo que realmente aporta valor a mi flujo de trabajo.

Es un setup:

- **usado**, no teórico
- **ajustado**, a base de prueba y error
- **depurado**, quitando más cosas de las que se añadieron
- **estable**, porque prioriza funcionar hoy y mañana

El valor no está en los plugins, sino en **las decisiones**.

> _Un buen setup de Neovim no se siente impresionante, se siente confiable._
