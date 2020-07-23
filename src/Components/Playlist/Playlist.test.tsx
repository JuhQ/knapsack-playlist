import React from "react";
import renderer from "react-test-renderer";

import Playlist from "./Playlist";

describe("Playlist", () => {
  it("should render list of songs", () => {
    const component = renderer.create(
      <Playlist
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        onChange={() => null}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});