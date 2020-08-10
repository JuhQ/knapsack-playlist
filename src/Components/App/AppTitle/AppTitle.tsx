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
    <br />
    <small>
      Select either{" "}
      <code>
        <strong>Option 1</strong>
      </code>{" "}
      or{" "}
      <code>
        <strong>Option 2</strong>
      </code>
      .
    </small>
  </Container>
);

export default AppTitle;
