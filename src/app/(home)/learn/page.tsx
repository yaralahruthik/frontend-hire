import Link from 'next/link';
import { Code, Laptop, Brain, Wrench } from 'lucide-react';

const learningRoutes = [
  {
    title: 'Frontend',
    description: 'Learn frontend skills',
    url: '/learn/frontend',
    icon: Code,
    available: true,
  },
  {
    title: 'Software Engineering Fundamentals',
    description: 'Irrespective of frontend or backend, you need to learn these',
    url: '/learn/software-engineering-fundamentals',
    icon: Laptop,
    available: false,
  },
  {
    title: 'Applied AI',
    description: 'Learn Applied AI Skills',
    url: '/learn/ai',
    icon: Brain,
    available: false,
  },
  {
    title: 'Product',
    description: 'Learn product skills',
    url: '/learn/product',
    icon: Wrench,
    available: false,
  },
];

export default function LearnPage() {
  return (
    <main className="container py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Learning Routes</h1>
        <p className="mb-12 text-fd-muted-foreground">
          Choose a learning path to get started on your journey.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {learningRoutes.map((route) => {
            const Icon = route.icon;
            const CardComponent = route.available ? Link : 'div';

            return (
              <CardComponent
                key={route.url}
                href={route.available ? route.url : undefined}
                className={`group relative rounded-lg border bg-fd-card p-6 transition-colors ${
                  route.available
                    ? 'hover:border-fd-primary cursor-pointer'
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`rounded-md p-2 ${
                      route.available
                        ? 'bg-fd-primary/10 text-fd-primary'
                        : 'bg-fd-muted text-fd-muted-foreground'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold">{route.title}</h2>
                </div>
                <p className="text-sm text-fd-muted-foreground">
                  {route.description}
                </p>
                {!route.available && (
                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-full bg-fd-muted px-3 py-1 text-xs font-medium text-fd-muted-foreground">
                      Work in Progress
                    </span>
                  </div>
                )}
              </CardComponent>
            );
          })}
        </div>
      </div>
    </main>
  );
}
