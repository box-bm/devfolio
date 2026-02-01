---
title: Complete Neovim Setup and Getting Started Guide
description: A practical guide to setting up Neovim in a modern and stable way, ideal for those who want a functional and maintainable environment.
tags: [neovim, text editor, setup, guia]
topic: nvim
guide: getting-started-with-neovim
slug: en/guides/nvim/getting-started-with-neovim
language: en
draft: false
date: 2026-01-31
---

# Complete Neovim Setup and Getting Started Guide

This guide documents a **modern, stable, and realistic** Neovim configuration and, at the same time, serves as a **practical introduction** to getting started with Neovim without falling into fragile or unnecessarily complex setups. It is aimed at people who want to move from a traditional editor—or from a very basic Neovim setup—to an environment that is actually usable day to day.

This is not an experimental or extreme minimalist setup. It is a system that **works**, is maintainable, and avoids common conflicts. The goal is not to copy and paste blindly, but to understand **why** each part is configured the way it is.

The configuration uses **lazy.nvim** as the plugin manager and clearly separates responsibilities (LSP, autocompletion, formatting, linting, and UI) in a progressive and understandable way.

## Table of Contents

1. [Important: Why I use Neovim](#important-why-i-use-neovim)
2. [Getting started: how to think and navigate in Neovim](#getting-started-how-to-think-and-navigate-in-neovim)
   - [Modes: the foundation](#modes-the-foundation)
   - [The <Esc> key](#the-esc-key)
   - [Basic movement](#basic-movement)
   - [What is <leader>?](#what-is-leader)
   - [The general idea behind Neovim](#the-general-idea-behind-neovim)

3. [Terminal and environment](#terminal-and-environment)
4. [Setup philosophy](#setup-philosophy)
5. [Project structure](#project-structure)
6. [Bootstrap and plugin manager (lazy.nvim)](#bootstrap-and-plugin-manager-lazynvim)
7. [Main plugins](#main-plugins)
8. [Conclusion](#conclusion)

## Important: Why I use Neovim

This guide starts from a personal decision that is worth clarifying from the beginning.

I use Neovim not because it is more popular, more “hardcore,” or because it makes a setup look more advanced, but because it fits better with the way I think and work.

Neovim forces me to:

- understand what I am doing, not just click buttons
- separate editing from navigation
- automate repetitive work
- be intentional with every action

It is not the right tool for everyone, and that is exactly the point. If you want something that works with zero friction from minute one, another editor may be a better choice. If you want control, consistency, and an editor that adapts to you over time, then Neovim makes sense.

## Getting started: how to think and navigate in Neovim

Before talking about configuration, it is important to understand **Neovim’s core idea**. Neovim is not designed around the mouse or menus, but around **efficient text editing using the keyboard**.

The key is not memorizing shortcuts, but understanding the mental model.

### Modes: the foundation

Neovim works with **modes**, and this is usually the first confusing part:

- **Normal mode**: for navigation and actions (this is the default mode).
- **Insert mode**: for writing text.
- **Visual mode**: for selecting text.

A practical rule:

> _In Neovim, you spend most of your time in normal mode, not typing._

That is why leaving Insert mode quickly is important.

### The `<Esc>` key

`<Esc>` always takes you back to **normal mode**. It is your safety button.

Good practices:

- Do not bind important actions to `<Esc>`
- Use it only to cancel or exit a state

If something feels wrong, press `<Esc>`.

### Basic movement

At the beginning, you do not need anything advanced:

- `h` `j` `k` `l` → left, down, up, right
- `w` / `b` → move forward or backward by words
- `gg` / `G` → start or end of the file

With this alone, you can already move without arrow keys.

### What is `<leader>`?

`<leader>` is a special key that **you define** (in this setup, it is the space bar).

It is used as a prefix for actions that:

- are not basic navigation
- should not be triggered accidentally
- depend on your configuration

Mental examples:

- `<leader>f` → something related to _find_
- `<leader>g` → something related to _git_
- `<leader>b` → something related to _buffers_

Principles used in this setup:

- `<leader>` is only for actions
- Nothing critical is bound to `<Esc>`
- Avoid keybinding collisions

Key mappings are defined **once** and not redefined inside plugins.

### The general idea behind Neovim

Neovim is not trying to make you faster on day one.

It aims to make:

- movement precise
- actions repeatable
- the editor stay out of your way

At first it feels slower. Eventually, it stops getting in the way.

With this foundation in place, **the configuration makes sense**. Without it, any setup becomes fragile or frustrating.

## Terminal and environment

This setup assumes:

- A modern terminal (Ghostty, Kitty, Alacritty)
- True color support
- A monospace font with Nerd Font symbols

Neovim **does not patch terminal issues**: the environment matters.

## Setup philosophy

Before diving into code, it is important to understand the key decisions:

- Each tool has **a single responsibility**
- Avoid plugins that overlap in purpose
- Prioritize stability over trends
- Prefer explicit configuration
- Resolve conflicts before adding more tools

Core rule:

> _If two plugins do the same thing, one of them should go._

## Project structure

The configuration is split into small, clear files:

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

This allows:

- Easier debugging
- Isolated changes
- Reuse
- Clear documentation

## Bootstrap and plugin manager (lazy.nvim)

`lazy.nvim` is responsible for:

- Installing plugins
- Loading them on demand
- Managing dependencies

Important characteristics of this setup:

- `mapleader` is defined **before** loading plugins
- Plugins are declared in a single file (`plugins.lua`)
- No scattered plugin logic

## Main plugins

Instead of describing each plugin in detail, here is the full list of plugins used in this setup, with their primary responsibility:

- **[wtfox/jellybeans.nvim](https://github.com/wtfox/jellybeans.nvim)**: base editor theme with transparency support and good contrast in modern terminals.
- **[nvim-tree/nvim-tree.lua](https://github.com/nvim-tree/nvim-tree.lua)**: file explorer for project orientation, not primary navigation.
- **[nvim-telescope/telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)**: file, text, and symbol search; the main navigation tool.
- **[neovim/nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)**: Language Server Protocol integration for diagnostics and semantic actions.
- **[mason-org/mason.nvim](https://github.com/mason-org/mason.nvim)**: installation and management of LSP servers and external tools.
- **[stevearc/conform.nvim](https://github.com/stevearc/conform.nvim)**: automatic and manual formatting, independent from the LSP.
- **[mfussenegger/nvim-lint](https://github.com/mfussenegger/nvim-lint)**: explicit and controlled lint execution.
- **[hrsh7th/nvim-cmp](https://github.com/hrsh7th/nvim-cmp)**: core autocompletion engine.
- **[L3MON4D3/LuaSnip](https://github.com/L3MON4D3/LuaSnip)**: flexible snippet engine integrated with cmp.
- **[rafamadriz/friendly-snippets](https://github.com/rafamadriz/friendly-snippets)**: ready-to-use snippet collection.
- **[windwp/nvim-autopairs](https://github.com/windwp/nvim-autopairs)**: automatic insertion of pairs when typing manually.
- **[github/copilot.vim](https://github.com/github/copilot.vim)**: on-demand code suggestion assistant.
- **[mg979/vim-visual-multi](https://github.com/mg979/vim-visual-multi)**: multi-cursor editing for specific cases.
- **[akinsho/toggleterm.nvim](https://github.com/akinsho/toggleterm.nvim)**: integrated terminal inside Neovim.
- **[nvim-lualine/lualine.nvim](https://github.com/nvim-lualine/lualine.nvim)**: statusline with contextual information.
- **[lewis6991/gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim)**: Git change indicators and inline blame.

## Conclusion

This is not a perfect setup, nor does it try to be. It is the result of using Neovim every day—breaking things, adjusting them, getting frustrated, rolling back, and keeping only what truly adds value to my workflow.

It is a setup that is:

- **used**, not theoretical
- **tuned**, through trial and error
- **refined**, by removing more than adding
- **stable**, because it prioritizes working today and tomorrow

The value is not in the plugins, but in **the decisions**.

> _A good Neovim setup does not feel impressive; it feels reliable._
