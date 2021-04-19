import React from 'react';
import Link from 'next/link';
import { Grid, Typography, Button } from '@material-ui/core';
import { signOut, useSession, getSession } from 'next-auth/client';

export default function Header() {
  const [session] = useSession();

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={6}>
        <Link href="/" passHref={true}>
          <Typography variant="h2" component="h1">
            Blog
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right' }}>
        {session && (
          <>
            {/* <Typography component="p">
              Signed in as {session.user.email}
            </Typography> */}
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  };
}
