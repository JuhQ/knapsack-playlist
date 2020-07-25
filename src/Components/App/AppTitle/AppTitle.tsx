import React from "react";
import { Container } from "semantic-ui-react";

const AppTitle: React.FC = () => (
  <Container textAlign="center">
    <h1 data-text="Playlist Generator">Playlist Generator</h1>
    <span className="App-logo" role="img" aria-label="rock on!">
      🎸
    </span>
    <span className="App-logo" role="img" aria-label="rock on!">
      🤘
    </span>
  </Container>
);

export default AppTitle;
