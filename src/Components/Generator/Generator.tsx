import "./Generator.css";

import React, { useState } from "react";
import { Container, Form, Grid } from "semantic-ui-react";

import ArrayList from "../../Datastructures/ArrayList/ArrayList";

interface Props {
  totalDataset: number;
  totalLength: number;
  onSubmit: (value: { dataSetSize: number; playlistLength: number }) => void;
}

const Generator: React.FC<Props> = ({
  totalDataset,
  totalLength,
  onSubmit,
}: Props) => {
  const [dataSetSize, setDataSetSize] = useState<number>(0);
  const [playlistLength, setPlaylistLength] = useState<number>(0);

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
          onSubmit({ dataSetSize, playlistLength });
        }}
      >
        <h3>Generate randomized dataset</h3>
        <Grid verticalAlign="bottom">
          <Grid.Column computer={8} mobile={16}>
            Select dataset size
            <br />
            <small>
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
                  className={`preset dataset ${
                    size === dataSetSize ? "selected" : ""
                  }`}
                  onClick={() => {
                    setDataSetSize(size);
                    onSubmit({ dataSetSize: size, playlistLength });
                  }}
                >
                  {size}
                </button>
              ))
              .getAsArray()}
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            Select desired playlist length
            <br />
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
                    onSubmit({ dataSetSize, playlistLength: length });
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
