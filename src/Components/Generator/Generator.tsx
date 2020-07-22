import React, { useState } from "react";
import { Container, Form, Input } from "semantic-ui-react";

interface Props {
  onSubmit: (value: { dataSetSize: number; playlistLength: number }) => void;
}

const Generator: React.FC<Props> = ({ onSubmit }: Props) => {
  const [dataSetSize, setDataSetSize] = useState<number>(20);
  const [playlistLength, setPlaylistLength] = useState<number>(3600);

  return (
    <Container>
      <Form
        onSubmit={() => {
          onSubmit({ dataSetSize, playlistLength });
        }}
      >
        <div>
          Size of data set:
          <br />
          <small>
            This is the amount of random items to be selected from the database
            for the knapsack algorithm
          </small>
          <br />
          <Input
            size="large"
            type="number"
            label={{ basic: true, content: "videos" }}
            labelPosition="right"
            placeholder="Enter desired data set size"
            value={dataSetSize}
            onChange={({ target }) => {
              setDataSetSize(Number(target.value));
            }}
          />
        </div>
        <div>
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
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
};

export default Generator;
