import "./App.css";

import React from "react";
import { Container } from "semantic-ui-react";

import knapsack from "../../Algorithms/knapsack/knapsack";
import YoutubeMusic from "../../Models/Youtube/Youtube";
import sample from "../../Utils/utils";
import EntertainmentSystem from "../EntertainmentSystem/EntertainmentSystem";

const playlistLength = 3600;

const App = (): JSX.Element => (
  <Container fluid>
    <Container textAlign="center">
      <h1 data-text="Playlist Generator">Playlist Generator</h1>
      <span className="App-logo" role="img" aria-label="rock on!">
        🎸
      </span>
      <span className="App-logo" role="img" aria-label="rock on!">
        🤘
      </span>
    </Container>

    <EntertainmentSystem
      list={knapsack(sample(YoutubeMusic(), 20), playlistLength)}
      length={playlistLength}
    />
    <span className="security">Knapsack generated playlists rule!</span>
  </Container>
);

export default App;
