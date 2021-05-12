import React from 'react';
import PropTypes from 'prop-types';

import { client } from '@lib/sanity.server';
import { ALL_POSTS_QUERY } from '@lib/sanity.queries';

import Posts from '@components/Posts';

const IndexPage = ({ posts }) => {
  return <Posts posts={posts} />;
};

IndexPage.propTypes = {
  posts: PropTypes.array.isRequired
};

export async function getServerSideProps({ params }) {
  const posts = await client.fetch(ALL_POSTS_QUERY);

  if (!posts) {
    return {
      notFound: true
    };
  }

  return {
    props: { posts }
  };
}

export default IndexPage;
