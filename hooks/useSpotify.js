import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
  // redirectUri: process.env.NEXT_PUBLIC_
});

function useSpotify() {
  const { data: sessionData, status } = useSession();
  useEffect(() => {
    if (sessionData) {
      if (sessionData?.error === "RefreshAccessTokenError ") {
        return signIn();
      }
      spotifyApi.setAccessToken(sessionData.user.accessToken);

      //   const e = spotifyApi.getMe().then((a) => console.log(a));
      //   console.log(e);
    }
  }, [sessionData]);

  return spotifyApi;
}
export default useSpotify;
