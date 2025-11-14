import { blog } from '@/lib/source';
import { PathUtils } from 'fumadocs-core/source';
import Link from 'next/link';

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export default function Page(): React.ReactElement {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? getName(b.path)).getTime() -
      new Date(a.data.date ?? getName(a.path)).getTime(),
  );

  return (
    <main className="container max-sm:px-0 md:py-12">
      <div className="p-8">
        <h1 className="border-fd-foreground mb-4 border-b-4 pb-2 text-4xl font-bold md:text-5xl">
          Frontend Hire Blog
        </h1>
        <p className="text-sm md:text-base">
          All the articles on this platform.
        </p>
      </div>
      <div className="grid grid-cols-1 border md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
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
              {new Date(post.data.date ?? getName(post.path)).toDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
