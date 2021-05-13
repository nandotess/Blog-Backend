import React from 'react';
import { Typography } from '@material-ui/core';

import HeadMetatags from '@components/wrapper/HeadMetatags';

const NotFoundPage = () => {
  const title = 'Page not found';
  const description = title;

  return (
    <React.Fragment>
      <HeadMetatags title={title} description={description} />
      <Typography variant="h3" component="h2">
        {title}
      </Typography>
    </React.Fragment>
  );
};

export default NotFoundPage;
