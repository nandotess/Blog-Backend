import React from 'react';
import { signIn } from 'next-auth/client';
import { Button } from '@material-ui/core';

import HeadMetatags from '@components/wrapper/HeadMetatags';

export default function SignIn() {
  const title = 'CMS';
  const description = title;

  return (
    <React.Fragment>
      <HeadMetatags title={title} description={description} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => signIn()}>
        Sign in
      </Button>
    </React.Fragment>
  );
}
