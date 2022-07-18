import GlobalStyles from "./../styles/GlobalStyles";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

console.warn(
  "Hey Visitor 🙋‍♂️ .\n\n",
  "To use this clone you need a Spotify Premium Account.\n\n",
  "Without Premium Account, App will not function properly & will display error here in console\n",
  "For Any Suggestions :- "
);

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  </SessionProvider>
);

export default App;
