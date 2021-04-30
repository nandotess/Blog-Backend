import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Button, Typography } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import { signIn, useSession, getSession } from 'next-auth/client';

const Page = ({ children }) => {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <>
        <Box my={3}>
          <Header />
        </Box>
        <Box my={6}>
          {session && children}
          {!session && (
            <Box my={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => signIn()}>
                Sign in
              </Button>
            </Box>
          )}
        </Box>
        <Box my={3}>
          <Footer />
        </Box>
      </>
    </Container>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  };
}

Page.propTypes = {
  children: PropTypes.any
};

export default Page;
