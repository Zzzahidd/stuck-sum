# StackSum — Design.md

**Companion to:** `PRD.md`
**Status:** Design specification (source of truth for visual implementation)
**Scope:** Visual language, tokens, layout, and interaction styling for the StackSum MVP

> This document is the **visual** source of truth. The PRD is the **product behavior/scope** source of truth. If the two ever appear to conflict, the PRD governs *what* the product does; this file governs *how it looks and feels*.

---

## 1. Design Philosophy

StackSum's interface exists to answer one question at a glance: **"What does my stack cost right now?"** Every visual decision should serve that goal — not decorate around it.

### 1.1 Guiding principles

1. **Clarity over decoration.** The design should feel like a precise utility, not a marketing site or a generic AI-generated dashboard. Whitespace, restrained color, and strong typographic hierarchy do the work — not gradients, shadows, or illustration.
2. **The total is the hero.** Of everything on screen, the current monthly/yearly total is the single most important piece of information. Typography, placement, and contrast should make it impossible to miss without making it visually loud.
3. **Calm, not clinical.** A slightly warm, neutral palette (`#F8F9F6` canvas, `#FBF9F7` stack surface) keeps the product feeling approachable rather than sterile, while staying far from playful or "startup gradient" territory.
4. **One brand color, used sparingly.** `#0E553B` (StackSum green) is reserved for primary actions, selection states, and brand moments. It should read as intentional emphasis, not wallpaper.
5. **Every visual element earns its place.** Per the PRD's core constraint: no permanent sidebar, no "View Stack" gate, no CTA-everywhere styling. If an element doesn't help the user browse, select, or see their total faster, it doesn't belong.
6. **Motion supports comprehension, not spectacle.** Animations confirm that an action happened (added a plan, total changed, item removed) — they never exist purely for polish.

### 1.2 Design tenets → visual consequence

| Product tenet (from PRD) | Visual consequence |
|---|---|
| No permanent stack sidebar | Stack is a wide horizontal card in the main page flow, not a fixed column |
| Total always visible while browsing | Sticky, compact version of the stack card appears on scroll |
| Adding a plan must not navigate away | Plan selection renders inline inside the product card, not a modal or new route |
| Not every action is a primary CTA | Two button tiers only for everyday use — secondary (Add) and primary (confirm/selected) — used deliberately |
| Minimal cognitive load | One font family (Roboto), one accent color, a single 4px spacing scale, restrained radii |

---

## 2. Brand & Visual Direction

**Typeface:** Roboto — the only UI font. No secondary display or serif face.

**Palette character:** warm neutral canvas + true white cards + one deep green accent. No blues, purples, reds, or gradients in the core UI. Product logos are the only place external color appears — they are content, not brand.

**Shape language:** soft but restrained corners (8–12px on most components, full pill only on filters), 1px hairline borders instead of shadows, near-zero elevation.

**Overall impression to aim for:** a well-made calculator/utility that a developer or designer would trust — closer to Linear or a well-typeset spreadsheet than to a consumer fintech app.

---

## 3. Typography Scale

The typography hierarchy should remain compact and highly readable.

### 3.1 Display / Hero — `type.display.hero`
- Font family: Roboto
- Font size: 52px · Weight: 700 · Line height: 1.08 (~56px) · Letter spacing: -1.5px
- Color: `text.primary`
- Used for: main hero headline — *"Build your SaaS stack see the real cost"*

### 3.2 Section Heading — `type.heading.section`
- 16px · 700 · line-height 24px · letter-spacing 0 · `text.primary`
- Used for: "Your stack"

### 3.3 Product Heading — `type.heading.product`
- 18px · 500 · line-height 24px · `text.primary`
- Used for: ChatGPT, Claude, Cursor, Figma, Notion, Slack, Spotify, Vercel, etc.

### 3.4 Body Large — `type.body.large`
- 18px · 400 · line-height 28px · `text.secondary`
- Used for: hero supporting copy

### 3.5 Body Regular — `type.body.default`
- 14px · 400 · line-height 20px · `text.secondary`
- Used for: product descriptions, supporting information, secondary UI copy

### 3.6 Body Small — `type.body.small`
- 12px · 400 · line-height 16px · `text.secondary`
- Used for: small metadata, supporting labels

### 3.7 Navigation — `type.navigation.default`
- 14px · 400 · line-height 20px · `text.secondary`

### 3.8 Button Text — `type.button.default`
- 14px · 500 · line-height 20px · color depends on button variant

### 3.9 Input Text — `type.input.default`
- 14px · 400 · line-height 20px · `text.primary`
- Placeholder: 14px · 400 · `text.muted`

### 3.10 Price
- **Product Price** — `type.price.product`: 14px · 700 · line-height 20px · `text.primary`
- **Stack Item Price** — `type.price.stack.item`: 16px · 700 · line-height 20px · `text.primary`
- **Stack Total** — `type.price.stack.total`: 32px · 700 · line-height 40px · letter-spacing -0.5px · `text.primary`

---

## 4. Color System

Only use the intentional UI colors below. Do not sample arbitrary anti-aliased pixels or introduce ad-hoc hex values.

### 4.1 Page Background — `color.background.canvas`
`#F8F9F6` (248, 249, 246) — main application background, hero background, page background. This is the dominant application surface.

### 4.2 Primary Surface — `color.surface.card`
`#FFFFFF` — product cards, search field, input surfaces, white content surfaces.

### 4.3 Secondary Warm Surface — `color.surface.stack`
`#FBF9F7` (251, 249, 247) — main stack summary card, selected stack area, warm elevated content surface. This subtle warm neutral separates the stack from standard white product cards without introducing a strong color.

### 4.4 Interactive Neutral Surface — `color.surface.control`
`#F4F4F3` (244, 244, 243) — secondary buttons, Add buttons, neutral controls, selected/interactive controls where appropriate.

### 4.5 Primary Text — `color.text.primary`
`#1E1F1D` (30, 31, 29) — headings, product names, main prices, important labels, primary navigation content. This is the main text color. **Do not use pure black for normal text.**

### 4.6 Secondary Text — `color.text.secondary`
`#5E5E5C` (94, 94, 92) — body copy, product descriptions, supporting information, secondary labels, navigation text, supporting pricing labels.

### 4.7 Muted Text — `color.text.muted`
`#777775` (119, 119, 117) — placeholder text, low-emphasis metadata, disabled informational content. Never used for important information.

### 4.8 Inverse Text — `color.text.inverse`
`#FFFFFF` — text on the primary green button, text on dark/green surfaces.

---

## 5. Brand Color

**Primary Brand** — `color.brand.primary`: `#0E553B` (14, 85, 59) — primary Add button, active category/filter, brand mark, important interactive states, primary emphasis. This is the primary StackSum green. Do not introduce additional greens unless a future design explicitly requires them.

| State | Token | Value |
|---|---|---|
| Hover | `color.brand.primary.hover` | `#0A4731` |
| Pressed | `color.brand.primary.pressed` | `#083B29` |
| Disabled | `color.brand.primary.disabled` | `#A8C0B6` (use only when a primary action is disabled) |

---

## 6. Border System

| Border | Token | Value | Usage |
|---|---|---|---|
| Default | `color.border.default` | `#DBDCD9` (219,220,217) | Product card borders, stack border, search field border, filter borders, button borders, input borders, header divider — the primary structural border |
| Subtle | `color.border.subtle` | `#E6E7E4` (230,231,228) | Very low-emphasis separators, internal dividers, secondary structural boundaries |
| Strong | `color.border.strong` | `#C9CAC7` | Focused or emphasized controls, stronger selected boundaries when required. Do not use everywhere. |

---

## 7. Icon Colors

| Icon | Token | Value | Usage |
|---|---|---|---|
| Primary | `color.icon.primary` | `#1E1F1D` | Search icon, arrow icons, remove icons, navigation icons, important interface icons |
| Secondary | `color.icon.secondary` | `#5E5E5C` | Supporting icons, low-emphasis interface icons |
| Inverse | `color.icon.inverse` | `#FFFFFF` | Icons placed on primary green surfaces |

---

## 8. Category / Badge Colors

Category badges use a neutral treatment rather than strong category-specific colors.

- **Background** — `color.category.background`: `#E1E2DF` (225,226,223)
- **Text** — `color.category.text`: `#5E5E5C`

Applies to: AI, Design, Development, Productivity, Marketing, Communication, Entertainment, Other. The category badge should remain visually secondary to the product name. **Do not assign a different bright color to every category.**

---

## 9. State Colors

The design intentionally uses a restrained visual language.

- **Selected:** primary → `color.brand.primary`; neutral control background → `color.surface.control`
- **Hover:** neutral → `color.surface.control`; primary → `color.brand.primary.hover`
- **Pressed:** primary → `color.brand.primary.pressed`
- **Disabled:** background `#F1F1F0` · text `#A0A19E` · border `#E0E1DE`
- **Focus Ring** — `color.focus.ring`: `#0E553B` — 2px focus ring, 2px offset where space allows. Focus must remain clearly visible for keyboard users.

---

## 10. Product Logo Colors

Product logos are content assets, not part of the StackSum semantic color system. Do not replace product brand colors with StackSum colors (ChatGPT, Claude, Cursor, Figma, Notion, Slack, Spotify, Vercel, etc. keep their real logo colors). Do not create global tokens such as `color.logo.chatgpt` unless product-specific theming is actually required.

---

## 11. Layout System

| Token | Value | Notes |
|---|---|---|
| `layout.page.max-width` | 1600px | Primary full-width content — comfortable horizontal breathing room |
| `layout.hero.max-width` | 1120px | Hero content is intentionally narrower than the catalog, creating visual hierarchy |
| `layout.content.max-width` | 1600px | Stack, product catalog, main application content |

---

## 12. Header

| Property | Value |
|---|---|
| `component.header.height` | 88px |
| Horizontal padding (desktop) | 32px |
| Bottom border | `color.border.default` |
| Logo mark | ~32px × 32px |
| Product name font | Roboto, 16px, 500 |

---

## 13. Hero Layout

The hero should have substantial whitespace and should not feel vertically compressed.

- Hero top spacing: ~56px
- Hero heading width: ~600px
- Hero heading: *"Build your SaaS stack see the real cost"* — 52px / 700 / 56px line-height / -1.5px letter-spacing
- Hero description: 18px / 400 / 28px line-height, max-width 560px

---

## 14. Search

| Property | Value |
|---|---|
| Container height | 64px |
| Background | `color.surface.card` |
| Border | `color.border.default`, 1px |
| Radius | 12px |
| Input font | 14px, `color.text.primary` |
| Placeholder | `color.text.muted` |
| Icon size / color | 18px / `color.icon.secondary` |

---

## 15. Category Filter

A horizontal group of compact, pill-shaped controls.

| Property | Value |
|---|---|
| Height | 40px |
| Padding | 16px horizontal / 8px vertical |
| Gap | 8px |
| Radius | 20px (pill-like) |
| Typography | 14px / 500 |

**Inactive:** background `transparent` · border `color.border.default` · text `color.text.secondary`
**Active:** background `color.brand.primary` · text `color.text.inverse` · border `color.brand.primary`

---

## 16. Stack Summary

One of the most important components in the application. It must remain visible without requiring the user to repeatedly click a "View Stack" action. **Never a permanent left or right sidebar** — the stack stays a wide horizontal content block.

| Property | Value |
|---|---|
| Background | `color.surface.stack` |
| Border | `color.border.default`, 1px |
| Radius | 12px |
| Padding | 24px horizontal / 24px vertical |
| Divider color | `color.border.default`, 1px |

**Layout (desktop):** "Your stack" → selected subscriptions (main horizontal area) → total (visually separated section).

**Stack heading:** 16px / 700
**Stack count:** 14px / 400 / `color.text.secondary` — e.g. *"3 subscriptions added"*

**Stack item** shows: product logo, product name (14px/500), selected plan/billing (14px, `color.text.secondary`), price (16px/700), remove action (18px icon, `color.icon.secondary`, hover → `color.text.primary`).

---

## 17. Stack Total

| Element | Style |
|---|---|
| Total label | 14px / 500 / `color.text.secondary` |
| Monthly total | 32px / 700 / line-height 40px / `color.text.primary` |
| Monthly suffix (`/mo`) | 14px / 400 / `color.text.secondary` |
| Annual total | 14px / 400 / `color.text.secondary` — e.g. *"$2,280 /year"* |

---

## 18. Product Catalog

The primary browsing surface. Product cards should remain wide enough to comfortably read content — never narrowed into sidebar-style columns to accommodate the stack.

| Property | Value |
|---|---|
| Desktop grid | 3 columns |
| Grid gap | 24px horizontal / 16px vertical |
| Card background | `color.surface.card` |
| Card border | `color.border.default`, 1px |
| Card radius | 12px |
| Card padding | 16px |

---

## 19. Product Card Structure

Hierarchy: logo → name → category → description → pricing → add action.

| Element | Style |
|---|---|
| Logo container | 64px × 64px, radius 8px, `object-fit: contain` (never distort logos) |
| Product name | 18px / 500 / `color.text.primary` |
| Category badge | `color.category.background` bg, `color.category.text` text, 12px / 500 |
| Description | 14px / 400 / 20px line-height / `color.text.secondary` |
| Pricing ("From:" label + price) | 14px regular label, 14px/700 bold price |

---

## 20. Add Button

Not every button should visually compete as a primary CTA. The Add action inside product cards is normally a **neutral control**.

**Secondary Add Button:** background `color.surface.control` · border `color.border.default` · text `color.text.primary` · height 40px · radius 8px · 14px/500

**Primary Add Button:** used only when a selected product requires stronger confirmation/action. Background `color.brand.primary` · text `color.text.inverse` · border `color.brand.primary` · height 40px · radius 8px · 14px/500

---

## 21. Plan Selector

When a product has multiple plans, show selection **directly inside the product card** — no modal, if space allows inline selection (consistent with the PRD rule that adding a plan must never navigate away).

| Property | Value |
|---|---|
| Plan row height | 40px |
| Background | `color.surface.card` |
| Border | `color.border.default` |
| Radius | 8px |
| Selected plan background | `color.surface.control` |
| Selected plan border | `color.border.default` |
| Selected indicator | `color.brand.primary` |
| Plan name | 14px / 400 |
| Plan price | 14px / 700 |

---

## 22. Buttons

Buttons must not all look like primary CTAs — maintain hierarchy:

- **Primary:** important confirmation, main action, selected/add confirmation
- **Secondary:** add product, neutral actions, supporting actions
- **Tertiary:** text-only actions, low-priority controls

Default radius: 8px · Default height: 40px

---

## 23. Inputs

| Property | Value |
|---|---|
| Background | `color.surface.card` |
| Border | `color.border.default` |
| Text | `color.text.primary` |
| Placeholder | `color.text.muted` |
| Radius | 8px |
| Height (default) | 40px |
| Height (large search) | 64px |

---

## 24. Spacing System

4px base scale. Never introduce arbitrary spacing values when an existing token applies.

```
space.1  = 4px
space.2  = 8px
space.3  = 12px
space.4  = 16px
space.5  = 20px
space.6  = 24px
space.7  = 28px
space.8  = 32px
space.10 = 40px
space.12 = 48px
space.14 = 56px
space.16 = 64px
space.20 = 80px
```

---

## 25. Common Spacing Rules

| Context | Value |
|---|---|
| Card internal padding | 16px |
| Large surface padding | 24px |
| Hero content gap (between major text blocks) | 24px |
| Search → Filter | 16px |
| Filter → Stack | 40px |
| Stack → Product grid | 24px |
| Product card internal gap | 16px (typical) |

---

## 26. Border Radius System

```
radius.none = 0px
radius.sm   = 4px
radius.md   = 8px
radius.lg   = 12px
radius.xl   = 16px
radius.full = 9999px
```

| Component | Radius |
|---|---|
| Product cards | `radius.lg` (12px) |
| Stack | `radius.lg` (12px) |
| Search | `radius.lg` (12px) |
| Standard buttons | `radius.md` (8px) |
| Plan rows | `radius.md` (8px) |
| Category pills | `radius.full` |
| Logo containers | `radius.md` (8px) |

---

## 27. Shadows

The design intentionally avoids strong shadows. Do not add large floating-card shadows.

Default: `box-shadow: none;`

If elevation is required for the temporary sticky state, use only an extremely subtle shadow:

```
shadow.sticky = 0 4px 16px rgba(30, 31, 29, 0.06)
```

No heavy Material-style elevation.

---

## 28. Iconography

- Recommended icon size: 18px
- Large interface icons: 20px
- Small icons: 16px
- Consistent stroke weight: 1.75px–2px
- Do not mix filled and outlined icon styles randomly

Icons should be simple, clean, and visually quiet.

---

## 29. Motion

Motion should be subtle and functional. Use **Motion** (Framer Motion) for UI animation — do not introduce multiple animation libraries.

| Speed | Duration |
|---|---|
| Fast | 120ms |
| Standard | 180ms |
| Emphasized | 240ms |

**Easing:** smooth ease-out curve for most UI transitions.

**Avoid:** bouncy animations, large spring effects, excessive scaling, decorative page transitions.

---

## 30. Product Card Interaction

- **Default:** white card, neutral border
- **Hover:** very subtle surface/border change — do not dramatically lift the card
- **Selected:** show the selected plan clearly
- **Added:** the product should visually communicate it's part of the stack — the stack itself is the primary confirmation, the card state is secondary reinforcement

---

## 31. Responsive Design

The desktop screenshot is the primary visual reference; the application must remain usable on smaller screens.

**Desktop (large widths):** 3-column product grid, wide horizontal stack, full hero width, horizontal category controls

**Tablet:** 2-column product grid, stack remains horizontal where possible, reduced horizontal padding, category filter may scroll horizontally

**Mobile:** 1-column product grid, stack becomes vertically structured, product cards remain full width, search remains prominent, category filters may horizontally scroll

**Do not create a desktop-style sidebar on mobile.**

---

## 32. Sticky Stack Behavior

The stack must remain available while browsing, without permanently consuming a large portion of the viewport.

1. **Initial state:** stack exists in normal document flow.
2. **On scroll:** transitions into a compact sticky state that:
   - Remains horizontally wide
   - Preserves the total
   - Preserves subscription count
   - Preserves access to selected items
   - Avoids becoming a side panel
   - Avoids covering product content unnecessarily

---

## 33. Visual Hierarchy

1. Hero message
2. Search
3. Current stack / total
4. Product discovery
5. Product information
6. Secondary metadata

The total cost is important and persistent, but it should not overpower the entire interface.

---

## 34. Color Usage Rules

**Allowed primary UI colors only:**

| Purpose | Hex |
|---|---|
| Canvas | `#F8F9F6` |
| Card | `#FFFFFF` |
| Stack | `#FBF9F7` |
| Control | `#F4F4F3` |
| Primary text | `#1E1F1D` |
| Secondary text | `#5E5E5C` |
| Muted text | `#777775` |
| Primary brand | `#0E553B` |
| Default border | `#DBDCD9` |
| Subtle border | `#E6E7E4` |
| Category background | `#E1E2DF` |
| Inverse | `#FFFFFF` |

**Do not introduce** arbitrary purple, blue, red, gradients, neon colors, or additional accent colors into the core UI. Product logos are the only exception, since they represent external brands.

---

## 35. Accessibility

- Maintain strong contrast between primary text/background, secondary text/background, interactive controls/background, and primary green/inverse white text
- Never use color as the only indicator of state — selected products/plans need a visual state change, textual state, and structural indication where appropriate
- All interactive controls must have visible keyboard focus (see §9 Focus Ring)

---

## 36. Design Token Naming Convention

Use semantic token names, not visual names.

**Prefer:** `color.text.primary`, `color.surface.card`, `color.border.default`, `color.brand.primary`
**Avoid:** `gray-1`, `gray-2`, `green-1`, `white-card`, `dark-text`

Semantic naming makes the design system easier for both AI tools and developers to understand and extend.

---

## 37. Recommended Tailwind Mapping

```css
:root {
  --color-background-canvas: #F8F9F6;
  --color-surface-card: #FFFFFF;
  --color-surface-stack: #FBF9F7;
  --color-surface-control: #F4F4F3;

  --color-text-primary: #1E1F1D;
  --color-text-secondary: #5E5E5C;
  --color-text-muted: #777775;
  --color-text-inverse: #FFFFFF;

  --color-brand-primary: #0E553B;
  --color-brand-primary-hover: #0A4731;
  --color-brand-primary-pressed: #083B29;

  --color-border-default: #DBDCD9;
  --color-border-subtle: #E6E7E4;
  --color-border-strong: #C9CAC7;

  --color-category-background: #E1E2DF;
  --color-category-text: #5E5E5C;

  --color-icon-primary: #1E1F1D;
  --color-icon-secondary: #5E5E5C;
  --color-icon-inverse: #FFFFFF;

  --color-focus-ring: #0E553B;

  --font-family-primary: "Roboto", sans-serif;
}
```

---

## 38. Implementation Rules for Codex (or any AI coding agent)

When implementing this design:

- Use Roboto as the only primary UI font
- Do not invent new colors — use semantic design tokens only
- Do not use pure black for normal UI text
- Use `#F8F9F6` as the primary page background
- Use white for product cards
- Use `#FBF9F7` for the stack surface
- Use `#0E553B` as the StackSum primary brand color
- Use `#1E1F1D` for primary text, `#5E5E5C` for secondary text, `#777775` for muted text
- Use `#DBDCD9` for default borders, `#F4F4F3` for neutral controls
- Keep borders subtle; avoid unnecessary shadows, excessive gradients, and glassmorphism
- Avoid excessive rounded cards; don't make every button look like a CTA
- Keep product cards visually dominant in the catalog
- **Never turn the stack into a permanent sidebar** — keep it visible while browsing as a wide persistent card
- Use Motion for interaction animations; keep animations subtle and fast
- Follow the 4px spacing scale; prefer existing spacing tokens over arbitrary values
- Use semantic token names everywhere
- Do not create separate design systems for individual pages
- This `Design.md` is the visual source of truth for the entire application

---

## 39. Visual Quality Standard

The final implementation should feel like a carefully designed modern SaaS utility rather than a generic dashboard template. Target characteristics:

- High whitespace quality
- Strong typography
- Quiet borders
- Restrained color usage
- Clear information hierarchy
- Minimal visual noise
- Strong product discoverability
- Immediate visibility of stack cost
- No unnecessary UI chrome
- No excessive shadows, animations, or decorative gradients
- No generic AI-generated dashboard appearance

**When in doubt:** prefer the simpler solution unless an added element materially improves usability.

---

## 40. Final Token Reference

### Colors

| Token | Value | Purpose |
|---|---|---|
| `color.background.canvas` | `#F8F9F6` | Main page background |
| `color.surface.card` | `#FFFFFF` | Product/card surface |
| `color.surface.stack` | `#FBF9F7` | Stack surface |
| `color.surface.control` | `#F4F4F3` | Neutral controls |
| `color.text.primary` | `#1E1F1D` | Primary text |
| `color.text.secondary` | `#5E5E5C` | Secondary text |
| `color.text.muted` | `#777775` | Muted text |
| `color.text.inverse` | `#FFFFFF` | Text on dark surfaces |
| `color.brand.primary` | `#0E553B` | Primary brand/action |
| `color.brand.primary.hover` | `#0A4731` | Brand hover |
| `color.brand.primary.pressed` | `#083B29` | Brand pressed |
| `color.border.default` | `#DBDCD9` | Standard border |
| `color.border.subtle` | `#E6E7E4` | Subtle border |
| `color.border.strong` | `#C9CAC7` | Emphasized border |
| `color.category.background` | `#E1E2DF` | Category badge |
| `color.category.text` | `#5E5E5C` | Category text |
| `color.icon.primary` | `#1E1F1D` | Primary icons |
| `color.icon.secondary` | `#5E5E5C` | Secondary icons |
| `color.icon.inverse` | `#FFFFFF` | Icons on brand surfaces |
| `color.focus.ring` | `#0E553B` | Keyboard focus |

### Typography

| Token | Size | Weight | Line Height |
|---|---|---|---|
| `type.display.hero` | 52px | 700 | 56px |
| `type.heading.section` | 16px | 700 | 24px |
| `type.heading.product` | 18px | 500 | 24px |
| `type.body.large` | 18px | 400 | 28px |
| `type.body.default` | 14px | 400 | 20px |
| `type.body.small` | 12px | 400 | 16px |
| `type.navigation.default` | 14px | 400 | 20px |
| `type.button.default` | 14px | 500 | 20px |
| `type.input.default` | 14px | 400 | 20px |
| `type.price.product` | 14px | 700 | 20px |
| `type.price.stack.item` | 16px | 700 | 20px |
| `type.price.stack.total` | 32px | 700 | 40px |

### Radius

| Token | Value |
|---|---|
| `radius.none` | 0px |
| `radius.sm` | 4px |
| `radius.md` | 8px |
| `radius.lg` | 12px |
| `radius.xl` | 16px |
| `radius.full` | 9999px |

### Spacing

| Token | Value |
|---|---|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.5` | 20px |
| `space.6` | 24px |
| `space.7` | 28px |
| `space.8` | 32px |
| `space.10` | 40px |
| `space.12` | 48px |
| `space.14` | 56px |
| `space.16` | 64px |
| `space.20` | 80px |

### Core Component Dimensions

| Component | Value |
|---|---|
| Header height | 88px |
| Header horizontal padding | 32px |
| Logo mark | 32 × 32px |
| Search height | 64px |
| Search radius | 12px |
| Filter height | 40px |
| Filter gap | 8px |
| Stack radius | 12px |
| Stack padding | 24px |
| Product grid | 3 columns |
| Product grid horizontal gap | 24px |
| Product grid vertical gap | 16px |
| Product card padding | 16px |
| Product card radius | 12px |
| Product logo container | 64 × 64px |
| Product logo radius | 8px |
| Button height | 40px |
| Button radius | 8px |
| Plan row height | 40px |
| Plan row radius | 8px |
| Hero max width | 1120px |
| Main content max width | 1600px |

---

## 41. Source of Truth

This `Design.md` represents the approved visual design for StackSum.

- **Visual decisions** → follow this `Design.md`
- **Product behavior/scope** → follow `PRD.md`
- **Technical implementation rules** → follow the project's `AGENTS.md` (or equivalent)

Do not invent visual decisions that aren't required. The goal is to reproduce the visual language and hierarchy described here as faithfully as possible, while keeping the implementation semantic, responsive, accessible, and maintainable.
