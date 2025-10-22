export type AdvertisementSourceType = 'fh' | 'advertisement' | 'affiliate';

export type AdvertisementIdType = `${AdvertisementSourceType}-${string}`;

export type PageAdvertisementType = {
  id: AdvertisementIdType;
  title: string;
  content: string;
  cta: {
    url: string;
    text: string;
  };
  type: 'HOME_PAGE' | 'CONTENT_OVERVIEW_PAGE';
};

export type AdvertisementType = {
  TOP_BANNER: {
    id: AdvertisementIdType;
    content: string;
    url: string;
  };
  CONTENT_OVERVIEW_PAGES: {
    [key in ContentOverviewKeyType]?: PageAdvertisementType;
  };
};

const CONTENT_OVERVIEW_KEYS = [
  'frontend-courses-todo-app-react-overview',
  'frontend-courses-todo-app-svelte-overview',
  'frontend-courses-stackpack-overview',
  'frontend-courses-marketing-website-with-zero-cost-cms-overview',
  'frontend-courses-login-register-flow-overview',
  'frontend-courses-dynamic-pricing-page-overview',
  'frontend-courses-ci-cd-with-github-actions-overview',
  'frontend-system-design-dynamic-pricing-page-overview',
  'frontend-refactoring-profile-page-overview',
  'frontend-refactoring-feature-flags-overview',
] as const;

export type ContentOverviewKeyType = (typeof CONTENT_OVERVIEW_KEYS)[number];

const AI_ENGINEERING_AD: PageAdvertisementType = {
  id: 'affiliate-interview-ready-ai-engineering',
  title: 'AI Engineering for Developers',
  content:
    "This is the best time to learn about AI. Good AI fundamentals make you a better developer and a product builder. We recommend you to checkout InterviewReady's AI Engineering course. It is a high-quality resource!",
  cta: {
    url: 'https://interviewready.io/checkout/?_aff=kkhqugif87496',
    text: 'Checkout the course!',
  },
  type: 'CONTENT_OVERVIEW_PAGE',
};

const BOOT_DEV_AD: PageAdvertisementType = {
  id: 'affiliate-boot-dev-backend',
  title: "You're an Engineer, Not Just a Frontend Engineer",
  content:
    'Stop limiting yourself to frontend. Real engineering means understanding the full stack—backend, databases, algorithms, and system design. Boot.dev offers a comprehensive path to become a complete software engineer. Level up beyond the browser!',
  cta: {
    url: 'https://www.boot.dev/?promo=FRONTENDHIRE',
    text: 'Get 25% off Backend Learning',
  },
  type: 'CONTENT_OVERVIEW_PAGE',
};

const getAdvertisementForPage = (
  key: ContentOverviewKeyType,
): PageAdvertisementType => {
  const bootDevPages = [
    'frontend-courses-ci-cd-with-github-actions-overview',
    'frontend-refactoring-profile-page-overview',
    'frontend-refactoring-feature-flags-overview',
  ];

  return bootDevPages.includes(key) ? BOOT_DEV_AD : AI_ENGINEERING_AD;
};

export const ADVERTISEMENTS: AdvertisementType = {
  TOP_BANNER: {
    id: 'fh-astro-cms',
    content: 'Our Astro and Zero-cost CMS course is live now!',
    url: 'https://youtu.be/-3Jl1c1uAjI?si=Ydc9qG423i59r_Ad',
  },
  CONTENT_OVERVIEW_PAGES: Object.fromEntries(
    CONTENT_OVERVIEW_KEYS.map((key) => [key, getAdvertisementForPage(key)]),
  ) as Record<ContentOverviewKeyType, PageAdvertisementType>,
};
