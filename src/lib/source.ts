import { blog as blogPosts, docs } from '@/.source';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/learn',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const blog = loader(createMDXSource(blogPosts), {
  baseUrl: '/blog',
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.webp'];

  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
