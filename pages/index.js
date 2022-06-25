import { Sidebar } from '../components/Sidebar'
import tw from 'twin.macro'
import Center from '../components/Center'

const Home = () => {
  return (
    <div tw="bg-black h-screen overflow-hidden">
      {/* <h1>A Spotify Clone by Ketan Chavan</h1> */}
      <main tw="flex">
        <Sidebar />
        <Center />
      </main>
      <div>{/* <footer>Player</footer> */}</div>
    </div>
  )
}

export default Home
