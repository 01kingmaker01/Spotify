import GlobalStyles from './../styles/GlobalStyles'
import { SessionProvider } from 'next-auth/react'

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <GlobalStyles />
    <Component {...pageProps} />
  </SessionProvider>
)

export default App
