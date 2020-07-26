import "./EntertainmentSystem.css";

import React, { useEffect, useState } from "react";

import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";
import EntertainmentSystemContent from "./EntertainmentSystemContent/EntertainmentSystemContent";
import EntertainmentSystemLastSongPlayed from "./EntertainmentSystemLastSongPlayed/EntertainmentSystemLastSongPlayed";

interface Props {
  list: Queue;
  length: number;
}

const EntertainmentSystem: React.FC<Props> = ({ list, length }: Props) => {
  const [playlist, setPlaylist] = useState<Queue>(list);
  const [currentSong, setCurrentSong] = useState<YoutubeItem>(list.at(0));
  const [lastSongPlayed, setLastSongPlayed] = useState<boolean>(false);
  const playlistLength = list.seconds();
  const diff = length - playlistLength;

  useEffect(() => {
    const firstSong = list.dequeue();
    const initialPlaylist = new Queue();
    initialPlaylist.merge(list);

    if (firstSong) {
      setCurrentSong(firstSong);
    }

    setPlaylist(initialPlaylist);
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
        const nextSong = playlist.dequeue();
        if (nextSong) {
          setCurrentSong(nextSong);
          setPlaylist(playlist);
        } else {
          setLastSongPlayed(true);
          setPlaylist(new Queue());
        }
      }}
      onChange={(song) => {
        const queue = new Queue();
        const filteredList = playlist.all().filter(({ id }) => id !== song.id);
        queue.merge(filteredList);
        setPlaylist(queue);
        setCurrentSong(song);
      }}
    />
  );
};

export default EntertainmentSystem;
