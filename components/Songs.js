import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import { playlistState } from "../Recoil/playlistAtom";
import Song from "./Song";

const SongsCon = tw.div`px-8 flex flex-col`;

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  return (
    <SongsCon>
      {playlist?.tracks?.items.map((song, i) => {
        return <Song song={song} order={i} key={song?.track?.id + i} />;
      })}
    </SongsCon>
  );
};
export default Songs;
