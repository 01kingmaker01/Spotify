import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { currentSongIdState, isPlayingState } from "../Recoil/songAtom";

const PlayerCon = tw.div`text-white sticky bottom-0 h-20 bg-[#181818]
// bg-gradient-to-b from-black to-gray-900 
 grid  text-xs px-2 md:(text-base px-8) sm:( grid-cols-3)  `;

const LeftCon = tw.div`hidden sm:(flex) items-center space-x-4`;
const CenterCon = tw.div`flex items-center justify-evenly`;
const RightCon = tw.div`hidden items-center space-x-3 md:(space-x-4 pr-5 ) justify-end sm:(flex) `;

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: sessionData, status } = useSession();
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = async () => {
    try {
      if (!songInfo) {
        const CurrentPlayingTrack = await spotifyApi.getMyCurrentPlayingTrack();
        setCurrentSongId(CurrentPlayingTrack?.body?.item?.id);

        const PlayBackState = await spotifyApi.getMyCurrentPlaybackState();
        setIsPlaying(PlayBackState?.body?.isPlaying);
      }
    } catch (error) {
      console.error("Error in PlayerJS fetchCurrentSong", error);
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentSongId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentSongId, spotifyApi, sessionData]);

  const handlePlayBack = async () => {
    try {
      const data = await spotifyApi.getMyCurrentPlaybackState();

      if (data?.body?.isPlaying || isPlaying) {
        await spotifyApi.pause().finally(() => setIsPlaying(false));
      }
      if (data?.body?.isPlaying === false || isPlaying === false) {
        await spotifyApi.play().finally(() => setIsPlaying(true));
      }
    } catch (error) {
      console.error("Error in Player => handlePlayBack()", error);
    }
  };

  const Debounce = (fn, wait) => {
    let Timer;
    return (...args) => {
      console.log([...args]);
      if (Timer) clearTimeout(Timer);
      Timer = setTimeout(() => {
        fn(...args), wait;
      });
    };
  };

  const debouncedAdjustVolume = useCallback(
    Debounce(async (volume) => {
      try {
        await spotifyApi.setVolume(volume);
      } catch (error) {
        console.log(error);
      }
    }, 5000000),
    [volume]
  );

  useEffect(() => {
    if (volume >= 0 && volume <= 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);
  return (
    <PlayerCon>
      <LeftCon>
        <img
          tw="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3 tw="truncate w-24 md:w-44">{songInfo?.name} </h3>
          <p tw="truncate w-24 md:w-auto text-xs text-gray-300">
            {songInfo?.artists?.[0].name}
          </p>
        </div>
      </LeftCon>
      <CenterCon>
        <SwitchHorizontalIcon className="iconButton" />
        <RewindIcon
          className="iconButton"
          onClick={() => spotifyApi.skipToPrevious()}
        />
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayBack}
            className="iconButton"
            tw="h-10 w-10"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayBack}
            className="iconButton"
            tw="h-10 w-10"
          />
        )}
        <FastForwardIcon
          className="iconButton"
          onClick={() => spotifyApi.skipToNext()}
        />
        <ReplyIcon className="iconButton" />
      </CenterCon>
      <RightCon>
        <VolumeOffIcon
          onClick={(e) => volume > 0 && setVolume(volume - 10)}
          className="iconButton"
        />
        <input
          type="range"
          tw="w-14 md:w-28"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="iconButton"
          onClick={(e) => volume < 100 && setVolume(volume + 10)}
        />
      </RightCon>
    </PlayerCon>
  );
};
export default Player;
