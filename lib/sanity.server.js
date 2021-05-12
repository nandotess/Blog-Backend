/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient } from 'next-sanity';
import sanityClient from '@sanity/client';

import { sanityConfig } from '@lib/sanity.config';

export const client = createClient(sanityConfig);

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false
});

export const getClient = (preview) => (preview ? previewClient : client);

export const clientApi = sanityClient({
  ...sanityConfig,
  apiVersion: '2021-04-19' // use current UTC date
});
