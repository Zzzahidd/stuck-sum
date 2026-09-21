# SaaS Stack Cost Calculator — Product Requirements Document

**Working product name:** StackSum
**Product type:** SaaS subscription stack calculator / browsing utility
**Platform:** Responsive web application
**Document type:** Product Requirements Document
**Status:** MVP specification
**Primary audience:** Developers, designers, freelancers, founders, creators, students, agencies, and small teams using multiple SaaS products

---

# 1. Product Summary

StackSum is a focused web application that allows users to browse SaaS products, choose specific subscription plans, add those subscriptions to a personal software stack, and continuously see how much that stack costs.

The core experience is deliberately simple:

> **Browse → choose a plan → add → see the updated total → continue browsing**

The product is not intended to be a full subscription-management platform, accounting application, procurement system, SaaS marketplace, or financial dashboard.

Its primary purpose is to answer one question:

> **"If I use these SaaS subscriptions, how much will my software stack cost?"**

The application should make that answer immediately visible while the user continues browsing the catalog.

---

# 2. Product Vision

Create the simplest and most pleasant way to build a hypothetical SaaS stack and understand its total subscription cost.

A user should be able to open the website, search for a few products, select their desired plans, and know the total cost within minutes without:

* Creating an account
* Opening multiple pages
* Manually calculating prices
* Using a spreadsheet
* Repeatedly opening a calculator
* Losing their browsing position
* Navigating to a separate stack page

The product should feel like a **subscription basket combined with a SaaS catalog**, not a complicated finance application.

---

# 3. Problem Statement

SaaS products are usually priced independently.

A user may know:

* ChatGPT Pro costs X
* Cursor Pro costs Y
* Claude Pro costs Z
* Figma costs X
* Notion costs Y

But the combined cost is not immediately obvious.

When evaluating a potential software stack, users often have to:

1. Search for each product.
2. Find the appropriate pricing plan.
3. Remember or copy the price.
4. Add the price manually.
5. Repeat for every product.
6. Calculate the monthly total.
7. Calculate the yearly total.

This creates unnecessary cognitive and interaction overhead.

StackSum combines product discovery and calculation into one continuous experience.

---

# 4. Product Goal

The primary product goal is:

> **Allow a user to browse SaaS products and build a subscription stack while continuously seeing the resulting monthly and yearly cost.**

The product should optimize for:

* Speed
* Simplicity
* Clarity
* Low cognitive load
* Continuous feedback
* Easy browsing
* Easy plan selection
* Immediate calculations
* Minimal interruption

---

# 5. Product Success Criteria

The MVP should be considered successful if a new user can:

1. Understand what the application does immediately.
2. Find a SaaS product through search or browsing.
3. Choose a subscription plan.
4. Add that subscription.
5. Immediately see the updated total.
6. Continue browsing without losing their current context.
7. Add multiple subscriptions.
8. See the individual cost of every selected subscription.
9. See the total monthly cost.
10. See the yearly equivalent.
11. Remove a subscription.
12. Change a selected subscription plan.
13. Use the core functionality without signing up.

---

# 6. Target Users

## 6.1 Developers

Examples:

* ChatGPT
* Claude
* Cursor
* GitHub
* Vercel
* Linear

A developer wants to understand the cost of their preferred development and AI stack.

## 6.2 Designers

Examples:

* Figma
* Adobe
* Framer
* Notion
* ChatGPT

A designer wants to understand the monthly cost of their creative toolkit.

## 6.3 Freelancers

Freelancers may use:

* Design tools
* AI tools
* Hosting
* Productivity tools
* Communication tools
* Payment/business software

They want to understand their recurring software overhead.

## 6.4 Founders and indie hackers

They may be evaluating the cost of a potential startup stack before committing to subscriptions.

## 6.5 Students and individual users

A student may want to compare the cost of several tools before deciding which subscriptions fit their budget.

---

# 7. Core User Story

A user wants to calculate the cost of a hypothetical SaaS stack.

They open StackSum.

They search for:

> ChatGPT

They select:

> Pro

They add it.

The stack immediately updates:

> ChatGPT Pro — $200/month
> Total — $200/month

The user continues browsing.

They search for Cursor.

They select:

> Pro

The stack updates:

> ChatGPT Pro — $200/month
> Cursor Pro — $20/month
> Total — $220/month

They continue.

They add Claude Pro.

The stack becomes:

> ChatGPT Pro — $200/month
> Cursor Pro — $20/month
> Claude Pro — $20/month
> Total — $240/month
> Yearly — $2,880

The user never needs to open a separate calculator.

---

# 8. Core Product Principle

## The user should never have to interrupt browsing just to check their total.

This is one of the most important requirements in the entire product.

Do NOT make the core interaction:

> Add → click "View Stack" → open stack → check total → close → continue browsing.

Instead:

> Add → total updates → continue browsing.

The selected stack and current total should remain visible within the main browsing experience.

---

# 9. Primary User Flow

```text
Landing / Catalog
       ↓
Search or browse
       ↓
Find SaaS product
       ↓
Click Add
       ↓
Choose subscription plan
       ↓
Confirm plan
       ↓
Subscription added
       ↓
Stack updates immediately
       ↓
Continue browsing
       ↓
Add another product
       ↓
Stack updates again
```

This loop should remain extremely short.

---

# 10. Main Application Structure

The primary desktop experience should consist of:

1. Navbar
2. Product introduction/context
3. Search
4. Persistent stack summary
5. Category filters
6. SaaS product catalog
7. Product cards
8. Plan-selection interaction

There should not be a permanent sidebar.

There should not be a dedicated stack sidebar consuming the product catalog's horizontal space.

The SaaS product grid should have enough horizontal space to remain the primary browsing surface.

---

# 11. Navbar Requirements

The navbar should remain intentionally simple.

The product currently requires:

* Product logo
* Product name

The navbar does not need to become a dashboard navigation system.

Avoid unnecessary navigation items.

Possible future links may include:

* About
* Methodology
* Pricing sources

These are not required for the MVP.

---

# 12. Search Requirements

Search is a primary product-discovery mechanism.

The user should be able to search SaaS products by:

* Product name
* Company name
* Potentially category

Examples:

```text
ChatGPT
Cursor
Claude
Figma
Notion
Vercel
GitHub
```

Search should update the product catalog quickly.

The search should not modify the user's current stack.

For example:

If the user has:

> ChatGPT + Cursor

in their stack and searches for:

> Figma

the stack must remain unchanged.

Search state and stack state are independent.

---

# 13. Search Behavior

## Empty search

Show the normal catalog.

## Active search

Show matching products.

## No results

Display a clear empty result state.

Example:

> No SaaS products found for "xyz".

Do not make this an error.

Provide an easy way to clear the search.

---

# 14. Filtering

Filtering should remain simple.

Initial categories can include:

* All
* AI
* Design
* Development
* Productivity
* Marketing
* Communication
* Finance
* Other

The exact category taxonomy can evolve.

Filtering is a browsing aid, not a core calculation feature.

Filters must not affect the user's existing stack.

---

# 15. Search + Filter Relationship

Search and filtering should work together.

Example:

User selects:

> AI

Then searches:

> Claude

The catalog should show Claude if Claude belongs to the AI category.

If no product satisfies both conditions, show the no-results state.

Clearing search should preserve the selected category filter.

Clearing the filter should preserve the search query.

A "Clear all" interaction can reset both.

---

# 16. Persistent Stack

The stack is the central product mechanism.

It represents all subscription plans currently selected by the user.

The stack must display:

* Selected product
* Selected plan
* Individual cost
* Remove control
* Subscription count
* Monthly total
* Yearly total

Example:

```text
YOUR STACK

ChatGPT
Pro
$200/month

Cursor
Pro
$20/month

Claude
Pro
$20/month

--------------------

3 subscriptions

$240/month

$2,880/year
```

---

# 17. Stack Placement

The stack must NOT be implemented as a permanent left or right sidebar.

A permanent sidebar would unnecessarily reduce the width available to the product catalog.

The stack should instead exist as a **wide horizontal section within the main page flow**.

The intended information hierarchy is:

```text
Navbar
↓
Product context
↓
Search
↓
Stack summary
↓
Filters
↓
Product catalog
```

The exact visual layout will be defined later in `Design.md`.

---

# 18. Sticky Stack Behavior

The stack should remain available while the user browses.

Recommended behavior:

1. Initially, the stack appears naturally in the main page flow.
2. As the user scrolls and the stack would otherwise leave the viewport, the stack transitions into a compact sticky state.
3. The sticky state remains available while browsing products.
4. The user should not have to manually reopen the stack to see the current total.

The sticky state should not permanently cover large amounts of content.

It should provide enough information to understand:

* Current number of subscriptions
* Current selected products
* Current total

The stack should remain a **wide horizontal element**, not transform into a sidebar.

---

# 19. No "View Stack" Requirement

There should be no primary "View Stack" button required to see the current total.

The stack is already visible.

A secondary interaction for expanding the stack may exist if necessary, but it must not be required to understand the current cost.

The user should not have to click:

> View Stack

just to discover:

> $240/month.

---

# 20. Stack Summary

The persistent compact version should prioritize:

### Primary information

Monthly total.

### Secondary information

Subscription count.

### Supporting information

Selected products.

Example:

```text
3 subscriptions
ChatGPT Pro · Cursor Pro · Claude Pro
$240/month
$2,880/year
```

The implementation should ensure the total remains readable even when many products are selected.

---

# 21. Large Stack Handling

The stack may eventually contain many products.

Do not allow 20+ products to create an enormous permanent horizontal component.

The implementation should support a compact representation.

For example:

```text
12 subscriptions
ChatGPT Pro · Cursor Pro · Claude Pro · +9 more

$348/month
```

The user should still be able to inspect the full stack through an appropriate secondary interaction.

However, this inspection must not replace the persistent total.

---

# 22. Product Catalog

The MVP should include a curated catalog.

Recommended initial size:

**30–50 products.**

The catalog should prioritize recognizable SaaS products.

Example categories:

## AI

* ChatGPT
* Claude
* Gemini
* Perplexity

## Development

* Cursor
* GitHub
* Vercel
* Linear
* GitLab

## Design

* Figma
* Adobe Creative Cloud
* Canva
* Framer

## Productivity

* Notion
* Dropbox
* Evernote

## Communication

* Slack
* Zoom
* Discord

The exact products and pricing must be maintained as structured data.

---

# 23. Product Card Requirements

Each product card should communicate only the information necessary for discovery and selection.

Required information:

* Product logo
* Product name
* Category
* Starting/current pricing information
* Add interaction

Avoid turning cards into detailed product profiles.

The product is primarily a calculator and selection utility, not a SaaS review site.

---

# 24. Product Card States

Each card should support at least these states:

## State 1 — Default

The product is not currently selected.

Available action:

> Add

## State 2 — Plan selection

The user has started the add process.

Available plans are displayed.

## State 3 — Added

A plan has been selected and added.

The card should clearly indicate that the product is already part of the stack.

## State 4 — Changed

The user changes the selected plan.

The stack recalculates immediately.

## State 5 — Removed

The product is no longer part of the stack.

The card returns to the default state.

---

# 25. Adding a Product

The intended interaction is:

```text
Product card
↓
Add
↓
Choose plan
↓
Confirm
↓
Added
```

Do not navigate to another page.

Do not require account creation.

Do not make the user lose their current scroll position.

Do not require a separate calculator interaction.

---

# 26. Plan Selection

Products may contain multiple plans.

Example:

```text
ChatGPT

Go
Plus
Pro
Business
```

The user must select a specific plan before it enters the stack.

The application should not assume the user's desired plan.

---

# 27. Example Plan Interaction

Example product:

```text
ChatGPT

Choose a plan:

Go       $8/month
Plus    $20/month
Pro    $200/month
```

User chooses:

> Pro

Then:

> ChatGPT Pro added.

The stack immediately updates.

---

# 28. Add Confirmation

The product should not require an additional unnecessary confirmation step if selecting a plan already clearly represents the user's decision.

Avoid:

```text
Select Pro
↓
Continue
↓
Are you sure?
↓
Confirm
```

Instead, use:

```text
Select Pro
↓
Add Pro
↓
Added
```

The exact interaction can be optimized in implementation, but unnecessary confirmation dialogs should be avoided.

---

# 29. Changing a Plan

If the user already has:

> ChatGPT Pro

they should be able to change it to:

> ChatGPT Plus

without removing the entire product first.

The calculation must immediately change.

Example:

```text
Before:
ChatGPT Pro — $200/month

After:
ChatGPT Plus — $20/month
```

The stack total must update accordingly.

---

# 30. Removing a Subscription

Every selected subscription must have a clear way to remove it.

Removing:

> Cursor Pro — $20/month

from:

> $240/month

must immediately result in:

> $220/month.

The subscription count must also decrease.

---

# 31. Duplicate Products

The MVP should prevent accidental duplicate products.

If ChatGPT is already in the stack:

* Do not silently add another ChatGPT subscription.
* Instead provide an option to change the selected plan.
* Provide an option to remove it.

Multiple seats or multiple subscriptions for the same product can be considered later.

---

# 32. Calculation Requirements

The calculator must derive its values from structured subscription data.

For every selected subscription:

```text
product
plan
monthly price
annual price if available
currency
billing interval
```

The monthly total is derived from the selected subscriptions.

Example:

```text
200 + 20 + 20 = 240
```

Monthly total:

```text
$240
```

Yearly equivalent:

```text
$240 × 12 = $2,880
```

---

# 33. Do Not Calculate From Display Strings

Do not parse values such as:

```text
"$20 / month"
```

from rendered UI text.

Pricing must remain numeric in application state.

Example:

```text
monthlyPrice: 20
```

The UI formats that number.

This makes the calculation logic deterministic and testable.

---

# 34. Annual Pricing

Some SaaS products may have different monthly and annual pricing.

For example:

```text
Monthly:
$20/month

Annual:
$192/year
```

The data model should support both values.

The application should not automatically assume:

```text
annualPrice = monthlyPrice × 12
```

when actual annual pricing data exists.

If the MVP only supports monthly-equivalent calculation, the application can initially calculate:

```text
monthlyPrice × 12
```

but the data model should not prevent future support for real annual billing prices.

---

# 35. Currency

The initial MVP should preferably use one consistent currency.

Recommended initial approach:

* Store the currency with every price.
* Display one primary currency consistently.
* Avoid building a complex currency-conversion system for the MVP.

Multi-currency support can be added later.

---

# 36. Pricing Accuracy

SaaS pricing changes frequently.

The product should treat pricing as data that can be updated.

Each product/plan should ideally support:

* Pricing source
* Last verified date
* Currency
* Billing interval

The MVP can use manually curated pricing data.

Automatic pricing scraping is not required.

---

# 37. Pricing Sources

The application should eventually maintain a trustworthy source for each price.

Possible source:

* Official product pricing page

Avoid relying exclusively on third-party pricing databases when official information is available.

The source does not need to be shown prominently in the main browsing experience.

A future methodology/source section can explain how pricing is maintained.

---

# 38. Pricing Data Model

Conceptual structure:

```text
Product
├── id
├── name
├── slug
├── company
├── description
├── category
├── logo
└── plans[]

Plan
├── id
├── productId
├── name
├── monthlyPrice
├── annualPrice
├── currency
├── billingInterval
├── source
├── lastVerifiedAt
└── availability
```

The exact database/schema implementation can differ.

The important requirement is separation between product identity and pricing plans.

---

# 39. Application State

At minimum, the application needs these state domains:

## Catalog state

Available SaaS products and plans.

## Search state

Current search query.

## Filter state

Current category filter.

## Stack state

Currently selected subscriptions.

## Derived calculation state

* Subscription count
* Monthly total
* Annual total

Derived totals should preferably be calculated from the stack rather than stored as independent mutable values.

---

# 40. Search State Must Not Affect Stack State

Example:

The user has:

```text
ChatGPT Pro
Cursor Pro
```

They search:

```text
Figma
```

The stack remains:

```text
ChatGPT Pro
Cursor Pro
```

Search is simply changing what the catalog displays.

---

# 41. Filter State Must Not Affect Stack State

If the user selects:

> AI

only the catalog changes.

Existing subscriptions remain untouched.

Changing filters must never remove or alter the stack.

---

# 42. Browser Persistence

Authentication is not required for the MVP.

The current stack should preferably persist across refreshes.

Possible implementation:

* localStorage

IndexedDB is unnecessary unless future requirements justify it.

Example:

```text
User adds:
ChatGPT Pro
Cursor Pro
Claude Pro

Refreshes page.

Stack remains available.
```

If local persistence fails or is unavailable, the product should still function.

---

# 43. Authentication

Authentication is explicitly **not required** for the MVP.

The user should not need:

* Email
* Password
* Google login
* Phone number
* Account

to calculate a stack.

Authentication may be introduced later if cloud-saved stacks or sharing require accounts.

---

# 44. Saved Stacks

Saved cloud stacks are not part of the MVP.

Future functionality could include:

* Save a stack
* Name a stack
* Duplicate a stack
* Share a stack
* Compare stacks

Do not implement this unless explicitly requested.

---

# 45. Shareable Stack

A future version may allow:

```text
stacksum.com/stack/abc123
```

containing:

```text
ChatGPT Pro
Cursor Pro
Claude Pro

$240/month
$2,880/year
```

This is not required for the MVP.

---

# 46. No Unnecessary AI

The product does not need AI to justify its existence.

Do not add:

* AI recommendations
* AI-generated stack suggestions
* AI financial advice
* AI optimization scores
* AI chatbots

unless a future product decision specifically requires them.

The core value is already clear without AI.

---

# 47. No Overbuilt Analytics

The MVP should not become a finance dashboard.

Do not add:

* Spending trends
* Historical charts
* Category spending analytics
* Monthly reports
* Budget tracking
* Financial forecasting

unless explicitly added to the product scope later.

The current product answers:

> What will these subscriptions cost?

That is enough.

---

# 48. No "Savings Recommendation" Engine

Do not automatically tell users:

> Cancel X.

or:

> Replace X with Y.

The application does not know enough about the user's workflow to make those decisions responsibly.

A future version could compare pricing, but the MVP should focus on calculation.

---

# 49. No Team Management in MVP

The MVP should not require:

* Team size
* Seat management
* Employee accounts
* Department allocation
* Admin roles

The initial product represents individual subscription selections.

Team/seat pricing can be added later if necessary.

---

# 50. No Full SaaS Directory

The product may contain many SaaS products, but it should not become a full review platform.

Avoid adding:

* User reviews
* Ratings
* Long editorial pages
* Feature comparisons
* Community comments
* Vendor profiles

These would distract from the core calculator.

---

# 51. Empty State

Initial state:

```text
0 subscriptions
$0/month
$0/year
```

The user should understand that they need to browse and add products.

The empty state should remain lightweight.

---

# 52. No Search Results State

When nothing matches:

```text
No SaaS products found.

Try another search or clear the current filter.
```

Provide a simple way to reset the catalog.

---

# 53. Loading State

If the catalog is loaded asynchronously, show an appropriate loading state.

Avoid making the application appear broken.

The initial implementation can load the catalog locally if appropriate.

---

# 54. Error State

The product should handle:

* Catalog loading failure
* Invalid pricing data
* Missing product data
* Missing plan data
* Unsupported price
* Failed persistence
* Backend failure if a backend is introduced

Errors should be clear and actionable.

Do not silently show an incorrect total.

---

# 55. Data Validation

Pricing data should be validated before use.

Examples:

```text
monthlyPrice must be a valid non-negative number.
annualPrice must be a valid non-negative number when provided.
product name must exist.
plan name must exist.
currency must exist.
```

Invalid data should not break the entire calculator.

---

# 56. Product Catalog Loading

The initial implementation can use a local static dataset.

Example:

```text
products.ts
```

or equivalent structured data.

A backend/database can be introduced later if the product requires dynamic pricing management.

Do not build a complex backend solely because the catalog might eventually grow.

---

# 57. Recommended MVP Architecture

The application should conceptually separate:

```text
Catalog
   ↓
Search / Filter
   ↓
Product Selection
   ↓
Stack State
   ↓
Derived Calculations
   ↓
Persistent Stack Display
```

This separation is important.

The product catalog should not contain calculation logic.

The UI should not contain pricing calculations.

The stack should be the source of truth for selected subscriptions.

---

# 58. Suggested Technical Direction

The project can follow the current application stack:

* TanStack Start
* React
* TypeScript
* Tailwind CSS
* Motion for interaction animation
* pnpm
* Latest stable versions available at implementation time

The exact package versions should be selected during implementation rather than hardcoded into this PRD.

The product should remain compatible with the project's existing conventions.

---

# 59. Animation Requirements

Animations should support usability rather than decoration.

Useful interactions include:

* Product card state transitions
* Plan selection transition
* Add confirmation
* Stack total number transition
* Stack item insertion/removal
* Sticky stack transition
* Filter transitions

Avoid excessive animation.

The product should remain fast and utility-focused.

---

# 60. Responsive Requirements

The MVP must work across:

* Desktop
* Tablet
* Mobile

However, the initial design and implementation priority is the **desktop web experience**.

The mobile experience should be designed later based on the established desktop interaction model.

Do not compromise the desktop UX by forcing desktop and mobile layouts to behave identically.

---

# 61. Desktop Priority

Desktop is the primary MVP design target.

The desktop experience should provide:

* Large product catalog
* Efficient scanning
* Search
* Category filters
* Wide persistent stack
* Multiple products visible simultaneously

The stack must not consume an unnecessary sidebar.

---

# 62. Mobile Future Direction

Mobile is not the immediate design focus.

However, the architecture should not prevent a mobile implementation later.

The stack, catalog, search, filter, and plan-selection logic should be reusable across responsive layouts.

---

# 63. Accessibility Requirements

The MVP should support:

* Semantic HTML
* Keyboard navigation
* Keyboard-accessible product actions
* Keyboard-accessible plan selection
* Accessible labels
* Visible focus states
* Screen-reader-friendly names
* Proper button semantics
* Appropriate form semantics
* Reduced-motion support where applicable

Accessibility should not be treated as a post-launch feature.

---

# 64. Performance Requirements

The application is a utility product, so it should feel fast.

Priorities:

* Fast initial load
* Minimal JavaScript where possible
* Efficient product filtering
* Instant stack calculations
* No unnecessary network requests
* Optimized product logos/assets
* Avoid rendering huge amounts of unnecessary catalog content

The stack calculation itself should be effectively instantaneous.

---

# 65. SEO

SEO is not the primary product goal but may become useful because SaaS products can have search-driven discovery.

Potential future pages:

```text
/tools/saas-cost-calculator
/products/chatgpt
/products/cursor
/products/figma
```

These are not required for the initial MVP.

Do not create SEO pages solely to increase route count.

---

# 66. Product Naming

Current working name:

> StackSum

The name may change.

Do not hardcode the name into business logic.

Product name, metadata, title, and branding should be easy to change from a central configuration or appropriate application metadata.

---

# 67. Reference Products

The product concept was informed by existing SaaS pricing calculators and stack-building tools.

Reference examples:

* Tierdrift SaaS Cost Calculator
* GoPickStack Calculator
* SaaSBinder Pricing Calculator
* StackPricing
* Calwarden SaaS Stack Cost Calculator
* StackCostLab
* Routiq SaaS Calculator

These references are for understanding the category and existing patterns.

StackSum should not directly clone their implementation or user experience.

The product should maintain its own focused interaction model.

---

# 68. Product Differentiation

The main differentiator is **interaction simplicity**.

The product should combine:

```text
SaaS discovery
+
Plan selection
+
Stack building
+
Real-time calculation
```

into one continuous experience.

The user should not feel like they are switching between separate tools.

---

# 69. Critical UX Rules

Codex must preserve these rules unless explicitly instructed otherwise.

### Rule 1

No permanent right-side or left-side stack sidebar.

### Rule 2

The stack must be a wide horizontal component.

### Rule 3

The current stack and total should remain visible while the user browses.

### Rule 4

Do not require a "View Stack" button to see the current total.

### Rule 5

Adding a product must not navigate the user away from the catalog.

### Rule 6

The user must be able to choose a specific plan.

### Rule 7

The total must update immediately after adding/removing/changing a plan.

### Rule 8

Search and filters must not modify the existing stack.

### Rule 9

Do not turn every action into a visually dominant CTA.

### Rule 10

The core experience must remain simple.

---

# 70. Detailed Example

Initial state:

```text
Stack:
0 subscriptions

Monthly:
$0

Yearly:
$0
```

User searches:

```text
ChatGPT
```

Result:

```text
ChatGPT
AI
Multiple plans available
```

User chooses:

```text
Pro
$200/month
```

Stack becomes:

```text
1 subscription

ChatGPT Pro
$200/month

TOTAL
$200/month
$2,400/year
```

User searches:

```text
Cursor
```

Chooses:

```text
Pro
$20/month
```

Stack:

```text
2 subscriptions

ChatGPT Pro
$200/month

Cursor Pro
$20/month

TOTAL
$220/month
$2,640/year
```

User adds Claude:

```text
Claude Pro
$20/month
```

Stack:

```text
3 subscriptions

ChatGPT Pro
$200/month

Cursor Pro
$20/month

Claude Pro
$20/month

TOTAL
$240/month
$2,880/year
```

User removes Cursor.

Stack becomes:

```text
2 subscriptions

ChatGPT Pro
$200/month

Claude Pro
$20/month

TOTAL
$220/month
$2,640/year
```

All calculations happen immediately.

---

# 71. Acceptance Criteria — Catalog

The catalog is complete for MVP when:

* Products can be displayed from structured data.
* Products have categories.
* Products have at least one plan.
* Product logos can be displayed.
* Product names are searchable.
* Products can be filtered by category.
* Search and filters work together.
* Empty search results are handled.

---

# 72. Acceptance Criteria — Plan Selection

Plan selection is complete when:

* A product with multiple plans exposes its plans.
* Each plan displays its relevant price.
* The user can select one plan.
* The selected plan can be added.
* The user remains in the browsing context.
* The selected product reflects its added state.

---

# 73. Acceptance Criteria — Stack

The stack is complete when:

* A selected subscription appears immediately.
* The selected plan is shown.
* The selected price is shown.
* The user can remove the subscription.
* The user can change the plan.
* The stack remains available while browsing.
* The stack does not require a sidebar.
* The stack does not require a "View Stack" button.

---

# 74. Acceptance Criteria — Calculation

The calculator is complete when:

* Monthly total is correct.
* Yearly equivalent is correct.
* Subscription count is correct.
* Adding a subscription updates totals.
* Removing a subscription updates totals.
* Changing a plan updates totals.
* Totals are derived from structured numeric pricing data.
* Invalid pricing cannot silently produce an incorrect total.

---

# 75. Acceptance Criteria — Persistence

If browser persistence is implemented:

* Adding a subscription persists it.
* Refreshing the page restores the stack.
* Removing a subscription persists the removal.
* Changing a plan persists the change.
* Corrupted persistence data does not crash the application.

---

# 76. Acceptance Criteria — Search and Filter

The following must work:

```text
Search → Product results update
Filter → Product results update
Search + Filter → Combined result
Clear Search → Search resets
Clear Filter → Filter resets
Stack → Remains unchanged
```

---

# 77. Acceptance Criteria — No Account

A new user must be able to:

```text
Open site
↓
Search
↓
Select product
↓
Choose plan
↓
Add
↓
See total
```

without authentication.

---

# 78. Testing Requirements

At minimum, test:

## Calculation tests

* One subscription
* Multiple subscriptions
* Zero subscriptions
* Removing subscriptions
* Changing plans
* Annual calculation
* Decimal pricing

## Search tests

* Exact product search
* Partial product search
* Company-name search if supported
* No results
* Clear search

## Filter tests

* Category filter
* Search + filter
* Clearing filters

## Stack tests

* Add
* Remove
* Change plan
* Duplicate prevention
* Persistence

## Edge cases

* Product with one plan
* Product with many plans
* Missing annual price
* Invalid price
* Empty catalog
* Corrupted local storage

---

# 79. Edge Case: Decimal Pricing

The calculator must support prices such as:

```text
$8.99
$19.99
$29.50
```

Do not rely on floating-point arithmetic without considering currency precision.

Use an appropriate numeric strategy for reliable currency calculations.

---

# 80. Edge Case: Free Plans

A product may have:

```text
Free
$0/month
```

The application should support free plans.

A free plan may count as a selected subscription, but the product must clearly represent its $0 cost.

---

# 81. Edge Case: Annual-Only Plans

If a plan is annual-only, the data model should represent that fact.

The application must not incorrectly describe it as a monthly subscription unless a monthly-equivalent calculation is explicitly being displayed.

---

# 82. Edge Case: Pricing Unavailable

If a product's pricing cannot be verified:

Do not invent a price.

The application should show an appropriate unavailable state.

The user should not be able to add an invalid subscription price to the calculator.

---

# 83. Edge Case: Product Discontinued

If a plan becomes unavailable:

* Existing saved local stack data should not crash.
* The product can be marked unavailable.
* The user should be able to remove it.
* The application should avoid presenting discontinued plans as currently purchasable.

---

# 84. Security Considerations

The MVP does not process sensitive financial information.

Still:

* Do not collect unnecessary personal information.
* Do not require payment information.
* Do not store secrets in local storage.
* Validate any server-provided catalog data.
* Sanitize user-generated search input.
* Avoid unsafe HTML rendering.

---

# 85. Privacy

The MVP should minimize data collection.

If the application works without authentication, there is no reason to collect:

* Email
* Phone
* Name
* Payment information

Local stack data can remain in the user's browser.

---

# 86. Analytics

Analytics are optional.

If analytics are eventually added, useful product events could include:

```text
product_search
filter_selected
product_add_started
plan_selected
subscription_added
subscription_removed
plan_changed
stack_created
```

Do not collect unnecessary personal data.

---

# 87. Product Metrics

Useful future metrics:

### Activation

Percentage of visitors who add at least one subscription.

### Stack completion

Average number of subscriptions added per session.

### Calculator engagement

Percentage of users who build a stack.

### Search success

Percentage of searches resulting in a product selection.

### Plan selection success

Percentage of add interactions resulting in a completed subscription addition.

### Retention

For a future account-based version only.

The MVP does not require analytics dashboards.

---

# 88. MVP Feature List

## Required

* SaaS product catalog
* Product logos
* Product categories
* Search
* Category filters
* Product cards
* Plan selection
* Add subscription
* Remove subscription
* Change plan
* Persistent stack
* Monthly total
* Yearly total
* Subscription count
* Local persistence
* Responsive desktop-first implementation
* Accessibility basics
* Error and empty states

## Not required

* Authentication
* User accounts
* Cloud sync
* AI
* Recommendations
* Team management
* Expense tracking
* Billing management
* Reviews
* Ratings
* Complex analytics
* Automatic pricing scraping
* Currency conversion
* Payment processing

---

# 89. Development Phases

## Phase 1 — Foundation

Implement:

* Application shell
* Product data model
* Product catalog
* Plan data
* Basic state management

## Phase 2 — Discovery

Implement:

* Search
* Category filters
* Product cards
* Empty states

## Phase 3 — Stack

Implement:

* Add subscription
* Plan selection
* Remove subscription
* Change plan
* Duplicate prevention

## Phase 4 — Calculation

Implement:

* Monthly total
* Yearly total
* Subscription count
* Currency-safe calculations

## Phase 5 — Persistence

Implement:

* Local storage
* State restoration
* Corrupted-state handling

## Phase 6 — Interaction quality

Implement:

* Product state transitions
* Stack updates
* Sticky stack behavior
* Appropriate motion
* Keyboard behavior
* Accessibility

## Phase 7 — Quality

Implement:

* Tests
* Error states
* Performance optimization
* Responsive behavior
* Production build

---

# 90. Definition of Done

The MVP is ready when a user can:

1. Open StackSum.
2. Browse the SaaS catalog.
3. Search for a product.
4. Filter products.
5. Select a plan.
6. Add it.
7. Immediately see the stack update.
8. Continue scrolling.
9. Add additional products.
10. Continuously see the total.
11. Remove a product.
12. Change a product's plan.
13. See monthly and yearly totals update correctly.
14. Refresh and retain the stack when local persistence is enabled.
15. Complete the entire process without authentication.

The product should feel like one coherent workflow rather than several disconnected features.

---

# 91. Important Implementation Constraint

Do not add features simply because they are common in SaaS applications.

Before adding a feature, ask:

> Does this improve the core experience of building a SaaS subscription stack and understanding its cost?

If the answer is no, leave it out of the MVP.

The product's strength should come from doing one job extremely clearly.

---

# 92. Final Product Definition

StackSum is:

> **A focused SaaS subscription calculator where users browse SaaS products, choose specific plans, add them to a persistent stack, and continuously see the combined monthly and yearly cost while continuing to browse.**

The central interaction is:

> **Find → choose → add → see total → continue browsing.**

Everything else is secondary.

---

# 93. Instruction to Codex

Build this as a focused product utility.

Do not turn it into:

* A generic dashboard
* A SaaS marketplace
* A financial management platform
* A subscription-management platform
* An AI assistant
* A team-management system

Prioritize:

1. Correct product and pricing data.
2. Reliable state management.
3. Accurate calculations.
4. Fast search.
5. Simple filtering.
6. Easy plan selection.
7. Immediate stack updates.
8. Persistent stack visibility.
9. Minimal interruption.
10. Accessibility and performance.

The visual design is intentionally **not specified in this PRD**.

A separate `Design.md` will define:

* Visual language
* Colors
* Typography
* Spacing
* Component styling
* Layout measurements
* Design tokens
* Interaction styling
* Responsive visual behavior
* Animation details

When `Design.md` is provided, treat it as the source of truth for visual implementation while treating this PRD as the source of truth for product behavior and scope.
