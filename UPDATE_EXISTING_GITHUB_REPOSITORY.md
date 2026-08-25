# Updating the Existing Tech Repository

This package replaces the source in your existing Tech GitHub repository. Copy all package contents to the repository root, including hidden `.github/workflows/deploy-pages.yml`, `client/`, `scripts/`, `package.json`, `pnpm-lock.yaml`, and `patches/`.

Before pushing, update `client/src/data/site.ts` with a real monitored public email. Confirm the repository Actions variables contain the current Learn and Tech URLs. After the workflow succeeds, verify `/news`, `/privacy`, `/sitemap.xml`, and `/robots.txt` directly on `tech.mibekpandey.com.np`.
