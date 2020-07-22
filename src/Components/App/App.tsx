import "./App.css";

import React from "react";

import knapsack from "../../Algorithms/knapsack/knapsack";
import YoutubeMusic from "../../Models/Youtube/Youtube";
import sample from "../../Utils/utils";
import EntertainmentSystem from "../EntertainmentSystem/EntertainmentSystem";

const App = (): JSX.Element => (
  <>
    <h1 data-text="Playlist Generator">Playlist Generator</h1>
    <span className="App-logo" role="img" aria-label="rock on!">
      🎸
    </span>
    <span className="App-logo" role="img" aria-label="rock on!">
      🤘
    </span>

    <EntertainmentSystem list={knapsack(sample(YoutubeMusic(), 20), 3600)} />
    <span className="security">Knapsack generated playlists rule!</span>
  </>
);

export default App;
