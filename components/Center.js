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

const Container = tw.div`flex-grow relative text-white h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide pb-20`;

const Header = tw.header`absolute top-5 left-5 p-1 pr-2 space-x-3 items-center bg-black opacity-90 hover:opacity-80 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 flex md:(left-auto right-5)`;
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
  const [dropDownState, setDropDownState] = useState(false);
  const getColor = () => `hsl(${360 * Math.random()}, 100%, 50%)`;

  useEffect(() => {
    setColor(getColor());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then(({ body }) => {
      return setPlaylist(body);
    });
  }, [playlistId, spotifyApi]);

  const styles = [
    tw`to-black bg-gradient-to-b`,
    {
      "--tw-gradient-from": color,
      "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to, ${color})`,
    },
  ];
  return (
    <Container>
      <Header
        onClick={() => setDropDownState((dropDownState) => !dropDownState)}
        style={{ "WebkitTapHighlightColor?": "rgba(0, 0, 0, 0)" }}
        typeof="button"
        aria-expanded={dropDownState}
        aria-haspopup={dropDownState}>
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
