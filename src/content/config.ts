import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default(''),
    image: z.string().optional().default(''),
    // Transform string to Date object
    published: z.coerce.date(),
    updated: z.coerce.date().optional()
  })
});

export const collections = { posts };
