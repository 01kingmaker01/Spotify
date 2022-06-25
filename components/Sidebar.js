import styled from "styled-components";
import tw from "twin.macro";
import { signOut } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";

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

  useEffect(
    () =>
      (async () => {
        try {
          if (spotifyApi.getAccessToken()) {
            console.log("if it works, this line should be shown");

            await spotifyApi.getUserPlaylists().then(({ body }) => {
              console.log(body);
              setPlaylists(body.items);
            });
          }
        } catch (e) {
          console.log("Error in Sidebar UseEffect", `\n ${e}`);
        }
      })(),
    [spotifyApi, sessionData]
  );
  //  return spotifyApi
  //     .getUserPlaylists()
  //     .then((data) => {
  //       console.log("Retrieved playlists", data.body);
  //       return setPlaylist(data.body.items);
  //     })
  //     .catch((e) => console.log(e));
  return (
    // <div tw="text-gray-500 p-5 text-sm border-r border-t-gray-900">
    <div tw="space-y-4 text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll  scrollbar-hide h-screen ">
      <MenuBtn
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/login" })}>
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
        <PlayListName key={playlist.id}>{playlist.name}</PlayListName>
      ))}
    </div>
    // </div>
  );
};
