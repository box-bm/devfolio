---
title: Guía de Configuración de Entorno de Terminal
description: Una guía práctica para configurar tu entorno, usando zshrc, temas, fastfetch y otras herramientas que deberías usar.
tags:
  [
    neovim,
    editor de texto,
    configuración,
    lua,
    lazy,
    brew,
    ohmyzsh,
    alias,
    fastfetch,
  ]
date: 2026-01-31T11:35:00-6:00
updatedDate: 2026-02-01T00:00:00-6:00
draft: false
---

# Guía de Configuración de Entorno de Terminal

Esta guía te lleva paso a paso en la configuración de un **entorno de desarrollo completo** usando Zsh, Neovim y Fastfetch. La configuración es modular, portable y funciona en macOS, Linux y WSL.

## Lo que Obtendrás

Un entorno de terminal completamente configurado con:

- **Zsh con Oh My Zsh** – Shell mejorado con autosugestiones y resaltado de sintaxis
- **Neovim** – Editor de texto moderno y extensible configurado para desarrollo
- **Fastfetch** – Visualización de información del sistema que se ejecuta al iniciar la terminal

## Requisitos Previos (Instalación Manual)

Estas herramientas necesitan instalarse **antes** de ejecutar la configuración. El repositorio no instala dependencias automáticamente.

### Homebrew (macOS/Linux)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Plugins Requeridos de Zsh

```bash
# Autosugestiones
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Resaltado de sintaxis
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Neovim

```bash
brew install neovim
```

### Fastfetch (Opcional)

```bash
brew install fastfetch
```

## Instalación

Clona el repositorio en tu directorio `.config`:

```bash
git clone https://github.com/box-bm/terminal-settings.git ~/.config
cd ~/.config
```

Haz los scripts de configuración ejecutables:

```bash
chmod +x setup.sh
chmod +x dotfiles/setup.sh
chmod +x nvim/setup.sh
chmod +x fastfetch/setup.sh
```

Ejecuta la configuración completa:

```bash
./setup.sh
```

O ejecuta módulos individuales:

```bash
./dotfiles/setup.sh   # Solo configuración de Zsh
./nvim/setup.sh       # Solo configuración de Neovim
./fastfetch/setup.sh  # Solo configuración de Fastfetch
```

## Cómo Funciona

La configuración usa **enlaces simbólicos** en lugar de copiar archivos. Esto significa:

- Los cambios en el repositorio se reflejan inmediatamente en tu configuración
- Fácil de actualizar mediante `git pull`
- Tus configuraciones existentes se respaldan en `~/.dotfiles_backup/`

Cada módulo es **idempotente** (seguro/sin riesgos) – puedes ejecutar la configuración múltiples veces sin problemas.

## Estructura de Configuración de Zsh

La configuración de Zsh está dividida en archivos modulares para facilitar el mantenimiento:

```
dotfiles/
├── zsh/
│   ├── zshrc         # Archivo de configuración principal
│   ├── env.zsh       # Variables de entorno
│   ├── paths.zsh     # Configuración de PATH
│   └── aliases.zsh   # Alias personalizados
└── setup.sh          # Crea enlaces simbólicos
```

### Variables de Entorno (`env.zsh`)

Configurado para:

- **JAVA_HOME** – Apunta a Zulu JDK 17
- **ANDROID_HOME** – Ubicación del Android SDK

**Personaliza estos** según tus herramientas instaladas y sus ubicaciones.

### Configuración de PATH (`paths.zsh`)

Agrega estos directorios a tu PATH:

- Binario de Flutter
- Emulador de Android y platform tools
- `$HOME/.local/bin`

**Agrega tus propias** herramientas de desarrollo según sea necesario.

### Alias (`aliases.zsh`)

Alias actuales:

- `l` → `ls -l` (listado largo)
- `la` → `ls -la` (todos los archivos, listado largo)
- `dev` → `cd $HOME/Developer` (navegación rápida)

**Personaliza** con tus comandos de uso frecuente.

## Configuración de Neovim

La configuración de Neovim incluye:

- **LSP** (Language Server Protocol) para múltiples lenguajes
- **Autocompletado** con nvim-cmp
- **Explorador de archivos** (nvim-tree)
- **Buscador difuso** (Telescope)
- **Integración con Git** (Gitsigns)
- **Formateo y Linting** (Conform + nvim-lint)
- **Integración con GitHub Copilot**

### Primer Lanzamiento

Cuando abras Neovim por primera vez después de la configuración:

1. **Lazy.nvim** instalará automáticamente todos los plugins
2. Espera a que se complete la instalación
3. Reinicia Neovim

### Lenguajes Soportados

La configuración incluye servidores LSP para:

- TypeScript/JavaScript
- Python
- Lua
- Kotlin
- Dart/Flutter
- Ruby
- Rust
- HTML/CSS
- JSON/YAML
- SQL

## Configuración de Fastfetch

Muestra información completa del sistema incluyendo:

- SO y kernel
- Hardware (CPU, GPU, memoria)
- Administrador de pantalla y tema
- Shell y terminal
- Estado de red y batería

El **logo ASCII personalizado** está incluido en `fastfetch/logo.txt`. Reemplázalo con el tuyo si lo deseas.

### Desactivar Fastfetch

Si no quieres que Fastfetch se ejecute al iniciar el shell, puedes:

- No instalar Fastfetch
- Eliminar el bloque de Fastfetch de `dotfiles/zsh/zshrc`

## Consejos de Personalización

### Agregar Nuevos Alias

Edita `dotfiles/zsh/aliases.zsh`:

```bash
alias mialias='comando aquí'
```

No necesitas hacer source – los cambios se aplican en nuevas sesiones de terminal.

### Agregar Variables de Entorno

Edita `dotfiles/zsh/env.zsh`:

```bash
export MI_VARIABLE="valor"
```

### Modificar PATH

Edita `dotfiles/zsh/paths.zsh`:

```bash
path=(
  /mi/ruta/personalizada
  $path
)
```

### Cambiar el Tema de Zsh

Edita la línea `ZSH_THEME` en `dotfiles/zsh/zshrc`:

```bash
ZSH_THEME="robbyrussell"  # o cualquier otro tema de Oh My Zsh
```

## Solución de Problemas

### Los Plugins No Funcionan

Asegúrate de haber instalado los plugins de Zsh:

```bash
ls ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/
```

Deberías ver `zsh-autosuggestions` y `zsh-syntax-highlighting`.

### Los Plugins de Neovim No Cargan

Ejecuta dentro de Neovim:

```vim
:Lazy sync
```

### Los Enlaces Simbólicos No Se Crearon

Verifica si los archivos fueron respaldados:

```bash
ls ~/.dotfiles_backup/
```

Puedes crear enlaces simbólicos manualmente si es necesario:

```bash
ln -s ~/.config/dotfiles/zsh/zshrc ~/.zshrc
```

## Manteniendo Tu Configuración

### Actualización

```bash
cd ~/.config
git pull
```

Como todo está enlazado simbólicamente, los cambios toman efecto inmediatamente en nuevas sesiones de terminal.

### Respaldar Cambios Personalizados

Si modificas archivos directamente en el repositorio:

```bash
cd ~/.config
git add .
git commit -m "Configuración actualizada"
git push
```

### Eliminar la Configuración

```bash
# Eliminar enlaces simbólicos
rm ~/.zshrc
rm -rf ~/.config/nvim
rm -rf ~/.config/fastfetch

# Restaurar respaldos si es necesario
cp -r ~/.dotfiles_backup/* ~/
```

## Recursos Adicionales

- [Documentación de Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)
- [Documentación de Neovim](https://neovim.io/doc/)
- [Gestor de Plugins Lazy.nvim](https://github.com/folke/lazy.nvim)
- [Repositorio de Fastfetch](https://github.com/fastfetch-cli/fastfetch)

---

## Estructura del Repositorio

```
~/.config/
├── .gitignore
├── README.md
├── setup.sh              # Orquestador principal
├── dotfiles/
│   ├── setup.sh
│   └── zsh/
│       ├── zshrc
│       ├── env.zsh
│       ├── paths.zsh
│       └── aliases.zsh
├── nvim/
│   ├── setup.sh
│   ├── init.lua
│   └── lua/
│       ├── config/
│       ├── plugin/
│       └── plugins.lua
└── fastfetch/
    ├── setup.sh
    ├── config.jsonc
    └── logo.txt
```

---

Esta guía sigue un **enfoque práctico** – explica qué hace cada componente y cómo personalizarlo según tus necesidades. La estructura modular hace que sea fácil adoptar solo las partes que quieras.
