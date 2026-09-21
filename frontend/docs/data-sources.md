# Catalog data sources

StackSum keeps display prices in its own Postgres catalog. That means the calculator never depends on a third-party API during a user interaction, and prices can be reviewed before publication.

## Refresh sources

- **AICostBook**: `https://aicostbook.com/developers` provides free, versioned JSON endpoints for AI model pricing, API token rates, subscription pricing, and price-change events. It is the preferred enrichment source for AI plans.
- **ComparEdge Open Data**: `https://comparedge.com/open-data` provides no-key SaaS pricing data and catalog exports. Use it to discover vendors, then verify every imported plan against the vendor's pricing page.
- **Hacker News API**: `https://github.com/HackerNews/API` is a free official source for technology news and can power a future, non-core news surface without a key.

Each imported price must retain its official vendor pricing URL, source type, and last verification date. The core calculator deliberately uses the reviewed database catalog rather than rendering unverified live results.
