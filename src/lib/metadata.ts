import { Page } from 'fumadocs-core/source';
import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://www.frontendhire.com/',
      images: '/banner.png',
      siteName: 'Frontend Hire',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@thisisyhr',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/banner.png',
      ...override.twitter,
    },
  };
}

export function getPageImage(page: Page) {
  const segments = [...page.slugs, 'image.webp'];

  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' || !process.env.URL
    ? new URL('http://localhost:3000')
    : new URL(process.env.URL);
