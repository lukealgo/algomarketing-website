// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  site: 'https://algomarketing.co.uk',
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss(), yaml()]
  }
});