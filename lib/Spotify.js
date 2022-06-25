import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
];
//"user-library-modify",

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  // redirectUri: process.env.
});

var state = Math.random().toString(36).substring(2);
const LOGIN_URL = spotifyApi.createAuthorizeURL(scopes, state);

export default spotifyApi;

export { LOGIN_URL };
