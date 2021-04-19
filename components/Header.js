import React from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';

export default function Header() {
  return (
    <React.Fragment>
      <Link href="/" passHref={true}>
        <Typography variant="h2" component="h1">
          Blog
        </Typography>
      </Link>
    </React.Fragment>
  );
}
