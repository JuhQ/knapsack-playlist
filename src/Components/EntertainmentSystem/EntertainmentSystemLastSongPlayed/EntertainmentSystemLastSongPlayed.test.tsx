import React from "react";
import renderer from "react-test-renderer";

import EntertainmentSystemLastSongPlayed from "./EntertainmentSystemLastSongPlayed";

describe("Playlist", () => {
  it("should render", () => {
    const component = renderer.create(<EntertainmentSystemLastSongPlayed />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
