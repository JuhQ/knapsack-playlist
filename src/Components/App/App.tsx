import "./App.css";

import React, { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";

import knapsack from "../../Algorithms/knapsack/knapsack";
import YoutubeMusic from "../../Models/Youtube/Youtube";
import { YoutubeItem } from "../../types";
import sample from "../../Utils/utils";
import EntertainmentSystem from "../EntertainmentSystem/EntertainmentSystem";
import Generator from "../Generator/Generator";

const App = (): JSX.Element => {
  const [dataSetSize, setDataSetSize] = useState<number>(0);
  const [playlistLength, setPlaylistLength] = useState<number>(0);
  const [playlist, setPlaylist] = useState<YoutubeItem[] | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [generatorSubmitted, setGeneratorSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (dataSetSize && playlistLength && generatorSubmitted) {
      setCreating(true);
      setTimeout(() => {
        setPlaylist(
          knapsack(sample(YoutubeMusic(), dataSetSize), playlistLength)
        );
        setCreating(false);
        setGeneratorSubmitted(false);
      }, 0);
    }
  }, [dataSetSize, playlistLength, generatorSubmitted]);

  return (
    <Grid>
      <Grid.Column width={16}>
        <Container textAlign="center">
          <h1 data-text="Playlist Generator">Playlist Generator</h1>
          <span className="App-logo" role="img" aria-label="rock on!">
            🎸
          </span>
          <span className="App-logo" role="img" aria-label="rock on!">
            🤘
          </span>
        </Container>

        <Generator
          onSubmit={(value) => {
            setDataSetSize(value.dataSetSize);
            setPlaylistLength(value.playlistLength);
            setGeneratorSubmitted(true);
          }}
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Container>
          {dataSetSize === 0 && <>Select dataset size</>}

          {(dataSetSize > 0 || playlistLength > 0) &&
            !creating &&
            !playlist?.length && (
              <>Playlist generated but no songs were found</>
            )}
          {creating && (
            <>
              Generating playlist. Depending on input size and desired playlist
              length, this might take a while.
            </>
          )}
        </Container>
      </Grid.Column>
      <Grid.Column width={16}>
        {dataSetSize > 0 && playlist?.length && (
          <EntertainmentSystem list={playlist} length={playlistLength} />
        )}
        <span className="security">Knapsack generated playlists rule!</span>
      </Grid.Column>
    </Grid>
  );
};
export default App;
