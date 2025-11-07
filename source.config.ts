import { AUTHORS } from '@/authors';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

const authorEnum = z.enum(Object.keys(AUTHORS) as [keyof typeof AUTHORS]);

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/learn',
  meta: {
    schema: metaSchema.extend({
      isNew: z.boolean().optional(),
    }),
  },
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      author: authorEnum,
      date: z.string().date().or(z.date()).optional(),
      category: z.enum(['open-house']).optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
