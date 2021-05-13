import React from 'react';
import PropTypes from 'prop-types';

import { client } from '@lib/sanity.server';
import { ALL_POSTS_QUERY } from '@lib/sanity.queries';

import HeadMetatags from '@components/wrapper/HeadMetatags';
import Posts from '@components/Posts';

const IndexPage = ({ posts }) => {
  const title = 'Posts';
  const description = title;

  return (
    <React.Fragment>
      <HeadMetatags title={title} description={description} />
      <Posts posts={posts} />
    </React.Fragment>
  );
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
