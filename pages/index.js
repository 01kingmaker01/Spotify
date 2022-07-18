import { Sidebar } from "../components/Sidebar";
import tw from "twin.macro";
import Center from "../components/Center";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

const Home = () => {
  return (
    <div tw="bg-black h-screen overflow-hidden">
      <main tw="flex ">
        <Sidebar />
        <Center />
      </main>
      <Player />
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
