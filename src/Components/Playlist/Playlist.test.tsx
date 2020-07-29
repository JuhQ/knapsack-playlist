import React from "react";
import renderer from "react-test-renderer";

import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";
import Playlist from "./Playlist";

describe("Playlist", () => {
  it("should render list of songs", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60 });
    list.push({ id: "2", title: "test 2", seconds: 60 });

    const queue = new Queue();
    queue.merge(list);

    const component = renderer.create(
      <Playlist list={queue} onChange={() => null} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
