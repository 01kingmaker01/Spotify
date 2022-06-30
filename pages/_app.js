import GlobalStyles from "./../styles/GlobalStyles";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  </SessionProvider>
);

export default App;
