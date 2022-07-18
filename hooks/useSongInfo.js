import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentSongIdState } from "../Recoil/songAtom";
import useSpotify from "./useSpotify";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(
    () =>
      (async () => {
        try {
          if (currentSongId) {
            const { body } = await spotifyApi.getTrack(currentSongId);
            setSongInfo(body);
          }
        } catch (e) {
          console.log("Error in useSongInfo Hook", e);
        }
      })(),
    [currentSongId]
  );

  return songInfo;
};
export default useSongInfo;
