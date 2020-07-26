import React from "react";
import renderer from "react-test-renderer";

import Queue from "../../Datastructures/queue/queue";
import Playlist from "./Playlist";

describe("Playlist", () => {
  it("should render list of songs", () => {
    const list = new Queue();
    list.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test 2", seconds: 60 },
    ]);

    const component = renderer.create(
      <Playlist list={list} onChange={() => null} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
