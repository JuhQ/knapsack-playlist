import "./Generator.css";

import React, { useState } from "react";
import { Container, Form, Grid, Input } from "semantic-ui-react";

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
  const [dataSetSize, setDataSetSize] = useState<number>(20);
  const [playlistLength, setPlaylistLength] = useState<number>(3600);

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
        <Grid verticalAlign="bottom">
          <Grid.Column computer={6} mobile={16}>
            Size of data set:
            <br />
            <small>
              This is the amount of random songs to be selected from the
              database for the knapsack algorithm
            </small>
            <br />
            <Input
              size="large"
              type="number"
              label={{ basic: true, content: "songs" }}
              labelPosition="right"
              placeholder="Enter desired data set size"
              value={dataSetSize}
              onChange={({ target }) => {
                setDataSetSize(Number(target.value));
              }}
            />
          </Grid.Column>
          <Grid.Column computer={10} mobile={16}>
            {predefinedDataSetSizes.map((size) => (
              <button
                key={size}
                type="button"
                className="preset dataset"
                onClick={() => {
                  setDataSetSize(size);
                  onSubmit({ dataSetSize: size, playlistLength });
                }}
              >
                {size}
              </button>
            ))}
          </Grid.Column>
        </Grid>
        <Grid verticalAlign="bottom">
          <Grid.Column computer={6} mobile={16}>
            Length of playlist:
            <br />
            <Input
              size="large"
              type="number"
              label={{ basic: true, content: "seconds" }}
              labelPosition="right"
              placeholder="Enter desired playlist length"
              value={playlistLength}
              onChange={({ target }) => {
                setPlaylistLength(Number(target.value));
              }}
            />
          </Grid.Column>
          <Grid.Column computer={10} mobile={16}>
            {predefinedPlaylistLength.map((length) => (
              <button
                key={length}
                type="button"
                className="preset length"
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
        <button type="submit" className="submit">
          Generate playlist
        </button>
      </Form>
    </Container>
  );
};

export default Generator;
