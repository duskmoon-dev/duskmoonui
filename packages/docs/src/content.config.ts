import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docsCollection = defineCollection({
  loader: glob({
    base: './src/content/docs',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'getting-started',
      'components',
      'css-art',
      'design-system',
      'theming',
      'guides',
      'api',
      'layout',
    ]),
    order: z.number().optional(),
    published: z.boolean().default(true),
    lastUpdated: z.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};
