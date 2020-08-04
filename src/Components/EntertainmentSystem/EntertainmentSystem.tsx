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
  const [currentSong, setCurrentSong] = useState<YoutubeItem | undefined>(
    list.at(0)
  );
  const [lastSongPlayed, setLastSongPlayed] = useState<boolean>(false);
  const playlistLength = list.seconds();
  const diff = length - playlistLength;

  useEffect(() => {
    const initialPlaylist = new Queue();
    initialPlaylist.merge(list);
    const firstSong = initialPlaylist.dequeue();

    setCurrentSong(firstSong);

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
      currentSong={
        currentSong || { id: "1", title: "1", seconds: 0, rating: 1 }
      }
      length={length}
      diff={diff}
      playlistLength={playlistLength}
      onEnd={() => {
        const newQueue = new Queue();
        newQueue.merge(playlist);

        const nextSong = newQueue.dequeue();

        if (nextSong) {
          setCurrentSong(nextSong);
          setPlaylist(newQueue);
        } else {
          setLastSongPlayed(true);
          setPlaylist(new Queue());
        }
      }}
      onChange={(song) => {
        const queue = new Queue();
        const filteredQueue = playlist.all().filter(({ id }) => id !== song.id);
        queue.merge(filteredQueue);
        setPlaylist(queue);
        setCurrentSong(song);
      }}
    />
  );
};

export default EntertainmentSystem;
