import React from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';

export default function HeadMetatags({ title, description, noindex = true }) {
  return (
    <React.Fragment>
      <NextSeo
        noindex={noindex}
        nofollow={noindex}
        title={title}
        description={description}
      />
    </React.Fragment>
  );
}

HeadMetatags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
