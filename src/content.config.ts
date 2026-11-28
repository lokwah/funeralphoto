import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 實用指南：每篇文章一個 .md 檔（src/content/guide/）
// draft: true = 未寫好，網站會顯示但唔俾搜尋器收錄（noindex、唔入 sitemap）
const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    related: z.array(z.object({ href: z.string(), label: z.string() })).default([]),
  }),
});

export const collections = { guide };
