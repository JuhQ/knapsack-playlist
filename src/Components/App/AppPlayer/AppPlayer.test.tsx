import React from "react";
import { create } from "react-test-renderer";

import Queue from "../../../Datastructures/queue/queue";
import AppPlayer from "./AppPlayer";

describe("AppPlayer", () => {
  it("should render", () => {
    const playlist = new Queue();
    playlist.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test2", seconds: 60 },
    ]);
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried
        creating
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with generation tried false", () => {
    const playlist = new Queue();
    playlist.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test2", seconds: 60 },
    ]);
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried={false}
        creating
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with creating false", () => {
    const playlist = new Queue();
    playlist.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test2", seconds: 60 },
    ]);
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried
        creating={false}
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with generation tried and creating false", () => {
    const playlist = new Queue();
    playlist.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test2", seconds: 60 },
    ]);
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried={false}
        creating={false}
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
