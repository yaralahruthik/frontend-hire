import { PageAdvertisementType } from '@/advertisements';
import PageAdvertisement from './page-advertisement';

const GFE_AD: PageAdvertisementType = {
  id: 'affiliate-great-frontend',
  title: 'GreatFrontEnd has better questions!',
  content:
    "We don't create questions because GreatFrontEnd already has the best possible library of questions and we recommend the same to our community.",
  cta: {
    url: 'https://www.greatfrontend.com/prepare/coding?fpr=frontendhire',
    text: 'Checkout the questions!',
  },
  type: 'CONTENT_OVERVIEW_PAGE',
};

export default function GFEAdvertisement() {
  return <PageAdvertisement advertisement={GFE_AD} />;
}
