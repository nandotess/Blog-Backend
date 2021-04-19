import { groq } from 'next-sanity';

export const ALL_POSTS_QUERY = groq`*[_type == "post"]{
  _id,
  title,
  "author": *[ _type == "author" && _id == ^.author ][0],
  mainImage,
  publishedAt,
} | order(publishedAt desc)`;

export const POST_QUERY = groq`*[_type == "post" && _id == $id][0]{
  _id,
  title,
  "author": *[ _type == "author" && _id == ^.author ][0],
  mainImage,
  publishedAt,
  body,
}`;

export const ALL_AUTHORS_QUERY = groq`*[_type == "author"]{
  _id,
  displayName,
  username,
} | order(displayName asc)`;
