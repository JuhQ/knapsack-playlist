import React from "react";
import { Grid } from "semantic-ui-react";

import { YoutubeItem } from "../../../types";
import { sumSeconds } from "../../../Utils/math";
import Player from "../../Player/Player";
import Playlist from "../../Playlist/Playlist";

interface Props {
  list: YoutubeItem[];
  playlist: YoutubeItem[];
  currentSong: YoutubeItem;
  playlistLength: number;
  length: number;
  diff: number;
  onEnd: () => void;
  onChange: (item: YoutubeItem) => void;
}

const EntertainmentSystemContent: React.FC<Props> = ({
  list,
  playlist,
  currentSong,
  playlistLength,
  length,
  diff,
  onEnd,
  onChange,
}: Props) => (
  <>
    <Grid verticalAlign="bottom">
      <Grid.Column computer={10} mobile={16} textAlign="right">
        <h2>{currentSong.title}</h2>
      </Grid.Column>
      <Grid.Column computer={5} mobile={16} textAlign="center">
        <span>Playlist length: {playlistLength} seconds</span>
        <br />
        <span>Tried to generate {length} seconds</span>
        <br />
        {diff === 0 && (
          <strong>
            Great success! Playlist is exactly as long as we wanted!
            <span role="img" aria-label="Success">
              👌
            </span>
            <br />
          </strong>
        )}
        {diff > 0 && (
          <>
            Difference: {diff} seconds
            <br />
          </>
        )}
        <span>Queue length: {sumSeconds(playlist)} seconds</span>
        <br />
        <span>Playlist size: {list.length} songs</span>
        <br />
        <span>Queue size: {playlist.length} songs</span>
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column computer={10} mobile={16} textAlign="right">
        <Player id={currentSong.id} onEnd={onEnd} />
      </Grid.Column>
      <Grid.Column computer={5} mobile={16}>
        <Playlist list={playlist} onChange={onChange} />
      </Grid.Column>
    </Grid>
  </>
);

export default EntertainmentSystemContent;
