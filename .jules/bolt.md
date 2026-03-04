## 2024-05-15 - Exploring Pedro Pathing Plus Documentation
**Learning:** This is an Astro Starlight project used to generate docs. I shouldn't optimize the documentation itself deeply, but there might be low-hanging fruit in the components.

## 2024-05-15 - Optimizing SSG JS Bundle Sizes & Deterministic Builds
**Learning:** Using `define:vars` in Astro components alongside random IDs (`Math.random()`) is a huge performance trap. It forces Astro to inline the exact same JavaScript on every single generated page, ballooning the HTML payload. It also breaks build determinism, meaning HTTP and CDN caches are unnecessarily busted on every deployment.
**Action:** Always prefer native Web Components (`customElements.define`) over inlined scripts with random IDs in Astro components. Pass data using HTML `data-*` attributes. This enables global JS bundling, caching, and deterministic HTML generation.
