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

const SidebarCon = tw.div`space-y-4 text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll  scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem ] hidden md:inline-block pb-20`;
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
    <SidebarCon>
      <MenuBtn
        onClick={() =>
          signOut({ callbackUrl: "https://spotify-rose.vercel.app/login" })
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
    // </div>
  );
};
