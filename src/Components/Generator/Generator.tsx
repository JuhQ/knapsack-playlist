import "./Generator.css";

import React, { useState } from "react";
import { Container, Form, Grid } from "semantic-ui-react";

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

  const predefinedDataSetSizes = [10, 15, 20, 25, 30, 35, 40, 50, totalDataset];
  const predefinedPlaylistLength = [
    60,
    120,
    300,
    600,
    1800,
    3600,
    7200,
    totalLength,
  ];

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
            {predefinedDataSetSizes.map((size) => (
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
            ))}
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            Select desired playlist length
            <br />
            <small>
              Last button selects the maximum length of the music catalog and
              may result in a long playlist generation time.
            </small>
            <br />
            {predefinedPlaylistLength.map((length) => (
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
            ))}
          </Grid.Column>
        </Grid>
      </Form>
    </Container>
  );
};

export default Generator;
