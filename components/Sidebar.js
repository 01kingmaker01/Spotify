import styled from "styled-components";
import tw from "twin.macro";
import { signOut } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";

import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  PlusCircleIcon,
  RssIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { playlistIdState } from "../Recoil/playlistAtom";

const SidebarCon = tw.div`  space-y-4 text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll  scrollbar-hide bg-black h-screen sm:max-w-[12rem] lg:max-w-[15rem ] md:(inline-block transition-none  translate-x-0 static w-[inherit] z-0) pb-20 -translate-x-full  transition-all  w-screen	ease-in-out duration-300 absolute z-10`;

const NavCon = tw.div`text-white absolute h-48 w-48 z-20 bg-[rgba(24, 24, 24, 0.75) ]  -top-24 -right-24 rounded-full backdrop-blur-md backdrop-saturate-[180%] md:hidden`;

const Ham = tw.span`bg-white ease-in-out duration-300 absolute h-0.5 w-6 transition top-[134px] before:(content absolute w-full h-full bg-white -top-2.5  ease-in-out duration-300) after:(content absolute w-full h-full bg-white -bottom-2.5  ease-in-out duration-300) left-[46px] cursor-pointer`;

const MenuBtn = styled.button`
  ${tw`flex space-x-2 items-center hover:text-white transition duration-200 ease-in-out`}
  svg {
    ${tw`w-5 h-5`}
  }
`;
const PlayListName = tw.div`cursor-pointer hover:text-white transition duration-200 ease-in-out`;

export const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: sessionData, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    try {
      if (spotifyApi.getAccessToken()) {
        spotifyApi.getUserPlaylists().then(({ body }) => {
          // console.log({ id: body.items[0].id });
          setPlaylists(body?.items);
        });
      }
    } catch (e) {
      console.log("Error in Sidebar UseEffect", `\n ${e}`);
    }
  }, [spotifyApi, sessionData]);
  return (
    <>
      <NavCon onClick={() => setToggle((state) => !state)}>
        <Ham
          css={
            toggle &&
            tw`transform rotate-45 before:(transform rotate-90 top-0) after:(transform rotate-90 bottom-0 )`
          }></Ham>
      </NavCon>
      <SidebarCon css={toggle && tw`translate-x-0 bg-black`}>
        <MenuBtn
          onClick={() =>
            signOut({
              callbackUrl:
                process.env.NODE_ENV === "production"
                  ? "spotify-rose.vercel.app/login"
                  : "http://localhost:3000/login",
            })
          }>
          <LogoutIcon /> <p>Log Out</p>
        </MenuBtn>
        <MenuBtn>
          <HomeIcon /> <p>Home</p>
        </MenuBtn>
        <MenuBtn>
          <SearchIcon /> <p>Search</p>
        </MenuBtn>
        <MenuBtn>
          <LibraryIcon /> <p>Your Library</p>
        </MenuBtn>

        <hr tw="border-t-[0.1px] border-gray-900" />

        <MenuBtn>
          <PlusCircleIcon /> <p>Create Playlist</p>
        </MenuBtn>
        <MenuBtn>
          <HeartIcon /> <p>Liked Songs</p>
        </MenuBtn>
        <MenuBtn>
          <RssIcon /> <p>Your</p>
        </MenuBtn>

        <hr tw="border-t-[0.1px] border-gray-900" />

        {/* PlayList */}
        {playlists.map((playlist) => (
          <PlayListName
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}>
            {playlist.name}
          </PlayListName>
        ))}
      </SidebarCon>
    </>
  );
};
