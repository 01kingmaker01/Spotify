import tw from "twin.macro";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Spotify from "../img/Spotify.png";

export default function Login({ providers }) {
  return (
    <div tw="bg-black min-h-screen w-full flex flex-col justify-center items-center ">
      <div tw="w-52 mb-5">
        <Image src={Spotify} />
      </div>

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            tw="bg-[#18D860] text-white p-5 rounded-lg"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
