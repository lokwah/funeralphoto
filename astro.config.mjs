// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// 草稿指南文章（frontmatter 有 draft: true）唔放入 sitemap
const guideDir = new URL('./src/content/guide/', import.meta.url);
const draftPaths = readdirSync(guideDir)
  .filter((f) => f.endsWith('.md') && /^draft:\s*true\s*$/m.test(readFileSync(new URL(f, guideDir), 'utf8')))
  .map((f) => `/guide/${f.replace(/\.md$/, '')}/`);

export default defineConfig({
  site: 'https://www.funeralphoto.com.hk',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !draftPaths.some((p) => page.endsWith(p)),
      lastmod: new Date(),
    }),
  ],
});
