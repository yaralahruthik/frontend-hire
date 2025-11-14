import { ADVERTISEMENTS, ContentOverviewKeyType } from '@/advertisements';
import GFEAdvertisement from '@/features/advertise/gfe-advertisement';
import PageAdvertisement from '@/features/advertise/page-advertisement';
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { getGithubLastEdit } from 'fumadocs-core/content/github';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/learn/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const isQuestionsPage = page.slugs.includes('questions');
  const isOverviewPage = page.slugs.at(-1) === 'overview';
  const advertisementKey = page.slugs.join('-') as ContentOverviewKeyType;
  const time =
    process.env.NODE_ENV === 'production'
      ? await getGithubLastEdit({
          owner: 'yaralahruthik',
          repo: 'frontend-hire',
          path: `content/learn/${page.path}`,
        })
      : null;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={time ? new Date(time) : undefined}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />

        {isOverviewPage && (
          <PageAdvertisement
            advertisement={
              ADVERTISEMENTS.CONTENT_OVERVIEW_PAGES[advertisementKey]
            }
          />
        )}

        {isQuestionsPage && <GFEAdvertisement />}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/learn/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
