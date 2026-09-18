import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.merenipr.cz',
  // stránky se generují jako /nazev-stranky.html → adresy zůstanou stejné jako na starém webu (bez lomítka na konci)
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [sitemap()],
});
