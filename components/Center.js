import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import tw, { styled } from "twin.macro";
import User from "../img/user.png";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../Recoil/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const Container = tw.div`flex-grow relative text-white h-screen overflow-y-scroll scrollbar-hide`;

const Header = tw.header`absolute top-5 right-5 p-1 pr-2 space-x-3 flex items-center bg-black opacity-90 hover:opacity-80 cursor-pointer rounded-full`;
const UserImg = tw.img`rounded-full w-6 h-6`;

const Section = styled.section`
  ${tw`flex items-end space-x-7  p-8 h-80 max-h-72`}
`;

const PlaylistName = tw.h1`text-2xl md:text-3xl xl:text-5xl font-bold `;

const Center = () => {
  const spotifyApi = useSpotify();
  const { data: sessionData } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const getColor = () => `hsl(${360 * Math.random()}, 100%, 50%)`;
  //   const getColor = () =>
  //     `hsl(${360 * Math.random()}, ${25 + 70 * Math.random()}%, ${
  //       75 + 10 * Math.random()
  //     }%)`;

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setColor(getColor());
      spotifyApi.getPlaylist(playlistId).then(({ body }) => {
        console.log(body);
        return setPlaylist(body);
      });
    }
  }, [playlistId, sessionData, spotifyApi]);

  const styles = [
    tw`to-black bg-gradient-to-b`,
    {
      "--tw-gradient-from": color,
      "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to, ${color})`,
    },
  ];
  return (
    <Container>
      <Header>
        <UserImg
          src={
            sessionData?.user?.image === undefined
              ? User.src
              : sessionData?.user?.image
          }
          alt="User_Img"
        />
        <h2>{sessionData?.user.name} </h2>
        <ChevronDownIcon tw="h-5 w-5" />
      </Header>
      <Section css={styles}>
        <img
          src={playlist?.images[0]?.url}
          tw="h-44 w-44 shadow-2xl"
          alt="Album images"
        />
        <div>
          <p>PLAYLIST</p>
          <PlaylistName>{playlist?.name}</PlaylistName>
        </div>
      </Section>
      <Songs />
    </Container>
  );
};
export default Center;
