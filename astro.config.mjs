import { defineConfig } from 'astro/config';

// For GitHub Pages: set BASE_PATH to "/<repo-name>/" (the deploy workflow does this
// automatically). Locally it stays "/" so dev + preview work without extra config.
const base = process.env.BASE_PATH || '/';

// Replace with the real Pages URL once the repo name is known, e.g.
// https://majoarevalo.github.io
const site = process.env.SITE_URL || 'https://example.github.io';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  image: {
    // sharp ships with Astro; generate modern formats at build time.
    responsiveStyles: true,
  },
});
