import { useRecoilState } from "recoil";
import tw from "twin.macro";
import useSpotify from "../hooks/useSpotify";
import { currentSongIdState, isPlayingState } from "../Recoil/songAtom";

const GridCon = tw.div`grid grid-cols-2  p-4 text-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer`;
const Con1 = tw.div`flex space-x-4 items-center`;
const Con2 = tw.div`flex items-center justify-between ml-auto md:ml-0`;
const Order = tw.p``;
const SongImage = tw.img`h-10 w-10 rounded `;
const SongName = tw.p``;

const milliSecToMinAndSec = (milliSec) => {
  const minutes = Math.floor(milliSec / 60000); //millis->second(/1000)->min(/60)
  const seconds = Math.round((milliSec % 60000) / 1000);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const Song = ({ order, song }) => {
  // const spotifyApi = useSpotify();
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentSongId(song.track.id);
    setIsPlaying(true);
    // spotifyApi.play({
    //   uris: [song.track.uri],
    // });
  };

  return (
    <GridCon onClick={() => playSong()}>
      <Con1>
        <p tw="flex justify-end w-6">{order + 1}</p>
        <SongImage
          tw="h-10 w-10"
          src={song?.track?.album?.images[0].url}
          alt="Song_img"
        />
        <div>
          <p tw="text-white truncate w-36 lg:w-64 ">{song.track.name}</p>
          <p tw="w-40 truncate">{song.track?.artists[0]?.name}</p>
        </div>
      </Con1>
      <Con2>
        <p tw="hidden md:inline w-40 ">{song.track?.album?.name}</p>
        <p>{milliSecToMinAndSec(song.track?.duration_ms)}</p>
      </Con2>
    </GridCon>
  );
};
export default Song;
