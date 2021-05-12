import React from 'react';
import Link from 'next/link';
import { signOut, useSession, getSession } from 'next-auth/client';
import { Grid, Typography, Button } from '@material-ui/core';

export default function Header() {
  const [session, loading] = useSession();
  const isLoading = typeof window !== 'undefined' && loading;

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
        {session && !isLoading && (
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
