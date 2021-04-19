import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook
} from 'next-sanity';
// import { useNextSanityImage } from 'next-sanity-image';
// import { client } from './sanity.server';
import { sanityConfig } from './config';

export const imageBuilder = createImageUrlBuilder(sanityConfig);
export const urlForImage = (source) => imageBuilder.image(source);

// export const urlForImage = (source) => useNextSanityImage(client, source);

export const usePreviewSubscription = createPreviewSubscriptionHook(
  sanityConfig
);
