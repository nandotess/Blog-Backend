import { createClient } from 'next-sanity';
import { sanityConfig } from './config';
import sanityClient from '@sanity/client';

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
