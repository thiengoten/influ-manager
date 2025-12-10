# Project Style Guide

## Overview

This style guide documents the design system, color palette, typography, and component standards used in the **Personal Brand OS** project. The design system is built on top of **Tailwind CSS v4** (using `@theme inline`), **Radix UI** primitives, and **shadcn/ui** components.

It supports **Dark Mode** out of the box using CSS variables for semantic coloring.

---

## Color Palette

The project uses semantic color variables defined in `app/globals.css`. Colors are defined using the **OKLCH** color space for better perceptual uniformity.

### Core Colors

| Semantic Name   | Light Mode Value               | Dark Mode Value                | Usage                        |
| :-------------- | :----------------------------- | :----------------------------- | :--------------------------- |
| **Background**  | `oklch(1 0 0)` (White)         | `oklch(0.145 0 0)` (Dark Grey) | Page background              |
| **Foreground**  | `oklch(0.145 0 0)` (Dark Grey) | `oklch(0.985 0 0)` (White)     | Default text color           |
| **Primary**     | `oklch(0.205 0 0)`             | `oklch(0.922 0 0)`             | Main actions, buttons        |
| **Primary FG**  | `oklch(0.985 0 0)`             | `oklch(0.205 0 0)`             | Text on primary elements     |
| **Secondary**   | `oklch(0.97 0 0)`              | `oklch(0.269 0 0)`             | Secondary actions, badges    |
| **Muted**       | `oklch(0.97 0 0)`              | `oklch(0.269 0 0)`             | Muted backgrounds            |
| **Accent**      | `oklch(0.97 0 0)`              | `oklch(0.269 0 0)`             | Hover states, accents        |
| **Destructive** | `oklch(0.577 0.245 27.325)`    | `oklch(0.704 0.191 22.216)`    | Error states, delete actions |

### UI & Borders

| Semantic Name | Usage                                     |
| :------------ | :---------------------------------------- |
| **Card**      | Background for cards (elevated surfaces)  |
| **Popover**   | Background for dropdowns, tooltips        |
| **Border**    | Default border color for inputs, dividers |
| **Input**     | Border color specifically for form inputs |
| **Ring**      | Focus ring color for accessibility        |

### Data Visualization (Charts)

The project includes a specific palette for charts and data visualization:

- `var(--chart-1)`
- `var(--chart-2)`
- `var(--chart-3)`
- `var(--chart-4)`
- `var(--chart-5)`

### Sidebar Specific

Dedicated colors for the application sidebar to allow for distinct theming:

- `var(--sidebar-background)`
- `var(--sidebar-foreground)`
- `var(--sidebar-primary)`
- `var(--sidebar-accent)`

---

## Typography

The project uses the **Geist** font family (Sans and Mono) via `next/font/google`.

### Font Families

- **Sans**: `var(--font-geist-sans)` (Default UI font)
- **Mono**: `var(--font-geist-mono)` (Code, technical data)

### Font Sizes & Weights

Commonly used Tailwind classes:

- **Text Base**: `text-base` (16px) - Default body text
- **Text Small**: `text-sm` (14px) - Secondary text, buttons, inputs
- **Text XS**: `text-xs` (12px) - Meta data, captions
- **Font Medium**: `font-medium` (500) - Buttons, navigation
- **Font Semibold**: `font-semibold` (600) - Headings, card titles

### Usage Example

```tsx
<h1 className="font-sans text-2xl font-semibold tracking-tight">Dashboard</h1>
<p className="text-muted-foreground text-sm">Overview of your activity.</p>
<code className="font-mono text-xs">console.log('data')</code>
```

---

## Spacing System

The project relies on the default Tailwind CSS spacing scale.

- **Layout Padding**: `p-4`, `p-6`, `p-8` (1rem, 1.5rem, 2rem)
- **Component Gap**: `gap-2` (0.5rem), `gap-4` (1rem), `gap-6` (1.5rem)
- **Input/Button Padding**: `px-4 py-2` (Standard button)

---

## Border Radius

Border radius is controlled by a CSS variable `--radius` (default `0.625rem` / `10px`) and derived utility classes.

| Variable      | Class        | Value                | Usage                  |
| :------------ | :----------- | :------------------- | :--------------------- |
| `--radius-lg` | `rounded-lg` | `0.625rem`           | Standard containers    |
| `--radius-md` | `rounded-md` | `calc(radius - 2px)` | Buttons, Inputs        |
| `--radius-sm` | `rounded-sm` | `calc(radius - 4px)` | Small tags, checkboxes |
| `--radius-xl` | `rounded-xl` | `calc(radius + 4px)` | Cards, Modals          |

---

## Component Styles

### Buttons (`components/ui/button.tsx`)

- **Default**: `bg-primary text-primary-foreground hover:bg-primary/90`
- **Outline**: `border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground`
- **Ghost**: `hover:bg-accent hover:text-accent-foreground`
- **Destructive**: `bg-destructive text-white`
- **Dimensions**: Height `h-9` (36px) for default size.

### Cards (`components/ui/card.tsx`)

- **Container**: `rounded-xl border bg-card text-card-foreground shadow-sm`
- **Header/Content/Footer**: structured with consistent padding (`p-6`).

### Inputs (`components/ui/input.tsx`)

- **Style**: `h-9 rounded-md border border-input bg-transparent px-3 py-1 shadow-xs`
- **Focus**: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`

---

## Shadows & Elevation

- **Shadow XS**: `shadow-xs` - Subtle depth for buttons/inputs
- **Shadow SM**: `shadow-sm` - Cards, small panels
- **Shadow Default**: Standard tailwind shadow for dropdowns/popovers

---

## Animations & Transitions

- **Global**: `tw-animate-css` is imported for utility animations.
- **Interactive Elements**:
  - Buttons: `transition-all`
  - Inputs: `transition-[color,box-shadow]`
  - Accordions/Collapsibles: Likely use `radix-ui` state-based animations (e.g., `data-[state=open]:animate-accordion-down`).

---

## Opacity & Transparency

Transparency is heavily used for:

1.  **Hover States**: `bg-primary/90`, `bg-accent/50`
2.  **Focus Rings**: `ring-ring/50`
3.  **Borders**: `border-input` (often has opacity in dark mode)

---

## Common Tailwind CSS Usage

### Layout

- `flex flex-col gap-4`
- `grid gap-4 md:grid-cols-2 lg:grid-cols-4`
- `items-center justify-between`

### Interactive

- `hover:bg-accent`
- `focus-visible:outline-none`
- `disabled:opacity-50 disabled:pointer-events-none`

---
