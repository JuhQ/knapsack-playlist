import "./EntertainmentSystem.css";

import React, { useEffect, useState } from "react";

import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";
import EntertainmentSystemContent from "./EntertainmentSystemContent/EntertainmentSystemContent";
import EntertainmentSystemLastSongPlayed from "./EntertainmentSystemLastSongPlayed/EntertainmentSystemLastSongPlayed";

interface Props {
  list: YoutubeItem[];
  length: number;
}

const EntertainmentSystem: React.FC<Props> = ({ list, length }: Props) => {
  const [playlist, setPlaylist] = useState<YoutubeItem[]>(list);
  const [currentSong, setCurrentSong] = useState<YoutubeItem>(list[0]);
  const [lastSongPlayed, setLastSongPlayed] = useState<boolean>(false);
  const playlistLength = sumSeconds(list);
  const diff = length - playlistLength;

  useEffect(() => {
    const [firstSong, ...initialPlaylist] = list;
    setPlaylist(initialPlaylist);
    setCurrentSong(firstSong);
    setLastSongPlayed(false);
  }, [list]);

  if (lastSongPlayed) {
    return <EntertainmentSystemLastSongPlayed />;
  }

  return (
    <EntertainmentSystemContent
      list={list}
      playlist={playlist}
      currentSong={currentSong}
      length={length}
      diff={diff}
      playlistLength={playlistLength}
      onEnd={() => {
        const [nextSong, ...rest] = playlist;
        if (nextSong) {
          setCurrentSong(nextSong);
          setPlaylist(rest);
        } else {
          setLastSongPlayed(true);
        }
      }}
      onChange={(song) => {
        setPlaylist(playlist.filter(({ id }) => id !== song.id));
        setCurrentSong(song);
      }}
    />
  );
};

export default EntertainmentSystem;
