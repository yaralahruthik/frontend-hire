import AstroLogoDark from '@/assets/astro-logo-dark.svg';
import AstroLogoLight from '@/assets/astro-logo-light.svg';
import YHRImage from '@/assets/yhr.webp';
import YTComment1 from '@/assets/youtube-comments/1.webp';
import YTComment2 from '@/assets/youtube-comments/2.webp';
import YTComment3 from '@/assets/youtube-comments/3.webp';
import YTComment4 from '@/assets/youtube-comments/4.webp';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const TESTIMONIALS: { name: string; testimonial: React.ReactNode }[] = [
  {
    name: 'Aditya Srivastava',
    testimonial: (
      <span>
        Hruthik has <strong>extensive knowledge</strong> gained through diverse
        experience and <strong>shares it effectively</strong>.
      </span>
    ),
  },
  {
    name: 'Piyush Mahapatra',
    testimonial: (
      <span>
        Hruthik does a{' '}
        <strong>fine job explaining tech topics with ease</strong> and his{' '}
        <strong>passion is contagious</strong>. I would love to attend his
        future sessions as well.
      </span>
    ),
  },
  {
    name: 'Nitan Jana',
    testimonial: (
      <span>
        Learnt a lot about{' '}
        <strong>design principles, tools, and inspirations</strong>. 45 minutes
        became a <strong>2+ hour session but we didn’t even notice</strong>.
        Thanks for all the knowledge.
      </span>
    ),
  },
  {
    name: 'Kirtesh Bansal',
    testimonial: (
      <span>
        The session was <strong>incredibly insightful and engaging</strong>! I
        especially appreciated the <strong>depth of knowledge shared</strong>{' '}
        and the interactive approach. Definitely a{' '}
        <strong>valuable experience</strong>!
      </span>
    ),
  },
  {
    name: 'Shivam Kaushal',
    testimonial: (
      <span>
        It was a <strong>very informative session</strong> with Hruthik —
        learned a lot! These open house sessions are really good for discussing
        what’s going on in the market and{' '}
        <strong>catching up with the trends</strong>.
      </span>
    ),
  },
  {
    name: 'Vinayak Hegde',
    testimonial: (
      <span>
        Got a <strong>good understanding</strong> of the tools and steps needed
        to create a personal website and how it helps in attracting new
        opportunities. I especially liked the focus on{' '}
        <strong>using your own domain</strong>. It not only looks more
        professional but also shows you have the
        <strong> technical skills to manage your online presence</strong>. The
        session was <strong>insightful, as always</strong>.
      </span>
    ),
  },
  {
    name: 'Boreddy Pranay Reddy',
    testimonial: (
      <span>
        I had the pleasure of joining his open house, and it was a{' '}
        <strong>fantastic experience</strong>! He kept the session{' '}
        <strong>highly interactive</strong>, covering a wide range of topics,
        from web trends to job opportunities and networking. He was{' '}
        <strong>incredibly patient</strong> throughout, and I genuinely enjoyed
        talking to him. His <strong>passion for sharing knowledge</strong> was
        evident — I left feeling both informed and inspired.{' '}
        <strong>Highly recommend!</strong>
      </span>
    ),
  },
  {
    name: 'Gaurav Kumar',
    testimonial: (
      <span>
        I loved how <strong>genuine</strong> Hruthik was. The session was{' '}
        <strong>extremely helpful</strong> and I got all my questions answered
        in detail. <strong>Very valuable!</strong>
      </span>
    ),
  },
  {
    name: 'Ajay Sharma',
    testimonial: (
      <span>
        Hruthik was <strong>very friendly</strong> and solved all my queries
        related to freelancing and projects. He is the{' '}
        <strong>perfect person to guide someone</strong>. Thanks Hruthik!
      </span>
    ),
  },
  {
    name: 'Garima Pandey',
    testimonial: (
      <span>
        He <strong>explained so well</strong> and introduced a lot of{' '}
        <strong>useful resources</strong> that will help me further with
        interviews!
      </span>
    ),
  },
  {
    name: 'Vinayak',
    testimonial: (
      <span>
        Loved the explanations — at regular intervals he{' '}
        <strong>emphasised on common mistakes</strong> and what to do instead.
        He also <strong>documented everything beautifully</strong> so we can
        revisit it later.
      </span>
    ),
  },
  {
    name: 'Himanshu Shekhar',
    testimonial: (
      <span>
        <strong>Informative</strong>. I liked how he explained with{' '}
        <strong>clarity</strong> and kept checking for doubts from time to time.
      </span>
    ),
  },
  {
    name: 'Ope',
    testimonial: (
      <span>
        This session was <strong>very helpful and insightful</strong>. He
        explained things like he was talking to a beginner — it made me{' '}
        <strong>understand everything clearly</strong>. Thank you for being so
        friendly!
      </span>
    ),
  },
  {
    name: 'Mainak Mukherjee',
    testimonial: (
      <span>
        Hruthik is truly an <strong>amazing mentor</strong> and so damn helpful.
        He literally <strong>taught me how to set up a proper project</strong>,
        guided me through conventions, and made me apply them. The 45-minute
        interview turned into{' '}
        <strong>1 hour 40 minutes of deep learning</strong>! It was an{' '}
        <strong>incredible experience</strong>.
      </span>
    ),
  },
  {
    name: 'Rajdeep Gupta',
    testimonial: (
      <span>
        I was truly impressed by the{' '}
        <strong>abundance of valuable feedback</strong>,
        <strong>insightful approaches</strong>, and{' '}
        <strong>engaging discussions</strong>. He provided{' '}
        <strong>concise and actionable takeaways</strong>. I{' '}
        <strong>highly recommend</strong> this experience!
      </span>
    ),
  },
];

function SupportUsButton() {
  return (
    <Link
      href="https://www.buymeacoffee.com/iamyhr"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mx-auto inline-block w-fit cursor-pointer rounded-full bg-slate-800 p-px text-xs font-semibold text-white no-underline shadow-2xl shadow-zinc-900"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-1 ring-1 ring-white/10">
        <span>Support Us</span>
        <svg
          fill="none"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </Link>
  );
}

function HeroSection() {
  return (
    <section className="flex h-[calc(100svh-3.5rem)] flex-col items-center justify-center gap-10 px-4 text-center">
      <div className="flex flex-col gap-3">
        <SupportUsButton />
        <h1 className="text-3xl font-black sm:text-4xl">
          100% Free & Open-Source Learning Platform for Frontend Developers
        </h1>
        <h2 className="text-muted-foreground text-lg font-semibold sm:text-xl">
          Work on practical projects and get hired — or build your own product.
        </h2>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          className={buttonVariants({ color: 'secondary' })}
          href="https://discord.gg/DWAVqksVtx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Discord Community
        </Link>
        <Link
          className={buttonVariants({ color: 'primary' })}
          href="/learn/frontend"
        >
          Learn Now
        </Link>
      </div>
      <SocialProof />
    </section>
  );
}

function SocialProof() {
  return (
    <section className="px-2 py-10">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-fd-muted-foreground font-semibold">Featured On</h3>
        <div className="grid items-center gap-8 opacity-60">
          <Image
            src={AstroLogoLight}
            className="hidden h-10 dark:inline"
            alt="Astro"
          />
          <Image
            src={AstroLogoDark}
            className="inline h-10 dark:hidden"
            alt="Astro"
          />
        </div>
      </div>
    </section>
  );
}

function TesimonialSection() {
  return (
    <section className="px-6 py-16">
      <h2 className="mb-10 text-center text-2xl font-bold">
        Who is building Frontend Hire?
      </h2>

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-muted-foreground">
            Hey, I’m Hruthik, I’m currently a founding engineer at{' '}
            <a
              target="_blank"
              className="underline"
              href="https://digiusher.com/"
            >
              DigiUsher
            </a>
            .
          </p>
          <p className="text-muted-foreground">
            I’m not the most skilled developer out there but I’ve learned that
            consistent practice, curiosity, and sharing what you learn can take
            you incredibly far. That’s what I aim to bring to Frontend Hire:
            clear guidance, hands-on projects, and the motivation to keep going.
          </p>
          <p className="text-fd-muted-foreground font-semibold">– YHR</p>
        </div>
        <Image
          src={YHRImage}
          alt="Hruthik Yadav"
          className="size-40 rounded-xl shadow-md"
        />
      </div>

      <h2 className="mt-20 mb-10 text-center text-2xl font-bold">
        People say nice things about me
      </h2>
      <div className="mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-fd-card break-inside-avoid rounded-md border p-4 shadow-lg transition hover:scale-[1.02]"
          >
            <p className="text-fd-muted-foreground text-sm leading-relaxed">
              {t.testimonial}
            </p>
            <p className="text-fd-foreground mt-3 text-sm font-semibold">
              — {t.name}
            </p>
          </div>
        ))}
      </div>

      <h3 className="mt-20 mb-8 text-center text-xl font-semibold">
        More kind words from YouTube
      </h3>
      <div className="mx-auto mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
        {[YTComment1, YTComment2, YTComment3, YTComment4].map((img, idx) => (
          <div key={idx} className="break-inside-avoid">
            <Image
              src={img}
              alt={`YouTube comment ${idx + 1}`}
              className="w-full rounded-md border transition hover:scale-[1.02] hover:shadow-xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="container mx-auto flex grow flex-col">
      <HeroSection />

      <TesimonialSection />
    </main>
  );
}
