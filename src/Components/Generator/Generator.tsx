import "./Generator.css";

import React, { useState } from "react";
import { Container, Form, Grid } from "semantic-ui-react";

import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";
import sample from "../../Utils/utils";

interface Props {
  music: Queue;
  totalDataset: number;
  totalLength: number;
  onSubmit: (value: {
    dataSetSize: number;
    playlistLength: number;
    music: ArrayList<YoutubeItem>;
  }) => void;
}

const Generator: React.FC<Props> = ({
  music,
  totalDataset,
  totalLength,
  onSubmit,
}: Props) => {
  const [dataSetSize, setDataSetSize] = useState<number>(0);
  const [playlistLength, setPlaylistLength] = useState<number>(0);
  const [selectedMusic, setSelectedMusic] = useState<ArrayList<YoutubeItem>>(
    new ArrayList(0)
  );

  const predefinedDataSetSizes = new ArrayList<number>(9);
  predefinedDataSetSizes.push(10);
  predefinedDataSetSizes.push(15);
  predefinedDataSetSizes.push(20);
  predefinedDataSetSizes.push(25);
  predefinedDataSetSizes.push(30);
  predefinedDataSetSizes.push(35);
  predefinedDataSetSizes.push(40);
  predefinedDataSetSizes.push(50);
  predefinedDataSetSizes.push(totalDataset);

  const predefinedPlaylistLength = new ArrayList<number>(8);
  predefinedPlaylistLength.push(60);
  predefinedPlaylistLength.push(120);
  predefinedPlaylistLength.push(300);
  predefinedPlaylistLength.push(600);
  predefinedPlaylistLength.push(1800);
  predefinedPlaylistLength.push(3600);
  predefinedPlaylistLength.push(7200);
  predefinedPlaylistLength.push(totalLength);

  return (
    <Container>
      <Form
        onSubmit={() => {
          onSubmit({ dataSetSize, playlistLength, music: music.all() });
        }}
      >
        <h2>Option 1:</h2>
        <h3>Generate randomized dataset</h3>
        <Grid verticalAlign="bottom">
          <Grid.Column computer={16} mobile={16}>
            <h2>Option 1.1: Preselected dataset</h2>
            <small>
              Select n-amount of preselected songs from the beginning of the
              list. You can see the list on the bottom left side of the page.
              <br />
              These buttons should always result in the same playlist with the
              same selected playlist length. For example if you choose 20 songs
              and 3600 seconds, you should always get same playlist.
            </small>
            <br />
            {predefinedDataSetSizes
              .map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`preset dataset slice ${
                    size === dataSetSize ? "selected" : ""
                  }`}
                  onClick={() => {
                    setDataSetSize(size);

                    const slice = music.all().slice(0, size);

                    setSelectedMusic(slice);

                    onSubmit({
                      dataSetSize: size,
                      playlistLength,
                      music: slice,
                    });
                  }}
                >
                  {size}
                </button>
              ))
              .getAsArray()}
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            <h2>Option 1.2: Random dataset</h2>
            <small>
              Select n-amount of random songs.
              <br />
              This is the amount of random songs to be selected from the
              database for the knapsack algorithm.
              <br />
              Select randomized sample of songs. Last button selects all songs
              and may result in a long playlist generation time.
            </small>
            <br />
            {predefinedDataSetSizes
              .map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`preset dataset random ${
                    size === dataSetSize ? "selected" : ""
                  }`}
                  onClick={() => {
                    setDataSetSize(size);
                    const sampledMusic = sample(music.all(), size);
                    setSelectedMusic(sampledMusic);
                    onSubmit({
                      dataSetSize: size,
                      playlistLength,
                      music: sampledMusic,
                    });
                  }}
                >
                  {size}
                </button>
              ))
              .getAsArray()}
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            <h2>Select the desired playlist length in seconds</h2>
            <small>
              Last button selects the maximum length of the music catalog and
              may result in a long playlist generation time.
            </small>
            <br />
            {predefinedPlaylistLength
              .map((length) => (
                <button
                  key={length}
                  type="button"
                  className={`preset length ${
                    length === playlistLength ? "selected" : ""
                  }`}
                  onClick={() => {
                    setPlaylistLength(length);
                    onSubmit({
                      dataSetSize,
                      playlistLength: length,
                      music: selectedMusic,
                    });
                  }}
                >
                  {length}
                </button>
              ))
              .getAsArray()}
          </Grid.Column>
        </Grid>
      </Form>
    </Container>
  );
};

export default Generator;
