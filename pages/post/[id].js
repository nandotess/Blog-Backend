import React from 'react';
import PropTypes from 'prop-types';
import { client } from '../../lib/sanity.server';
import { POST_QUERY, ALL_AUTHORS_QUERY } from '../../lib/sanity.queries';
import Post from '../../components/Post';

const PostPage = ({ id, post, authors }) => {
  return <Post id={id} post={post} authors={authors} />;
};

PostPage.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

export async function getServerSideProps({ params }) {
  const id = params.id || '';
  let post = {};
  const authors = await client.fetch(ALL_AUTHORS_QUERY);

  if (id) {
    post = await client.fetch(POST_QUERY, { id });
  }

  return {
    props: { id, post, authors }
  };
}

export default PostPage;
