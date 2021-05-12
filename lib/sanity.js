import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook
} from 'next-sanity';

import { sanityConfig } from '@lib/sanity.config';

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source) => imageBuilder.image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(
  sanityConfig
);
