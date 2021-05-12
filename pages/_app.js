import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'next-auth/client';
import NProgress from 'nprogress';
import { GoogleFonts } from 'next-google-fonts';
import Router from 'next/router';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';

import Page from '@components/Page';

import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GoogleFonts
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        key="fonts"
      />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="48x48"
          href="/favicon.ico"
          key="favicon48"
        />
      </Head>
      <CssBaseline />
      <Provider session={pageProps.session}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Provider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object
};
