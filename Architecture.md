# StackSum — Technical Stack & Architecture

**Companion to:** `PRD.md`, `Design.md`
**Status:** Technical specification (source of truth for implementation architecture)
**Scope:** Stack choices, data model, state ownership, and build rules for the StackSum MVP

> This document is the **architecture** source of truth. `PRD.md` governs product behavior/scope, `Design.md` governs visual implementation, this file governs *how it's built*.

---

## 1. Project Overview

StackSum is a SaaS subscription stack calculator. The application allows users to:

- Browse SaaS products
- Search products
- Filter products by category
- Open a product and choose a specific pricing plan
- Add the selected plan to their stack
- See every selected subscription
- See the combined monthly cost
- See the combined yearly cost
- Remove subscriptions
- Change selected plans
- Continue browsing while the current stack remains visible
- Persist the stack between page refreshes

**The application should prioritize:**

- Fast initial load
- Fast client-side interactions
- Minimal JavaScript where possible
- Simple architecture
- Strong type safety
- Excellent UX
- Maintainable product/pricing data
- Responsive behavior
- Accessibility
- SEO-friendly product pages
- No unnecessary dependencies

---

## 2. Core Technology Stack — Framework

**Use: TanStack Start**

TanStack Start is the primary full-stack React framework. Use it for:

- Application routing
- Server rendering
- Server functions
- Server-side data loading
- API-style server endpoints when necessary
- SEO metadata
- Application structure

**Do not** introduce Next.js. **Do not** introduce a separate Express server for the initial application.

---

## 3. Language

**Use: TypeScript**

Use TypeScript strictly throughout the project. Configuration should use strict type checking.

**Avoid:**
- `any`
- unnecessary type assertions
- duplicated interfaces
- untyped API responses

All product, plan, pricing, stack, filter, and calculation data should have explicit types.

---

## 4. Package Manager

**Use: pnpm**

Do not use npm. Do not use Yarn. All installation commands and scripts should assume pnpm.

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

Use the latest stable versions of dependencies available when the project is created. Do not intentionally install outdated versions.

---

## 5. Styling

**Use: Tailwind CSS**

Tailwind is the primary styling system. The design implementation must follow `Design.md`. Do not create arbitrary CSS values when an existing design token exists. Prefer semantic CSS variables and Tailwind utilities.

```tsx
className="bg-[var(--color-surface-card)] text-[var(--color-text-primary)]"
```

The design token system should be represented through CSS variables. Do not hardcode random colors throughout components.

---

## 6. Component Library

**Use: shadcn/ui**

shadcn/ui should provide accessible component foundations. Use it selectively.

**Potential components:** Button, Input, Dialog, Dropdown Menu, Tooltip, Separator, Badge, Scroll Area, Popover, Command, Sheet

Do not blindly use every shadcn component. The StackSum visual design must remain the source of truth — shadcn components should be customized to match `Design.md`. Do not allow default shadcn styling to override the StackSum design system.

---

## 7. Animation

**Use: GSAP**

GSAP is the only animation library. Do not add Motion / Framer Motion. Do not add multiple animation libraries.

**Potential animations:**
- Hero entrance
- Product card entrance
- Product card hover
- Plan selection
- Product added to stack
- Product removed from stack
- Stack item transitions
- Total price transitions
- Sticky stack transformation
- Filter transitions
- Search result transitions
- Subtle UI feedback

Animations should be subtle — the application should feel fast rather than heavily animated.

**Avoid:** excessive parallax, large page transitions, bouncing cards, exaggerated spring effects, unnecessary animation on every element.

**Respect** `prefers-reduced-motion`. Users who prefer reduced motion should receive minimal/no non-essential animation.

---

## 8. Icons

**Use: Lucide React**

Lucide is the default icon library. Use Lucide for: Search, Arrow, Close, Plus, Chevron, Filter, Menu, Check, Sun/Moon, External link, Edit, Trash/remove.

Do not mix multiple icon libraries. Do not use emoji as interface icons. Product logos are separate assets and should use the actual product brand assets.

---

## 9. Client State

**Use: Zustand**

Zustand should manage the small amount of interactive client state required by the application. Do not use Redux Toolkit — the application does not require Redux-level complexity.

**Primary client state:**

```ts
type StackState = {
  selectedItems: SelectedStackItem[]
  addItem: (item: SelectedStackItem) => void
  removeItem: (productId: string) => void
  changePlan: (productId: string, planId: string) => void
  clearStack: () => void
}
```

Search and filter state can remain local component state if it doesn't need to be shared. Do not put every piece of UI state into Zustand — use local React state when state is local to a component.

---

## 10. Server State

**Use: TanStack Query**

TanStack Query should only be introduced where remote/server data actually requires client-side caching or synchronization.

**Potential uses:** product catalog, product details, pricing data, future admin-managed catalog, future pricing updates.

Do not use TanStack Query for purely local UI state, and do not use it if the current route can simply load data through TanStack Start server-side data loading. The initial implementation should avoid unnecessary client-side fetching.

---

## 11. Validation

**Use: Zod**

Zod should validate: product data, plan data, pricing data, API/server responses, URL parameters where necessary, future admin input, imported catalog data.

```ts
const planSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  monthlyPrice: z.number().nonnegative(),
  annualPrice: z.number().nonnegative().nullable(),
  currency: z.string(),
});
```

Never blindly trust external or persisted data.

---

## 12. Search

**Use: Fuse.js**

For the initial catalog, use client-side fuzzy search. Search should support product name, company name, category, and relevant aliases/keywords (e.g. `chatgpt` / `openai`, `cursor`, `github`, `figma`, `design`, `AI`, `development`).

The search system should be fast enough for hundreds of products. Do not introduce Elasticsearch or Algolia for the MVP — for approximately 30–500 products, client-side search is more than sufficient. If the catalog eventually grows substantially beyond the initial scale, server-side search can be introduced later.

---

## 13. Database

**Use: PostgreSQL** (production catalog)

Do not use MongoDB for this project — the product/pricing structure is relational:

```
Product
   |
   ├── Plan
   │    ├── Pricing
   │    └── Availability
   |
   └── Category
```

PostgreSQL provides a clean structure for products, plans, pricing, categories, pricing sources, verification dates, and future historical pricing.

---

## 14. ORM

**Use: Drizzle ORM**

Reasons: type-safe, lightweight, SQL-oriented, excellent TypeScript integration, minimal abstraction, good fit for PostgreSQL.

Do not use Prisma unless there is a specific project requirement.

---

## 15. Database Schema

Initial conceptual schema:

```
products
--------
id
name
slug
company_name
description
category_id
logo_url
website_url
pricing_url
created_at
updated_at


categories
----------
id
name
slug


plans
-----
id
product_id
name
monthly_price
annual_price
currency
billing_interval
is_available
notes
created_at
updated_at


pricing_sources
---------------
id
product_id
url
last_verified_at
source_type
```

**Potential future table:**

```
pricing_history
---------------
id
plan_id
monthly_price
annual_price
currency
recorded_at
```

Do not implement pricing history unless the feature is actually required.

---

## 16. Money Representation

Do not perform important monetary calculations using floating-point numbers without consideration for precision. Avoid logic such as `0.1 + 0.2` for financial calculations.

For MVP pricing values, use integer minor units where appropriate:

```ts
// Prefer:
monthlyPriceCents: 2000

// Over:
monthlyPrice: 20
```

This makes calculations predictable:

```ts
const monthlyTotalCents = selectedItems.reduce(
  (total, item) => total + item.monthlyPriceCents,
  0
);
```

Display formatting should happen separately.

---

## 17. Currency

The MVP should use a consistent base currency. Initial recommended currency: **USD**.

Store currency explicitly:

```ts
currency: "USD"
```

Do not silently mix currencies. If multiple currencies are introduced later, currency conversion must be handled as a separate feature — do not implement currency conversion in the MVP unless explicitly required.

---

## 18. Product Data

```ts
type Product = {
  id: string;
  name: string;
  slug: string;
  companyName: string;
  description: string;
  category: ProductCategory;
  logoUrl: string;
  websiteUrl: string;
  pricingUrl: string;
  plans: Plan[];
};

type Plan = {
  id: string;
  productId: string;
  name: string;
  monthlyPriceCents: number | null;
  annualPriceCents: number | null;
  currency: "USD";
  billingInterval: "monthly" | "annual" | "both";
  availability: "available" | "unavailable";
};
```

---

## 19. Pricing Accuracy

Pricing should not be invented. Every pricing record should eventually have: official pricing source, last verified date, currency, billing interval, plan name.

```json
{
  "name": "Pro",
  "monthlyPriceCents": 2000,
  "currency": "USD",
  "pricingUrl": "...",
  "lastVerifiedAt": "2026-09-20"
}
```

The catalog should prioritize official pricing sources.

---

## 20. Stack Data Model

The selected stack should store references rather than duplicating unnecessary product data:

```ts
type SelectedStackItem = {
  productId: string;
  planId: string;
};
```

Product and plan details should come from the catalog. Derived information (selected products, monthly total, annual total, subscription count) should be calculated from the current catalog + selected stack. Do not maintain duplicate manually updated totals in state.

---

## 21. Derived Calculations

**Monthly total:**
```
monthlyTotal = sum(selectedPlan.monthlyPriceCents)
```

**Annual total** — if a real annual price exists:
```
annualTotal = sum(selectedPlan.annualPriceCents)
```

If only monthly pricing exists:
```
annualTotal = monthlyTotal * 12
```

Do not assume annual pricing equals monthly × 12 when actual annual pricing is available.

---

## 22. Persistence

**Use: localStorage** for the initial stack persistence. No authentication is required for the core calculator.

**Persist:** `selectedStack`

Do not persist unnecessary UI state — for example, search query does not need to survive a refresh.

---

## 23. Persistence Safety

localStorage should never be trusted blindly. On application startup:

1. Read persisted state
2. Parse it safely
3. Validate it with Zod
4. Remove invalid items
5. Fall back to an empty stack if invalid
6. Never crash the application because localStorage is corrupted

```
localStorage
    ↓
JSON.parse
    ↓
Zod validation
    ↓
valid stack
    ↓
Zustand
```

---

## 24. Authentication

**No authentication for MVP.**

Users should be able to open StackSum, search, add products, calculate their stack, refresh, and keep their stack — without creating an account. Authentication should only be introduced when cloud persistence or user accounts become an actual product requirement.

---

## 25. Routing

Use **TanStack Router** through TanStack Start.

**Potential routes:**
- `/` — Main calculator
- `/products/:slug` — Product detail page *(future)*
- `/stacks/:id` — Shareable stack *(future)*

Do not create routes that do not serve a real product purpose.

---

## 26. SEO

TanStack Start should provide server-rendered metadata where appropriate.

**Main page:**
- Title: *SaaS Stack Cost Calculator — StackSum*
- Description: *Build your SaaS stack and see the real monthly and yearly cost.*

Product pages can eventually have product-specific metadata.

**Use:** semantic HTML, proper headings, descriptive metadata, canonical URLs, Open Graph metadata, structured data where appropriate.

Do not sacrifice application performance for unnecessary SEO features.

---

## 27. Accessibility

Use accessible HTML and shadcn primitives where appropriate.

**Requirements:**
- Keyboard navigation
- Visible focus states
- Proper button semantics
- Proper input labels
- Accessible category filters
- Accessible plan selection
- Screen-reader-friendly stack updates
- Sufficient color contrast
- Reduced motion support

Do not use clickable divs when a semantic button/link is appropriate.

---

## 28. Performance Strategy

Performance is a primary requirement.

**Prioritize:**
- Server rendering where useful
- Minimal client-side JavaScript
- Code splitting
- Lazy loading non-critical assets
- Optimized images
- Proper image dimensions
- Avoiding unnecessary dependencies
- Avoiding unnecessary React re-renders
- Memoization only where profiling justifies it

Do not optimize prematurely with complicated architecture.

---

## 29. Image Handling

Product logos are important but small. Use optimized image assets.

**Requirements:** explicit width/height, proper `alt`, appropriate loading strategy, avoid layout shift, prefer modern image formats where supported.

Product logo visual container: **64 × 64px**.

---

## 30. Component Architecture

Recommended structure:

```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── header.tsx
│   │   └── page-container.tsx
│   │
│   ├── hero/
│   │   └── hero.tsx
│   │
│   ├── search/
│   │   └── product-search.tsx
│   │
│   ├── filters/
│   │   └── category-filter.tsx
│   │
│   ├── stack/
│   │   ├── stack-summary.tsx
│   │   ├── stack-item.tsx
│   │   └── stack-total.tsx
│   │
│   └── products/
│       ├── product-grid.tsx
│       ├── product-card.tsx
│       ├── plan-selector.tsx
│       └── product-logo.tsx
│
├── data/
│   ├── products.ts
│   ├── categories.ts
│   └── plans.ts
│
├── lib/
│   ├── pricing.ts
│   ├── search.ts
│   ├── storage.ts
│   └── utils.ts
│
├── stores/
│   └── stack-store.ts
│
├── schemas/
│   ├── product.schema.ts
│   └── plan.schema.ts
│
├── routes/
│   ├── __root.tsx
│   └── index.tsx
│
└── styles/
    └── globals.css
```

Keep the architecture feature-oriented. Do not create a massive generic utility architecture before it is necessary.

---

## 31. State Ownership

Use the simplest state solution appropriate for each piece of data.

| State type | Use for |
|---|---|
| **Local React state** | Input text, open/closed state, temporary UI state, hover state, local plan-selector state |
| **Zustand** | Selected stack, stack mutations, stack persistence |
| **URL state** | Search query if shareable/deep-linkable, category filter if useful for navigation |
| **Server state (TanStack Start / TanStack Query)** | Only when data comes from the server |

Do not put everything into Zustand.

---

## 32. Search and Filtering Architecture

Product filtering should be derived from: catalog + search query + selected category. Do not mutate the original product catalog when filtering.

```
All Products
      ↓
Search
      ↓
Category Filter
      ↓
Visible Products
```

The selected stack is independent from filtering. Changing filters must never remove stack items.

---

## 33. Stack Interaction

Core interaction:

```
Browse product
      ↓
Select product
      ↓
Choose plan
      ↓
Add
      ↓
Stack updates immediately
      ↓
Total updates immediately
      ↓
Continue browsing
```

No required confirmation modal. No "View Stack" requirement. No navigation away from the catalog.

---

## 34. Duplicate Product Behavior

**MVP rule: one selected plan per product.**

If a product is already in the stack:
- Do not create a duplicate entry
- Allow the user to change the selected plan
- Keep the existing product in the stack

Example: changing *ChatGPT Pro* to *ChatGPT Plus* should update the existing stack item, not add a new one.

---

## 35. Stack Sticky Behavior

- **Initial stack:** normal document flow
- **After scrolling:** compact sticky summary

The sticky stack should never become a permanent sidebar. The product catalog should retain its horizontal space. The user should always be able to see subscription count, selected stack context, and monthly total — without clicking "View Stack".

---

## 36. Animation Architecture

Use GSAP in isolated animation hooks/components. Avoid scattering animation logic throughout random JSX.

```
lib/
└── motion/
    ├── stack-motion.ts
    ├── card-motion.ts
    └── page-motion.ts
```

Animations should not control business logic.

| Concern | Owner |
|---|---|
| Business logic | Zustand |
| Visual response | GSAP |

Keep those concerns separate.

---

## 37. Error Handling

The UI should gracefully handle: invalid product data, missing logo, missing price, invalid localStorage, missing plan, product removed from catalog, failed server request, unexpected API response.

Never allow a single malformed product to break the entire catalog.

---

## 38. Loading States

Use loading states only where actual asynchronous work exists. Do not create fake loading animations.

- **Server-loaded data:** skeleton → empty state → error state
- **Local filtering/search:** do not show artificial loading states — search should feel immediate

---

## 39. Empty States

**Initial stack:**
> Your stack
> No subscriptions added yet.
> Add a SaaS product to start calculating your stack.

**Search with no results:**
> No SaaS products found.
> Try another search or category.

Do not make empty states visually overwhelming.

---

## 40. Deployment

**Recommended: Vercel**

The application should be deployable directly from the Git repository.

**Deployment requirements:** production build, type checking, linting, environment variables.

No server should need to be manually configured for the initial application.

---

## 41. Environment Variables

Do not expose secrets to the browser.

**Potential future environment variables:**
```
DATABASE_URL=
```

If external services are added:
```
POSTHOG_API_KEY=
```

Only expose browser-safe values using the framework's public environment mechanism. Never commit `.env` files containing secrets. Provide `.env.example` with variable names only.

---

## 42. Testing

Testing should focus on business-critical behavior.

**Unit tests:** monthly calculation, annual calculation, plan changes, duplicate prevention, stack removal, search, filtering, pricing edge cases.

```
ChatGPT Pro = $20
Cursor Pro = $20
Claude Pro = $20

Monthly = $60
Annual = $720
```

**Integration tests:**
```
Search → choose product → choose plan → add → stack updates → total updates
Add → refresh → stack remains
```

**End-to-end:** use **Playwright** once the application reaches a stable MVP. Critical flows: browse, search, filter, add, change plan, remove, persistence, responsive layout.

Do not build an enormous test suite before the core product is stable.

---

## 43. Linting and Formatting

**Use: ESLint + Prettier.** Code should be automatically formatted.

```json
{
  "dev": "vite dev",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "typecheck": "tsc --noEmit"
}
```

Adapt scripts to the exact TanStack Start setup generated by the current stable tooling.

---

## 44. Git Structure

Use conventional commit-style messages where practical.

```
feat: add product search
feat: add stack calculator
feat: add plan selector
fix: prevent duplicate subscriptions
fix: restore stack from local storage
refactor: simplify product state
style: refine stack summary
```

Keep commits focused.

---

## 45. Dependency Rules

Before installing a new dependency, ask:

1. Does the application actually need it?
2. Does an existing dependency already solve the problem?
3. Does it materially improve UX/performance/maintainability?
4. Is the additional bundle/runtime complexity justified?

Do not install libraries simply because they are popular. The project should remain intentionally lightweight.

---

## 46. Dependencies We Intentionally Do NOT Need

Do not add these unless a concrete requirement appears:

Redux Toolkit · Express · NestJS · Hono · MongoDB/Mongoose · Prisma · Framer Motion · Motion · Anime.js · Three.js · GSAP plugins without a real use case · Axios · Lodash · Moment.js · Elasticsearch · Algolia · Firebase · Supabase · Auth.js · Clerk · Stripe · Redis

The MVP is intentionally simpler than a full SaaS platform.

---

## 47. Recommended Final Stack

| Category | Choice |
|---|---|
| **Core** | TanStack Start, React, TypeScript, pnpm |
| **UI** | Tailwind CSS, shadcn/ui, Lucide React |
| **Animation** | GSAP |
| **State** | Zustand |
| **Validation** | Zod |
| **Search** | Fuse.js |
| **Server/Data** | TanStack Start server functions, PostgreSQL, Drizzle ORM |
| **Server State** | TanStack Query *(use only when remote client-side caching is actually needed)* |
| **Testing** | Vitest, Testing Library, Playwright |
| **Code Quality** | ESLint, Prettier, TypeScript strict mode |
| **Deployment** | Vercel |

---

## 48. MVP Dependency Set

Do not build the entire backend before the product experience is working.

**Initial dependencies (~phase 1–2):**
```
@tanstack/react-start
@tanstack/react-router
react
react-dom
typescript
tailwindcss
zod
zustand
fuse.js
gsap
lucide-react
[shadcn/ui components as needed]
```

**Then add (moving catalog to Postgres):**
```
drizzle-orm
[postgres driver]
```

**Then add (only when server-side client caching becomes useful):**
```
@tanstack/react-query
```

---

## 49. Development Strategy

Build in this order:

### Phase 1 — UI Foundation
TanStack Start, TypeScript, Tailwind, shadcn, design tokens, Roboto, header, hero, search, filters, product cards, stack card. Use static product data.

### Phase 2 — Core Interaction
Product search, category filtering, plan selection, add to stack, remove from stack, change plan, monthly total, annual total. Use Zustand.

### Phase 3 — Persistence
localStorage, Zod validation, stack restoration, corrupted-state recovery.

### Phase 4 — Motion
GSAP: product interactions, stack changes, price changes, sticky stack transition, small entrance animations. Motion should come after the interaction model works.

### Phase 5 — Real Catalog
Move product data into PostgreSQL. Implement products, categories, plans, pricing, pricing sources, verification dates. Use Drizzle.

### Phase 6 — Production Quality
SEO, accessibility, error handling, loading states, performance optimization, testing, analytics if required.

---

## 50. Architecture Principle

StackSum should remain a focused utility. **Do not** turn it into: a subscription management platform, a finance dashboard, a SaaS marketplace, an accounting application, a team management system, an AI recommendation engine, or a billing platform.

The core experience:

```
DISCOVER
   ↓
SELECT PLAN
   ↓
ADD
   ↓
SEE COST
   ↓
CONTINUE BROWSING
```

Everything in the technical architecture should support this loop.

---

## 51. Final Technical Decision

The preferred production architecture:

```
                         StackSum
                            │
                    TanStack Start
                            │
             ┌──────────────┴──────────────┐
             │                             │
          React                         Server
             │                             │
      ┌──────┼──────┐                TanStack Start
      │      │      │                Server Functions
   Tailwind shadcn GSAP                   │
      │      │                            │
      │   Lucide                         Drizzle
      │                                   │
   Zustand                             PostgreSQL
      │
    Zod
      │
   Fuse.js
```

| Layer | Responsibilities |
|---|---|
| **Client-side** | React, Tailwind, shadcn/ui, GSAP, Zustand, Zod, Fuse.js |
| **Server/database** | TanStack Start, Drizzle, PostgreSQL |
| **Deployment** | Vercel |
| **Package manager** | pnpm |
| **Language** | TypeScript |

---

## 52. Non-Negotiable Technical Rules

- Use TanStack Start.
- Use React + TypeScript.
- Use pnpm.
- Use the latest stable versions when starting the project.
- Use Tailwind CSS.
- Use the tokens defined in `Design.md`.
- Use shadcn/ui selectively.
- Use GSAP as the only animation library.
- Use Lucide React for interface icons.
- Use Zustand for shared client state.
- Use Zod for data validation.
- Use Fuse.js for initial product search.
- Use PostgreSQL for persistent catalog data.
- Use Drizzle ORM for PostgreSQL.
- Do not use MongoDB/Mongoose.
- Do not use Express for the initial application.
- Do not use Redux Toolkit.
- Do not use Motion/Framer Motion alongside GSAP.
- Do not add unnecessary dependencies.
- Keep business logic separate from UI animation.
- Keep pricing calculations type-safe and precise.
- Persist the user's stack locally in the MVP.
- Authentication is not required for the core calculator.
- Do not turn the stack into a permanent sidebar.
- Keep the stack visible while browsing.
- Optimize for fast initial load and fast interactions.
- Prefer server rendering/server data loading where appropriate.
- Do not introduce client-side fetching when server loading is sufficient.
- Use semantic HTML and accessible interactions.
- Follow `PRD.md` for product behavior and `Design.md` for visual implementation.
