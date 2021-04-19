import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';

export default function Page({ children }) {
  return (
    <Container maxWidth="md">
      <Box my={3}>
        <Header />
      </Box>
      <Box my={6}>{children}</Box>
      <Box my={3}>
        <Footer />
      </Box>
    </Container>
  );
}

Page.propTypes = {
  children: PropTypes.any
};
