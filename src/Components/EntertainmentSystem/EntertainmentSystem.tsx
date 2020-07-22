import "./EntertainmentSystem.css";

import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";
import Player from "../Player/Player";
import Playlist from "../Playlist/Playlist";

interface Props {
  list: YoutubeItem[];
  length: number;
}

const EntertainmentSystem: React.FC<Props> = ({ list, length }: Props) => {
  const [playlist, setPlaylist] = useState<YoutubeItem[] | null>(null);
  const [currentSong, setCurrentSong] = useState<YoutubeItem | null>(null);
  const [lastSongPlayed, setLastSongPlayed] = useState<boolean>(false);

  useEffect(() => {
    const [firstSong, ...initialPlaylist] = list;
    setPlaylist(initialPlaylist);
    setCurrentSong(firstSong);
  }, [list]);

  if (playlist === null || currentSong === null) {
    return null;
  }

  const playlistLength = sumSeconds(list);
  const diff = length - playlistLength;

  if (lastSongPlayed) {
    return (
      <h2 className="done">
        Playlist has been played, please reload the page to generate a new
        playlist
      </h2>
    );
  }

  return (
    <>
      <Grid verticalAlign="bottom">
        <Grid.Column computer={10} mobile={16} textAlign="right">
          <h2>{currentSong.title}</h2>
        </Grid.Column>
        <Grid.Column computer={5} mobile={16} textAlign="center">
          <span>Playlist length: {playlistLength} seconds</span>
          <br />
          <span>Playlist size: {list.length} songs</span>
          <br />
          <span>Tried to generate {length} seconds</span>
          <br />
          {diff > 0 && (
            <>
              Difference: {diff} seconds
              <br />
            </>
          )}
          <span>Queue length: {sumSeconds(playlist)} seconds</span>
          <br />
          <span>Queue size: {playlist.length} songs</span>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={10} mobile={16} textAlign="right">
          <Player
            id={currentSong.id}
            onEnd={() => {
              const [nextSong, ...rest] = playlist;
              if (nextSong) {
                setCurrentSong(nextSong);
                setPlaylist(rest);
              } else {
                setLastSongPlayed(true);
              }
            }}
          />
        </Grid.Column>
        <Grid.Column computer={5} mobile={16}>
          <Playlist
            list={playlist}
            onChange={(song) => {
              setPlaylist(playlist.filter(({ id }) => id !== song.id));
              setCurrentSong(song);
            }}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EntertainmentSystem;
