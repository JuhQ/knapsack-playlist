import React, { useState } from "react";

import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";
import Player from "../Player/Player";
import Playlist from "../Playlist/Playlist";

interface Props {
  list: YoutubeItem[];
}

const EntertainmentSystem: React.FC<Props> = ({ list }: Props) => {
  const [firstSong, ...initialPlaylist] = list;
  const [playlist, setPlaylist] = useState<YoutubeItem[]>(initialPlaylist);
  const [currentSong, setCurrentSong] = useState<YoutubeItem>(firstSong);

  return (
    <div>
      <span>Playlist length: {sumSeconds(list)} seconds</span>
      <br />
      <span>Queue length: {sumSeconds(playlist)} seconds</span>
      <br />
      <span>Now playing: {currentSong.title}</span>

      <Player
        id={currentSong.id}
        onEnd={() => {
          const [nextSong, ...rest] = playlist;
          setCurrentSong(nextSong);
          setPlaylist(rest);
        }}
      />
      <Playlist
        list={playlist}
        onChange={(song) => {
          setPlaylist(playlist.filter(({ id }) => id !== song.id));
          setCurrentSong(song);
        }}
      />
    </div>
  );
};

export default EntertainmentSystem;
