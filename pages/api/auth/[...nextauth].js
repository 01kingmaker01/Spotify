import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/Spotify";

const refreshAccessTokenFun = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, //1hr as 3600r return from Spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (e) {
    console.table(e);
    console.log({ error: "refreshAccessTokenError" });
    return {
      ...token,
      error: "refreshAccessTokenError",
    };
  } finally {
    console.log(`Refreshed Token is `);
    console.log(refreshedToken.message);
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //Initial login
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //handling expiry time in milli Second hence *1000
        };
      }

      //Return previous token if token is not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log("Existing Access Token is Valid");
        return token;
      }

      //Access Token is expired
      console.log("Access Token Expired, Refreshing...");
      return await refreshAccessTokenFun(token);
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
