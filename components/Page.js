import React from 'react';
import PropTypes from 'prop-types';
import { useSession, getSession } from 'next-auth/client';
import { Container, Box, Button } from '@material-ui/core';

import Loading from '@components/global/Loading';
import SignIn from '@components/global/SignIn';
import Header from '@components/wrapper/Header';
import Footer from '@components/wrapper/Footer';

const Page = ({ children }) => {
  const [session, loading] = useSession();
  const isLoading = typeof window !== 'undefined' && loading;

  return (
    <Container maxWidth="md">
      <>
        <Box my={3}>
          <Header />
        </Box>
        <Box my={6}>
          {isLoading && <Loading />}
          {session && !isLoading && children}
          {!session && !isLoading && (
            <Box my={3}>
              <SignIn />
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
