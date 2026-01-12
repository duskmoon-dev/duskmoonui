import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'getting-started',
      'components',
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
