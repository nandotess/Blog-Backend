import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Footer() {
  return (
    <React.Fragment>
      <Typography gutterBottom={true}>
        Built with ♥ by Fernando Tessmann
      </Typography>
      <Typography>
        <Link href="https://github.com/nandotess/blog" target="_blank">
          Source Code
        </Link>
      </Typography>
    </React.Fragment>
  );
}
