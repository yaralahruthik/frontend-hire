import { blog } from '@/lib/source';
import Link from 'next/link';

export default function Page() {
  const openHousePosts = [...blog.getPages()]
    .filter((post) => post.data.category === 'open-house')
    .sort(
      (a, b) =>
        new Date(b.data.date ?? b.file.name).getTime() -
        new Date(a.data.date ?? a.file.name).getTime(),
    );

  return (
    <main className="container max-sm:px-0 md:py-12">
      <div className="p-8">
        <h1 className="border-fd-foreground mb-4 border-b-4 pb-2 text-4xl font-bold md:text-5xl">
          Open Houses
        </h1>
        <p className="text-sm md:text-base">
          Free, informal community calls to discuss frontend development,
          connect with others, and learn together.
        </p>
      </div>

      <div className="bg-fd-card mx-4 mb-8 rounded-lg border p-6 md:mx-8">
        <h2 className="mb-3 text-2xl font-semibold">Upcoming Open House</h2>
        <p className="text-fd-muted-foreground mb-4 text-sm">
          Join us for our next open house session. Ask questions, share
          experiences, and connect with the community.
        </p>
        <a
          href="https://cal.com/iamyhr/open-house-frontend-hire"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 inline-block rounded-md px-6 py-2 text-sm font-medium transition-colors"
        >
          Schedule a Session
        </a>
      </div>

      <div className="px-8 pb-8">
        <h2 className="mb-4 text-2xl font-semibold">Past Open Houses</h2>
      </div>
      <div className="grid grid-cols-1 border md:grid-cols-3 lg:grid-cols-4">
        {openHousePosts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="bg-fd-card hover:bg-fd-accent hover:text-fd-accent-foreground flex flex-col p-4 transition-colors"
          >
            <p className="font-medium">{post.data.title}</p>
            <p className="text-fd-muted-foreground text-sm">
              {post.data.description}
            </p>

            <p className="text-fd-muted-foreground mt-auto pt-4 text-xs">
              {new Date(post.data.date ?? post.file.name).toDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
