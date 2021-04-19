import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { client } from '../../../lib/sanity.server';
import { AUTHOR_QUERY } from '../../../lib/sanity.queries';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'google' && profile.verified_email === true) {
        const username = profile.email;
        const user = await client.fetch(AUTHOR_QUERY, { username });
        return user._id ? true : false;
      } else {
        return false;
      }
    }
  }
});
